import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { HomeView } from "@/views/HomeView";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata(lang, "home", getDictionary(lang));
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <PageTransition id={`${lang}-home`}>
      <HomeView locale={lang} dict={getDictionary(lang)} />
    </PageTransition>
  );
}
