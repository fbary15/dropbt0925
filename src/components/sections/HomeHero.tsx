"use client";

import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import heroImage from "@/assets/site/hero.jpg";
import { useIntroReady } from "@/components/motion/intro";
import { SplitLines } from "@/components/motion/SplitLines";
import { Button, DropGlyph, RotatingBadge } from "@/components/ui/primitives";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { rich } from "@/lib/rich";

const EASE = [0.16, 1, 0.3, 1] as const;

type HomeHeroProps = {
  hero: Dictionary["home"]["hero"];
  scrollLabel: string;
  workHref: string;
  contactHref: string;
};

export function HomeHero({ hero, scrollLabel, workHref, contactHref }: HomeHeroProps) {
  const ready = useIntroReady();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, transform: "translateY(24px)" },
    animate: ready ? { opacity: 1, transform: "translateY(0px)" } : undefined,
    transition: { duration: 1.1, ease: EASE, delay },
  });

  const lines = hero.title.map((line, i) =>
    i === hero.title.length - 1 ? (
      <span key={i}>
        {rich(line)}
        <motion.span
          className="inline-block text-wine"
          initial={{ transform: "translateY(-2.2em)", opacity: 0 }}
          animate={ready ? { transform: "translateY(0em)", opacity: 1 } : undefined}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 1.05 }}
        >
          <DropGlyph className="ml-[0.08em] h-[0.3em] align-baseline" />
        </motion.span>
      </span>
    ) : (
      rich(line)
    ),
  );

  return (
    <section ref={ref} className="container-x relative flex min-h-[100svh] flex-col pt-28 pb-8 lg:pt-36">
      <div className="grid flex-1 grid-cols-12 items-center gap-x-6 gap-y-14">
        <motion.div style={{ y: textY }} className="relative z-10 col-span-12 lg:col-span-8">
          <motion.p {...fade(0.05)} className="eyebrow flex items-center gap-3 text-ink-3">
            <span className="h-2 w-2 rounded-full bg-wine" aria-hidden />
            {hero.eyebrow}
          </motion.p>

          <SplitLines as="h1" immediate delay={0.1} className="text-mega mt-8" lines={lines} />

          <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-start xl:max-w-[56rem] xl:flex-row xl:items-end">
            <motion.p {...fade(0.55)} className="text-body max-w-[26rem] text-ink-2">
              {hero.sub}
            </motion.p>
            <motion.div {...fade(0.7)} className="flex flex-wrap gap-3">
              <Button href={workHref}>{hero.primary}</Button>
              <Button href={contactHref} variant="outline">
                {hero.secondary}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <div className="relative col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-9">
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0% round 999px 999px 0 0)" }}
            animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 999px 999px 0 0)" } : undefined}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-paper-2"
          >
            <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
              <Image
                src={heroImage}
                alt={hero.imageAlt}
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 66vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ transform: "scale(0) rotate(-90deg)" }}
            animate={ready ? { transform: "scale(1) rotate(0deg)" } : undefined}
            transition={{ duration: 1.2, ease: EASE, delay: 1.1 }}
            className="absolute -left-4 -top-8 sm:-left-10 lg:-left-12 xl:-left-16"
          >
            <RotatingBadge text={hero.badge} className="h-32 w-32 rounded-full bg-paper text-ink shadow-[0_20px_50px_-20px_rgba(28,23,20,0.35)] lg:h-40 lg:w-40">
              <DropGlyph className="h-7 text-wine lg:h-9" />
            </RotatingBadge>
          </motion.div>
        </div>
      </div>

      <motion.div
        {...fade(0.9)}
        className="eyebrow mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-ink/15 pt-5 text-ink-3"
      >
        {hero.meta.map((item) => (
          <span key={item}>{item}</span>
        ))}
        <span className="flex items-center gap-2 text-ink">
          {scrollLabel}
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown className="h-3.5 w-3.5" aria-hidden />
          </motion.span>
        </span>
      </motion.div>
    </section>
  );
}
