import { getAllSlugs, getPostBySlug } from "@/lib/posts";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Note: params is a Promise in Next 16
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // <-- unwrap it
  const { meta, html } = await getPostBySlug(slug);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold mb-2">{meta.title}</h1>
      <div className="text-sm opacity-70 mb-6">{meta.date}</div>
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
