import type { NextConfig } from "next";

// Old WordPress URLs → new localized routes, so existing links and search
// results keep working after the relaunch.
const legacyRedirects: Array<[string, string]> = [
  ["/project_flow_en", "/en/project-flow"],
  ["/references", "/en/references"],
  ["/partners", "/en/partners"],
  ["/language_teaching", "/en/language-teaching"],
  ["/learning-types", "/en/learning-types"],
  ["/contact", "/en/contact"],
  ["/about_us", "/en/about-us"],
  ["/de/was_wir_tun", "/de"],
  ["/de/projekt_ablauf", "/de/projektablauf"],
  ["/de/unsere_partner", "/de/partner"],
  ["/de/uber_uns", "/de/ueber-uns"],
  ["/hu/mivel_foglalkozunk", "/hu"],
  ["/hu/megrendeles_folyamata", "/hu/megrendeles-folyamata"],
  ["/hu/tanulasi_tipusok", "/hu/tanulasi-tipusok"],
];

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
