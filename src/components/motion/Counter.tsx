"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/** Counts up to `value` when scrolled into view. Years count up from a nearby value. */
export function Counter({ value, suffix = "", year = false }: { value: number; suffix?: string; year?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();

  const from = year ? value - 60 : 0;

  // Server HTML shows the final value; once hydrated, rewind so it can count up.
  useEffect(() => {
    if (!reduced && ref.current && !inView) ref.current.textContent = `${from}${suffix}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduced) {
      node.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(from, value, {
      duration: year ? 2.2 : 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [from, inView, reduced, suffix, value, year]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
