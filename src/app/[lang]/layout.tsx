import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Serif, Inter_Tight } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header, type HeaderSlots } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { htmlLang, isLocale, locales, siteUrl } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import "../globals.css";

const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: meta.defaultTitle, template: `%s — ${meta.siteName}` },
    description: meta.pages.home.description,
    applicationName: meta.siteName,
    authors: [{ name: meta.siteName }],
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#f4efe7",
  colorScheme: "light",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const navs = locales.map((l) => getDictionary(l).nav);
  const headerSlots: HeaderSlots = {
    design: navs.map((n) => n.groups.design),
    learning: navs.map((n) => n.groups.learning),
    about: navs.map((n) => n.pages.about),
    contact: navs.map((n) => n.pages.contact),
    cta: navs.map((n) => n.cta),
    toggle: navs.flatMap((n) => [n.menu, n.close]),
  };

  return (
    <html
      lang={htmlLang[lang]}
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="grain min-h-dvh">
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
        {/* Hide the intro before first paint on repeat visits in the same session. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("drop-intro")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro-seen")}catch(e){}`,
          }}
        />
        <SmoothScroll>
          <Preloader />
          <Header locale={lang} nav={dict.nav} phone={dict.contact.phone} slots={headerSlots} />
          <main id="main">{children}</main>
          <Footer locale={lang} dict={dict} />
        </SmoothScroll>
      </body>
    </html>
  );
}
