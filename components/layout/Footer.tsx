import Link from "next/link";

import { site } from "@/content/site";

const CURRENT_YEAR = new Date().getFullYear();

const footerLinks = [
  { label: "writing", href: "/blog" },
  { label: "cv", href: "/resume" },
  { label: "top", href: "#top" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background print:hidden">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 py-8 font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase sm:flex-row sm:items-center sm:justify-between">
          <p className="tabular-nums">© {CURRENT_YEAR} {site.name}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {site.socialLinks
              .filter((item) => item.icon !== "mail")
              .map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            {footerLinks.map((item) => (
              <Link key={item.label} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
