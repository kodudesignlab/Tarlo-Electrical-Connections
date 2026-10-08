// Builds seed/content.ndjson from the site's default content (web/lib/content.ts),
// so Sanity starts with exactly what's on the site today.
// Usage: node seed/build-seed.mjs && npm run seed
import {writeFileSync} from 'node:fs'
import {fileURLToPath, pathToFileURL} from 'node:url'
import {dirname, resolve} from 'node:path'
import {randomUUID} from 'node:crypto'

const here = dirname(fileURLToPath(import.meta.url))
const {defaultContent} = await import(pathToFileURL(resolve(here, '../../web/lib/content.ts')).href)

const key = () => randomUUID().replace(/-/g, '').slice(0, 12)
const withKeys = (arr, type) =>
  arr.map((item) => (typeof item === 'string' ? item : {_key: key(), _type: type, ...item}))

const {home, settings} = defaultContent
const photoPath = resolve(here, '../../web/public/assets/images/harry.jpg')

const homeDoc = {
  _id: 'homePage',
  _type: 'homePage',
  ...home,
  services: withKeys(home.services, 'service'),
  aboutStats: withKeys(home.aboutStats, 'stat'),
  steps: withKeys(home.steps, 'step'),
  reviews: withKeys(home.reviews, 'review'),
  faqs: withKeys(home.faqs, 'faq'),
  aboutPhoto: {
    _type: 'image',
    _sanityAsset: `image@${pathToFileURL(photoPath).href}`,
    alt: 'Harry Betts crouched on site, working on cabling',
  },
}

const settingsDoc = {_id: 'siteSettings', _type: 'siteSettings', ...settings}

writeFileSync(resolve(here, 'content.ndjson'), [homeDoc, settingsDoc].map((d) => JSON.stringify(d)).join('\n') + '\n')
console.log('Wrote seed/content.ndjson')
