import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { href, pageOrder, type Locale, type PageKey } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

/** Oversized "next page" link at the end of every inner page. */
export function NextPage({ locale, current, dict }: { locale: Locale; current: PageKey; dict: Dictionary }) {
  const next = pageOrder[(pageOrder.indexOf(current) + 1) % pageOrder.length];

  return (
    <Link
      href={href(locale, next)}
      className="group relative block overflow-hidden border-t border-ink/15"
    >
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-wine transition-transform duration-[900ms] ease-[var(--ease-expo)] group-hover:scale-y-100"
      />
      <span className="container-x relative flex items-end justify-between gap-6 py-14 transition-colors duration-500 group-hover:text-paper lg:py-24">
        <span>
          <span className="eyebrow block text-ink-3 transition-colors duration-500 group-hover:text-paper/70">
            {dict.common.next}
          </span>
          <span className="mt-4 block text-h2 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-4">
            {dict.nav.pages[next]}
          </span>
        </span>
        <span className="mb-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-current/20 transition-all duration-700 group-hover:-rotate-45 group-hover:border-paper lg:h-24 lg:w-24">
          <ArrowRight className="h-6 w-6 lg:h-8 lg:w-8" strokeWidth={1.25} aria-hidden />
        </span>
      </span>
    </Link>
  );
}
