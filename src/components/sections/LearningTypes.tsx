"use client";

import { BookOpen, Ear, Eye, Footprints, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/rich";

type Copy = Dictionary["types"];
type Key = "visual" | "auditory" | "readwrite" | "kinesthetic" | "mixed";

const CIRCLES: { key: Exclude<Key, "mixed">; cx: number; cy: number; fill: string; icon: LucideIcon; pos: string }[] = [
  { key: "visual", cx: 222, cy: 222, fill: "#e6d9cf", icon: Eye, pos: "left-[27%] top-[27%]" },
  { key: "auditory", cx: 378, cy: 222, fill: "#ece4d6", icon: Ear, pos: "left-[73%] top-[27%]" },
  { key: "kinesthetic", cx: 222, cy: 378, fill: "#e2dfda", icon: Footprints, pos: "left-[27%] top-[73%]" },
  { key: "readwrite", cx: 378, cy: 378, fill: "#eed6cc", icon: BookOpen, pos: "left-[73%] top-[73%]" },
];

export function LearningTypes({ copy }: { copy: Copy }) {
  const [active, setActive] = useState<Key | null>(null);
  const byKey = Object.fromEntries(copy.items.map((i) => [i.key, i])) as Record<Key, Copy["items"][number]>;

  return (
    <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-6">
        <div className="lg:sticky lg:top-28">
          <div className="relative mx-auto aspect-square w-full max-w-[36rem]" onMouseLeave={() => setActive(null)}>
            <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <path id="mixed-ring" d="M300,300 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" />
              </defs>
              {CIRCLES.map((c, i) => {
                const on = active === c.key || active === "mixed";
                return (
                  <motion.circle
                    key={c.key}
                    cx={c.cx}
                    cy={c.cy}
                    r={148}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
                    style={{ transformOrigin: `${c.cx}px ${c.cy}px`, mixBlendMode: "multiply" }}
                    fill={on ? "#d9b3b0" : c.fill}
                    fillOpacity={0.85}
                    stroke={on ? "var(--color-wine)" : "rgba(28,23,20,0.12)"}
                    strokeWidth={on ? 2 : 1}
                    className="cursor-pointer transition-[fill,stroke] duration-500"
                    onMouseEnter={() => setActive(c.key)}
                  />
                );
              })}
              <g className="animate-spin-slow" style={{ transformOrigin: "300px 300px" }}>
                <text className="fill-wine font-mono text-[12.5px] uppercase tracking-[0.2em]">
                  <textPath href="#mixed-ring" textLength="385" lengthAdjust="spacing">
                    {`${copy.mixed} ✦ ${copy.mixed} ✦ `}
                  </textPath>
                </text>
              </g>
              <motion.rect
                x={283}
                y={283}
                width={34}
                height={34}
                fill="var(--color-wine)"
                style={{ transformOrigin: "300px 300px" }}
                initial={{ rotate: 45, scale: 0 }}
                whileInView={{ rotate: 45, scale: active === "mixed" ? 1.35 : 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.5 }}
                className="cursor-pointer"
                onMouseEnter={() => setActive("mixed")}
              />
            </svg>

            {CIRCLES.map((c) => {
              const Icon = c.icon;
              const on = active === c.key || active === "mixed";
              return (
                <button
                  key={c.key}
                  type="button"
                  onMouseEnter={() => setActive(c.key)}
                  onFocus={() => setActive(c.key)}
                  onClick={() => setActive(c.key)}
                  aria-pressed={active === c.key}
                  className={cn(
                    "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 transition-colors duration-500",
                    c.pos,
                    on ? "text-wine" : "text-ink",
                  )}
                >
                  <Icon className="h-8 w-8 sm:h-11 sm:w-11" strokeWidth={1.2} aria-hidden />
                  <span className="max-w-[9rem] text-center font-serif text-lg leading-tight sm:text-2xl">{byKey[c.key].short}</span>
                </button>
              );
            })}
          </div>
          <p className="eyebrow mt-6 text-center text-ink-3">{copy.hint}</p>
        </div>
      </div>

      <ol className="space-y-3 lg:col-span-6">
        {copy.items.map((item, i) => {
          const on = active === item.key;
          return (
            <motion.li
              key={item.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              onMouseEnter={() => setActive(item.key as Key)}
              onMouseLeave={() => setActive(null)}
              className={cn(
                "rounded-3xl border p-6 transition-all duration-500 lg:p-8",
                on ? "border-wine bg-paper-2" : "border-ink/10",
              )}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className={cn("font-serif text-[clamp(1.8rem,2.6vw,2.5rem)] leading-none tracking-tight transition-colors", on && "text-wine")}>
                  {item.name}
                </h3>
                <span className="eyebrow text-ink-3">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="text-body mt-5 text-ink-2">{item.text}</p>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
