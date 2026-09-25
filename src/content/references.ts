import type { StaticImageData } from "next/image";

import biomillFlyer from "@/assets/ref/biomill-flyer.jpg";
import biomillPoster from "@/assets/ref/biomill-poster.jpg";
import brochureDe from "@/assets/ref/brochure-de.jpg";
import bugnateseGold from "@/assets/ref/bugnatese-gold.jpg";
import bugnateseKobuk from "@/assets/ref/bugnatese-kobuk-2020.jpg";
import calendar2010 from "@/assets/ref/calendar-2010.jpg";
import calendar2012 from "@/assets/ref/calendar-2012.jpg";
import dhLibrary from "@/assets/ref/dh-library-2018.jpg";
import diaryCover from "@/assets/ref/diary-cover.jpg";
import elearningLogo from "@/assets/ref/elearning-logo.jpg";
import erste from "@/assets/ref/erste-annual-report.jpg";
import eurican from "@/assets/ref/eurican-brochure.jpg";
import faces from "@/assets/ref/faces-collage.jpg";
import flowers from "@/assets/ref/flowers-catalogue.jpg";
import frontlineBrochure from "@/assets/ref/frontline-brochure.jpg";
import frontlinePoster from "@/assets/ref/frontline-poster.jpg";
import gsk from "@/assets/ref/gsk-manual.jpg";
import hipp from "@/assets/ref/hipp-poster.jpg";
import hyoresp from "@/assets/ref/hyoresp-ad.jpg";
import infusion from "@/assets/ref/infusion-flyer.jpg";
import ivomec from "@/assets/ref/ivomec-brochure.jpg";
import martialArts from "@/assets/ref/martial-arts-poster.jpg";
import nambatu from "@/assets/ref/nambatu-poster.jpg";
import photoLayout from "@/assets/ref/photo-layout.jpg";
import redNose from "@/assets/ref/red-nose-card.jpg";
import sopro2007 from "@/assets/ref/sopro-catalogue-2007.jpg";
import sopro2021 from "@/assets/ref/sopro-catalogue-2021.jpg";
import soproSolitar from "@/assets/ref/sopro-solitar.jpg";
import stoCatalogue from "@/assets/ref/sto-catalogue.jpg";
import stoMurisol from "@/assets/ref/sto-murisol.jpg";
import stoPhotosan from "@/assets/ref/sto-photosan.jpg";
import stoPricelist from "@/assets/ref/sto-pricelist-2003.jpg";
import victus from "@/assets/ref/victus-invitation.jpg";
import wombatBanner from "@/assets/ref/wombat-banner.jpg";
import wombatCatalogue from "@/assets/ref/wombat-catalogue.jpg";

export const referenceCategories = [
  "catalogues",
  "brochures",
  "posters",
  "editorial",
  "calendars",
] as const;
export type ReferenceCategory = (typeof referenceCategories)[number];

export type Reference = {
  id: string;
  image: StaticImageData;
  category: ReferenceCategory;
  /** Client or project name, shown as the caption. Language-neutral. */
  client?: string;
  year?: string;
};

// Ordered for a pleasing mix of formats and colours in the gallery.
export const references: Reference[] = [
  { id: "bugnatese-gold", image: bugnateseGold, category: "catalogues", client: "Bugnatese" },
  { id: "sopro-2021", image: sopro2021, category: "catalogues", client: "Sopro", year: "2021" },
  { id: "infusion", image: infusion, category: "brochures", client: "InFusion Trio", year: "2015" },
  { id: "gsk", image: gsk, category: "editorial", client: "GlaxoSmithKline" },
  { id: "sto-murisol", image: stoMurisol, category: "brochures", client: "Sto" },
  { id: "hipp", image: hipp, category: "posters", client: "HiPP" },
  { id: "dh-library", image: dhLibrary, category: "editorial", client: "Dunaharaszti Városi Könyvtár", year: "2018" },
  { id: "frontline-poster", image: frontlinePoster, category: "posters", client: "Frontline · Merial" },
  { id: "bugnatese-kobuk", image: bugnateseKobuk, category: "catalogues", client: "Bugnatese", year: "2020" },
  { id: "erste", image: erste, category: "editorial", client: "Erste Bank", year: "2001" },
  { id: "calendar-2010", image: calendar2010, category: "calendars", client: "József Attila Művelődési Ház", year: "2010" },
  { id: "eurican", image: eurican, category: "brochures", client: "Eurican · Merial" },
  { id: "martial-arts", image: martialArts, category: "posters" },
  { id: "sopro-2007", image: sopro2007, category: "catalogues", client: "Sopro", year: "2007" },
  { id: "wombat-catalogue", image: wombatCatalogue, category: "catalogues", client: "Wombat Studios" },
  { id: "victus", image: victus, category: "calendars", client: "Victus Hungária", year: "2010" },
  { id: "sto-catalogue", image: stoCatalogue, category: "catalogues", client: "Sto" },
  { id: "biomill-poster", image: biomillPoster, category: "posters", client: "BiOMill" },
  { id: "flowers", image: flowers, category: "catalogues" },
  { id: "brochure-de", image: brochureDe, category: "brochures" },
  { id: "frontline-brochure", image: frontlineBrochure, category: "brochures", client: "Frontline · Merial" },
  { id: "red-nose", image: redNose, category: "calendars", client: "Piros Orr Alapítvány" },
  { id: "sopro-solitar", image: soproSolitar, category: "brochures", client: "Sopro" },
  { id: "nambatu", image: nambatu, category: "posters", client: "Wombat Studios" },
  { id: "calendar-2012", image: calendar2012, category: "calendars", year: "2012" },
  { id: "ivomec", image: ivomec, category: "brochures", client: "Ivomec · Merial" },
  { id: "sto-pricelist", image: stoPricelist, category: "catalogues", client: "Sto", year: "2003" },
  { id: "diary", image: diaryCover, category: "editorial" },
  { id: "hyoresp", image: hyoresp, category: "posters", client: "Hyoresp · Merial" },
  { id: "sto-photosan", image: stoPhotosan, category: "brochures", client: "Sto" },
  { id: "elearning", image: elearningLogo, category: "editorial", client: "e-Learning" },
  { id: "biomill-flyer", image: biomillFlyer, category: "brochures", client: "BiOMill" },
  { id: "photo-layout", image: photoLayout, category: "editorial" },
  { id: "wombat-banner", image: wombatBanner, category: "posters", client: "Wombat Studios" },
  { id: "faces", image: faces, category: "editorial" },
];

/** Higher-resolution pieces that hold up at large sizes (home page rail, service previews). */
export const featuredReferenceIds = [
  "bugnatese-gold",
  "sopro-2021",
  "infusion",
  "sto-murisol",
  "dh-library",
  "martial-arts",
  "bugnatese-kobuk",
  "calendar-2010",
  "sopro-2007",
];

export const featuredReferences = featuredReferenceIds
  .map((id) => references.find((r) => r.id === id))
  .filter((r): r is Reference => Boolean(r));
