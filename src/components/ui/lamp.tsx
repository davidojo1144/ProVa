"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/** Always-dark surface — the glow only reads against near-black. */
const LAMP_SURFACE = "#080c14";

/**
 * Conic "lamp" section header. The gradients are written inline with a brand
 * token rather than Tailwind gradient-stop utilities, which changed shape in
 * Tailwind v4 and no longer feed `--tw-gradient-stops` reliably.
 *
 * The decorative glow lives in its own `absolute inset-0` layer, fully
 * decoupled from the content below it. The original port had the glow and
 * the text as flex siblings with the text shifted up by a fixed 16rem
 * `translate` — a fixed offset built for a full `min-h-screen` demo. Ported
 * into a much shorter, fixed-height section, that offset reserved real
 * layout space for the text at its untranslated position and then never
 * gave it back, leaving a dead gap at the bottom that got proportionally
 * worse the shorter the viewport — exactly what broke this on mobile.
 * Isolating the glow removes the coupling that caused it, and the content
 * now just centers in the container's actual height at every breakpoint.
 */
export function LampContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reveal = {
    initial: { opacity: 0.5, width: "15rem" },
    whileInView: { opacity: 1, width: "30rem" },
    transition: { delay: 0.3, duration: 0.8, ease: "easeInOut" as const },
    viewport: { once: true },
  };

  return (
    <div
      className={cn(
        "relative isolate flex min-h-104 w-full flex-col overflow-hidden sm:min-h-128 lg:min-h-152",
        className,
      )}
      style={{ backgroundColor: LAMP_SURFACE }}
    >
      {/* Glow layer: absolutely sized to the container, so nothing inside it
          can ever feed back into how tall the container itself is. */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 flex scale-y-125 items-center justify-center"
      >
        <motion.div
          {...reveal}
          style={{
            backgroundImage:
              "conic-gradient(from 70deg at center top, var(--brand-blue), transparent, transparent)",
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible text-white"
        >
          <div
            className="absolute bottom-0 left-0 z-20 h-40 w-full [mask-image:linear-gradient(to_top,white,transparent)]"
            style={{ backgroundColor: LAMP_SURFACE }}
          />
          <div
            className="absolute bottom-0 left-0 z-20 h-full w-40 [mask-image:linear-gradient(to_right,white,transparent)]"
            style={{ backgroundColor: LAMP_SURFACE }}
          />
        </motion.div>

        <motion.div
          {...reveal}
          style={{
            backgroundImage:
              "conic-gradient(from 290deg at center top, transparent, transparent, var(--brand-blue))",
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] text-white"
        >
          <div
            className="absolute right-0 bottom-0 z-20 h-full w-40 [mask-image:linear-gradient(to_left,white,transparent)]"
            style={{ backgroundColor: LAMP_SURFACE }}
          />
          <div
            className="absolute right-0 bottom-0 z-20 h-40 w-full [mask-image:linear-gradient(to_top,white,transparent)]"
            style={{ backgroundColor: LAMP_SURFACE }}
          />
        </motion.div>

        <div
          className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl"
          style={{ backgroundColor: LAMP_SURFACE }}
        />
        <div className="bg-brand-blue absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl" />

        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="bg-brand-blue absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
        />
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="bg-brand-blue absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]"
        />

        <div
          className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]"
          style={{ backgroundColor: LAMP_SURFACE }}
        />
      </div>

      {/* Content: centers in the section's real height, no manual offset
          hack — just a small upward nudge so it sits under the beam. */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-10 text-center sm:-mt-8 lg:-mt-14">
        {children}
      </div>
    </div>
  );
}
