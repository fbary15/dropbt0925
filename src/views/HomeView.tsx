import { Check } from "lucide-react";
import Image from "next/image";
import elearningImage from "@/assets/site/elearning.jpg";
import { Counter } from "@/components/motion/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ScrollText } from "@/components/motion/ScrollText";
import { SplitLines } from "@/components/motion/SplitLines";
import { FlowDiagram } from "@/components/sections/FlowDiagram";
import { HomeHero } from "@/components/sections/HomeHero";
import { LanguagesTrio } from "@/components/sections/LanguagesTrio";
import { ServicesList } from "@/components/sections/ServicesList";
import { WorkRail } from "@/components/sections/WorkRail";
import { Button, DropGlyph, Marquee, SectionLabel, TextLink } from "@/components/ui/primitives";
import { featuredReferences, references } from "@/content/references";
import { partnerMarquee } from "@/content/partners";
import { href, siteUrl, type Locale, type PageKey } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { rich } from "@/lib/rich";

const serviceImages = ["bugnatese-gold", "dh-library", "sopro-2021", "infusion", "sto-murisol", "elearning"].map(
  (id) => references.find((r) => r.id === id)!.image,
);

export function HomeView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { home, common, nav } = dict;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DROP Kereskedelmi és Szolgáltató Bt.",
    alternateName: "DROP Bt.",
    url: `${siteUrl}/${locale}`,
    logo: `${siteUrl}/icon.png`,
    email: "info@drop-bt.eu",
    telephone: dict.contact.phone.replace(/\s/g, ""),
    foundingDate: "1995",
    vatID: "24569545-2-13",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Árpád utca 3.",
      postalCode: "2330",
      addressLocality: "Dunaharaszti",
      addressCountry: "HU",
    },
    knowsLanguage: ["en", "de", "hu"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <HomeHero
        hero={home.hero}
        scrollLabel={common.scroll}
        workHref={href(locale, "references")}
        contactHref={href(locale, "contact")}
      />

      {/* Services marquee */}
      <div className="border-y border-ink/15 bg-paper py-6 lg:py-8" aria-hidden>
        <Marquee duration={55}>
          {home.marquee.map((item) => (
            <span key={item} className="flex items-center">
              <span className="px-6 font-serif text-[clamp(2rem,4.2vw,3.8rem)] italic leading-none tracking-tight lg:px-10">
                {item}
              </span>
              <DropGlyph className="h-5 text-wine lg:h-7" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* What we do */}
      <section className="container-x py-24 lg:py-40">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionLabel index="01">{home.intro.label}</SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <ScrollText text={home.intro.lead} className="text-lead" />
            <div className="mt-16 grid gap-8 text-ink-2 md:grid-cols-2 lg:mt-24 lg:gap-14">
              {home.intro.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="text-body">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-20 lg:mt-28">
          <LanguagesTrio common={common} />
        </div>
      </section>

      {/* Services */}
      <section className="container-x pb-24 lg:pb-40">
        <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="02">{home.services.label}</SectionLabel>
            <SplitLines className="text-h2 mt-6" lines={[rich(home.services.title)]} />
          </div>
        </div>
        <ServicesList
          items={home.services.items.map((item, i) => ({
            title: item.title,
            detail: item.detail,
            href: href(locale, item.page as PageKey),
            image: serviceImages[i % serviceImages.length],
          }))}
        />
      </section>

      {/* Facts */}
      <section className="bg-paper-2">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-px bg-ink/10 lg:grid-cols-4">
            {home.facts.map((fact, i) => (
              <div key={fact.label} className="bg-paper-2 px-4 py-12 first:pl-0 sm:px-6 lg:px-8 lg:py-20 [&:nth-child(3)]:max-lg:pl-0">
                <Reveal delay={i * 0.08}>
                  <p className="font-serif text-[clamp(2.9rem,6vw,6rem)] leading-none tracking-tight">
                    <Counter value={fact.value} suffix={fact.suffix} year={fact.year} />
                  </p>
                  <p className="eyebrow mt-4 max-w-[16rem] leading-relaxed text-ink-3">{fact.label}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-x py-24 lg:py-40">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="03">{home.process.label}</SectionLabel>
            <SplitLines className="text-h2 mt-6" lines={[rich(home.process.title)]} />
            <Reveal delay={0.15}>
              <p className="text-body mt-8 max-w-md text-ink-2">{home.process.text}</p>
              <div className="mt-10">
                <Button href={href(locale, "flow")} variant="outline">
                  {home.process.cta}
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <FlowDiagram copy={dict.flow} compact />
          </div>
        </div>
      </section>

      {/* Selected work */}
      <div className="border-t border-ink/15">
        <WorkRail
          intro={
            <div>
              <SectionLabel index="04">{home.work.label}</SectionLabel>
              <h2 className="text-h2 mt-6">{rich(home.work.title)}</h2>
              <p className="text-body mt-6 text-ink-2">{home.work.text}</p>
              <div className="mt-8">
                <TextLink href={href(locale, "references")}>{home.work.cta}</TextLink>
              </div>
            </div>
          }
          items={featuredReferences.map((r) => ({
            id: r.id,
            image: r.image,
            client: r.client,
            category: dict.references.filters[r.category],
          }))}
          moreHref={href(locale, "references")}
          moreLabel={home.work.cta}
        />
      </div>

      {/* Partners */}
      <section className="overflow-hidden border-t border-ink/15 py-24 lg:py-36">
        <div className="container-x mb-14 grid gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="05">{home.partners.label}</SectionLabel>
            <SplitLines className="text-h2 mt-6" lines={[rich(home.partners.title)]} />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <p className="text-body text-ink-2">{home.partners.text}</p>
            <div className="mt-6">
              <TextLink href={href(locale, "partners")}>{home.partners.cta}</TextLink>
            </div>
          </Reveal>
        </div>
        <div className="space-y-2 lg:space-y-4" aria-hidden>
          {partnerMarquee.map((row, r) => (
            <Marquee key={r} duration={r === 0 ? 60 : 75} reverse={r === 1}>
              {row.map((name) => (
                <span key={name} className="flex items-center">
                  <span
                    className={
                      r === 0
                        ? "whitespace-nowrap px-6 font-serif text-[clamp(2.3rem,5.4vw,5.5rem)] leading-[1.1] tracking-tight lg:px-10"
                        : "whitespace-nowrap px-6 font-serif text-[clamp(2.3rem,5.4vw,5.5rem)] italic leading-[1.1] tracking-tight text-ink/35 lg:px-10"
                    }
                  >
                    {name}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-wine" />
                </span>
              ))}
            </Marquee>
          ))}
        </div>
      </section>

      {/* E-Learning */}
      <section className="on-dark relative overflow-hidden bg-night text-paper">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 bottom-0 h-[36rem] w-[36rem] rounded-full bg-wine/35 blur-[140px]"
        />
        <div className="container-x relative grid gap-16 py-24 lg:grid-cols-12 lg:items-center lg:py-40">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-[2rem] lg:max-w-none">
              <Image
                src={elearningImage}
                alt={home.learning.imageAlt}
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow flex items-center gap-3 text-paper/55">
              <span className="text-wine-3">(06)</span>
              <span className="h-px w-8 bg-current opacity-40" aria-hidden />
              {home.learning.label}
            </p>
            <SplitLines className="text-h2 mt-6" lines={[rich(home.learning.title)]} />
            <Reveal delay={0.1}>
              <p className="text-body mt-8 text-paper/75">{home.learning.text}</p>
            </Reveal>
            <RevealGroup as="ul" className="mt-10 border-t border-paper/15" stagger={0.07}>
              {home.learning.offers.map((offer) => (
                <RevealItem as="li" key={offer} y={16} className="flex items-center gap-4 border-b border-paper/15 py-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-wine">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="text-paper/90">{offer}</span>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
              <Button href={href(locale, "teaching")} variant="light">
                {home.learning.primary}
              </Button>
              <Button href={href(locale, "types")} variant="ghost-light">
                {home.learning.secondary}
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="container-x py-24 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="07">{home.about.label}</SectionLabel>
            <SplitLines className="text-mega mt-8" lines={[rich(home.about.title)]} />
          </div>
          <Reveal className="lg:col-span-5">
            <p className="text-lead text-[clamp(1.4rem,2.2vw,2rem)]">{home.about.text}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {dict.about.values.map((value) => (
                <span key={value} className="rounded-full border border-ink/15 px-4 py-1.5 text-sm text-ink-2">
                  {value}
                </span>
              ))}
            </div>
            <div className="mt-10">
              <TextLink href={href(locale, "about")}>{home.about.cta}</TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing line */}
      <section className="border-t border-ink/15">
        <div className="container-x flex flex-col items-center py-24 text-center lg:py-36">
          <DropGlyph className="h-10 text-wine" />
          <SplitLines className="text-h1 mt-8 max-w-[16ch]" lines={[rich(common.hope)]} />
          <Reveal delay={0.2} className="mt-12 flex flex-wrap justify-center gap-3">
            <Button href="mailto:info@drop-bt.eu" external>
              info@drop-bt.eu
            </Button>
            <Button href={href(locale, "contact")} variant="outline">
              {nav.pages.contact}
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
