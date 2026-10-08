# Tarlo Electrical Connections

Marketing site for Harry Betts, a licensed electrician on Sydney's Northern Beaches.

Plain HTML, CSS and JavaScript. No build step and no dependencies.

## Run locally

```bash
npm run dev
```

Then open http://localhost:3000. You can also run `python3 -m http.server 3000`, or just open `index.html` in a browser.

## Structure

```
index.html          page markup
css/styles.css      design tokens (from the Figma file) and all styles
js/main.js          hero dot grid, sticky header, mobile menu, reviews, FAQ, form chips, scroll reveal
assets/             logo, favicon, Lucide icons from Figma, images/harry.jpg
```

## Before launch

- Replace the placeholders in square brackets: `[PHONE]`, `[EMAIL]`, `[HOURS]`, `[ABN]`, the reviews, the Google rating and three FAQ answers.
- Licence No. `123456C` is a placeholder from the Figma file.
- Connect the contact form, for example with Formspree or a Vercel serverless function using Resend. It only shows a thank-you message at the moment.
- Swap `assets/images/harry.jpg` for a real photo of Harry (it's a stand-in, 500×750).

## Deploy

This is a static site, so Vercel can import the repo as-is. Use framework preset "Other", no build command, output directory `.`.
