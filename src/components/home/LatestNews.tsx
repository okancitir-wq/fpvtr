import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { BlogPost } from "@/types/blog";

interface LatestNewsProps {
  posts: BlogPost[];
}

export function LatestNews({ posts }: LatestNewsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-zinc-100">Son Yazılar</h2>
        <Link
          href="/blog"
          className="text-sm font-medium text-fpv-cyan hover:text-fpv-cyan/80 transition-colors"
        >
          Tüm Yazılar &rarr;
        </Link>
      </div>

      <div className="mt-8 divide-y divide-fpv-border">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex items-center justify-between gap-4 py-4 transition-colors hover:bg-fpv-card/50 -mx-3 px-3 rounded-lg"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Badge variant={post.category}>{post.category}</Badge>
              <span className="truncate text-sm font-medium text-zinc-200">
                {post.title}
              </span>
            </div>
            <span className="shrink-0 text-xs text-zinc-500">{post.date}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
