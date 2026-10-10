import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-5xl flex-1 flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3 border-b border-border py-3 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
        <span>404.md</span>
        <span>not in this revision</span>
      </div>
      <h1 className="mt-10 max-w-[20ch] font-display text-[clamp(2rem,6vw,3.5rem)] leading-[1.02] font-bold tracking-[-0.03em]">
        This page has been removed.
      </h1>
      <p className="mt-5 max-w-[52ch] text-lg leading-8 text-muted-foreground">
        The entry you asked for isn&apos;t part of this revision of the record —
        but the main changelog is still here.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-foreground px-5 py-3 font-mono text-xs tracking-[0.14em] text-background uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Return to the changelog
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
