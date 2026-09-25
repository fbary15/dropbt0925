import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { NextPage } from "@/components/sections/NextPage";
import { PageHero } from "@/components/sections/PageHero";
import { SectionLabel } from "@/components/ui/primitives";
import { companies, institutions } from "@/content/partners";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

function groupByLetter(names: string[]) {
  const groups = new Map<string, string[]>();
  for (const name of names) {
    const letter = name[0].toUpperCase();
    groups.set(letter, [...(groups.get(letter) ?? []), name]);
  }
  return [...groups.entries()];
}

function splitName(name: string) {
  const [brand, ...rest] = name.split(" – ");
  return { brand, detail: rest.join(" – ") };
}

export function PartnersView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const copy = dict.partners;
  const letters = groupByLetter(companies);

  return (
    <>
      <PageHero
        locale={locale}
        pageKey="partners"
        nav={dict.nav}
        label={copy.label}
        title={copy.title}
        aside={
          <div className="flex gap-10 lg:justify-end lg:pb-4">
            <div>
              <p className="font-serif text-6xl leading-none">{companies.length}</p>
              <p className="eyebrow mt-2 text-ink-3">{copy.companies}</p>
            </div>
            <div>
              <p className="font-serif text-6xl leading-none">{institutions.length}</p>
              <p className="eyebrow mt-2 text-ink-3">{copy.institutions}</p>
            </div>
          </div>
        }
        intro={<p>{copy.intro}</p>}
      />

      <section className="container-x pb-24 lg:pb-36">
        <SectionLabel index="A–Z" className="mb-8">
          {copy.companies}
        </SectionLabel>
        <div className="border-t border-ink/15">
          {letters.map(([letter, names]) => (
            <Reveal key={letter} y={24} amount={0.1}>
              <div className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-ink/15 py-6 sm:grid-cols-[6rem_1fr] lg:grid-cols-[12rem_1fr] lg:py-8">
                <p className="font-serif text-4xl italic leading-none text-wine lg:text-6xl">{letter}</p>
                <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">
                  {names.map((name) => {
                    const { brand, detail } = splitName(name);
                    return (
                      <li key={name} className="group flex items-baseline gap-2">
                        <span className="font-serif text-[1.65rem] leading-tight tracking-tight transition-colors duration-300 group-hover:text-wine lg:text-3xl">
                          {brand}
                        </span>
                        {detail && <span className="text-sm text-ink-3">{detail}</span>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-paper-2">
        <div className="container-x py-24 lg:py-32">
          <SectionLabel className="mb-10">{copy.institutions}</SectionLabel>
          <RevealGroup className="grid gap-px overflow-hidden rounded-3xl bg-ink/10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {institutions.map((name, i) => {
              const { brand, detail } = splitName(name);
              return (
                <div key={name} className="bg-paper-2">
                  <RevealItem className="flex h-full min-h-48 flex-col justify-between p-6 lg:p-8">
                    <span className="eyebrow text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block font-serif text-3xl leading-tight tracking-tight lg:text-4xl">{brand}</span>
                      {detail && <span className="mt-1 block text-sm text-ink-3">{detail}</span>}
                    </span>
                  </RevealItem>
                </div>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <NextPage locale={locale} current="partners" dict={dict} />
    </>
  );
}
