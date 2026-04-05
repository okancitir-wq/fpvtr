import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { isAuthenticated } from "@/app/admin/actions";
import { AdminToolbar } from "@/components/blog/AdminToolbar";
import { Badge } from "@/components/ui/Badge";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `/blog/${slug}`,
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const categoryLabels: Record<string, string> = {
    rehber: "Rehber",
    haber: "Haber",
    inceleme: "İnceleme",
    ipucu: "İpucu",
  };

  const admin = await isAuthenticated();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "FPV Türkiye",
      logo: { "@type": "ImageObject", url: "https://www.fpvtr.com/logo.png" },
    },
    mainEntityOfPage: `https://www.fpvtr.com/blog/${post.slug}`,
    ...(post.coverImage ? { image: post.coverImage } : {}),
    keywords: post.tags.join(", "),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://www.fpvtr.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.fpvtr.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {admin && <AdminToolbar slug={post.slug} />}

      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
        <Link href="/" className="hover:text-fpv-cyan transition-colors">
          Ana Sayfa
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-fpv-cyan transition-colors">
          Blog
        </Link>
        <span>/</span>
        <span className="text-zinc-300">{post.title}</span>
      </nav>

      {/* Header */}
      <header>
        <Badge variant={post.category}>
          {categoryLabels[post.category] || post.category}
        </Badge>
        <h1 className="mt-4 text-3xl font-bold text-zinc-100 sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-zinc-400">
          <span>{post.author}</span>
          <span>&middot;</span>
          <time>{post.date}</time>
        </div>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Cover image */}
      {post.coverImage && (
        <div className="relative mt-8 aspect-video overflow-hidden rounded-xl border border-fpv-border">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <article
        className="prose prose-invert prose-zinc mt-10 max-w-none prose-headings:text-zinc-100 prose-a:text-fpv-cyan prose-strong:text-zinc-200 prose-code:text-fpv-cyan"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 border-t border-fpv-border pt-10">
          <h2 className="text-2xl font-bold text-zinc-100">
            Benzer Yazılar
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="card-glow p-4 transition-colors hover:text-fpv-cyan"
              >
                <h3 className="text-sm font-semibold text-zinc-200">
                  {rp.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-500">{rp.date}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
