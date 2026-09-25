import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { href, pageOrder, type Locale, type PageKey } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { rich } from "@/lib/rich";

type PageHeroProps = {
  locale: Locale;
  pageKey: PageKey;
  nav: Dictionary["nav"];
  label: string;
  title: string;
  intro?: ReactNode;
  aside?: ReactNode;
};

/** Shared hero for inner pages: breadcrumb, oversized title, optional intro. */
export function PageHero({ locale, pageKey, nav, label, title, intro, aside }: PageHeroProps) {
  const index = pageOrder.indexOf(pageKey);

  return (
    <section className="container-x relative pt-36 pb-14 lg:pt-52 lg:pb-20">
      <Reveal y={16} className="flex items-center justify-between gap-6">
        <nav aria-label="Breadcrumb" className="eyebrow flex items-center gap-2 text-ink-3">
          <Link href={href(locale, "home")} className="link-underline hover:text-ink">
            DROP
          </Link>
          <span aria-hidden>/</span>
          {label !== nav.pages[pageKey] && (
            <>
              <span>{label}</span>
              <span aria-hidden>/</span>
            </>
          )}
          <span className="text-ink" aria-current="page">
            {nav.pages[pageKey]}
          </span>
        </nav>
        <span className="eyebrow hidden text-ink-3 sm:block">
          <span className="text-wine">{String(index + 1).padStart(2, "0")}</span> / {String(pageOrder.length).padStart(2, "0")}
        </span>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:items-end">
        <SplitLines as="h1" immediate className="text-h1 lg:col-span-8" lines={[rich(title)]} />
        {aside && <div className="lg:col-span-4">{aside}</div>}
      </div>

      {intro && (
        <Reveal delay={0.2} className="mt-12 grid lg:mt-16 lg:grid-cols-12">
          <div className="text-body text-ink-2 lg:col-span-5 lg:col-start-8">{intro}</div>
        </Reveal>
      )}
    </section>
  );
}
