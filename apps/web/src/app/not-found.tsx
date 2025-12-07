import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-primary text-9xl font-bold">404</h1>
        <h2 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Page not found
        </h2>
        <p className="text-foreground/70 mt-6 text-lg">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" asChild>
            <Link href="/">Go back home</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact me</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
