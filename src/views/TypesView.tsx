import { SplitLines } from "@/components/motion/SplitLines";
import { LearningTypes } from "@/components/sections/LearningTypes";
import { NextPage } from "@/components/sections/NextPage";
import { PageHero } from "@/components/sections/PageHero";
import { SectionLabel } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { rich } from "@/lib/rich";

export function TypesView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const copy = dict.types;

  return (
    <>
      <PageHero locale={locale} pageKey="types" nav={dict.nav} label={copy.label} title={copy.title} />

      <section className="container-x pb-24 lg:pb-36">
        <div className="mb-14 grid gap-6 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-3">
            <SectionLabel>{copy.kicker}</SectionLabel>
          </div>
          <SplitLines className="text-h2 lg:col-span-9" lines={[rich(copy.question)]} />
        </div>
        <LearningTypes copy={copy} />
      </section>

      <NextPage locale={locale} current="types" dict={dict} />
    </>
  );
}
