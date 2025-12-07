"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SkillsData } from "@/lib/types/about";
import skillsData from "@/lib/data/skills.json";

const data = skillsData as SkillsData;

export function SkillsGrid() {
  return (
    <section className="mb-24">
      <h2 className="text-3xl font-bold tracking-tight text-foreground mb-12 text-center">
        Technical Skills
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data.categories.map((category, index) => (
          <Card
            key={category.name}
            className="group hover:border-primary/50 transition-all duration-300 animate-slide-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <CardTitle className="text-xl">{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground/80">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          animation: "slideInWidth 1s ease-out",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideInWidth {
          from {
            width: 0%;
          }
        }
      `}</style>
    </section>
  );
}
