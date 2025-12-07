import type { Experience } from "@/lib/types/about";
import experienceData from "@/lib/data/experience.json";

const data = experienceData as Experience[];

function formatDate(dateString: string | null, current: boolean): string {
  if (!dateString) return current ? "Present" : "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function Timeline() {
  // Separate work and education
  const workExperience = data.filter((exp) => exp.type === "work");
  const education = data.filter((exp) => exp.type === "education");

  return (
    <section className="mb-24">
      <h2 className="text-foreground mb-12 text-center text-3xl font-bold tracking-tight">
        Experience & Education
      </h2>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Work Experience */}
        <div>
          <h3 className="text-primary mb-8 flex items-center gap-2 text-xl font-semibold">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Work Experience
          </h3>
          <div className="space-y-8">
            {workExperience.map((exp) => (
              <div
                key={exp.id}
                className="border-primary/30 group hover:border-primary/60 relative border-l-2 pb-8 pl-8 transition-colors"
              >
                <div className="bg-background border-primary absolute top-0 -left-3 flex h-6 w-6 items-center justify-center rounded-full border-2 shadow-lg transition-transform group-hover:scale-125">
                  <div className="bg-primary h-2 w-2 rounded-full" />
                </div>

                <div className="mb-3">
                  <div className="mb-1 flex items-center gap-2">
                    <h4 className="text-foreground group-hover:text-primary font-bold transition-colors">
                      {exp.title}
                    </h4>
                  </div>
                  <div className="text-muted-foreground mb-1 text-sm">
                    {exp.company} • {exp.location}
                  </div>
                  <time className="text-primary text-xs font-medium">
                    {formatDate(exp.startDate, false)} - {formatDate(exp.endDate, exp.current)}
                  </time>
                </div>

                <div className="text-foreground/80 text-sm leading-relaxed">{exp.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-secondary mb-8 flex items-center gap-2 text-xl font-semibold">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
            Education
          </h3>
          <div className="space-y-8">
            {education.map((exp) => (
              <div
                key={exp.id}
                className="border-secondary/30 group hover:border-secondary/60 relative border-l-2 pb-8 pl-8 transition-colors"
              >
                <div className="bg-background border-secondary absolute top-0 -left-3 flex h-6 w-6 items-center justify-center rounded-full border-2 shadow-lg transition-transform group-hover:scale-125">
                  <div className="bg-secondary h-2 w-2 rounded-full" />
                </div>

                <div className="mb-3">
                  <div className="mb-1 flex items-center gap-2">
                    <h4 className="text-foreground group-hover:text-secondary font-bold transition-colors">
                      {exp.title}
                    </h4>
                  </div>
                  <div className="text-muted-foreground mb-1 text-sm">
                    {exp.company} • {exp.location}
                  </div>
                  <time className="text-secondary text-xs font-medium">
                    {formatDate(exp.startDate, false)} - {formatDate(exp.endDate, exp.current)}
                  </time>
                </div>

                <div className="text-foreground/80 text-sm leading-relaxed">{exp.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
