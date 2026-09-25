"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/rich";

type Segment = { text: string; accent: boolean };
type Word = Segment[];

/** Splits on whitespace while keeping `*accent*` runs, so "*word*." stays one word. */
function tokenize(text: string): Word[] {
  const words: Word[] = [];
  let accent = false;
  let word: Word = [];
  let buffer = "";
  const flush = () => {
    if (buffer) word.push({ text: buffer, accent });
    buffer = "";
  };
  for (const ch of text) {
    if (ch === "*") {
      flush();
      accent = !accent;
    } else if (/\s/.test(ch)) {
      flush();
      if (word.length) words.push(word);
      word = [];
    } else {
      buffer += ch;
    }
  }
  flush();
  if (word.length) words.push(word);
  return words;
}

function ScrollWord({ word, index, total, progress }: { word: Word; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total;
  const opacity = useTransform(progress, [start, Math.min(1, start + 1.5 / total)], [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word.map((seg, i) => (
        <span key={i} className={cn(seg.accent && "accent")}>
          {seg.text}
        </span>
      ))}
      {" "}
    </motion.span>
  );
}

/** Large statement text whose words ink in as the reader scrolls past. */
export function ScrollText({ text, className, as = "p" }: { text: string; className?: string; as?: "p" | "h2" }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = tokenize(text);
  const Tag = as;

  return (
    <Tag ref={ref} className={cn("flex flex-wrap", className)} aria-label={text.replace(/\*/g, "")}>
      {words.map((word, i) => (
        <ScrollWord key={i} word={word} index={i} total={words.length} progress={scrollYProgress} />
      ))}
    </Tag>
  );
}
