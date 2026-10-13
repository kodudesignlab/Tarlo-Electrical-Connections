// All the site's editable content lives here. Change it, save, and the page updates.

export const business = {
  name: 'Tarlo Electrical Connections',
  owner: 'Harry Betts',
  base: 'Brookvale',
  phone: '[PHONE]',
  email: '[EMAIL]',
  hours: '[HOURS]',
  area: 'Northern Beaches & greater Sydney',
  licence: '123456C', // placeholder from the Figma file
  abn: '[ABN]',
  instagram: 'https://instagram.com/',
};

/** "0412 345 678" -> "tel:0412345678" */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '') || phone}`;

export const nav = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'How we work' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQs' },
];

export const trustTicks = ['Licensed & fully insured', 'Fixed quotes, no surprises', 'Same-day callbacks'];

export const infoBar = [
  `Licence No. ${business.licence}`,
  'Fully insured',
  '10 years in the trade',
  'Northern Beaches based',
  'Card & bank transfer accepted',
];

// Order matters: the bento layout places cards 1–7 in the Figma positions.
// Icons are files in public/assets/icons.
export const services = [
  { name: 'Switchboard & safety switch upgrades', icon: 'sliders' },
  { name: 'Powerpoints & lighting', icon: 'plug' },
  { name: 'Ceiling fans', icon: 'fan' },
  { name: 'Hot water systems', icon: 'house-wifi' },
  { name: 'Renovation rewires', icon: 'house-wifi' },
  { name: 'Smoke alarms', icon: 'alarm' },
  { name: 'Fault finding', icon: 'power-off' },
];

export const stats = [
  { label: 'In the trade', value: '10 yrs' },
  { label: 'Licence', value: 'NSW' },
  { label: 'Insured', value: 'Fully' },
];

export const steps = [
  { title: 'Call or send photos', body: 'Ring me, or text a photo of the switchboard or the job. Most things I can price off a picture.' },
  { title: 'Fixed quote up front', body: 'You get a price before I start. If something unexpected turns up behind the wall, we talk about it first.' },
  { title: 'Job done, site clean', body: 'Work tested, certificate of compliance issued, mess taken with me.' },
];

// SAMPLE REVIEWS (made up for the design). Harry will swap these for real reviews
// from his own clients (with their OK) — invented reviews can't go live under
// Australian Consumer Law.
export const reviews = [
  { quote: 'Harry rewired our kitchen mid-reno and worked around the builder without a single hold-up. The quote was spot on and he left the place spotless.', name: 'Sophie M.', suburb: 'Freshwater', job: 'Renovation rewire' },
  { quote: 'Our safety switch kept tripping at night. Harry found the fault in twenty minutes, explained exactly what was going on and didn’t try to upsell us.', name: 'Dan K.', suburb: 'Dee Why', job: 'Fault finding' },
  { quote: 'Switchboard upgrade plus a few extra powerpoints. Turned up when he said he would, fixed price, no surprises. Exactly what you want from a sparky.', name: 'Priya R.', suburb: 'Manly', job: 'Switchboard upgrade' },
  { quote: 'Four ceiling fans and new downlights through the house. Super tidy, easy to deal with, and he replied to every text the same day.', name: 'Tom & Jess', suburb: 'Avalon', job: 'Fans & lighting' },
];

export const areas = ['Manly', 'Fairlight', 'Freshwater', 'Curl Curl', 'Brookvale', 'Dee Why', 'Collaroy', 'Narrabeen', 'Frenchs Forest', 'Mona Vale', 'Newport', 'Avalon', 'Palm Beach'];

export const faqs = [
  { q: 'Do you charge a call-out fee?', a: "No call-out fee for quoted work on the Northern Beaches. For diagnostic jobs there's a first-hour rate that I'll tell you on the phone before I book you in — no surprises when I get there." },
  { q: 'Are you available after hours?', a: '[Harry to confirm after-hours availability and rates.]' },
  { q: 'How soon can you get to me?', a: '[Harry to confirm typical lead time — e.g. most jobs booked within the week, urgent faults sooner.]' },
  { q: 'What warranty do you offer?', a: '[Harry to confirm workmanship warranty.]' },
  { q: 'Do I get a compliance certificate?', a: 'Yes. Every job is tested and you get a Certificate of Compliance for Electrical Work where one is required.' },
  { q: 'Do you do commercial work?', a: '[Harry to confirm the types of commercial work he takes on.]' },
];
