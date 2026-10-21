// All the site's editable content lives here. Change it, save, and the page updates.
// Source: Harry's website questionnaire (Oct 2026).

export const business = {
  name: 'Tarlo Electrical Connections',
  owner: 'Harry Betts',
  phone: '0432 818 359',
  email: 'service@tarloelectrical.com.au',
  hours: '24/7, including emergencies',
  area: 'Northern Beaches, lower north shore & eastern suburbs',
  licence: '382644C',
  abn: '84 515 355 920',
  yearsInTrade: 9,
  yearsInBusiness: 3,
};

// Web3Forms access key for the contact form. Enquiries are emailed to
// service@tarloelectrical.com.au. Public by design: it can only send to that inbox.
export const web3formsKey = '5fcd512e-e3ce-49b4-b43b-ff1f672e28ef';

/** "0432 818 359" -> "tel:0432818359" */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '') || phone}`;
/** Text message link */
export const smsHref = (phone: string) => `sms:${phone.replace(/[^\d+]/g, '') || phone}`;

export const nav = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'How we work' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQs' },
];

export const trustTicks = ['Licensed & fully insured', 'Free quotes', '24/7 emergency call-outs'];

export const infoBar = [
  `Licence No. ${business.licence}`,
  'Fully insured',
  `${business.yearsInTrade} years in the trade`,
  'Available 24/7',
  'Free quotes',
  'Card & bank transfer accepted',
];

// Order matters: the bento layout places cards 1–7 in the Figma positions.
// Icons are files in public/assets/icons.
export const services = [
  { name: 'Switchboard upgrades', icon: 'sliders', desc: 'A modern switchboard and safety switches to keep you, your family and your home safe.' },
  { name: 'Power points', icon: 'plug', desc: 'Power points wear over time and can become unsafe. Replaced, added or moved.' },
  { name: 'Ceiling fans', icon: 'fan', desc: 'Nobody likes sleeping hot. New fans installed and wired properly.' },
  { name: 'Lighting installs', icon: 'lightbulb', desc: 'Swap old fittings for LEDs: better light, lower power use and smaller bills.' },
  { name: 'EV chargers', icon: 'ev', desc: 'Home charger installs, ready for the car you have now or the one you’re getting next.' },
  { name: 'Smoke alarms', icon: 'alarm', desc: 'You need to know the moment there’s a fire. Installed and tested.' },
  { name: 'Fault finding & repairs', icon: 'power-off', desc: 'No power or lights? Tracking down faults is Harry’s favourite job.' },
];

export const stats = [
  { label: 'In the trade', value: `${business.yearsInTrade} yrs` },
  { label: 'Running Tarlo', value: `${business.yearsInBusiness} yrs` },
  { label: 'Available', value: '24/7' },
];

export const steps = [
  { title: 'Call, text or send photos', body: 'Ring or text me any time, or send a photo of the switchboard or the job. Most things I can price off a picture.' },
  { title: 'Free quote up front', body: 'You get a price before I start. If something unexpected turns up behind the wall, we talk about it first.' },
  { title: 'Job done, site clean', body: 'On time, work tested, certificate of compliance issued, and the mess taken with me.' },
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

// Harry covers all three regions; the Northern Beaches and eastern suburbs are
// where he most wants work, so they lead. Suburb lists are examples to confirm with Harry.
export const areaGroups = [
  { region: 'Northern Beaches', suburbs: ['Manly', 'Freshwater', 'Curl Curl', 'Dee Why', 'Collaroy', 'Narrabeen', 'Mona Vale', 'Newport', 'Avalon', 'Palm Beach', 'Brookvale', 'Frenchs Forest'] },
  { region: 'Eastern Suburbs', suburbs: ['Bondi', 'Bronte', 'Coogee', 'Randwick', 'Double Bay', 'Paddington', 'Rose Bay', 'Vaucluse'] },
  { region: 'Lower North Shore', suburbs: ['Mosman', 'Neutral Bay', 'Cremorne', 'Kirribilli', 'North Sydney', 'Crows Nest'] },
];

export const faqs = [
  { q: 'How much does a call-out cost?', a: 'Every job is different, so give me a call and I’ll talk you through pricing before I book you in. Quotes are always free.' },
  { q: 'How soon can you get to me?', a: 'Usually the same day, often within hours depending on where I am.' },
  { q: 'Are you available after hours?', a: 'Yes. I’m available 24/7, including after-hours and emergency call-outs.' },
  { q: 'What size jobs do you do?', a: 'Everything, from a single power point to a full switchboard upgrade.' },
  { q: 'Do you do commercial work?', a: 'Mainly residential, but I have commercial experience and look after a couple of commercial properties.' },
  { q: 'Do you install solar?', a: 'No, I don’t do solar. Everything else electrical around the home, I can help with.' },
  { q: 'Is your work guaranteed?', a: 'Yes. I turn up on time, clean up after myself and stand behind every job I do.' },
  { q: 'Do I get a compliance certificate?', a: 'Yes. Every job is tested and you get a Certificate of Compliance for Electrical Work where one is required.' },
];
