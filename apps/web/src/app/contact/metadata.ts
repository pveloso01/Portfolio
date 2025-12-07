import type { Metadata } from "next";
import { generatePageMetadata } from "@/components/seo/page-metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact",
  description:
    "Get in touch with Pedro Veloso. Open to discussing new projects, opportunities, and collaborations.",
  url: "https://pveloso01.github.io/portfolio/contact",
  tags: ["Contact", "Collaboration", "Opportunities", "Hire"],
});
