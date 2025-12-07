"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroContent from "@/lib/data/hero-content.json";
import { fadeIn, slideUp, staggerContainer } from "@/lib/utils/animations";

export function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const currentRole = heroContent.roles[currentRoleIndex];
    if (!currentRole) return;

    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayedText === currentRole) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % heroContent.roles.length);
      } else {
        setDisplayedText(
          isDeleting
            ? currentRole.substring(0, displayedText.length - 1)
            : currentRole.substring(0, displayedText.length + 1),
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-bg opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),rgba(0,0,0,0))]" />

      <motion.div
        className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.p className="text-base font-semibold leading-7 text-primary" variants={fadeIn}>
            {heroContent.greeting}
          </motion.p>
          <motion.h1
            className="mt-4 text-5xl font-bold tracking-tight text-foreground sm:text-7xl"
            variants={slideUp}
          >
            <span className="text-gradient">{heroContent.name}</span>
          </motion.h1>
          <motion.div className="mt-6 h-12 sm:h-16" variants={slideUp}>
            <h2 className="text-2xl font-semibold text-muted-foreground sm:text-3xl">
              {displayedText}
              <motion.span
                className="inline-block w-0.5 h-8 bg-primary ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
            </h2>
          </motion.div>
          <motion.p className="mt-6 text-lg leading-8 text-foreground/80" variants={slideUp}>
            {heroContent.description}
          </motion.p>
          <motion.div className="mt-10 flex items-center justify-center gap-x-6" variants={slideUp}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" asChild>
                <Link href={heroContent.cta.primary.href}>{heroContent.cta.primary.text}</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" asChild>
                <Link href={heroContent.cta.secondary.href}>{heroContent.cta.secondary.text}</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div className="mt-16 flex justify-center" variants={fadeIn}>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-muted-foreground">Scroll to explore</p>
              <motion.svg
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </motion.svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
