import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedPosts } from "@/components/home/FeaturedPosts";
import { QuickAccess } from "@/components/home/SectionsOverview";
import { LatestNews } from "@/components/home/LatestNews";
import { getAllPosts, getFeaturedPosts } from "@/lib/blog";

export default async function Home() {
  const featured = await getFeaturedPosts(3);
  const allPosts = await getAllPosts();
  const latest = allPosts
    .filter((p) => !featured.some((f) => f.slug === p.slug))
    .slice(0, 6);

  return (
    <>
      <HeroSection />
      <FeaturedPosts posts={featured} />

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        <QuickAccess />
        <LatestNews posts={latest} />
      </div>
    </>
  );
}
