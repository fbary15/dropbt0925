import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export const alt = "DROP Bt. — Communication, Design & E-Learning";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);
  const logo = await readFile(join(process.cwd(), "src/assets/site/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4efe7",
          padding: "72px 80px",
          color: "#1c1714",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={242} height={136} alt="" />
          <div style={{ display: "flex", gap: 16, fontSize: 22, letterSpacing: 4, color: "#7a716a" }}>EN · DE · HU</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -2, maxWidth: 980 }}>
            {dict.meta.pages.home.title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 36, fontSize: 28, color: "#6c0a15" }}>
            <div style={{ width: 56, height: 4, background: "#6c0a15" }} />
            {dict.meta.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
