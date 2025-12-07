import { HeroSection } from "@/components/home/hero-section";
import { QuickStats } from "@/components/home/quick-stats";
import { FeaturedProjects } from "@/components/home/featured-projects";

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickStats />
      <FeaturedProjects />
    </>
  );
}
