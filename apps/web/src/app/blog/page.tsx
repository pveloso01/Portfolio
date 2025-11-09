import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";

export const dynamic = "force-static";

export default async function BlogIndex() {
  const posts = await getAllPostsMeta();
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.slug} className="border rounded-xl p-4">
            <Link href={`/blog/${p.slug}`} className="text-xl font-semibold underline">
              {p.title}
            </Link>
            <div className="text-sm opacity-70">{p.date}</div>
            {p.summary && <p className="mt-2">{p.summary}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
