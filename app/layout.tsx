import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import { site } from "@/content/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// The display voice: a grotesque with engineering-print character, self-hosted.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

/*
 * THE CHANGELOG WORLD — direction contract, seed key 195effb3.
 * Emitted into the document as a real HTML comment (first child of body),
 * where the production build preserves it for auditing.
 */
const CHANGELOG_CONTRACT = `THE CHANGELOG WORLD — seed key 195effb3. THESIS: a person's homepage as a living changelog in release-note grammar; refuses the CV-spine portfolio, the SaaS hero, and the neon dev-portfolio. OWN-WORLD: paper stock light / editor stock dark, semantic ink only (added green, removed red, changed amber, link blue), Archivo display + Geist text + Geist Mono notation, hairlines and square corners, no shadows, no gradients. STORY: the visitor reads Monu Thomas as an actively maintained record — who he is (+ line), what he writes, and the open Unreleased entry that is the conversation. FIRST VIEWPORT: status line, name up to 6rem Archivo, headline as first added line, ink-block mailto action, mono metadata, portrait stamp. FORM: changelog world, Persuade homepage, assigned candidate #5. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md.`;

// Runs before hydration so the correct theme class is set with no flash.
// Mirrors the logic in components/layout/ThemeProvider.tsx.
const THEME_INIT_SCRIPT = `(function(){try{document.documentElement.classList.add("js");var s=localStorage.getItem("theme")||"system";var r=s==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):s;document.documentElement.classList.toggle("dark",r==="dark");document.documentElement.style.colorScheme=r;}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: site.seo.title,
    template: `%s | ${site.name}`,
  },
  description: site.seo.description,
  openGraph: {
    title: site.name,
    description: site.seo.description,
    url: "/",
    siteName: site.name,
    images: [{ url: site.seo.image, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.seo.description,
    images: [site.seo.image],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} bg-background text-foreground`}>
        {/* The direction contract, emitted verbatim into the HTML output. */}
        <div hidden dangerouslySetInnerHTML={{ __html: `<!-- ${CHANGELOG_CONTRACT} -->` }} />
        <ThemeProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground">
            Skip to content
          </a>
          <div id="top" className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            <main id="main-content" className="flex flex-1 flex-col">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
