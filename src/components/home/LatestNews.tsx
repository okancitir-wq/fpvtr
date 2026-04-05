import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { BlogPost } from "@/types/blog";

const categoryLabels: Record<string, string> = {
  rehber: "Rehber",
  haber: "Haber",
  inceleme: "İnceleme",
  ipucu: "İpucu",
};

interface LatestNewsProps {
  posts: BlogPost[];
}

export function LatestNews({ posts }: LatestNewsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="flex-1">
      <div className="mb-3 flex items-center justify-between border-b border-fpv-border pb-2">
        <h2 className="text-sm font-bold text-zinc-100">Son Yazılar</h2>
        <Link
          href="/blog"
          className="text-xs font-medium text-fpv-cyan transition-colors hover:text-fpv-cyan/80"
        >
          Tümünü Gör &rarr;
        </Link>
      </div>

      <div className="divide-y divide-fpv-border">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-center gap-3 py-2.5 transition-colors"
          >
            <Badge variant={post.category}>
              {categoryLabels[post.category] || post.category}
            </Badge>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-zinc-200 transition-colors group-hover:text-fpv-cyan">
              {post.title}
            </span>
            <span className="shrink-0 text-xs text-zinc-600">{post.date}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
