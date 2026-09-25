"use client";

import { Handshake, Languages, Lightbulb, PenTool, Printer, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/rich";

type FlowCopy = Dictionary["flow"];

const ICONS: LucideIcon[] = [Handshake, Languages, PenTool, Printer];

// Geometry in a 600×600 viewBox. The ring radius leaves room for labels outside it.
const C = 300;
const R = 170;
const OFFSET = `${((R / 600) * 100).toFixed(2)}%`;

// Clockwise from the top. Labels always sit outside the ring so they never cross it.
const NODES = [
  { left: "50%", top: `calc(50% - ${OFFSET})`, label: "bottom-full mb-3 left-1/2 -translate-x-1/2 w-56 text-center" },
  { left: `calc(50% + ${OFFSET})`, top: "50%", label: "left-full ml-3 top-1/2 -translate-y-1/2 w-28 text-left lg:w-32" },
  { left: "50%", top: `calc(50% + ${OFFSET})`, label: "top-full mt-3 left-1/2 -translate-x-1/2 w-56 text-center" },
  { left: `calc(50% - ${OFFSET})`, top: "50%", label: "right-full mr-3 top-1/2 -translate-y-1/2 w-28 text-right lg:w-32" },
];

const polar = (deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return [C + R * Math.cos(rad), C + R * Math.sin(rad)] as const;
};
// Arc from one node to the next, leaving a gap around each node.
const arc = (fromDeg: number) => {
  const [x1, y1] = polar(fromDeg + 19);
  const [x2, y2] = polar(fromDeg + 71);
  return `M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function FlowDiagram({ copy, compact = false }: { copy: FlowCopy; compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const shown = useInView(ref, { amount: 0.3, once: true });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [drawn, setDrawn] = useState(0);

  useEffect(() => {
    if (!inView || paused) return;
    const t = window.setInterval(() => setActive((i) => (i + 1) % 4), 2600);
    return () => window.clearInterval(t);
  }, [inView, paused]);

  useEffect(() => {
    if (!inView) return;
    const t = window.setInterval(() => setLoopIndex((i) => (i + 1) % copy.loop.items.length), 1800);
    return () => window.clearInterval(t);
  }, [inView, copy.loop.items.length]);

  const select = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  return (
    <div>
      <div
        ref={ref}
        className={cn("relative mx-auto aspect-square w-full", compact ? "max-w-[38rem]" : "max-w-[46rem]")}
        onMouseLeave={() => setPaused(false)}
      >
        <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <defs>
            <marker id="flow-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--color-wine)" />
            </marker>
          </defs>

          <circle cx={C} cy={C} r={R} fill="none" stroke="var(--color-ink)" strokeOpacity="0.08" strokeWidth="1" />

          {/* inner loop */}
          <circle cx={C} cy={C} r="92" fill="var(--color-paper-2)" />
          <g className="animate-spin-slow" style={{ transformOrigin: "300px 300px" }}>
            <circle cx={C} cy={C} r="114" fill="none" stroke="var(--color-sand)" strokeWidth="2" strokeDasharray="3 10" strokeLinecap="round" />
          </g>

          {/* wine arrows between the four stages */}
          {[-90, 0, 90, 180].map((deg, i) => (
            <motion.path
              key={deg}
              d={arc(deg)}
              fill="none"
              stroke="var(--color-wine)"
              strokeWidth={active === (i + 1) % 4 ? 5 : 3}
              strokeLinecap="round"
              markerEnd={drawn > i ? "url(#flow-arrow)" : undefined}
              initial={{ pathLength: 0 }}
              animate={shown ? { pathLength: 1 } : undefined}
              transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.35 + i * 0.3 }}
              onAnimationComplete={() => setDrawn((d) => Math.max(d, i + 1))}
              style={{ transition: "stroke-width 0.5s" }}
            />
          ))}

          {/* travelling ink drop */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "300px 300px", transformBox: "view-box" }}
          >
            <circle cx={C} cy={C - R} r="5" fill="var(--color-wine)" />
          </motion.g>
        </svg>

        {/* Stage nodes */}
        {copy.steps.map((step, i) => {
          const Icon = ICONS[i];
          const isActive = active === i;
          return (
            <button
              key={step.title}
              type="button"
              onMouseEnter={() => select(i)}
              onFocus={() => select(i)}
              onClick={() => select(i)}
              aria-pressed={isActive}
              aria-label={step.title}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: NODES[i].left, top: NODES[i].top }}
            >
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={shown ? { scale: 1, opacity: 1 } : undefined}
                transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.15 + i * 0.3 }}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border transition-[background-color,border-color,color,box-shadow] duration-500 sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem]",
                  isActive
                    ? "border-wine bg-wine text-paper shadow-[0_16px_40px_-12px_rgba(108,10,21,0.6)]"
                    : "border-ink/15 bg-paper text-ink",
                )}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" strokeWidth={1.4} aria-hidden />
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={shown ? { opacity: 1 } : undefined}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.3 }}
                className={cn("absolute hidden sm:block", NODES[i].label)}
              >
                <span className="eyebrow block text-ink-3">
                  {copy.stepLabel} {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "mt-1 block font-serif text-lg leading-[1.1] transition-colors lg:text-xl",
                    isActive ? "text-wine" : "text-ink",
                  )}
                >
                  {step.title}
                </span>
              </motion.span>
            </button>
          );
        })}

        {/* Centre: the iterative loop that runs through the whole project */}
        <div className="absolute left-1/2 top-1/2 flex w-[28%] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
          <Lightbulb className="h-5 w-5 text-wine sm:h-6 sm:w-6" strokeWidth={1.4} aria-hidden />
          <p className="eyebrow mt-2 hidden text-[0.58rem] leading-snug text-ink-3 sm:block">{copy.loop.title}</p>
          <div className="relative mt-1.5 hidden h-12 w-full items-start justify-center sm:flex">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={loopIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: EASE }}
                className="font-serif text-lg leading-tight text-wine lg:text-xl"
              >
                {copy.loop.items[loopIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {compact && (
        <ol className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 sm:hidden">
          {copy.steps.map((step, i) => (
            <li key={step.title} className={cn("text-sm transition-colors", active === i ? "text-wine" : "text-ink-2")}>
              <span className="eyebrow mr-2 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
              {step.title}
            </li>
          ))}
        </ol>
      )}

      {!compact && (
        <>
          <p className="eyebrow mt-6 text-center text-ink-3">
            <span className="pointer-coarse:hidden">{copy.hint}</span>
            <span className="hidden pointer-coarse:inline">{copy.hintTouch}</span>
          </p>
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.steps.map((step, i) => {
              const Icon = ICONS[i];
              const isActive = active === i;
              return (
                <li key={step.title}>
                  <button
                    type="button"
                    onMouseEnter={() => select(i)}
                    onFocus={() => select(i)}
                    onClick={() => select(i)}
                    className={cn(
                      "flex h-full w-full flex-col rounded-3xl border p-6 text-left transition-all duration-500 lg:p-7",
                      isActive ? "border-wine bg-paper" : "border-ink/10 hover:border-ink/25",
                    )}
                  >
                    <span className="flex items-center justify-between">
                      <span className="eyebrow text-ink-3">
                        {copy.stepLabel} {String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon className={cn("h-5 w-5 transition-colors", isActive ? "text-wine" : "text-ink/40")} strokeWidth={1.4} aria-hidden />
                    </span>
                    <span className="mt-10 font-serif text-[1.75rem] leading-[1.05] tracking-tight">{step.title}</span>
                    <span className="mt-5 flex flex-wrap gap-1.5">
                      {step.items.map((item) => (
                        <span key={item} className="rounded-full border border-ink/12 px-3 py-1 text-xs text-ink-2">
                          {item}
                        </span>
                      ))}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="mt-4 flex flex-col gap-6 rounded-3xl bg-ink p-6 text-paper sm:flex-row sm:items-center sm:justify-between lg:p-8">
            <p className="flex items-center gap-3 font-serif text-2xl">
              <Lightbulb className="h-5 w-5 text-wine-3" strokeWidth={1.4} aria-hidden />
              {copy.loop.title}
            </p>
            <ul className="flex flex-wrap gap-2">
              {copy.loop.items.map((item, i) => (
                <li
                  key={item}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm transition-colors duration-500",
                    loopIndex === i ? "border-wine-3 bg-wine text-paper" : "border-paper/20 text-paper/70",
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
