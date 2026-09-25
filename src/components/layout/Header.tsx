"use client";

import { useLenis } from "lenis/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import logo from "@/assets/site/logo.png";
import { href, navGroups, parsePath, type Locale, type PageKey } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/rich";
import { LanguageSwitcher } from "./LanguageSwitcher";

/** Every label a header slot can show, across all languages. */
export type HeaderSlots = Record<"design" | "learning" | "about" | "contact" | "cta" | "toggle", string[]>;

type HeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  phone: string;
  slots: HeaderSlots;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Renders `label` in a box as wide as the longest of `variants`, so switching
 * language never shifts the header items. Hidden variants only size the box.
 */
function StableLabel({ label, variants }: { label: string; variants: string[] }) {
  const sizers = [...new Set(variants)].filter((v) => v !== label);
  return (
    <span className="inline-grid text-center">
      <span className="col-start-1 row-start-1">{label}</span>
      {sizers.map((v) => (
        <span key={v} aria-hidden className="invisible col-start-1 row-start-1">
          {v}
        </span>
      ))}
    </span>
  );
}

function NavDropdown({
  label,
  variants,
  pages,
  locale,
  nav,
  activeKey,
}: {
  label: string;
  variants: string[];
  pages: PageKey[];
  locale: Locale;
  nav: Dictionary["nav"];
  activeKey?: PageKey;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const containsActive = activeKey ? pages.includes(activeKey) : false;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onClick);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "group flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-[0.95rem] transition-colors xl:px-3.5",
          containsActive ? "text-wine" : "text-ink hover:text-wine",
        )}
      >
        <StableLabel label={label} variants={variants} />
        <ChevronDown
          aria-hidden
          className={cn("h-3.5 w-3.5 transition-transform duration-500", open && "rotate-180")}
          strokeWidth={1.75}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6, transition: { duration: 0.18 } }}
            transition={{ duration: 0.45, ease: EASE }}
            className="absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-3"
          >
            <ul className="overflow-hidden rounded-3xl border border-ink/10 bg-paper p-2 shadow-[0_30px_80px_-30px_rgba(28,23,20,0.35)]">
              {pages.map((key, i) => (
                <li key={key}>
                  <Link
                    href={href(locale, key)}
                    onClick={() => setOpen(false)}
                    aria-current={activeKey === key ? "page" : undefined}
                    className="group/item grid grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-2xl px-4 py-3.5 transition-colors hover:bg-paper-2"
                  >
                    <span className="eyebrow text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span
                        className={cn(
                          "block font-serif text-[1.6rem] leading-tight tracking-tight transition-colors",
                          activeKey === key ? "text-wine" : "group-hover/item:text-wine",
                        )}
                      >
                        {nav.pages[key]}
                      </span>
                      <span className="mt-0.5 block text-sm text-ink-3">{nav.blurbs[key]}</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-500 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header({ locale, nav, phone, slots }: HeaderProps) {
  const pathname = usePathname();
  const { key: activeKey } = parsePath(pathname);
  const lenis = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (y > 200 && y > prev + 2) setHidden(true);
    else if (y < prev - 2 || y <= 200) setHidden(false);
  });

  useEffect(() => {
    if (menuOpen) lenis?.stop();
    else lenis?.start();
  }, [menuOpen, lenis]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const onDark = menuOpen;

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-wine px-5 py-3 text-sm text-paper transition-transform focus:translate-y-0"
      >
        {nav.skip}
      </a>

      <header
        style={{ viewTransitionName: "site-header" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[var(--ease-expo)]",
          hidden && !menuOpen && "-translate-y-full",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 border-b transition-all duration-500",
            scrolled && !menuOpen
              ? "border-ink/10 bg-paper/80 backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        />
        <div
          className={cn(
            "container-x relative flex items-center justify-between gap-6 transition-[height] duration-500",
            scrolled ? "h-[4.5rem]" : "h-20 lg:h-24",
          )}
        >
          <Link href={href(locale, "home")} onClick={close} aria-label={`DROP Bt. — ${nav.home}`} className="relative z-10 shrink-0">
            <Image
              src={logo}
              alt="DROP Bt."
              preload
              className={cn(
                "h-auto transition-[width,filter] duration-500",
                scrolled ? "w-[4.25rem]" : "w-[4.75rem] lg:w-[5.5rem]",
                onDark && "brightness-0 invert",
              )}
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navGroups.map((group) => (
              <NavDropdown
                key={group.id}
                label={nav.groups[group.id]}
                variants={slots[group.id]}
                pages={group.pages}
                locale={locale}
                nav={nav}
                activeKey={activeKey}
              />
            ))}
            {(["about", "contact"] as const).map((key) => (
              <Link
                key={key}
                href={href(locale, key)}
                aria-current={activeKey === key ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-2 text-[0.95rem] transition-colors xl:px-3.5",
                  activeKey === key ? "text-wine" : "hover:text-wine",
                )}
              >
                <StableLabel label={nav.pages[key]} variants={slots[key]} />
              </Link>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-4 lg:gap-6">
            <LanguageSwitcher label={nav.language} tone={onDark ? "paper" : "ink"} className="hidden sm:flex" />
            <Link
              href={href(locale, "contact")}
              className="group hidden items-center gap-2 whitespace-nowrap rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-sm text-paper transition-colors duration-500 hover:bg-wine xl:inline-flex"
            >
              <StableLabel label={nav.cta} variants={slots.cta} />
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper/10 transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={cn(
                "flex h-11 items-center gap-3 rounded-full pl-4 pr-1.5 text-sm transition-colors lg:hidden",
                onDark ? "bg-paper text-ink" : "bg-ink text-paper",
              )}
            >
              <StableLabel label={menuOpen ? nav.close : nav.menu} variants={slots.toggle} />
              <span className={cn("relative flex h-8 w-8 items-center justify-center rounded-full", onDark ? "bg-ink/10" : "bg-paper/15")}>
                <span
                  className={cn(
                    "absolute h-px w-3.5 bg-current transition-transform duration-500",
                    menuOpen ? "rotate-45" : "-translate-y-[3px]",
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-3.5 bg-current transition-transform duration-500",
                    menuOpen ? "-rotate-45" : "translate-y-[3px]",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={nav.menu}
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="on-dark fixed inset-0 z-40 flex flex-col overflow-y-auto bg-night pt-28 text-paper lg:hidden"
            data-lenis-prevent
          >
            <div className="container-x flex flex-1 flex-col">
              {navGroups.map((group, gi) => (
                <div key={group.id} className="mb-8">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + gi * 0.1 }}
                    className="eyebrow mb-3 text-paper/45"
                  >
                    {nav.groups[group.id]}
                  </motion.p>
                  <ul>
                    {group.pages.map((key, i) => (
                      <li key={key} className="overflow-hidden">
                        <motion.div
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.8, ease: EASE, delay: 0.25 + gi * 0.15 + i * 0.05 }}
                        >
                          <Link
                            href={href(locale, key)}
                            onClick={close}
                            className={cn(
                              "block py-1 font-serif text-[2.6rem] leading-[1.05] tracking-tight sm:text-6xl",
                              activeKey === key ? "italic text-wine-3" : "text-paper",
                            )}
                          >
                            {nav.pages[key]}
                          </Link>
                        </motion.div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <ul className="mb-10 flex flex-wrap gap-x-8 gap-y-2">
                {(["about", "contact"] as const).map((key) => (
                  <li key={key}>
                    <Link
                      href={href(locale, key)}
                      onClick={close}
                      className={cn("font-serif text-3xl", activeKey === key ? "italic text-wine-3" : "text-paper")}
                    >
                      {nav.pages[key]}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-4 border-t border-paper/15 py-8 text-sm text-paper/70 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                  <a href="mailto:info@drop-bt.eu" className="py-1.5 text-paper">info@drop-bt.eu</a>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="py-1.5">{phone}</a>
                </div>
                <LanguageSwitcher label={nav.language} tone="paper" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
