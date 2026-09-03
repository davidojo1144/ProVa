"use client";

import { SearchX, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Shared shell: a muted colour block with flat geometry, never an outlined card. */
function EmptyBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted relative flex flex-col items-center gap-4 overflow-hidden rounded-lg px-6 py-20 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-brand-blue/5 absolute -top-20 -left-16 size-64 rounded-full" />
        <div className="bg-brand-amber/10 absolute -right-10 -bottom-24 size-52 rotate-12 rounded-lg" />
      </div>
      <div className="relative flex flex-col items-center gap-4">
        {children}
      </div>
    </div>
  );
}

export function NoCandidates({
  onAdd,
  onSeed,
}: {
  onAdd: () => void;
  onSeed: () => void;
}) {
  return (
    <EmptyBlock>
      <span className="bg-brand-blue flex size-16 items-center justify-center rounded-full text-white">
        <Users className="size-7" strokeWidth={2.5} />
      </span>
      <div className="flex flex-col gap-2">
        <h2 className="text-subtitle font-extrabold tracking-tight">
          No candidates yet
        </h2>
        <p className="text-muted-foreground max-w-sm text-sm">
          Add your first applicant, or load a sample pipeline to see how the
          tracker works.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button onClick={onAdd}>Add candidate</Button>
        <Button variant="outline" onClick={onSeed}>
          Load sample data
        </Button>
      </div>
    </EmptyBlock>
  );
}

export function NoResults({ onClear }: { onClear: () => void }) {
  return (
    <EmptyBlock>
      <span className="bg-brand-ink text-background flex size-16 items-center justify-center rounded-full">
        <SearchX className="size-7" strokeWidth={2.5} />
      </span>
      <div className="flex flex-col gap-2">
        <h2 className="text-subtitle font-extrabold tracking-tight">
          No matches
        </h2>
        <p className="text-muted-foreground max-w-sm text-sm">
          No candidates match the current search and filters.
        </p>
      </div>
      <Button variant="outline" onClick={onClear}>
        Clear filters
      </Button>
    </EmptyBlock>
  );
}
