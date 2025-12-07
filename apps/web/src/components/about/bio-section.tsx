import { Card, CardContent } from "@/components/ui/card";

export function BioSection() {
  return (
    <section className="mb-24">
      <Card>
        <CardContent className="prose prose-invert max-w-none pt-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Hello! I&apos;m a Python/AI Developer
          </h2>
          <p className="text-foreground/80 leading-relaxed">
            I&apos;m a passionate software developer specializing in Python back-end development and
            artificial intelligence. With over 5 years of experience building scalable web
            applications and AI-powered systems, I focus on creating robust, efficient, and
            maintainable solutions.
          </p>
          <p className="text-foreground/80 leading-relaxed mt-4">
            My expertise spans across modern web frameworks like Django and FastAPI, as well as
            machine learning frameworks such as TensorFlow and PyTorch. I&apos;m particularly
            interested in the intersection of software engineering and AI, where I can leverage both
            to build intelligent systems that solve real-world problems.
          </p>
          <p className="text-foreground/80 leading-relaxed mt-4">
            Currently pursuing my MSc in Computer Science with a focus on Federated Learning,
            I&apos;m constantly expanding my knowledge and staying current with the latest
            developments in technology. When I&apos;m not coding, you can find me contributing to
            open-source projects, writing technical blog posts, or exploring new AI research papers.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
