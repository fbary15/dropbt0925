import { ArrowUpRight, Phone } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { NextPage } from "@/components/sections/NextPage";
import { PageHero } from "@/components/sections/PageHero";
import { CopyButton } from "@/components/ui/CopyButton";
import { SectionLabel } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

export function ContactView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const copy = dict.contact;
  const tel = copy.phone.replace(/\s/g, "");

  return (
    <>
      <PageHero locale={locale} pageKey="contact" nav={dict.nav} label={copy.label} title={copy.title} />

      <section className="container-x pb-24 lg:pb-36">
        <div className="border-t border-ink/15 pt-12 lg:pt-16">
          <SectionLabel>{copy.connect}</SectionLabel>
          <Reveal delay={0.05}>
            <p className="text-body mt-8 text-ink-2">{copy.forAny}</p>
            <a
              href="mailto:info@drop-bt.eu"
              className="group mt-3 inline-flex items-start gap-3 font-serif text-[clamp(2.1rem,7vw,7rem)] leading-[0.95] tracking-tight transition-colors hover:text-wine"
            >
              <span className="link-underline break-all pb-2">info@drop-bt.eu</span>
              <ArrowUpRight
                className="mt-[0.15em] h-[0.5em] w-[0.5em] shrink-0 transition-transform duration-500 group-hover:rotate-45"
                strokeWidth={1}
                aria-hidden
              />
            </a>
            <div className="mt-6">
              <CopyButton value="info@drop-bt.eu" label={dict.common.copy} copiedLabel={dict.common.copied} />
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-4 lg:mt-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <a
              href={`tel:${tel}`}
              className="group flex h-full flex-col justify-between gap-16 rounded-[2rem] bg-wine p-8 text-paper transition-colors duration-500 hover:bg-ink lg:p-10"
            >
              <span className="flex items-center justify-between">
                <span className="eyebrow text-paper/70">{copy.orCall}</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper/10 transition-transform duration-500 group-hover:rotate-12">
                  <Phone className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                </span>
              </span>
              <span className="font-serif text-[clamp(2.2rem,3.6vw,3.5rem)] leading-none tracking-tight">{copy.phone}</span>
            </a>
          </Reveal>

          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:col-span-7" stagger={0.1}>
            {copy.people.map((person) => (
              <RevealItem key={person.name} className="flex flex-col justify-between gap-16 rounded-[2rem] border border-ink/12 p-8 lg:p-10">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper-2 font-serif text-2xl italic text-wine">
                  {initials(person.name)}
                </span>
                <span>
                  <span className="block font-serif text-4xl leading-none tracking-tight">{person.name}</span>
                  <span className="eyebrow mt-3 block text-ink-3">{person.role}</span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section id="imprint" className="scroll-mt-24 bg-paper-2">
        <div className="container-x grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-4">
            <SplitLines className="text-h2" lines={[copy.imprint.title]} />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-3">{copy.imprint.intro}</p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7 lg:col-start-6">
            <dl className="border-t border-ink/15">
              {copy.imprint.rows.map(([label, value]) => (
                <div key={label} className="grid gap-1 border-b border-ink/15 py-5 sm:grid-cols-[16rem_1fr] sm:gap-6">
                  <dt className="eyebrow pt-1 leading-relaxed text-ink-3">{label}</dt>
                  <dd className="text-[1.05rem]">
                    {value.includes("@") ? (
                      <a href={`mailto:${value}`} className="link-underline -my-2 inline-block py-2">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <NextPage locale={locale} current="contact" dict={dict} />
    </>
  );
}
