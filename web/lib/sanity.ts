import {createClient} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'
import {defaultContent, type SiteContent, type SanityImage} from './content'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uzwm237q'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-10-01',
  useCdn: true,
  perspective: 'published',
})

const builder = createImageUrlBuilder({projectId, dataset})
export const imageUrl = (img: SanityImage) => builder.image(img).auto('format')

const QUERY = `{
  "home": *[_id == "homePage"][0]{
    ...,
    aboutPhoto{ ..., alt, asset->{ _id, url, metadata { lqip, dimensions } } }
  },
  "settings": *[_id == "siteSettings"][0]
}`

type Raw = {home: Record<string, unknown> | null; settings: Record<string, unknown> | null}

// Field-by-field fallback: anything Harry hasn't filled in uses the defaults,
// so the site never renders an empty section while content is being set up.
function merge<T extends object>(base: T, incoming: Record<string, unknown> | null): T {
  if (!incoming) return base
  const out = {...base} as Record<string, unknown>
  for (const key of Object.keys(base)) {
    const v = incoming[key]
    if (v !== undefined && v !== null && v !== '') out[key] = v
  }
  return out as T
}

export async function getContent(): Promise<SiteContent> {
  try {
    const raw = await client.fetch<Raw>(QUERY, {}, {next: {revalidate: 60, tags: ['sanity']}})
    return {
      home: merge(defaultContent.home, raw?.home ?? null),
      settings: merge(defaultContent.settings, raw?.settings ?? null),
    }
  } catch (err) {
    console.error('Sanity fetch failed, using default content', err)
    return defaultContent
  }
}
