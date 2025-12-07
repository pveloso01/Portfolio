"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Send, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "pedrovelosofernandes@outlook.com",
    href: "mailto:pedrovelosofernandes@outlook.com",
    description: "Send me an email anytime",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Porto, Portugal",
    href: null,
    description: "Available for remote work",
  },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/pveloso01",
    icon: Github,
    color: "hover:text-purple-400",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/pedro-veloso-fernandes",
    icon: Linkedin,
    color: "hover:text-blue-400",
  },
];

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

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient */}
      <div className="from-primary/10 via-background to-background relative overflow-hidden bg-gradient-to-br py-20">
        <div className="bg-grid-white/5 absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="relative container mx-auto max-w-4xl px-4 text-center">
          <div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Let&apos;s Work
              <span className="from-primary bg-gradient-to-r to-purple-400 bg-clip-text text-transparent">
                {" "}
                Together
              </span>
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
              Have a project in mind or want to collaborate? I&apos;m always
              excited to discuss new opportunities and innovative ideas.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 lg:grid-cols-2"
        >
          {/* Primary CTA - Email */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="border-primary/20 from-primary/5 bg-gradient-to-br to-transparent">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 mb-6 inline-flex rounded-full p-4">
                  <Mail className="text-primary h-8 w-8" />
                </div>
                <h2 className="mb-3 text-2xl font-bold">
                  Ready to Start a Conversation?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Click below to compose an email. Whether it&apos;s about a
                  project, collaboration, or just to say hello, I&apos;d love to
                  hear from you!
                </p>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Button size="lg" className="w-full sm:w-auto" asChild>
                    <a href="mailto:pedrovelosofernandes@outlook.com?subject=Contact%20from%20Portfolio">
                      <Send className="mr-2 h-5 w-5" />
                      Send Email
                    </a>
                  </Button>
                  <a
                    href="mailto:pedrovelosofernandes@outlook.com"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    pedrovelosofernandes@outlook.com
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Methods */}
          {contactMethods.map((method) => {
            const Icon = method.icon;
            const content = (
              <motion.div variants={itemVariants}>
                <Card className="hover:border-primary/50 hover:shadow-primary/5 h-full transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="bg-primary/10 mb-4 inline-flex rounded-lg p-3">
                      <Icon className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">
                      {method.label}
                    </h3>
                    <p className="text-foreground mb-2 text-xl font-bold">
                      {method.value}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {method.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );

            return method.href ? (
              <a key={method.label} href={method.href}>
                {content}
              </a>
            ) : (
              <div key={method.label}>{content}</div>
            );
          })}

          {/* Social Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h3 className="mb-6 text-center text-xl font-semibold">
                  Connect on Social Media
                </h3>
                <div className="flex justify-center gap-6">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group hover:bg-primary/5 flex flex-col items-center gap-3 rounded-lg p-6 transition-all duration-300 ${social.color}`}
                        aria-label={social.name}
                      >
                        <div className="bg-card rounded-full p-4 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                          <Icon className="h-8 w-8" />
                        </div>
                        <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium">
                          {social.name}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">
            I typically respond within 24-48 hours. Looking forward to
            connecting with you!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
