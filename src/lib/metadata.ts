import type { Metadata } from "next";
import { href, locales, ogLocale, type Locale, type PageKey } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

export function pageMetadata(locale: Locale, key: PageKey, dict: Dictionary): Metadata {
  const page = dict.meta.pages[key];
  const title = key === "home" ? `${dict.meta.siteName} — ${page.title}` : page.title;
  const languages = Object.fromEntries(locales.map((l) => [l, href(l, key)]));

  return {
    title: key === "home" ? { absolute: title } : title,
    description: page.description,
    alternates: {
      canonical: href(locale, key),
      languages: { ...languages, "x-default": href("en", key) },
    },
    openGraph: {
      type: "website",
      siteName: dict.meta.siteName,
      title,
      description: page.description,
      url: href(locale, key),
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title, description: page.description },
  };
}
