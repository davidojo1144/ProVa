import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-display leading-none font-semibold tracking-tight">
        404
      </h1>
      <p className="text-subtitle font-medium">Page not found</p>
      <p className="text-muted-foreground max-w-md text-sm">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Button nativeButton={false} render={<Link href="/">Back home</Link>} />
    </div>
  );
}
