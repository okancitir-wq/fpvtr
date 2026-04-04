import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import type { BlogPost, BlogPostWithContent } from "@/types/blog";

const contentDir = path.join(process.cwd(), "content", "blog");

function ensureDir() {
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
}

export function getAllPosts(): BlogPost[] {
  ensureDir();
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug: data.slug || file.replace(/\.md$/, ""),
      title: data.title || "",
      date: data.date || "",
      author: data.author || "FPV Türkiye",
      excerpt: data.excerpt || "",
      category: data.category || "haber",
      tags: data.tags || [],
      featured: data.featured || false,
      coverImage: data.coverImage || "",
    } as BlogPost;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPostWithContent | null> {
  ensureDir();
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { data, content } = matter(raw);
    const postSlug = data.slug || file.replace(/\.md$/, "");

    if (postSlug === slug) {
      const result = await remark().use(gfm).use(html).process(content);

      return {
        slug: postSlug,
        title: data.title || "",
        date: data.date || "",
        author: data.author || "FPV Türkiye",
        excerpt: data.excerpt || "",
        category: data.category || "haber",
        tags: data.tags || [],
        featured: data.featured || false,
        coverImage: data.coverImage || "",
        contentHtml: result.toString(),
      };
    }
  }

  return null;
}

export function getFeaturedPosts(count: number = 3): BlogPost[] {
  const all = getAllPosts();
  const featured = all.filter((p) => p.featured);
  return (featured.length >= count ? featured : all).slice(0, count);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getCategories(): string[] {
  const posts = getAllPosts();
  return [...new Set(posts.map((p) => p.category))];
}
