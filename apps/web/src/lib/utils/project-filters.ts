import type { Project } from "@/lib/types/project";

export function filterProjects(
  projects: Project[],
  category: string,
  searchQuery: string
): Project[] {
  let filtered = projects;

  if (category !== "all") {
    filtered = filtered.filter((project) => project.category === category);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  return filtered;
}

export function getUniqueCategories(projects: Project[]): string[] {
  const categories = projects.map((p) => p.category);
  return Array.from(new Set(categories)).sort();
}
