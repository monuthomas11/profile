type EntryHeaderProps = {
  mark?: string;
  title: string;
  meta?: string;
  /** Semantic ink for the title: "changed" renders the amber revision ink. */
  tone?: "changed";
};

/**
 * The world's heading grammar: a version-header row. The markdown-style mark
 * sits inline inside the heading itself, with tabular metadata right-aligned
 * on the same baseline, over a hairline rule.
 */
export function EntryHeader({ mark = "##", title, meta, tone }: EntryHeaderProps) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-border pt-5">
      <h2 className="flex items-baseline gap-2 sm:gap-3">
        <span aria-hidden="true" className="diff-mark shrink-0 text-sm sm:text-base">
          {mark}
        </span>
        <span
          className={`font-display text-[1.75rem] leading-none font-semibold tracking-[-0.02em] sm:text-[2.25rem] ${
            tone === "changed" ? "text-changed" : ""
          }`}
        >
          {title}
        </span>
      </h2>
      {meta ? (
        <p className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">{meta}</p>
      ) : null}
    </div>
  );
}
