"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { href, localeLabels, locales, parsePath } from "@/i18n/config";
import { cn } from "@/lib/rich";

function remember(locale: string) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/** EN / DE / HU switcher that keeps the visitor on the equivalent page. */
export function LanguageSwitcher({ label, tone = "ink", className }: { label: string; tone?: "ink" | "paper"; className?: string }) {
  const pathname = usePathname();
  const { locale: current, key } = parsePath(pathname);

  return (
    <nav aria-label={label} className={cn("flex items-center gap-1 font-mono text-[0.72rem] tracking-[0.12em]", className)}>
      {locales.map((locale, i) => {
        const active = locale === current;
        return (
          <span key={locale} className="flex items-center gap-1">
            {i > 0 && <span className={tone === "paper" ? "text-paper/30" : "text-ink/25"}>/</span>}
            <Link
              href={href(locale, key ?? "home")}
              hrefLang={locale}
              lang={locale}
              aria-current={active ? "true" : undefined}
              title={localeLabels[locale].long}
              onClick={() => remember(locale)}
              className={cn(
                "relative px-1 py-1 transition-colors",
                active
                  ? tone === "paper"
                    ? "text-paper"
                    : "text-wine"
                  : tone === "paper"
                    ? "text-paper/55 hover:text-paper"
                    : "text-ink/55 hover:text-ink",
              )}
            >
              {localeLabels[locale].short}
              {active && (
                <span className={cn("absolute inset-x-1 -bottom-0.5 h-px", tone === "paper" ? "bg-paper" : "bg-wine")} />
              )}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
