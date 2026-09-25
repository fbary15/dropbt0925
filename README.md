# DROP Bt. — website

Relaunch of [drop-bt.eu](https://drop-bt.eu) in Next.js 16 (App Router, Turbopack), Tailwind CSS 4, Motion and Lenis.
Three languages with localized URLs: English (`/en`), German (`/de`) and Hungarian (`/hu`).

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all 24 pages are statically generated)
```

## Where things live

| What | Where |
| --- | --- |
| All copy (EN / DE / HU) | `src/i18n/dictionaries/{en,de,hu}.ts` — `*word*` renders as the wine italic accent |
| Page slugs per language, nav order | `src/i18n/config.ts` |
| Reference gallery (images, client, category) | `src/content/references.ts` + `src/assets/ref/` |
| Partner lists | `src/content/partners.ts` |
| Page layouts | `src/views/*View.tsx` |
| Reusable sections (hero, flow diagram, gallery, …) | `src/components/sections/` |
| Colours, type scale, utilities | `src/app/globals.css` |

- `/` redirects to the visitor's language (saved choice → `Accept-Language` → English), see `src/proxy.ts`.
- Old WordPress URLs (e.g. `/about_us/`, `/de/was_wir_tun/`) are permanently redirected in `next.config.ts`.
- `sitemap.xml`, `robots.txt`, hreflang alternates and per-language Open Graph images are generated automatically.
- Set `NEXT_PUBLIC_SITE_URL` if the site is served from a domain other than `https://drop-bt.eu`.
