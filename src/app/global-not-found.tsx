import type { Metadata } from "next";
import { Inter_Tight, Newsreader } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const serif = Newsreader({
  variable: "--font-display-serif",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});
const sans = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "404 — DROP Bt.",
  description: "Page not found.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="grain">
        <main className="container-x flex min-h-dvh flex-col items-start justify-center">
          <p className="eyebrow text-ink-3">404</p>
          <h1 className="text-h1 mt-6">
            Page not <em className="accent">found</em>
          </h1>
          <p className="mt-6 text-ink-2">Oldal nem található · Seite nicht gefunden</p>
          <nav className="mt-10 flex gap-3 text-sm">
            {[
              ["/en", "English"],
              ["/de", "Deutsch"],
              ["/hu", "Magyar"],
            ].map(([path, label]) => (
              <Link key={path} href={path} className="rounded-full border border-ink/20 px-5 py-2.5 hover:bg-ink hover:text-paper">
                {label}
              </Link>
            ))}
          </nav>
        </main>
      </body>
    </html>
  );
}
