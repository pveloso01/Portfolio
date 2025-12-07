import { ContactInfo } from "@/components/contact/contact-info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";

export { metadata } from "./metadata";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Get In Touch</h1>
        <p className="text-foreground/70 mx-auto max-w-2xl text-xl">
          Have a project in mind or want to collaborate? I&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Contact Info */}
        <div className="lg:col-span-1">
          <ContactInfo />
        </div>

        {/* Email CTA */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Send Me an Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Click the button below to compose an email in your default email client. Feel free
                to reach out about projects, collaborations, or just to say hello!
              </p>

              <Button size="lg" className="w-full md:w-auto" asChild>
                <a href="mailto:pedrovelosofernandes@outlook.com?subject=Contact%20from%20Portfolio">
                  <Send className="mr-2 h-4 w-4" />
                  Email Me
                </a>
              </Button>

              <div className="border-border border-t pt-4">
                <p className="text-muted-foreground text-sm">
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
