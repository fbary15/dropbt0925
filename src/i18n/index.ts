import "server-only";
import type { Locale } from "./config";
import en, { type Dictionary } from "./dictionaries/en";
import de from "./dictionaries/de";
import hu from "./dictionaries/hu";

const dictionaries: Record<Locale, Dictionary> = { en, de, hu };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
