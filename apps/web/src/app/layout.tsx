import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { generatePageMetadata } from "@/components/seo/page-metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = generatePageMetadata();

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pedro Veloso",
  url: "https://pveloso01.github.io/portfolio",
  image: "https://pveloso01.github.io/portfolio/og-image.jpg",
  jobTitle: "Software Engineering Student",
  description:
    "Master's student in Software Engineering at University of Porto, specializing in machine learning and data engineering",
  email: "pedrovelosofernandes@outlook.com",
  telephone: "+351918886111",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Porto",
    addressCountry: "Portugal",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "University of Porto",
    sameAs: "https://www.up.pt/",
  },
  sameAs: ["https://github.com/pveloso01", "https://www.linkedin.com/in/pedro-veloso-fernandes"],
  knowsAbout: [
    "Python",
    "Machine Learning",
    "Data Engineering",
    "Django",
    "FastAPI",
    "React",
    "MLOps",
    "LightGBM",
    "PostgreSQL",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a
          href="#main-content"
          className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
