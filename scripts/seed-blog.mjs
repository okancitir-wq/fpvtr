import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Redis } from "@upstash/redis";
import { config } from "dotenv";

config({ path: ".env.local" });

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL.trim(),
  token: process.env.UPSTASH_REDIS_REST_TOKEN.trim(),
});

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const SLUGS_KEY = "blog:slugs";

const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

console.log(`Found ${files.length} blog posts to migrate...`);

for (const file of files) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
  const { data, content } = matter(raw);

  const slug = data.slug || file.replace(/\.md$/, "");

  const post = {
    slug,
    title: data.title || "",
    date: data.date || "",
    author: data.author || "FPV Türkiye",
    excerpt: data.excerpt || "",
    category: data.category || "haber",
    tags: data.tags || [],
    featured: data.featured || false,
    coverImage: data.coverImage || "",
    content: content.trim(),
  };

  const score = new Date(post.date).getTime();

  await redis.set(`blog:post:${slug}`, post);
  await redis.zadd(SLUGS_KEY, { score, member: slug });

  console.log(`  ✓ ${post.title} (${slug})`);
}

console.log("\nMigration complete!");
