import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Tag } from "@/components/ui/Tag";

const components = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} className="text-accent underline-offset-4 hover:underline" />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props} className="my-6 leading-8 text-foreground/80" />,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 {...props} className="mt-8 text-4xl font-black tracking-tight" />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 {...props} className="mt-10 text-3xl font-bold tracking-tight" />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 {...props} className="mt-8 text-2xl font-bold" />,
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => <blockquote {...props} className="my-8 border-l border-border pl-5 text-lg italic leading-8 text-muted-foreground" />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code {...props} className="rounded-md bg-muted px-1.5 py-0.5 text-sm" />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul {...props} className="my-6 list-disc space-y-2 pl-6 text-lg text-foreground/80" />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol {...props} className="my-6 list-decimal space-y-2 pl-6 text-lg text-foreground/80" />,
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function ArticleFallback() {
  return (
    <article
      aria-label="Loading article"
      className="animate-pulse rounded-[2rem] border border-border bg-background p-6 shadow-sm sm:p-8"
    >
      <div className="h-4 w-32 rounded bg-muted" />
      <div className="mt-5 h-12 max-w-2xl rounded bg-muted" />
      <div className="mt-3 h-5 max-w-xl rounded bg-muted" />
      <div className="mt-10 space-y-4">
        <div className="h-4 rounded bg-muted" />
        <div className="h-4 rounded bg-muted" />
        <div className="h-4 max-w-4xl rounded bg-muted" />
        <div className="h-4 rounded bg-muted" />
        <div className="h-4 max-w-3xl rounded bg-muted" />
      </div>
    </article>
  );
}

async function BlogPostContent({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="rounded-[2rem] border border-border bg-background p-6 shadow-sm sm:p-8">
      <p className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
      </p>
      <h1 className="mt-4 text-5xl font-black tracking-[-0.04em] text-foreground text-balance">{post.title}</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="mt-8 text-base text-muted-foreground">{post.readingTime} min read</div>

      <div className="prose dark:prose-invert pt-8 text-lg">
        <MDXRemote source={post.source} components={components} />
      </div>
    </article>
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="px-4 pt-10 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Writing
          </p>
          <Link href="/blog" className="text-sm font-medium text-accent underline-offset-4 transition hover:underline">
            ← Back to writing
          </Link>
        </div>
        <Suspense fallback={<ArticleFallback />}>
          <BlogPostContent params={params} />
        </Suspense>
      </div>
    </div>
  );
}
