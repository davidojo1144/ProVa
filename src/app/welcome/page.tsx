import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { GridBackground } from "@/components/ui/grid-background";
import { LampContainer } from "@/components/ui/lamp";
import { BoardPreview } from "@/features/marketing/components/board-preview";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Welcome",
  description:
    "A hiring pipeline you can see at a glance — stages, ratings, notes and search, with nothing to set up.",
  path: "/welcome",
});

const FEATURES = [
  {
    word: "track",
    title: "One board, every stage",
    body: "Drag a candidate from applied to offer and the whole team sees the same pipeline.",
  },
  {
    word: "rate",
    title: "Evaluate as you go",
    body: "Star ratings and timestamped notes live on the candidate, not in someone's inbox.",
  },
  {
    word: "find",
    title: "Search that narrows",
    body: "Filter by stage, rating or any term across names, roles, tags and locations.",
  },
];

export default function WelcomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Lamp header — an always-dark section that opens the page. */}
      <LampContainer>
        <p className="label-caps text-brand-blue">ProVA</p>
        <h1 className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-3xl leading-none font-extrabold tracking-tight text-white md:text-5xl">
          Hiring, made
          <ContainerTextFlip
            words={["visible", "faster", "fairer", "simple"]}
            className="text-3xl md:text-5xl"
          />
        </h1>
        <p className="mt-5 max-w-md text-sm text-white/60">
          A candidate tracker that keeps every applicant, note and decision in
          one place. No setup, no account.
        </p>
        <Button
          nativeButton={false}
          size="lg"
          className="mt-7"
          render={
            <Link href="/">
              Open the tracker
              <ArrowRight />
            </Link>
          }
        />
      </LampContainer>

      {/* Scroll-driven reveal of the product itself. */}
      <ContainerScroll
        titleComponent={
          <div className="mb-4">
            <p className="label-caps text-muted-foreground">The board</p>
            <h2 className="text-title mt-2 font-extrabold tracking-tight">
              Every candidate, in the open
            </h2>
          </div>
        }
      >
        <BoardPreview />
      </ContainerScroll>

      {/* Feature grid on a flat grid pattern. */}
      <GridBackground className="py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="label-caps text-muted-foreground">What it does</p>
            <h2 className="text-title mt-2 font-extrabold tracking-tight">
              Built for the parts of hiring that get lost
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.word}
                className="border-border bg-background relative flex flex-col items-start border-2 p-4"
              >
                <Icon className="text-foreground absolute -top-3 -left-3 size-6" />
                <Icon className="text-foreground absolute -bottom-3 -left-3 size-6" />
                <Icon className="text-foreground absolute -top-3 -right-3 size-6" />
                <Icon className="text-foreground absolute -right-3 -bottom-3 size-6" />

                <EvervaultCard text={feature.word} />

                <h3 className="mt-4 font-bold tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </GridBackground>

      {/* Closing colour block. */}
      <section className="bg-brand-amber text-brand-ink relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-16 size-64 rounded-full bg-black/5" />
          <div className="absolute -right-10 -bottom-24 size-72 rotate-12 rounded-lg bg-white/20" />
        </div>
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-5 px-4 py-20 sm:px-6">
          <h2 className="text-title max-w-lg font-extrabold tracking-tight">
            Start tracking in the next ten seconds
          </h2>
          <p className="max-w-md text-sm opacity-80">
            Load the sample pipeline to look around, or add your first candidate
            straight away.
          </p>
          <Button
            nativeButton={false}
            size="lg"
            className="bg-brand-ink text-background hover:bg-brand-ink hover:brightness-125"
            render={
              <Link href="/">
                Open the tracker
                <ArrowRight />
              </Link>
            }
          />
        </div>
      </section>
    </main>
  );
}
