import Link from "next/link";

import { ThemeToggle } from "@/components/common/theme-toggle";

export function SiteHeader() {
  return (
    <header className="border-border border-b">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-6">
        <Link href="/" className="font-heading text-sm font-semibold">
          ProVa
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Dashboard
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
