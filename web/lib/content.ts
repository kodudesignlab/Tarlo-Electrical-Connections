// Content shape shared by the site and the Sanity seed.
// These defaults are what the site shows until a field is filled in Sanity.

export type SanityImage = {
  _type?: 'image'
  alt?: string
  asset?: {_id?: string; _ref?: string; url?: string; metadata?: {lqip?: string; dimensions?: {width: number; height: number}}}
  hotspot?: {x: number; y: number; width: number; height: number}
  crop?: {top: number; bottom: number; left: number; right: number}
}

export type Service = {name: string; icon: string}
export type Stat = {label: string; value: string}
export type Step = {title: string; body: string}
export type Review = {quote: string; name: string; suburb: string; job: string}
export type Faq = {question: string; answer: string}

export type HomePage = {
  heroEyebrow: string
  heroHeading: string
  heroIntro: string
  infoBar: string[]
  servicesHeading: string
  servicesIntro: string
  services: Service[]
  aboutHeading: string
  aboutBody: string
  aboutPhoto: SanityImage | null
  aboutCaption: string
  aboutStats: Stat[]
  processHeading: string
  steps: Step[]
  reviewsHeading: string
  reviewsRating: string
  reviews: Review[]
  areasHeading: string
  areasIntro: string
  areas: string[]
  faqHeading: string
  faqs: Faq[]
  faqHelpTitle: string
  faqHelpText: string
  contactHeading: string
  contactIntro: string
}

export type SiteSettings = {
  phone: string
  email: string
  hours: string
  area: string
  licence: string
  abn: string
  instagram: string
}

export type SiteContent = {home: HomePage; settings: SiteSettings}

export const defaultContent: SiteContent = {
  home: {
    heroEyebrow: 'Licensed electrician / Northern Beaches',
    heroHeading: 'Electrical work, done properly.',
    heroIntro:
      "I'm Harry Betts. I run Tarlo on my own across the Northern Beaches — fixed quotes, same-day callbacks, and a site left the way I found it.",
    infoBar: [
      'Licence No. 123456C',
      'Fully insured',
      '10 years in the trade',
      'Northern Beaches based',
      'Card & bank transfer accepted',
      'Fixed quotes, no surprises',
    ],
    servicesHeading: 'Our Services',
    servicesIntro: 'Homes and small commercial. Tap a service to start a quote.',
    services: [
      {name: 'Switchboard & safety switch upgrades', icon: 'sliders'},
      {name: 'Powerpoints & lighting', icon: 'plug'},
      {name: 'Ceiling fans', icon: 'fan'},
      {name: 'Smoke alarms', icon: 'alarm'},
      {name: 'Fault finding', icon: 'power-off'},
      {name: 'Renovation rewires', icon: 'house-wifi'},
      {name: 'Hot water systems', icon: 'house-wifi'},
      {name: 'EV charger installs', icon: 'ev'},
    ],
    aboutHeading: 'Same bloke, every job',
    aboutBody:
      "I'm Harry Betts. I run Tarlo Electrical Connections on my own across the Northern Beaches, and I've been in the trade for 10 years. When you book a job, I'm the one who turns up, does the work and signs off on it. No unsupervised apprentices, no subcontractors you've never met.\n\nI answer my own phone. If I'm up a ladder I'll call you back the same day. You get a fixed price before I start, and the site gets left the way I found it.",
    aboutPhoto: null,
    aboutCaption: 'Harry Betts — Owner & electrician',
    aboutStats: [
      {label: 'In the trade', value: '10 yrs'},
      {label: 'Licence', value: 'NSW'},
      {label: 'Insured', value: 'Fully'},
    ],
    processHeading: 'How we work',
    steps: [
      {title: 'Call or send photos', body: 'Ring me, or text a photo of the switchboard or the job. Most things I can price off a picture.'},
      {title: 'Fixed quote up front', body: 'You get a price before I start. If something unexpected turns up behind the wall, we talk about it first.'},
      {title: 'Job done, site clean', body: 'Work tested, certificate of compliance issued, mess taken with me.'},
    ],
    reviewsHeading: 'Word around the Beaches',
    reviewsRating: '[X.X] on Google / [N] reviews',
    reviews: [
      {quote: '[Featured review 1 — one or two sentences, in the client’s own words.]', name: '[Client name]', suburb: '[Suburb]', job: '[Job type]'},
      {quote: '[Review 2 — one or two sentences, in the client’s own words.]', name: '[Client name]', suburb: '[Suburb]', job: '[Job type]'},
      {quote: '[Review 3 — one or two sentences, in the client’s own words.]', name: '[Client name]', suburb: '[Suburb]', job: '[Job type]'},
      {quote: '[Review 4 — one or two sentences, in the client’s own words.]', name: '[Client name]', suburb: '[Suburb]', job: '[Job type]'},
    ],
    areasHeading: 'Where I work',
    areasIntro: "Manly to Palm Beach and everywhere in between. Not sure if you're covered? Just ask.",
    areas: ['Manly', 'Fairlight', 'Freshwater', 'Curl Curl', 'Brookvale', 'Dee Why', 'Collaroy', 'Narrabeen', 'Frenchs Forest', 'Mona Vale', 'Newport', 'Avalon', 'Palm Beach'],
    faqHeading: 'Frequently Asked Questions',
    faqs: [
      {question: 'Are you available after hours?', answer: '[Harry to confirm after-hours availability and rates.]'},
      {question: 'Do you charge a call-out fee?', answer: "No call-out fee for quoted work on the Northern Beaches. For diagnostic jobs there's a first-hour rate that I'll tell you on the phone before I book you in — no surprises when I get there."},
      {question: 'How soon can you get to me?', answer: '[Harry to confirm typical lead time — e.g. most jobs booked within the week, urgent faults sooner.]'},
      {question: 'What warranty do you offer?', answer: '[Harry to confirm workmanship warranty.]'},
      {question: 'Do I get a compliance certificate?', answer: 'Yes. Every job is tested and you get a Certificate of Compliance for Electrical Work where one is required.'},
      {question: 'Do you do commercial work?', answer: '[Harry to confirm the types of commercial work he takes on.]'},
    ],
    faqHelpTitle: 'Still not sure?',
    faqHelpText: "Send a photo of the job and I'll tell you straight whether it's a quick fix or a bigger one.",
    contactHeading: "Let's sort it out.",
    contactIntro: "Tell me about the job and I'll get back to you the same day. Photos help — I can often price straight off them.",
  },
  settings: {
    phone: '[PHONE]',
    email: '[EMAIL]',
    hours: '[HOURS]',
    area: 'Northern Beaches, NSW',
    licence: '123456C',
    abn: '[ABN]',
    instagram: 'https://instagram.com/',
  },
}
