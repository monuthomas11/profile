import { getAllPosts } from "@/lib/blog";
import { site } from "@/content/site";

export async function GET() {
  const posts = await getAllPosts();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const items = posts
    .map(
      (post) => `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <guid>${baseUrl}/blog/${post.slug}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <description><![CDATA[${post.description}]]></description>
        </item>`,
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${site.name} Writing</title>
        <link>${baseUrl}/blog</link>
        <description>Writing from ${site.name}.</description>
        ${items}
      </channel>
    </rss>`;

  return new Response(rss, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
