"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type WorkItem = { id: string; image: StaticImageData; client?: string; category: string };

type WorkRailProps = {
  intro: ReactNode;
  items: WorkItem[];
  moreHref: string;
  moreLabel: string;
};

function Card({ item, index, href }: { item: WorkItem; index: number; href: string }) {
  return (
    <Link href={href} className="group block shrink-0 snap-start" aria-label={`${item.client ?? item.category} — ${item.category}`}>
      <div
        className="relative h-[86vw] max-h-[34rem] overflow-hidden rounded-2xl bg-paper-2 sm:h-[44vw] lg:h-[62vh] lg:max-h-[46rem]"
        style={{ aspectRatio: `${item.image.width} / ${item.image.height}` }}
      >
        <Image
          src={item.image}
          alt={`${item.client ?? ""} ${item.category}`.trim()}
          fill
          sizes="(min-width: 1024px) 40vw, 70vw"
          placeholder="blur"
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
        />
        <span className="absolute bottom-4 right-4 flex h-12 w-12 scale-50 items-center justify-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" aria-hidden />
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-3">
        <span className="eyebrow text-wine">{String(index + 1).padStart(2, "0")}</span>
        <span className="font-serif text-xl leading-tight">{item.client ?? item.category}</span>
        {item.client && <span className="text-sm text-ink-3">{item.category}</span>}
      </div>
    </Link>
  );
}

/** Pinned horizontal gallery on desktop, swipeable rail on touch screens. */
export function WorkRail({ intro, items, moreHref, moreLabel }: WorkRailProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [desktop]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const raw = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const track = (
    <div ref={trackRef} className="flex w-max items-end gap-5 px-5 sm:gap-8 sm:px-8 lg:gap-12 lg:px-12">
      <div className="w-[82vw] shrink-0 snap-start self-center sm:w-[26rem] lg:w-[30rem] lg:pr-10">{intro}</div>
      {items.map((item, i) => (
        <Card key={item.id} item={item} index={i} href={moreHref} />
      ))}
      <Link
        href={moreHref}
        className="group flex h-[86vw] max-h-[34rem] w-[70vw] max-w-[34rem] shrink-0 snap-start items-center justify-center self-start sm:h-[44vw] sm:w-[30vw] lg:h-[62vh] lg:max-h-[46rem] lg:w-[24rem]"
      >
        <span className="flex aspect-square w-4/5 flex-col items-center justify-center rounded-full border border-ink/20 text-center transition-all duration-700 ease-[var(--ease-expo)] group-hover:scale-105 group-hover:border-wine group-hover:bg-wine group-hover:text-paper">
          <ArrowUpRight className="mb-3 h-8 w-8 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.25} aria-hidden />
          <span className="font-serif text-3xl">{moreLabel}</span>
        </span>
      </Link>
    </div>
  );

  if (!desktop) {
    return (
      <section ref={sectionRef} className="py-24">
        <div className="no-scrollbar snap-x snap-mandatory overflow-x-auto scroll-pl-5 pb-4">{track}</div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }}>{track}</motion.div>
        <div className="container-x absolute inset-x-0 bottom-8">
          <div className="relative h-px bg-ink/10">
            <motion.div className="absolute inset-y-0 left-0 bg-wine" style={{ width: progress }} />
          </div>
        </div>
      </div>
    </section>
  );
}
