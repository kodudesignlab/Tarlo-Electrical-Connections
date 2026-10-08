# Tarlo Electrical Connections

Website for Harry Betts, a licensed electrician on Sydney's Northern Beaches. Content is managed in Sanity.

```
studio/   Sanity Studio: where Harry edits content (hosted at tarlo.sanity.studio)
web/      Next.js site: reads content from Sanity and is deployed on Vercel
```

- Sanity project: `uzwm237q`, dataset `production`
- The previous static HTML version is kept as the git tag `v1-static`

## Run locally

```bash
cd web && npm install && npm run dev      # site on http://localhost:3000
cd studio && npm install && npm run dev   # Studio on http://localhost:3333
```

## How content updates work

- Harry edits **Homepage** or **Contact & business details** in the Studio and clicks **Publish**.
- The site re-fetches from Sanity at most once a minute (`revalidate = 60` in `web/app/page.tsx`), so changes go live within about 60 seconds. No redeploy is needed.
- If a field is left empty, the site falls back to the defaults in `web/lib/content.ts`. A section never renders blank.
- Layout and styling live in code (`web/app/globals.css`, `web/components/`), so content edits can't break the design.

## Deploy

**Website (Vercel):** import this repo, set **Root Directory** to `web`, and keep the Next.js preset. No environment variables are needed: the project ID and dataset have defaults in `web/lib/sanity.ts`. You can override them with `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.

**Studio:** run `cd studio && npm run deploy`, which publishes it to https://tarlo.sanity.studio. Then invite Harry as an **Editor** in sanity.io/manage → project → Members.

## Seed content

`studio/seed/build-seed.mjs` turns `web/lib/content.ts` into `seed/content.ndjson`, including uploading Harry's photo. The initial import is already done. Only re-run it to reset everything; it overwrites Harry's edits:

```bash
cd studio && node seed/build-seed.mjs && npm run seed
```

## Before launch

- Fill in the placeholders in the Studio: phone, email, hours, ABN, licence no., reviews, Google rating and three FAQ answers.
- Connect the contact form (for example a route handler + Resend, or Formspree). It only shows a thank-you message at the moment.
- Replace Harry's stand-in photo (500×750) in Studio → Homepage → About.
