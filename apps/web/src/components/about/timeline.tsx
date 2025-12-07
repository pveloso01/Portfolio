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
      <h2 className="text-3xl font-bold tracking-tight text-foreground mb-12 text-center">
        Experience & Education
      </h2>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Work Experience */}
        <div>
          <h3 className="text-xl font-semibold text-primary mb-8 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Work Experience
          </h3>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[8.75rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/50 before:to-transparent">
            {workExperience.map((exp) => (
              <div key={exp.id} className="relative group">
                <div className="md:flex items-center md:space-x-4 mb-1">
                  <div className="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted border-2 border-primary shadow-lg group-hover:scale-110 transition-transform">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>
                    <time className="font-medium text-sm text-primary md:w-28">
                      {formatDate(exp.startDate, false)} - {formatDate(exp.endDate, exp.current)}
                    </time>
                  </div>
                  <div className="text-foreground/40 hidden md:block">•</div>
                  <div className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {exp.title}
                  </div>
                </div>
                <div className="ml-14 md:ml-44">
                  <div className="text-sm text-muted-foreground mb-1">
                    {exp.company} • {exp.location}
                  </div>
                  <div className="text-sm text-foreground/80">{exp.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-xl font-semibold text-secondary mb-8 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[8.75rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-secondary/50 before:to-transparent">
            {education.map((exp) => (
              <div key={exp.id} className="relative group">
                <div className="md:flex items-center md:space-x-4 mb-1">
                  <div className="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted border-2 border-secondary shadow-lg group-hover:scale-110 transition-transform">
                      <div className="w-3 h-3 rounded-full bg-secondary" />
                    </div>
                    <time className="font-medium text-sm text-secondary md:w-28">
                      {formatDate(exp.startDate, false)} - {formatDate(exp.endDate, exp.current)}
                    </time>
                  </div>
                  <div className="text-foreground/40 hidden md:block">•</div>
                  <div className="font-bold text-foreground group-hover:text-secondary transition-colors">
                    {exp.title}
                  </div>
                </div>
                <div className="ml-14 md:ml-44">
                  <div className="text-sm text-muted-foreground mb-1">
                    {exp.company} • {exp.location}
                  </div>
                  <div className="text-sm text-foreground/80">{exp.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
