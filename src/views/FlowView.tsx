import { Reveal } from "@/components/motion/Reveal";
import { FlowDiagram } from "@/components/sections/FlowDiagram";
import { LanguagesTrio } from "@/components/sections/LanguagesTrio";
import { NextPage } from "@/components/sections/NextPage";
import { PageHero } from "@/components/sections/PageHero";
import { SectionLabel } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { rich } from "@/lib/rich";

export function FlowView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { flow, home, common } = dict;

  return (
    <>
      <PageHero
        locale={locale}
        pageKey="flow"
        nav={dict.nav}
        label={flow.label}
        title={flow.title}
        intro={
          <>
            <p className="font-serif text-[clamp(1.5rem,2.2vw,2rem)] leading-tight text-ink">{flow.intro}</p>
            <p className="mt-4">{flow.note}</p>
          </>
        }
      />

      <section className="container-x pb-24 lg:pb-40">
        <div className="rounded-[2rem] bg-paper-2/60 px-4 py-12 sm:px-10 lg:rounded-[3rem] lg:px-16 lg:py-20">
          <FlowDiagram copy={flow} />
        </div>
      </section>

      <section className="container-x border-t border-ink/15 py-24 lg:py-36">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionLabel>{common.allActivities}</SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <Reveal>
              <p className="text-lead">{rich(home.intro.lead)}</p>
            </Reveal>
            <div className="mt-14 grid gap-8 text-ink-2 md:grid-cols-2 lg:gap-14">
              {home.intro.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="text-body">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-20">
          <LanguagesTrio common={common} />
        </div>
      </section>

      <NextPage locale={locale} current="flow" dict={dict} />
    </>
  );
}
