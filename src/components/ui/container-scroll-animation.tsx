"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0.7, 0.9] : [1.05, 1],
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-176 items-center justify-center p-2 sm:h-208 sm:p-6 md:h-240 md:p-12 lg:h-280 lg:p-20"
    >
      <div
        className="relative w-full py-6 sm:py-10 md:py-24 lg:py-40"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          style={{ translateY: translate }}
          className="mx-auto max-w-5xl text-center"
        >
          {titleComponent}
        </motion.div>

        <ScrollCard rotate={rotate} scale={scale}>
          {children}
        </ScrollCard>
      </div>
    </div>
  );
}

function ScrollCard({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      // data-depth opts this subtree out of the app-wide shadow reset: on the
      // marketing route the depth is the point, not a violation.
      data-depth
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="border-border bg-muted mx-auto -mt-12 h-80 w-full max-w-5xl rounded-lg border-4 p-2 sm:h-104 md:h-128 md:p-4 lg:h-152"
    >
      <div className="bg-background size-full overflow-hidden rounded-md">
        {children}
      </div>
    </motion.div>
  );
}
