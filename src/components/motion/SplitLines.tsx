"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useIntroReady } from "./intro";

type SplitLinesProps = {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount (after the intro) instead of when scrolled into view. */
  immediate?: boolean;
  as?: "h1" | "h2" | "p" | "div";
};

/** Masked line-by-line headline reveal. */
export function SplitLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  immediate = false,
  as = "h2",
}: SplitLinesProps) {
  const ready = useIntroReady();
  const Tag = motion[as];
  const trigger = immediate
    ? { animate: ready ? "show" : "hidden" }
    : { whileInView: "show", viewport: { once: true, amount: 0.3 } };

  return (
    <Tag
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className="-my-[0.14em] block overflow-hidden py-[0.14em]">
          <motion.span
            className={`block will-change-transform ${lineClassName ?? ""}`}
            variants={{
              hidden: { y: "110%", rotate: 2 },
              show: { y: "0%", rotate: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
