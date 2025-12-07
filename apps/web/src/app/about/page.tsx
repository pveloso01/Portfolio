import { BioSection } from "@/components/about/bio-section";
import { SkillsGrid } from "@/components/about/skills-grid";
import { Timeline } from "@/components/about/timeline";

export { metadata } from "./metadata";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-6xl">
          About Me
        </h1>
        <p className="text-muted-foreground mt-6 text-lg leading-8">
          Passionate about building intelligent systems and solving complex
          problems with code
        </p>
      </div>

      <BioSection />
      <SkillsGrid />
      <Timeline />
    </div>
  );
}
