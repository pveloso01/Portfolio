"use client";

import { useState, useMemo, useEffect } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilter } from "@/components/projects/project-filter";
import projectsData from "@/lib/data/projects.json";
import type { Project } from "@/lib/types/project";
import {
  filterProjects,
  getUniqueCategories,
} from "@/lib/utils/project-filters";
import { motion } from "framer-motion";

const data = projectsData as Project[];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Ensure component is mounted to prevent hydration issues
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // Mark as animated after mount to prevent re-animations
    const timer = setTimeout(() => setHasAnimated(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Use useMemo to ensure filtering is consistent and prevent unnecessary re-computations
  const categories = useMemo(() => getUniqueCategories(data), []);
  const filteredProjects = useMemo(
    () => filterProjects(data, selectedCategory, searchQuery),
    [selectedCategory, searchQuery]
  );

  // Show loading state until mounted
  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-6xl">
            Projects
          </h1>
          <p className="text-muted-foreground mt-6 text-lg leading-8">
            Explore my portfolio of Python, AI/ML, and web development projects
          </p>
        </div>
        <div className="py-12 text-center">
          <p className="text-muted-foreground text-lg">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-16 max-w-2xl text-center"
      >
        <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-6xl">
          Projects
        </h1>
        <p className="text-muted-foreground mt-6 text-lg leading-8">
          Explore my portfolio of Python, AI/ML, and web development projects
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ProjectFilter
          categories={categories}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearchQuery}
        />
      </motion.div>

      {filteredProjects.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial={hasAnimated ? false : "hidden"}
          animate={hasAnimated ? false : "visible"}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={hasAnimated ? {} : itemVariants}
              layout
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground text-lg">
            No projects found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
