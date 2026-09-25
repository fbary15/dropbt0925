export const locales = ["en", "de", "hu"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const localeLabels: Record<Locale, { short: string; long: string }> = {
  en: { short: "EN", long: "English" },
  de: { short: "DE", long: "Deutsch" },
  hu: { short: "HU", long: "Magyar" },
};

export const pageKeys = [
  "home",
  "flow",
  "references",
  "partners",
  "teaching",
  "types",
  "contact",
  "about",
] as const;
export type PageKey = (typeof pageKeys)[number];

/** Localized URL slugs for every page. The home page has an empty slug. */
export const slugs: Record<PageKey, Record<Locale, string>> = {
  home: { en: "", de: "", hu: "" },
  flow: { en: "project-flow", de: "projektablauf", hu: "megrendeles-folyamata" },
  references: { en: "references", de: "referenzen", hu: "referenciak" },
  partners: { en: "partners", de: "partner", hu: "partnerek" },
  teaching: { en: "language-teaching", de: "unterrichten", hu: "nyelvoktatas" },
  types: { en: "learning-types", de: "lerntypen", hu: "tanulasi-tipusok" },
  contact: { en: "contact", de: "kontakt", hu: "kapcsolat" },
  about: { en: "about-us", de: "ueber-uns", hu: "rolunk" },
};

/** Navigation order, also used for the "next page" links. */
export const pageOrder: PageKey[] = [
  "home",
  "flow",
  "references",
  "partners",
  "teaching",
  "types",
  "about",
  "contact",
];

export const navGroups: { id: "design" | "learning"; pages: PageKey[] }[] = [
  { id: "design", pages: ["home", "flow", "references", "partners"] },
  { id: "learning", pages: ["teaching", "types"] },
];

export function href(locale: Locale, key: PageKey, hash?: string) {
  const slug = slugs[key][locale];
  const path = slug ? `/${locale}/${slug}` : `/${locale}`;
  return hash ? `${path}#${hash}` : path;
}

export function keyFromSlug(locale: Locale, slug: string | undefined): PageKey | undefined {
  const value = slug ?? "";
  return pageKeys.find((key) => slugs[key][locale] === value);
}

/** Splits a pathname like `/de/referenzen` into its locale and page key. */
export function parsePath(pathname: string): { locale: Locale; key: PageKey | undefined } {
  const [, maybeLocale = "", ...rest] = pathname.split("/");
  const locale = isLocale(maybeLocale) ? maybeLocale : defaultLocale;
  return { locale, key: keyFromSlug(locale, rest.join("/") || undefined) };
}

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://drop-bt.eu").replace(/\/$/, "");

export const htmlLang: Record<Locale, string> = { en: "en", de: "de", hu: "hu" };
export const ogLocale: Record<Locale, string> = { en: "en_GB", de: "de_DE", hu: "hu_HU" };
