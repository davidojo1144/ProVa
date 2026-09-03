const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 60 * 60 * 1000],
  ["month", 30 * 24 * 60 * 60 * 1000],
  ["week", 7 * 24 * 60 * 60 * 1000],
  ["day", 24 * 60 * 60 * 1000],
  ["hour", 60 * 60 * 1000],
  ["minute", 60 * 1000],
];

const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

/** "3 days ago" style stamp. Rendered client-side only, so it stays fresh. */
export function formatRelativeTime(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  const absolute = Math.abs(diff);

  for (const [unit, ms] of UNITS) {
    if (absolute >= ms) {
      return relative.format(Math.round(diff / ms), unit);
    }
  }

  return "just now";
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
