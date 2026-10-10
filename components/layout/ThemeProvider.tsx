"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme";

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readStoredTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {
    // Storage unavailable (e.g. private mode) — fall through to system default.
  }
  return "system";
}

function disableTransitionsTemporarily() {
  const style = document.createElement("style");
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}",
    ),
  );
  document.head.appendChild(style);
  return () => {
    // Force reflow so the style applies before removal.
    window.getComputedStyle(document.body);
    setTimeout(() => document.head.removeChild(style), 1);
  };
}

function applyResolvedTheme(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  // Sync React state with the real theme after mount. localStorage and
  // matchMedia are unavailable during SSR, so this must happen in an effect
  // to avoid a hydration mismatch.
  useEffect(() => {
    const stored = readStoredTheme();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only theme sync after mount; the blocking head script already set the correct class pre-paint
    setThemeState(stored);
    setResolvedTheme(stored === "system" ? getSystemTheme() : stored);
  }, []);

  useEffect(() => {
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const restore = disableTransitionsTemporarily();
      const next = getSystemTheme();
      applyResolvedTheme(next);
      setResolvedTheme(next);
      restore();
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      const next: Theme =
        event.newValue === "light" || event.newValue === "dark" ? event.newValue : "system";
      setThemeState(next);
      applyResolvedTheme(next === "system" ? getSystemTheme() : next);
      setResolvedTheme(next === "system" ? getSystemTheme() : next);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    const restore = disableTransitionsTemporarily();
    setThemeState(next);
    const resolved = next === "system" ? getSystemTheme() : next;
    applyResolvedTheme(resolved);
    setResolvedTheme(resolved);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable — theme still applies for this session.
    }
    restore();
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
