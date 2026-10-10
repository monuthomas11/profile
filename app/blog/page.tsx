import Link from "next/link";

import { getAllPosts } from "@/lib/blog";
import { Tag } from "@/components/ui/Tag";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.25em] text-accent uppercase">Writing</p>
          <h1 className="mt-6 text-5xl font-black tracking-[-0.04em] text-foreground text-balance">Notes on systems, product, and craft.</h1>
        </div>

        {posts.length === 0 ? (
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            No posts yet — new writing will appear here once it is published.
          </p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-[2rem] border border-border bg-background p-6 shadow-sm">
                <p className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
                <h2 className="mt-4 text-3xl font-bold text-foreground text-balance">{post.title}</h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{post.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{post.readingTime} min read</span>
                  <Link href={`/blog/${post.slug}`} className="font-medium text-accent underline-offset-4 transition hover:underline">Read article →</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
