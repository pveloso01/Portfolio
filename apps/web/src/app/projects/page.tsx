"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilter } from "@/components/projects/project-filter";
import projectsData from "@/lib/data/projects.json";
import type { Project } from "@/lib/types/project";
import { filterProjects, getUniqueCategories } from "@/lib/utils/project-filters";

const data = projectsData as Project[];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Use useMemo to ensure filtering is consistent and prevent unnecessary re-computations
  const categories = useMemo(() => getUniqueCategories(data), []);
  const filteredProjects = useMemo(
    () => filterProjects(data, selectedCategory, searchQuery),
    [selectedCategory, searchQuery],
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">Projects</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Explore my portfolio of Python, AI/ML, and web development projects
        </p>
      </div>

      <ProjectFilter
        categories={categories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchQuery}
      />

      {filteredProjects.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
