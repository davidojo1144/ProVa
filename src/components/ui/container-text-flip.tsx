"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  const word = words[currentWordIndex];

  return (
    <motion.span
      // `layout` animates the width to fit each word, so nothing has to be
      // measured by hand — no ref, no width state, no effect writing state.
      layout={!reduceMotion}
      transition={{ duration: animationDuration / 2000, ease: "easeInOut" }}
      className={cn(
        // Flat block: solid fill, no gradient, no shadow, no inset ring.
        "bg-brand-amber text-brand-ink inline-block rounded-md px-3 py-1 text-center font-extrabold tracking-tight",
        className,
      )}
    >
      <span className={cn("inline-block whitespace-nowrap", textClassName)}>
        {word.split("").map((letter, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block"
            initial={reduceMotion ? false : { opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{
              delay: reduceMotion ? 0 : index * 0.025,
              duration: animationDuration / 2000,
            }}
          >
            {letter === " " ? " " : letter}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}
