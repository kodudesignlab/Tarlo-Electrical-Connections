# Tarlo Electrical Connections

Marketing site for Harry Betts, a licensed electrician on Sydney's Northern Beaches.

Built with [Astro](https://astro.build) as a fully static site and hosted on Cloudflare.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

`npm run build` writes the finished site to `dist/`, and `npm run preview` serves that build.

## Where things live

```
src/data/site.ts        ALL editable content: contact details, services, reviews, FAQs, suburbs, steps
src/pages/index.astro   the homepage, assembled from the sections below
src/components/         one file per section (Hero, Services, Reviews, Faq, Contact…)
src/layouts/Base.astro  <head>, fonts, global CSS + JS
src/styles/global.css   design tokens (from the Figma file) and all styles
src/scripts/main.js     dot grid, header, menu, marquee, reviews autoplay, FAQ, form chips, reveals
public/assets/          logos, favicon, Lucide icons, photos (served as-is)
wrangler.jsonc          Cloudflare config: serve dist/ as static files
.node-version           Node version for Cloudflare's build (Astro needs 22+)
```

Most edits only touch `src/data/site.ts`. For example, add a review to the `reviews` list and it appears in the slider with its own timer line, or add a suburb to `areas`.

## Contact form

Sent with [Web3Forms](https://web3forms.com): each enquiry is emailed to service@tarloelectrical.com.au, and replying goes straight to the customer. The access key is `web3formsKey` in `src/data/site.ts`.

## Deploy (Cloudflare)

Cloudflare builds from the GitHub repo on every push to `main`.

- Build command: `npm run build`
- Output directory: `dist`
- Workers projects also need a deploy command: `npx wrangler deploy`. It uses `wrangler.jsonc`.

## Before launch

- Confirm the example suburb lists in `areaGroups` (`src/data/site.ts`) with Harry.
- **The four reviews are made-up samples.** Harry will add real reviews from his own clients (with their permission) before launch.
- Swap `public/assets/images/harry.jpg` for a real photo of Harry (it's a stand-in, 500×750).
