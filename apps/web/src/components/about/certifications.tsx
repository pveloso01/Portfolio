import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const certifications = [
  {
    id: "1",
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    badge: "AWS",
  },
  {
    id: "2",
    name: "TensorFlow Developer Certificate",
    issuer: "TensorFlow",
    date: "2022",
    badge: "TensorFlow",
  },
  {
    id: "3",
    name: "Professional Scrum Master I",
    issuer: "Scrum.org",
    date: "2021",
    badge: "Scrum",
  },
];

export function Certifications() {
  return (
    <section>
      <h2 className="text-3xl font-bold tracking-tight text-foreground mb-12 text-center">
        Certifications & Achievements
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {certifications.map((cert, index) => (
          <Card
            key={cert.id}
            className="group hover:border-success/50 hover:shadow-lg hover:shadow-success/10 transition-all duration-300 animate-slide-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge
                  variant="secondary"
                  className="bg-success/20 text-success hover:bg-success/30"
                >
                  {cert.badge}
                </Badge>
                <span className="text-xs text-muted-foreground">{cert.date}</span>
              </div>
              <CardTitle className="text-lg group-hover:text-success transition-colors">
                {cert.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
