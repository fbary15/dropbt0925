import { lang } from "next/root-params";
import { SplitLines } from "@/components/motion/SplitLines";
import { Button, DropGlyph } from "@/components/ui/primitives";
import { defaultLocale, href, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { rich } from "@/lib/rich";

export default async function NotFound() {
  const value = await lang();
  const locale = isLocale(value) ? value : defaultLocale;
  const { notFound } = getDictionary(locale);

  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-36 pb-24">
      <p className="eyebrow flex items-center gap-3 text-ink-3">
        <DropGlyph className="h-3 text-wine" /> 404
      </p>
      <SplitLines as="h1" immediate className="text-h1 mt-8" lines={[rich(notFound.title)]} />
      <p className="text-body mt-8 max-w-md text-ink-2">{notFound.text}</p>
      <div className="mt-10">
        <Button href={href(locale, "home")}>{notFound.cta}</Button>
      </div>
    </section>
  );
}
