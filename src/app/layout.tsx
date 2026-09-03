import type { ReactNode } from "react";
import { Outfit } from "next/font/google";

import { Providers } from "@/components/common/providers";
import { buildStructuredData, constructMetadata } from "@/lib/seo";
import "@/styles/globals.css";

// Geometric sans that mirrors the shapes of the flat UI.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = constructMetadata();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          // Static, app-authored JSON — no user input reaches this string.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildStructuredData()),
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
