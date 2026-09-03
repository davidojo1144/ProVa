import type { Metadata } from "next";

const SITE_NAME = "ProVa";
const SITE_DESCRIPTION =
  "Production-ready Next.js App Router boilerplate with TypeScript, Tailwind CSS, Zustand, React Query, Auth.js, and shadcn/ui.";
const SITE_URL = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

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
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
