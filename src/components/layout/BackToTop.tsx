"use client";

import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";

export function BackToTop({ label }: { label: string }) {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="group inline-flex items-center gap-2 text-paper/70 transition-colors hover:text-paper"
    >
      {label}
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-paper">
        <ArrowUp className="h-3.5 w-3.5" aria-hidden />
      </span>
    </button>
  );
}
