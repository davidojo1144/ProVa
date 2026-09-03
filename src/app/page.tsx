import { ThemeToggle } from "@/components/common/theme-toggle";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Ready to build</h1>
      <p className="text-muted-foreground max-w-md">
        Auth, forms, state, and data-fetching are wired up. Start adding routes
        under <code className="font-mono text-sm">src/app</code> and features
        under <code className="font-mono text-sm">src/features</code>.
      </p>
      <ThemeToggle />
    </main>
  );
}
