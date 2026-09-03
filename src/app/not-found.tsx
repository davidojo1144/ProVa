import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="bg-brand-blue relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24 text-center text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 size-96 rounded-full bg-white/10" />
        <div className="absolute -right-20 -bottom-40 size-80 rotate-12 rounded-lg bg-black/10" />
        <div className="absolute top-1/3 right-1/4 size-24 rotate-45 rounded-lg bg-white/10" />
      </div>

      <div className="relative flex flex-col items-center gap-5">
        <h1 className="text-display leading-none font-extrabold tracking-tighter">
          404
        </h1>
        <p className="text-subtitle font-bold">Page not found</p>
        <p className="max-w-sm text-sm text-white/80">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Button
          nativeButton={false}
          className="bg-background text-brand-blue-strong hover:bg-background mt-2 hover:brightness-95"
          render={<Link href="/">Back to the tracker</Link>}
        />
      </div>
    </main>
  );
}
