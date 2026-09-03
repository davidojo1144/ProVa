import { HiringTracker } from "@/features/candidates/components/hiring-tracker";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Hiring board",
  description:
    "Your hiring pipeline: add candidates, move them through stages, rate them and keep interview notes.",
  path: "/hire",
});

export default function HirePage() {
  return <HiringTracker />;
}
