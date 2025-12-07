import type { Metadata } from "next";
import { generatePageMetadata } from "@/components/seo/page-metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "About Me",
  description:
    "Learn more about Pedro Veloso - Master's student in Software Engineering at University of Porto, specializing in ML, data engineering, and full-stack development.",
  url: "https://pveloso01.github.io/Portfolio/about",
  tags: [
    "About",
    "Software Engineering",
    "University of Porto",
    "Skills",
    "Experience",
    "Education",
  ],
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
