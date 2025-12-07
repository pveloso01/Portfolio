import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import projectsData from "@/lib/data/projects.json";
import type { Project } from "@/lib/types/project";

const data = projectsData as Project[];

export async function generateStaticParams() {
  return data.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = data.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = data.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-primary inline-flex items-center text-sm transition-colors"
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

      {/* Hero Section */}
      <div className="mb-12 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary" className="text-sm">
            {project.category}
          </Badge>
          {project.status === "in-progress" && (
            <Badge variant="default" className="text-sm">
              <span className="relative mr-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              In Progress
            </Badge>
          )}
          <span className="text-muted-foreground text-sm">
            {project.status === "in-progress" ? "Started " : ""}
            {new Date(project.date).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {project.title}
        </h1>

        <p className="text-foreground/80 max-w-3xl text-xl leading-relaxed">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          {project.github && (
            <Button asChild size="lg">
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
            <Button variant="outline" size="lg" asChild>
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
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>About This Project</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                {project.longDescription || project.description}
              </p>
            </CardContent>
          </Card>

          {/* Key Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Key Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="text-primary mt-0.5 h-5 w-5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-foreground/80">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Challenges & Solutions */}
          {project.challenges && project.challenges.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Challenges & Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span className="text-foreground/80">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Outcome */}
          {project.outcome && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle>Outcome & Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed">{project.outcome}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {project.status && (
                <div>
                  <dt className="text-foreground mb-1 font-semibold">Status</dt>
                  <dd className="text-muted-foreground">
                    {project.status === "in-progress" && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                          <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
                        </span>
                        In Progress
                      </span>
                    )}
                    {project.status === "completed" && "Completed"}
                    {project.status === "on-hold" && "On Hold"}
                  </dd>
                </div>
              )}
              {project.role && (
                <div>
                  <dt className="text-foreground mb-1 font-semibold">Role</dt>
                  <dd className="text-muted-foreground">{project.role}</dd>
                </div>
              )}
              {project.duration && (
                <div>
                  <dt className="text-foreground mb-1 font-semibold">Duration</dt>
                  <dd className="text-muted-foreground">{project.duration}</dd>
                </div>
              )}
              {project.teamSize && (
                <div>
                  <dt className="text-foreground mb-1 font-semibold">Team Size</dt>
                  <dd className="text-muted-foreground">{project.teamSize}</dd>
                </div>
              )}
              <div>
                <dt className="text-foreground mb-1 font-semibold">
                  {project.status === "in-progress" ? "Started" : "Timeline"}
                </dt>
                <dd className="text-muted-foreground">
                  {new Date(project.date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                  {project.endDate &&
                    ` - ${new Date(project.endDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}`}
                </dd>
              </div>
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Links */}
          {(project.github || project.demo) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    View Source Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Live Demo
                  </a>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
