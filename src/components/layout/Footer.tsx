import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/site/logo.png";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { href, navGroups, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { rich } from "@/lib/rich";
import { BackToTop } from "./BackToTop";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { nav, footer, contact, common } = dict;
  const year = new Date().getFullYear();
  const [first, second] = footer.tagline.split("! ");

  return (
    <footer className="on-dark relative overflow-hidden bg-night text-paper">
      {/* soft wine glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-wine/40 blur-[140px]"
      />

      <div className="container-x relative pt-24 pb-10 lg:pt-36">
        <p className="eyebrow mb-8 text-paper/50">{nav.cta}</p>
        <SplitLines
          as="p"
          className="text-mega max-w-[14ch]"
          lines={[`${first}!`, rich(second ?? "")]}
        />

        <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-12 lg:mt-28">
          <Reveal className="col-span-2 md:col-span-6 lg:col-span-5">
            <p className="eyebrow mb-4 text-paper/45">{common.writeUs}</p>
            <a
              href="mailto:info@drop-bt.eu"
              className="link-underline font-serif text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-tight"
            >
              info@drop-bt.eu
            </a>
            <p className="mt-6 text-paper/70">
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="link-underline">
                {contact.phone}
              </a>
            </p>
          </Reveal>

          {navGroups.map((group) => (
            <Reveal key={group.id} className={group.id === "design" ? "md:col-span-3" : "md:col-span-3 lg:col-span-2"} delay={0.08}>
              <p className="eyebrow mb-5 text-paper/45">{nav.groups[group.id]}</p>
              <ul className="space-y-2.5">
                {group.pages.map((key) => (
                  <li key={key}>
                    <Link href={href(locale, key)} className="link-underline text-paper/80 hover:text-paper">
                      {nav.pages[key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal className="col-span-1 md:col-span-3 lg:col-span-2" delay={0.16}>
            <p className="eyebrow mb-5 text-paper/45">{footer.companyNav}</p>
            <ul className="space-y-2.5">
              {(["about", "contact"] as const).map((key) => (
                <li key={key}>
                  <Link href={href(locale, key)} className="link-underline text-paper/80 hover:text-paper">
                    {nav.pages[key]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={href(locale, "contact", "imprint")} className="link-underline text-paper/80 hover:text-paper">
                  {footer.imprint}
                </Link>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-24 flex flex-col gap-8 border-t border-paper/15 pt-8 text-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-6">
            <Image src={logo} alt="DROP Bt." className="h-auto w-16 brightness-0 invert" />
            <div className="text-paper/55">
              <p>{footer.company}</p>
              <p>{footer.address}</p>
              <p>{footer.reg}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-paper/55">
            <p>
              © 1995–{year} DROP Bt. {footer.rights}
            </p>
            <LanguageSwitcher label={nav.language} tone="paper" />
            <BackToTop label={common.backToTop} />
          </div>
        </div>
      </div>
    </footer>
  );
}
