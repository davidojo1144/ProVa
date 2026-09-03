export default function Loading() {
  return (
    <div
      className="flex flex-1 items-center justify-center gap-1.5 py-24"
      role="status"
      aria-label="Loading"
    >
      {/* Flat geometry rather than a spinner — three blocks, staggered. */}
      <span className="bg-brand-blue size-3 animate-pulse rounded-sm" />
      <span className="bg-brand-amber size-3 animate-pulse rounded-sm [animation-delay:150ms]" />
      <span className="bg-brand-emerald size-3 animate-pulse rounded-sm [animation-delay:300ms]" />
    </div>
  );
}
