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
  date: string; // Start date
  endDate?: string; // Optional end date - if not provided, project is in progress

  // Optional enhanced fields for detailed project pages
  longDescription?: string;
  images?: string[];
  highlights?: string[];
  challenges?: string[];
  outcome?: string;
  role?: string;
  duration?: string;
  teamSize?: string;
  status?: "completed" | "in-progress" | "on-hold";
}
