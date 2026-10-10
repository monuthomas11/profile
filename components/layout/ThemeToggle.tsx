"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- mounted guard avoids a hydration mismatch on the theme icon (resolved only client-side)
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="flex h-11 w-11 items-center justify-center border border-border bg-surface text-sm text-foreground transition-colors hover:border-foreground"
        disabled
      >
        <Sun size={18} />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="flex h-11 w-11 items-center justify-center border border-border bg-surface text-sm text-foreground transition-colors hover:border-foreground"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
