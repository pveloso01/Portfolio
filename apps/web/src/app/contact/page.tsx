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
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-20">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="container relative mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Let&apos;s Work
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                {" "}
                Together
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Have a project in mind or want to collaborate? I&apos;m always excited to discuss new
              opportunities and innovative ideas.
            </p>
          </motion.div>
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
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-8 text-center">
                <div className="mb-6 inline-flex rounded-full bg-primary/10 p-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h2 className="mb-3 text-2xl font-bold">Ready to Start a Conversation?</h2>
                <p className="mb-8 text-muted-foreground">
                  Click below to compose an email. Whether it&apos;s about a project, collaboration,
                  or just to say hello, I&apos;d love to hear from you!
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
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
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
                <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{method.label}</h3>
                    <p className="mb-2 text-xl font-bold text-foreground">{method.value}</p>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
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
                <h3 className="mb-6 text-center text-xl font-semibold">Connect on Social Media</h3>
                <div className="flex justify-center gap-6">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex flex-col items-center gap-3 rounded-lg p-6 transition-all duration-300 hover:bg-primary/5 ${social.color}`}
                        aria-label={social.name}
                      >
                        <div className="rounded-full bg-card p-4 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                          <Icon className="h-8 w-8" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
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
            I typically respond within 24-48 hours. Looking forward to connecting with you!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
