import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { getRedis } from "./redis";
import type { BlogPost, BlogPostWithContent } from "@/types/blog";

interface StoredPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  category: string;
  tags: string[];
  featured: boolean;
  coverImage: string;
  content: string; // raw markdown
}

const SLUGS_KEY = "blog:slugs";
function postKey(slug: string) {
  return `blog:post:${slug}`;
}

function toDate(d: string): number {
  return new Date(d).getTime();
}

function toBlogPost(stored: StoredPost): BlogPost {
  return {
    slug: stored.slug,
    title: stored.title,
    date: stored.date,
    author: stored.author || "FPV Türkiye",
    excerpt: stored.excerpt,
    category: stored.category as BlogPost["category"],
    tags: stored.tags || [],
    featured: stored.featured || false,
    coverImage: stored.coverImage || "",
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const redis = getRedis();

  // Get all slugs ordered by date descending (highest score first)
  const slugs = await redis.zrange<string[]>(SLUGS_KEY, 0, -1, { rev: true });
  if (!slugs || slugs.length === 0) return [];

  const pipeline = redis.pipeline();
  for (const slug of slugs) {
    pipeline.get(postKey(slug));
  }
  const results = await pipeline.exec<(StoredPost | null)[]>();

  return results.filter(Boolean).map((p) => toBlogPost(p!));
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPostWithContent | null> {
  const redis = getRedis();
  const stored = await redis.get<StoredPost>(postKey(slug));
  if (!stored) return null;

  const result = await remark().use(gfm).use(html).process(stored.content);

  return {
    ...toBlogPost(stored),
    contentHtml: result.toString(),
  };
}

export async function getFeaturedPosts(count: number = 3): Promise<BlogPost[]> {
  const all = await getAllPosts();
  const featured = all.filter((p) => p.featured);
  return (featured.length >= count ? featured : all).slice(0, count);
}

export async function getPostsByCategory(
  category: string
): Promise<BlogPost[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.category === category);
}

export async function getCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  return [...new Set(posts.map((p) => p.category))];
}

// --- Write operations (used by admin actions) ---

export async function savePost(post: StoredPost): Promise<void> {
  const redis = getRedis();
  await Promise.all([
    redis.set(postKey(post.slug), post),
    redis.zadd(SLUGS_KEY, { score: toDate(post.date), member: post.slug }),
  ]);
}

export async function removePost(slug: string): Promise<boolean> {
  const redis = getRedis();
  const existed = await redis.del(postKey(slug));
  await redis.zrem(SLUGS_KEY, slug);
  return existed > 0;
}

export async function getPostRawData(slug: string): Promise<StoredPost | null> {
  const redis = getRedis();
  return redis.get<StoredPost>(postKey(slug));
}

export async function postExists(slug: string): Promise<boolean> {
  const redis = getRedis();
  const val = await redis.exists(postKey(slug));
  return val > 0;
}
