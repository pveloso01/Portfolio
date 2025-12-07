import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";

export { metadata } from "./metadata";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? I&apos;d love to hear from you. Send me a
          message and I&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-1">
          <ContactInfo />
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
