"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SkillsData } from "@/lib/types/about";
import skillsData from "@/lib/data/skills.json";
import { scaleIn, viewportOnce } from "@/lib/utils/animations";

const data = skillsData as SkillsData;

export function SkillsGrid() {
  return (
    <section className="mb-24">
      <motion.h2
        className="text-3xl font-bold tracking-tight text-foreground mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5 }}
      >
        Technical Skills
      </motion.h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data.categories.map((category, index) => (
          <motion.div
            key={category.name}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <Card className="group hover:border-primary/50 transition-all duration-300 h-full">
              <CardHeader>
                <CardTitle className="text-xl">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant="secondary"
                      className="text-sm px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
