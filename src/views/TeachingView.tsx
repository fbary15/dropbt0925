import { Check } from "lucide-react";
import Image from "next/image";
import elearningImage from "@/assets/site/elearning.jpg";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { NextPage } from "@/components/sections/NextPage";
import { PageHero } from "@/components/sections/PageHero";
import { Button, SectionLabel } from "@/components/ui/primitives";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn, rich } from "@/lib/rich";

export function TeachingView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const copy = dict.teaching;
  const [lead, ...rest] = copy.paragraphs;

  return (
    <>
      <PageHero locale={locale} pageKey="teaching" nav={dict.nav} label={copy.label} title={copy.title} />

      <section className="container-x pb-24 lg:pb-36">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem]">
                <Image
                  src={elearningImage}
                  alt={copy.imageAlt}
                  placeholder="blur"
                  preload
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionLabel>{copy.kicker}</SectionLabel>
            <Reveal>
              <p className="text-lead mt-8">{lead}</p>
            </Reveal>
            <div className="mt-10 space-y-6 text-ink-2">
              {rest.map((p, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <p className="text-body">{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <blockquote className="mt-14 border-l-2 border-wine pl-6 font-serif text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight lg:pl-8">
                {rich(copy.highlight)}
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-x pb-24 lg:pb-36">
        <SplitLines className="text-h2 mb-12 lg:mb-16" lines={[copy.offerTitle]} />
        <RevealGroup className="grid gap-4 lg:grid-cols-12" stagger={0.12}>
          {copy.offers.map((offer, i) => (
            <RevealItem
              key={i}
              className={cn(
                "on-dark flex flex-col rounded-[2rem] p-8 text-paper lg:p-12",
                i === 0 ? "bg-night lg:col-span-7" : "bg-wine lg:col-span-5",
              )}
            >
              <div className="flex items-start justify-between gap-6">
                <span className="eyebrow text-paper/60">{String(i + 1).padStart(2, "0")}</span>
                <span className="rounded-full border border-paper/25 px-4 py-1.5 text-xs">{offer.note}</span>
              </div>
              <h3 className="mt-16 font-serif text-[clamp(2.2rem,3.6vw,3.5rem)] leading-none tracking-tight lg:mt-24">
                {offer.title}
              </h3>
              <ul className="mt-10 border-t border-paper/15">
                {offer.items.map((item) => (
                  <li key={item} className="flex items-start gap-4 border-b border-paper/15 py-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-paper/10">
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <span className="text-paper/90">{item}</span>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="bg-paper-2">
        <div className="container-x flex flex-col items-start gap-10 py-20 lg:flex-row lg:items-end lg:justify-between lg:py-28">
          <div>
            <SplitLines className="text-h2 max-w-[18ch]" lines={[rich(copy.typesTitle)]} />
            <Reveal delay={0.1}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {dict.types.items.map((t) => (
                  <li key={t.key} className="rounded-full border border-ink/15 px-4 py-1.5 text-sm text-ink-2">
                    {t.short}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Button href={href(locale, "types")}>{copy.typesCta}</Button>
          </Reveal>
        </div>
      </section>

      <NextPage locale={locale} current="teaching" dict={dict} />
    </>
  );
}
