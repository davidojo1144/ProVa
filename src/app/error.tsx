"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="bg-muted border-l-brand-rose flex w-full max-w-lg flex-col items-center gap-4 rounded-lg border-l-8 p-8 text-center">
        <span className="bg-brand-rose flex size-14 items-center justify-center rounded-full text-white">
          <TriangleAlert className="size-6" strokeWidth={2.5} />
        </span>
        <h1 className="text-subtitle font-extrabold tracking-tight">
          Something went wrong
        </h1>
        <p className="text-muted-foreground max-w-md text-sm">
          {error.message || "An unexpected error occurred."}
        </p>
        <Button onClick={reset} className="mt-1">
          Try again
        </Button>
      </div>
    </div>
  );
}
