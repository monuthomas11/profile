import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { about } from "@/content/about";
import { site, siteCity } from "@/content/site";

export function Masthead() {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* The file header: this page knows what it is. */}


        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-border py-3 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          <span>CHANGELOG.md</span>
          <span className="tabular-nums">
            rev {site.rev} · {siteCity}
          </span>
        </div>



        <div className="grid gap-10 pt-10 pb-16 sm:pt-14 lg:grid-cols-[1fr_auto] lg:gap-16 lg:pb-20 lg:items-stretch">
          <div>
            <h1 className="font-display text-[clamp(2.75rem,8.5vw,6rem)] leading-[0.95] font-bold tracking-[-0.03em]">
              {site.name}
            </h1>

            {/* The thesis line: the first addition in the record. */}
            <p className="mt-6 flex max-w-[46ch] items-baseline gap-2 text-lg leading-snug font-medium sm:text-xl">
              <span aria-hidden="true" className="diff-mark diff-mark--added shrink-0 text-base">
                +
              </span>
              <span>{site.headline}</span>
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 bg-foreground px-5 py-3 font-mono text-xs tracking-[0.14em] text-background uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Start a conversation
                <ArrowRight size={14} aria-hidden="true" />
              </a>
              <Link
                href="#writing"
                className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
              >
                Read the writing
              </Link>
              <Link
                href="/resume"
                className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
              >
                Full CV
              </Link>
            </div>

            <dl className="mt-10 max-w-[30rem] border-t border-border font-mono text-xs">
              {about.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-4 border-b border-border py-2.5"
                >
                  <dt className="tracking-[0.16em] text-muted-foreground uppercase">{fact.label}</dt>
                  <dd className="text-right text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Same weight as the text column: the portrait fills the masthead,
              rather than floating as a stamp in the margin. */}
          <figure className="w-48 sm:w-56 lg:w-80 lg:self-stretch">
            <div className="relative aspect-[10/13] h-full w-full border border-border bg-surface p-1.5 lg:aspect-auto">
              <Image
                src={about.photoPath}
                alt={`Portrait of ${site.name}`}
                fill
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 320px"
                className="object-cover object-center"
                priority
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
