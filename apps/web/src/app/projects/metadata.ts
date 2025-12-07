import type { Metadata } from "next";
import { generatePageMetadata } from "@/components/seo/page-metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Projects",
  description:
    "Explore Pedro Veloso's portfolio of projects including machine learning, data engineering, and full-stack web development work.",
  url: "https://pveloso01.github.io/Portfolio/projects",
  tags: [
    "Projects",
    "Portfolio",
    "Machine Learning",
    "Data Engineering",
    "Web Development",
    "Python",
    "Django",
  ],
});
