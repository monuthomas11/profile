import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft?: boolean;
  cover?: string;
  readingTime: number;
  source: string;
};

const blogDirectory = path.join(process.cwd(), "content", "blog");

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const files = fs.readdirSync(blogDirectory).filter((file) => file.endsWith(".mdx"));

  const posts = (await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(blogDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const draft = Boolean(data.draft);

      if (draft && process.env.NODE_ENV === "production") {
        return null;
      }

      return {
        slug: file.replace(/\.mdx$/, ""),
        title: String(data.title ?? "Untitled post"),
        description: String(data.description ?? ""),
        date: String(data.date ?? new Date().toISOString()),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        draft,
        cover: data.cover ? String(data.cover) : undefined,
        readingTime: getReadingTime(content),
        source: content,
      } as BlogPost;
    }),
  )) as Array<BlogPost | null>;

  return posts
    .filter((post) => post !== null)
    .map((post) => post as BlogPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
