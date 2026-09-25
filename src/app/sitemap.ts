import type { MetadataRoute } from "next";
import { href, locales, pageKeys, siteUrl } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return pageKeys.flatMap((key) =>
    locales.map((locale) => ({
      url: `${siteUrl}${href(locale, key)}`,
      changeFrequency: "yearly" as const,
      priority: key === "home" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}${href(l, key)}`])),
      },
    })),
  );
}
