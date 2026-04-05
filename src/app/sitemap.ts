import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const blogUrls = posts.map((post) => ({
    url: `https://www.fpvtr.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: "https://www.fpvtr.com", priority: 1.0, changeFrequency: "daily" },
    { url: "https://www.fpvtr.com/blog", priority: 0.9, changeFrequency: "daily" },
    { url: "https://www.fpvtr.com/karsilastirma", priority: 0.8, changeFrequency: "weekly" },
    { url: "https://www.fpvtr.com/hesaplayici", priority: 0.8, changeFrequency: "monthly" },
    { url: "https://www.fpvtr.com/hesaplayici/frekans", priority: 0.7, changeFrequency: "monthly" },
    { url: "https://www.fpvtr.com/hesaplayici/pid", priority: 0.7, changeFrequency: "monthly" },
    { url: "https://www.fpvtr.com/hesaplayici/motor", priority: 0.7, changeFrequency: "monthly" },
    { url: "https://www.fpvtr.com/karsilastirma/drone", priority: 0.7, changeFrequency: "weekly" },
    { url: "https://www.fpvtr.com/karsilastirma/motor", priority: 0.7, changeFrequency: "weekly" },
    { url: "https://www.fpvtr.com/karsilastirma/esc", priority: 0.7, changeFrequency: "weekly" },
    { url: "https://www.fpvtr.com/karsilastirma/kamera", priority: 0.7, changeFrequency: "weekly" },
    { url: "https://www.fpvtr.com/karsilastirma/vtx", priority: 0.7, changeFrequency: "weekly" },
  ];

  return [...staticPages, ...blogUrls];
}
