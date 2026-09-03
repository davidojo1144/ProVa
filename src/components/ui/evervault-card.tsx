"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { MotionValue } from "motion/react";

import { cn } from "@/lib/utils";

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateRandomString(length: number) {
  let result = "";
  for (let i = 0; i < length; i += 1) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }
  return result;
}

/** Regenerating 1,500 characters on every pointer event is wasted work. */
const SCRAMBLE_INTERVAL_MS = 90;
const SCRAMBLE_LENGTH = 1500;

export function EvervaultCard({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Starts empty so the server and client agree; it fills on first hover.
  const [randomString, setRandomString] = useState("");
  const lastScramble = useRef(0);

  const onMouseMove = ({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const now = Date.now();
    if (now - lastScramble.current < SCRAMBLE_INTERVAL_MS) return;
    lastScramble.current = now;
    setRandomString(generateRandomString(SCRAMBLE_LENGTH));
  };

  return (
    <div
      className={cn(
        "relative flex aspect-square h-full w-full items-center justify-center bg-transparent p-0.5",
        className,
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-transparent"
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
        />
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative flex size-40 items-center justify-center rounded-full text-4xl font-extrabold">
            <div className="bg-background/80 absolute size-full rounded-full" />
            <span className="text-foreground z-20 tracking-tight">{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardPattern({
  mouseX,
  mouseY,
  randomString,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  randomString: string;
}) {
  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-lg [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50" />
      <motion.div
        className="from-brand-emerald to-brand-blue absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 transition duration-500 group-hover/card:opacity-100"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 mix-blend-overlay group-hover/card:opacity-100"
        style={style}
      >
        <p className="absolute inset-x-0 h-full font-mono text-xs font-bold break-words whitespace-pre-wrap text-white transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

export function Icon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
}
