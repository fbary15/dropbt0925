import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { isLocale, keyFromSlug, locales, pageKeys, slugs, type Locale, type PageKey } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { AboutView } from "@/views/AboutView";
import { ContactView } from "@/views/ContactView";
import { FlowView } from "@/views/FlowView";
import { PartnersView } from "@/views/PartnersView";
import { ReferencesView } from "@/views/ReferencesView";
import { TeachingView } from "@/views/TeachingView";
import { TypesView } from "@/views/TypesView";

type ViewProps = { locale: Locale; dict: Dictionary };

const views: Record<Exclude<PageKey, "home">, ComponentType<ViewProps>> = {
  flow: FlowView,
  references: ReferencesView,
  partners: PartnersView,
  teaching: TeachingView,
  types: TypesView,
  contact: ContactView,
  about: AboutView,
};

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    pageKeys.filter((key) => key !== "home").map((key) => ({ lang, slug: slugs[key][lang] })),
  );
}

async function resolve(params: PageProps<"/[lang]/[slug]">["params"]) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return null;
  const key = keyFromSlug(lang, slug);
  if (!key || key === "home") return null;
  return { locale: lang, key };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const route = await resolve(params);
  if (!route) return {};
  return pageMetadata(route.locale, route.key, getDictionary(route.locale));
}

export default async function Page({ params }: PageProps<"/[lang]/[slug]">) {
  const route = await resolve(params);
  if (!route) notFound();

  const View = views[route.key];
  return (
    <PageTransition id={`${route.locale}-${route.key}`}>
      <View locale={route.locale} dict={getDictionary(route.locale)} />
    </PageTransition>
  );
}
