import type { Metadata } from "next";

export const SITE_NAME = "ProVA Hiring Tracker";
export const SITE_DESCRIPTION =
  "Track candidates through every hiring stage — applications, interviews, tests, offers — with notes, ratings and instant search.";
/**
 * `??` only falls back on null/undefined — an env var set to an empty string
 * (as some hosts do for an unfilled value) sailed straight through and broke
 * `new URL()` at build time. `VERCEL_URL` is set automatically by Vercel
 * (server-side only, no NEXT_PUBLIC_ prefix, no protocol) and is the honest
 * default for a deploy that hasn't set a custom domain yet.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit;

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl().replace(/\/$/, "");

export function constructMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

/**
 * JSON-LD for the app itself. It is a hiring tool rather than a storefront or
 * a physical premises, so WebApplication is the honest type here.
 */
export function buildStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any modern browser",
    browserRequirements: "Requires JavaScript and local storage",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Add and edit candidates",
      "Move candidates through hiring stages",
      "Rate candidates and keep interview notes",
      "Search and filter the pipeline",
    ],
  };
}
