"use client";

import { useLenis } from "lenis/react";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/rich";

type Item = {
  id: string;
  image: StaticImageData;
  client?: string;
  year?: string;
  category: string;
  categoryLabel: string;
};

type GalleryProps = {
  items: Item[];
  filters: { key: string; label: string }[];
  labels: { open: string; close: string; prev: string; next: string; works: string };
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function ReferenceGallery({ items, filters, labels }: GalleryProps) {
  const [filter, setFilter] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const visible = useMemo(() => (filter === "all" ? items : items.filter((i) => i.category === filter)), [filter, items]);
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: items.length };
    items.forEach((i) => (map[i.category] = (map[i.category] ?? 0) + 1));
    return map;
  }, [items]);

  const open = openIndex !== null ? visible[openIndex] : null;

  const go = useCallback(
    (step: number) => {
      setDirection(step);
      setOpenIndex((i) => (i === null ? i : (i + step + visible.length) % visible.length));
    },
    [visible.length],
  );

  const close = useCallback(() => {
    setOpenIndex(null);
    lastTrigger.current?.focus();
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    lenis?.stop();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [openIndex, lenis, go, close]);

  return (
    <>
      {/* Filters */}
      <div className="no-scrollbar -mx-5 mb-10 overflow-x-auto px-5 sm:mx-0 sm:px-0 lg:mb-14">
        <div className="flex w-max gap-2">
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "relative flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors duration-300",
                  active ? "border-ink text-paper" : "border-ink/15 text-ink-2 hover:border-ink/40",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{f.label}</span>
                <span className={cn("relative font-mono text-xs", active ? "text-paper/60" : "text-ink-3")}>
                  {counts[f.key] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry grid */}
      <motion.div
        key={filter}
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }}
        className="columns-2 gap-3 sm:gap-4 md:columns-3 xl:columns-4"
      >
        {visible.map((item, i) => (
          <motion.figure
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
            }}
            className="mb-3 break-inside-avoid sm:mb-4"
          >
            <button
              type="button"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setDirection(0);
                setOpenIndex(i);
              }}
              className="group relative block w-full overflow-hidden rounded-2xl bg-paper-2 p-3 text-left transition-colors duration-500 hover:bg-paper-3 sm:p-6 lg:p-8"
              aria-label={`${labels.open}: ${item.client ?? item.categoryLabel}`}
            >
              <span className="flex justify-center">
                <Image
                  src={item.image}
                  alt={`${item.client ? `${item.client} — ` : ""}${item.categoryLabel}`}
                  placeholder="blur"
                  sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
                  className="h-auto w-full shadow-[0_18px_40px_-18px_rgba(28,23,20,0.45)] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-1 group-hover:scale-[1.02]"
                  style={{ maxWidth: Math.round(item.image.width * 1.35) }}
                />
              </span>
              <span className="mt-4 flex items-end justify-between gap-2 sm:mt-5 sm:gap-3">
                <span className="min-w-0">
                  <span className="block font-serif text-base leading-tight break-words sm:text-lg">{item.client ?? item.categoryLabel}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-ink-3">
                    {item.client ? item.categoryLabel : ""}
                    {item.year ? `${item.client ? " · " : ""}${item.year}` : ""}
                  </span>
                </span>
                <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 transition-all duration-500 group-hover:rotate-90 sm:flex group-hover:border-wine group-hover:bg-wine group-hover:text-paper">
                  <Plus className="h-4 w-4" aria-hidden />
                </span>
              </span>
            </button>
          </motion.figure>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && openIndex !== null && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={open.client ?? open.categoryLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[80] flex flex-col bg-night/95 text-paper backdrop-blur-md"
            data-lenis-prevent
          >
            <div className="container-x flex h-20 shrink-0 items-center justify-between">
              <p className="eyebrow text-paper/60">
                <span className="text-paper">{String(openIndex + 1).padStart(2, "0")}</span> / {String(visible.length).padStart(2, "0")}{" "}
                {labels.works}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="flex items-center gap-3 rounded-full border border-paper/20 py-2 pl-5 pr-2 text-sm transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              >
                {labels.close}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper/10">
                  <X className="h-4 w-4" aria-hidden />
                </span>
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-24" onClick={close}>
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={open.id}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: d * 80, scale: d === 0 ? 0.94 : 1 }),
                    center: { opacity: 1, x: 0, scale: 1 },
                    exit: (d: number) => ({ opacity: 0, x: d * -80 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: EASE }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) go(1);
                    else if (info.offset.x > 80) go(-1);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative flex max-h-full items-center justify-center"
                >
                  <Image
                    src={open.image}
                    alt={`${open.client ? `${open.client} — ` : ""}${open.categoryLabel}`}
                    quality={90}
                    sizes="90vw"
                    placeholder="blur"
                    draggable={false}
                    className="w-auto max-w-full select-none object-contain shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]"
                    style={{ height: `min(${Math.round(open.image.height * 1.7)}px, calc(100svh - 12rem))` }}
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label={labels.prev}
                className="absolute left-4 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-paper/20 transition-colors hover:border-paper hover:bg-paper hover:text-ink sm:flex lg:left-8"
              >
                <ArrowLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label={labels.next}
                className="absolute right-4 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-paper/20 transition-colors hover:border-paper hover:bg-paper hover:text-ink sm:flex lg:right-8"
              >
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="container-x flex h-24 shrink-0 items-center justify-between gap-6">
              <div>
                <p className="font-serif text-2xl leading-tight">{open.client ?? open.categoryLabel}</p>
                <p className="text-sm text-paper/55">
                  {open.client ? open.categoryLabel : ""}
                  {open.year ? `${open.client ? " · " : ""}${open.year}` : ""}
                </p>
              </div>
              <div className="flex gap-2 sm:hidden">
                <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/20">
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                </button>
                <button type="button" onClick={() => go(1)} aria-label={labels.next} className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/20">
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
