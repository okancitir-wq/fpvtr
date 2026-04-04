import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { BlogPost } from "@/types/blog";

interface FeaturedPostsProps {
  posts: BlogPost[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-zinc-100">Öne Çıkanlar</h2>
      <p className="mt-2 text-zinc-400">En son ve en popüler yazılarımız.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="group h-full">
              <Badge variant={post.category}>{post.category}</Badge>
              <h3 className="mt-3 text-lg font-semibold text-zinc-100 transition-colors group-hover:text-fpv-cyan">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                {post.excerpt}
              </p>
              <p className="mt-4 text-xs text-zinc-500">{post.date}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
