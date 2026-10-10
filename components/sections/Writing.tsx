import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getAllPosts } from "@/lib/blog";

import { Reveal } from "@/components/motion/Reveal";
import { EntryHeader } from "@/components/ui/EntryHeader";

export async function Writing() {
  const posts = (await getAllPosts()).slice(0, 3);

  if (!posts.length) return null;

  return (
    <section id="writing" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal from="up">
          <EntryHeader title="Writing" meta={`latest ${posts.length}`} />
          <ul className="mt-6">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-1 py-5 transition-colors hover:bg-muted/60 sm:grid-cols-[7.5rem_1fr] sm:gap-4"
                >
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {post.date.slice(0, 10)}
                  </span>
                  <span>
                    <span className="flex items-baseline gap-2">
                      <span aria-hidden="true" className="diff-mark diff-mark--added shrink-0 text-sm">
                        +
                      </span>
                      <span className="font-display text-lg font-semibold tracking-[-0.01em] transition-colors group-hover:text-accent">
                        {post.title}
                      </span>
                    </span>
                    <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 pl-6 font-mono text-[11px] text-muted-foreground">
                      <span>{post.readingTime} min</span>
                      {post.tags.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-accent uppercase underline-offset-4 transition hover:underline"
            >
              All writing
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
