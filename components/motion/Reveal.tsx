"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Entrance direction — varied per section so the page has one authored
   *  gesture (the diff-mark flash) and only a family of settles, never one
   *  identical entrance repeated. */
  from?: "left" | "up" | "deep";
};

const FROM_VARIANTS = {
  left: { initial: { opacity: 0, x: -6 }, animate: { opacity: 1, x: 0 } },
  up: { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } },
  deep: { initial: { opacity: 0, y: 14, x: -4 }, animate: { opacity: 1, y: 0, x: 0 } },
} as const;

/**
 * The page's motion gesture: an entry "applies" like a patch landing —
 * a short settle, then its diff marks take one tint flash.
 * Fully visible by default under prefers-reduced-motion.
 */
export function Reveal({ children, className = "", delay = 0, from = "left" }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const variants = FROM_VARIANTS[from];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      initial={variants.initial}
      whileInView={variants.animate}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: from === "deep" ? 0.65 : 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      onViewportEnter={() => setInView(true)}
    >
      {children}
    </motion.div>
  );
}
