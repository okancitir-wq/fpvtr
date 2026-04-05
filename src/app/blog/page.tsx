import Link from "next/link";
import { getAllPosts, getCategories } from "@/lib/blog";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "FPV drone haberleri, incelemeler, rehberler ve ipuçları. Türkiye FPV topluluğunun blog sayfası.",
};

interface BlogPageProps {
  searchParams: Promise<{ kategori?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const allPosts = await getAllPosts();
  const categories = await getCategories();
  const activeCategory = params.kategori;

  const posts = activeCategory
    ? allPosts.filter((p) => p.category === activeCategory)
    : allPosts;

  const categoryLabels: Record<string, string> = {
    rehber: "Rehber",
    haber: "Haber",
    inceleme: "İnceleme",
    ipucu: "İpucu",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-zinc-100">Blog</h1>
      <p className="mt-2 text-zinc-400">
        FPV dünyasından haberler, incelemeler ve rehberler.
      </p>

      {/* Category filter */}
      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            !activeCategory
              ? "bg-fpv-cyan/10 text-fpv-cyan"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          }`}
        >
          Tümü
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/blog?kategori=${cat}`}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-fpv-cyan/10 text-fpv-cyan"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
            }`}
          >
            {categoryLabels[cat] || cat}
          </Link>
        ))}
      </div>

      {/* Post grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="group h-full">
              <Badge variant={post.category}>
                {categoryLabels[post.category] || post.category}
              </Badge>
              <h2 className="mt-3 text-lg font-semibold text-zinc-100 transition-colors group-hover:text-fpv-cyan">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-zinc-400">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                <span>{post.author}</span>
                <span>&middot;</span>
                <span>{post.date}</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="mt-12 text-center text-zinc-500">
          Bu kategoride henüz yazı bulunmuyor.
        </p>
      )}
    </div>
  );
}
