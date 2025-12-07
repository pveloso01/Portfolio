import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import projectsData from "@/lib/data/projects.json";
import type { Project } from "@/lib/types/project";

const data = projectsData as Project[];

export async function generateStaticParams() {
  return data.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = data.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Projects
        </Link>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">{project.category}</Badge>
            <span className="text-sm text-muted-foreground">
              {new Date(project.date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-foreground/80 leading-relaxed">{project.description}</p>
        </div>

        <div className="flex gap-4">
          {project.github && (
            <Button asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                View on GitHub
              </a>
            </Button>
          )}
          {project.demo && (
            <Button variant="outline" asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Live Demo
              </a>
            </Button>
          )}
        </div>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">About This Project</h2>
            <p className="text-foreground/80 leading-relaxed">
              This project demonstrates my skills in {project.category.toLowerCase()} development,
              utilizing modern technologies and best practices. The implementation showcases
              expertise in {project.tags.slice(0, 3).join(", ")}, among other technologies.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">Key Features</h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Scalable architecture designed for production environments</li>
              <li>Comprehensive testing and quality assurance</li>
              <li>Clean, maintainable code following industry standards</li>
              <li>Optimized performance and user experience</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
