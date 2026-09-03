import { SiteHeader } from "@/components/common/site-header";
import { CounterDemo } from "@/features/counter/components/counter-demo";
import { PostsDemo } from "@/features/posts/components/posts-demo";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            ProVa boilerplate
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Next.js App Router, TypeScript, Tailwind CSS, Zustand, TanStack
            Query, Auth.js, React Hook Form + Zod, and shadcn/ui — wired up and
            ready to build on.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CounterDemo />
          <PostsDemo />
        </div>
      </main>
    </div>
  );
}
