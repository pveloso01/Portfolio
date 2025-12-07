import type { Metadata } from "next";

interface PageMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

const defaultMetadata = {
  title: "Pedro Veloso | Software Engineering Student & ML Engineer",
  description:
    "Master's student in Software Engineering at University of Porto, specializing in machine learning, data engineering, and full-stack development.",
  image: "/og-image.jpg",
  url: "https://pveloso01.github.io/portfolio",
  type: "website" as const,
};

export function generatePageMetadata({
  title,
  description,
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
}: PageMetadataProps = {}): Metadata {
  const pageTitle = title ? `${title} | Pedro Veloso` : defaultMetadata.title;
  const pageDescription = description || defaultMetadata.description;
  const pageImage = image || defaultMetadata.image;
  const pageUrl = url || defaultMetadata.url;

  return {
    title: pageTitle,
    description: pageDescription,
    authors: [{ name: "Pedro Veloso", url: pageUrl }],
    creator: "Pedro Veloso",
    publisher: "Pedro Veloso",
    keywords: [
      "Pedro Veloso",
      "Software Engineering",
      "Machine Learning",
      "Data Engineering",
      "Full Stack Developer",
      "Python",
      "Django",
      "FastAPI",
      "React",
      "Portfolio",
      "University of Porto",
      ...(tags || []),
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type,
      locale: "en_US",
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: "Pedro Veloso Portfolio",
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: "@pveloso",
    },
    alternates: {
      canonical: pageUrl,
    },
    other: {
      "msapplication-TileColor": "#9333ea",
      "theme-color": "#000000",
    },
  };
}
