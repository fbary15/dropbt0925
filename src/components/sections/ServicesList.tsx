"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";

type Service = { title: string; detail: string; href: string; image: StaticImageData };

/** Editorial service index. On desktop a work sample follows the cursor. */
export function ServicesList({ items }: { items: Service[] }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ol className="border-t border-ink/15">
        {items.map((item, i) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
            className="border-b border-ink/15"
          >
            <Link
              href={item.href}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 overflow-hidden py-7 lg:grid-cols-[5rem_1fr_20rem_3.5rem] lg:gap-8 lg:py-9"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-paper-2 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100"
              />
              <span className="eyebrow relative text-ink-3">{String(i + 1).padStart(2, "0")}</span>
              <span className="relative">
                <span className="block font-serif text-[clamp(1.9rem,4.2vw,4rem)] leading-[1] tracking-tight transition-all duration-700 ease-[var(--ease-expo)] group-hover:translate-x-3 group-hover:text-wine lg:group-hover:translate-x-6">
                  {item.title}
                </span>
                <span className="mt-2 block text-sm text-ink-3 lg:hidden">{item.detail}</span>
              </span>
              <span className="relative hidden text-[0.95rem] text-ink-2 lg:block">{item.detail}</span>
              <span className="relative flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-ink/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-wine group-hover:bg-wine group-hover:text-paper lg:h-14 lg:w-14">
                <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </span>
            </Link>
          </motion.li>
        ))}
      </ol>

      {/* Cursor-following preview */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
        style={{ x: sx, y: sy }}
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 4 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative ml-8 -mt-40 h-80 w-60 overflow-hidden rounded-2xl bg-paper-2 shadow-[0_40px_80px_-30px_rgba(28,23,20,0.5)]"
            >
              {items.map((item, i) => (
                <Image
                  key={item.title}
                  src={item.image}
                  alt=""
                  fill
                  sizes="240px"
                  className="object-cover transition-opacity duration-500"
                  style={{ opacity: active === i ? 1 : 0 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
