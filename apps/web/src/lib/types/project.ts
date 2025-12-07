export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
  github: string | null;
  demo: string | null;
  date: string;

  // Optional enhanced fields for detailed project pages
  longDescription?: string;
  images?: string[];
  highlights?: string[];
  challenges?: string[];
  outcome?: string;
  role?: string;
  duration?: string;
  teamSize?: string;
}
