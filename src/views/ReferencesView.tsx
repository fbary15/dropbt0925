import { NextPage } from "@/components/sections/NextPage";
import { PageHero } from "@/components/sections/PageHero";
import { ReferenceGallery } from "@/components/sections/ReferenceGallery";
import { referenceCategories, references } from "@/content/references";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

export function ReferencesView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const copy = dict.references;

  return (
    <>
      <PageHero
        locale={locale}
        pageKey="references"
        nav={dict.nav}
        label={copy.label}
        title={copy.title}
        aside={
          <p className="text-body text-ink-2 lg:pb-4">
            {copy.intro}
          </p>
        }
      />

      <section className="container-x pb-24 lg:pb-36">
        <ReferenceGallery
          items={references.map((r) => ({
            id: r.id,
            image: r.image,
            client: r.client,
            year: r.year,
            category: r.category,
            categoryLabel: copy.filters[r.category],
          }))}
          filters={[
            { key: "all", label: copy.filters.all },
            ...referenceCategories.map((c) => ({ key: c, label: copy.filters[c] })),
          ]}
          labels={{ open: copy.open, close: copy.close, prev: copy.prev, next: copy.next, works: copy.works }}
        />
      </section>

      <NextPage locale={locale} current="references" dict={dict} />
    </>
  );
}
