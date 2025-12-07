"use client";

import { BioSection } from "@/components/about/bio-section";
import { SkillsGrid } from "@/components/about/skills-grid";
import { Timeline } from "@/components/about/timeline";
import { motion } from "framer-motion";

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

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-16 max-w-2xl text-center"
      >
        <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-6xl">
          About Me
        </h1>
        <p className="text-muted-foreground mt-6 text-lg leading-8">
          Passionate about building intelligent systems and solving complex
          problems with code
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <BioSection />
        </motion.div>
        <motion.div variants={itemVariants}>
          <SkillsGrid />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Timeline />
        </motion.div>
      </motion.div>
    </div>
  );
}
