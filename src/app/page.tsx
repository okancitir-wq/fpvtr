import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedPosts } from "@/components/home/FeaturedPosts";
import { SectionsOverview } from "@/components/home/SectionsOverview";
import { LatestNews } from "@/components/home/LatestNews";
import { getAllPosts, getFeaturedPosts } from "@/lib/blog";

export default function Home() {
  const featured = getFeaturedPosts(3);
  const latest = getAllPosts().slice(0, 5);

  return (
    <>
      <HeroSection />
      <FeaturedPosts posts={featured} />
      <SectionsOverview />
      <LatestNews posts={latest} />
    </>
  );
}
