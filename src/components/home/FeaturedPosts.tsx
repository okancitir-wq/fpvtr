import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import type { BlogPost } from "@/types/blog";

const categoryLabels: Record<string, string> = {
  rehber: "Rehber",
  haber: "Haber",
  inceleme: "İnceleme",
  ipucu: "İpucu",
};

interface FeaturedPostsProps {
  posts: BlogPost[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null;

  const [main, ...side] = posts;

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        {/* Main featured */}
        <Link
          href={`/blog/${main.slug}`}
          className="group relative col-span-1 flex min-h-[320px] flex-col justify-end overflow-hidden rounded-xl border border-fpv-border transition-all hover:border-fpv-cyan/50 lg:col-span-3"
        >
          {main.coverImage ? (
            <>
              <Image
                src={main.coverImage}
                alt={main.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fpv-dark via-fpv-dark/70 to-transparent" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-fpv-dark via-fpv-card to-fpv-cyan/10" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-fpv-cyan)_0%,_transparent_60%)] opacity-[0.07]" />
            </>
          )}
          <div className="relative p-6">
            <Badge variant={main.category}>
              {categoryLabels[main.category] || main.category}
            </Badge>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-zinc-100 transition-colors group-hover:text-fpv-cyan sm:text-3xl">
              {main.title}
            </h2>
            <p className="mt-3 line-clamp-2 max-w-xl text-sm text-zinc-300">
              {main.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
              <span>{main.author}</span>
              <span>&middot;</span>
              <span>{main.date}</span>
            </div>
          </div>
        </Link>

        {/* Side featured */}
        <div className="col-span-1 flex flex-col gap-5 lg:col-span-2">
          {side.slice(0, 2).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative flex flex-1 flex-col justify-end overflow-hidden rounded-xl border border-fpv-border transition-all hover:border-fpv-cyan/50"
            >
              {post.coverImage ? (
                <>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fpv-dark via-fpv-dark/60 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 bg-fpv-card" />
              )}
              <div className="relative p-5">
                <Badge variant={post.category}>
                  {categoryLabels[post.category] || post.category}
                </Badge>
                <h3 className="mt-2 text-lg font-bold leading-snug text-zinc-100 transition-colors group-hover:text-fpv-cyan">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-zinc-300">
                  {post.excerpt}
                </p>
                <p className="mt-3 text-xs text-zinc-400">
                  {post.author} &middot; {post.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
