"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  distance = 80,
  offset: [string, string] = ["start end", "end start"],
) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ScrollOffset,
  });
  return useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [distance, -distance],
  );
}

export function Reveal({
  children,
  className,
  y = 40,
  scale = 0.97,
  offset = ["start 0.95", "start 0.55"],
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  scale?: number;
  offset?: [string, string];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ScrollOffset,
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.4,
  });
  const opacity = useTransform(
    smoothProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [0, 1],
  );
  const translateY = useTransform(
    smoothProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [y, 0],
  );
  const scaleValue = useTransform(
    smoothProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [scale, 1],
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y: translateY, scale: scaleValue }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
