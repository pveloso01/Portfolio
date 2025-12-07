import { Card, CardContent } from "@/components/ui/card";

export function BioSection() {
  return (
    <section className="mb-24">
      <Card>
        <CardContent className="prose prose-invert max-w-none pt-6">
          <h2 className="text-foreground mb-4 text-2xl font-bold">Hello! I&apos;m Pedro Veloso</h2>
          <p className="text-foreground/80 leading-relaxed">
            I&apos;m a Master&apos;s student in Software Engineering at the University of Porto with
            a passion for machine learning, data engineering, and building scalable applications. I
            value continuous learning, adaptability, and maintaining a strong work ethic while
            working effectively within teams.
          </p>
          <p className="text-foreground/80 mt-4 leading-relaxed">
            Currently working on my thesis at FEUP & Shortcut Lda. on the WATT Platform, I&apos;m
            developing predictive models for energy market analysis using LightGBM, Prophet, and
            SARIMAX. My work involves building production data pipelines, implementing MLOps
            practices with Docker, MLflow, and DVC, and creating contract-decision engines for
            market optimization.
          </p>
          <p className="text-foreground/80 mt-4 leading-relaxed">
            My technical expertise spans Python, Django, FastAPI, React, Angular, and PostgreSQL.
            I&apos;m particularly interested in the intersection of software engineering and machine
            learning, where I can apply both to solve complex real-world problems. When I&apos;m not
            coding, you&apos;ll find me playing tennis or training calisthenics.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
