import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const md = new MarkdownIt({ html: false, linkify: true, breaks: true });

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  summary?: string;
  tags?: string[];
};

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  const files = await fs.readdir(POSTS_DIR);
  const metas: PostMeta[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const slug = file.replace(/\.md$/, "");
    const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
    const { data } = matter(raw);
    metas.push({
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      summary: data.summary ?? "",
      tags: data.tags ?? [],
    });
  }
  // mais recente primeiro
  metas.sort((a, b) => (a.date < b.date ? 1 : -1));
  return metas;
}

export async function getPostBySlug(slug: string): Promise<{ meta: PostMeta; html: string }> {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  const raw = await fs.readFile(file, "utf8");
  const { data, content } = matter(raw);
  const html = md.render(content);
  return {
    meta: {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      summary: data.summary ?? "",
      tags: data.tags ?? [],
    },
    html,
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const files = await fs.readdir(POSTS_DIR);
  return files.filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}
