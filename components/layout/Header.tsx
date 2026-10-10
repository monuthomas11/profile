"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { site } from "@/content/site";

import { ThemeToggle } from "@/components/layout/ThemeToggle";

const navItems = [
  { label: "about", href: "/#about" },
  { label: "writing", href: "/#writing" },
  { label: "contact", href: "/#contact" },
  { label: "cv", href: "/resume" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background print:hidden">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between py-3">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-border font-mono text-xs font-medium">
              {site.initials}
            </span>
            <span className="font-display text-sm font-semibold tracking-tight">{site.name}</span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="flex h-11 w-11 items-center justify-center border border-border text-foreground"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-background md:hidden">
          <div className="px-4 sm:px-6">
            <nav className="mx-auto flex max-w-5xl flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-border py-3.5 font-mono text-sm tracking-[0.1em] text-foreground uppercase transition-colors hover:text-accent"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
