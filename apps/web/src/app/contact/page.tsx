import { ContactInfo } from "@/components/contact/contact-info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";

export { metadata } from "./metadata";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? I&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-1">
          <ContactInfo />
        </div>

        {/* Email CTA */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Send Me an Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Click the button below to compose an email in your default email client. Feel free
                to reach out about projects, collaborations, or just to say hello!
              </p>

              <a
                href="mailto:pedrovelosofernandes@outlook.com?subject=Contact from Portfolio"
                className="block"
              >
                <Button size="lg" className="w-full md:w-auto">
                  <Send className="w-4 h-4 mr-2" />
                  Email Me
                </Button>
              </a>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:pedrovelosofernandes@outlook.com"
                    className="text-primary hover:underline"
                  >
                    pedrovelosofernandes@outlook.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
