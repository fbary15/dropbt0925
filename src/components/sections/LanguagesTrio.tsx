import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { Dictionary } from "@/i18n/dictionaries/en";

/** "… all activities are in 3 languages" — three oversized language tiles. */
export function LanguagesTrio({ common }: { common: Dictionary["common"] }) {
  return (
    <div>
      <p className="eyebrow mb-6 text-ink-3">{common.allActivities}</p>
      <RevealGroup className="grid gap-3 sm:grid-cols-3" stagger={0.12}>
        {common.languages.map((lang) => (
          <RevealItem key={lang.code}>
            <div className="group relative overflow-hidden rounded-3xl border border-ink/12 p-6 transition-colors duration-700 hover:border-wine lg:p-8">
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-wine transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100"
              />
              <div className="relative flex items-start justify-between transition-colors duration-500 group-hover:text-paper">
                <span className="eyebrow">{lang.code}</span>
                <span className="text-sm text-ink-3 transition-colors duration-500 group-hover:text-paper/70">{lang.name}</span>
              </div>
              <p
                lang={lang.code.toLowerCase()}
                className="relative mt-16 font-serif text-[clamp(2.6rem,4.5vw,4.5rem)] leading-none tracking-tight transition-colors duration-500 group-hover:text-paper lg:mt-24"
              >
                {lang.native}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
