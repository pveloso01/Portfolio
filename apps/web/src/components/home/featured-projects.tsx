"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@/lib/types/project";
import projectsData from "@/lib/data/projects.json";

const data = projectsData as Project[];

export function FeaturedProjects() {
  const featuredProjects = data
    .filter((project) => project.featured)
    .slice(0, 3);

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Projects
          </h2>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            A selection of my recent work in machine learning, data engineering,
            and web development
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/projects">View All Projects →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
