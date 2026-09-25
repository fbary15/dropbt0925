import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Counter } from "@/components/motion/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ScrollText } from "@/components/motion/ScrollText";
import { SplitLines } from "@/components/motion/SplitLines";
import { NextPage } from "@/components/sections/NextPage";
import { PageHero } from "@/components/sections/PageHero";
import { DropGlyph, SectionLabel } from "@/components/ui/primitives";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

export function AboutView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const copy = dict.about;

  return (
    <>
      <PageHero locale={locale} pageKey="about" nav={dict.nav} label={copy.label} title={copy.title} />

      <section className="container-x pb-24 lg:pb-36">
        <div className="border-t border-ink/15 pt-12 lg:pt-20">
          <ScrollText as="h2" text={copy.lead} className="text-h2 max-w-[22ch]" />
        </div>

        <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="rounded-[2rem] bg-wine p-8 text-paper lg:sticky lg:top-28 lg:p-10">
              <DropGlyph className="h-8 text-paper/80" />
              <p className="mt-16 font-serif text-[clamp(4rem,7vw,7rem)] leading-none tracking-tight">
                <Counter value={1995} year />
              </p>
              <p className="eyebrow mt-4 text-paper/70">{dict.home.facts[0].label}</p>
            </div>
          </Reveal>
          <div className="space-y-8 text-ink-2 lg:col-span-7 lg:col-start-6">
            {copy.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className={i === 0 ? "text-lead text-[clamp(1.45rem,2.3vw,2.1rem)] text-ink" : "text-body"}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark overflow-hidden bg-night text-paper">
        <div className="container-x py-24 lg:py-36">
          <p className="eyebrow flex items-center gap-3 text-paper/55">
            <span className="h-px w-8 bg-current opacity-40" aria-hidden />
            {copy.valuesLabel}
          </p>
          <SplitLines
            className="mt-10 font-serif text-[clamp(2.6rem,7.6vw,8rem)] leading-[0.95] tracking-tight"
            stagger={0.07}
            lines={copy.values.map((value, i) => (
              <span key={value} className={i % 2 === 1 ? "italic text-wine-3" : undefined}>
                {value}
                {i < copy.values.length - 1 ? "," : "."}
              </span>
            ))}
          />
        </div>
      </section>

      <section className="container-x py-24 lg:py-36">
        <RevealGroup className="grid gap-4 md:grid-cols-3" stagger={0.1}>
          {copy.pillars.map((pillar, i) => (
            <RevealItem key={pillar.title} className="flex min-h-72 flex-col justify-between rounded-[2rem] border border-ink/12 p-8 lg:p-10">
              <span className="eyebrow text-wine">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="block font-serif text-[clamp(2rem,3vw,2.75rem)] leading-none tracking-tight">{pillar.title}</span>
                <span className="text-body mt-4 block text-ink-2">{pillar.text}</span>
              </span>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-20 lg:mt-28">
          <SectionLabel>{dict.common.anyQuestions}</SectionLabel>
          <Link
            href={href(locale, "contact")}
            className="group mt-6 inline-flex items-center gap-4 font-serif text-[clamp(2.6rem,6.8vw,6.8rem)] leading-none tracking-tight transition-colors hover:text-wine"
          >
            <span className="link-underline pb-2">{dict.common.clickHere}</span>
            <ArrowUpRight className="h-[0.55em] w-[0.55em] transition-transform duration-500 group-hover:rotate-45" strokeWidth={1} aria-hidden />
          </Link>
        </Reveal>
      </section>

      <NextPage locale={locale} current="about" dict={dict} />
    </>
  );
}
