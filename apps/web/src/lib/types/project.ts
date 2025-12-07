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
}
