import {defineArrayMember, defineField, defineType} from 'sanity'

// Keys must match the icons in web/public/assets/icons
const SERVICE_ICONS = [
  {title: 'Switchboard (sliders)', value: 'sliders'},
  {title: 'Power point (plug)', value: 'plug'},
  {title: 'Ceiling fan', value: 'fan'},
  {title: 'Smoke alarm', value: 'alarm'},
  {title: 'Fault (power off)', value: 'power-off'},
  {title: 'House', value: 'house-wifi'},
  {title: 'EV charger', value: 'ev'},
]

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'trust', title: 'Yellow bar'},
    {name: 'services', title: 'Services'},
    {name: 'about', title: 'About'},
    {name: 'process', title: 'How we work'},
    {name: 'reviews', title: 'Reviews'},
    {name: 'areas', title: 'Service area'},
    {name: 'faq', title: 'FAQ'},
    {name: 'contact', title: 'Contact'},
  ],
  fields: [
    // Hero
    defineField({name: 'heroEyebrow', title: 'Small line above heading', type: 'string', group: 'hero'}),
    defineField({
      name: 'heroHeading',
      title: 'Main heading',
      type: 'string',
      group: 'hero',
      validation: (r) => r.required().max(60),
    }),
    defineField({name: 'heroIntro', title: 'Intro text', type: 'text', rows: 3, group: 'hero'}),

    // Trust bar
    defineField({
      name: 'infoBar',
      title: 'Scrolling yellow bar',
      description: 'Short points like “Fully insured”. Drag to reorder.',
      type: 'array',
      group: 'trust',
      of: [defineArrayMember({type: 'string'})],
    }),

    // Services
    defineField({name: 'servicesHeading', title: 'Heading', type: 'string', group: 'services'}),
    defineField({name: 'servicesIntro', title: 'Intro', type: 'string', group: 'services'}),
    defineField({
      name: 'services',
      title: 'Services',
      description: 'Shown 4 per row on desktop. Drag to reorder.',
      type: 'array',
      group: 'services',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'service',
          fields: [
            defineField({name: 'name', title: 'Service', type: 'string', validation: (r) => r.required()}),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {list: SERVICE_ICONS, layout: 'dropdown'},
              initialValue: 'plug',
            }),
          ],
          preview: {select: {title: 'name', subtitle: 'icon'}},
        }),
      ],
    }),

    // About
    defineField({name: 'aboutHeading', title: 'Heading', type: 'string', group: 'about'}),
    defineField({
      name: 'aboutBody',
      title: 'Text',
      description: 'Leave a blank line between paragraphs.',
      type: 'text',
      rows: 8,
      group: 'about',
    }),
    defineField({
      name: 'aboutPhoto',
      title: 'Photo',
      type: 'image',
      group: 'about',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Describe the photo', type: 'string'})],
    }),
    defineField({name: 'aboutCaption', title: 'Photo label', type: 'string', group: 'about'}),
    defineField({
      name: 'aboutStats',
      title: 'Quick facts',
      type: 'array',
      group: 'about',
      validation: (r) => r.max(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'value', title: 'Value', type: 'string'}),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
    }),

    // Process
    defineField({name: 'processHeading', title: 'Heading', type: 'string', group: 'process'}),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      group: 'process',
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'step',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'body', title: 'Text', type: 'text', rows: 3}),
          ],
        }),
      ],
    }),

    // Reviews
    defineField({name: 'reviewsHeading', title: 'Heading', type: 'string', group: 'reviews'}),
    defineField({
      name: 'reviewsRating',
      title: 'Rating line',
      description: 'e.g. 4.9 on Google / 32 reviews. Leave empty to hide.',
      type: 'string',
      group: 'reviews',
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      group: 'reviews',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'review',
          fields: [
            defineField({name: 'quote', title: 'Review', type: 'text', rows: 3, validation: (r) => r.required()}),
            defineField({name: 'name', title: 'Client name', type: 'string'}),
            defineField({name: 'suburb', title: 'Suburb', type: 'string'}),
            defineField({name: 'job', title: 'Job', type: 'string'}),
          ],
          preview: {select: {title: 'name', subtitle: 'quote'}},
        }),
      ],
    }),

    // Areas
    defineField({name: 'areasHeading', title: 'Heading', type: 'string', group: 'areas'}),
    defineField({name: 'areasIntro', title: 'Intro', type: 'text', rows: 2, group: 'areas'}),
    defineField({
      name: 'areas',
      title: 'Suburbs',
      type: 'array',
      group: 'areas',
      of: [defineArrayMember({type: 'string'})],
    }),

    // FAQ
    defineField({name: 'faqHeading', title: 'Heading', type: 'string', group: 'faq'}),
    defineField({
      name: 'faqs',
      title: 'Questions',
      type: 'array',
      group: 'faq',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faq',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'answer', title: 'Answer', type: 'text', rows: 4}),
          ],
          preview: {select: {title: 'question', subtitle: 'answer'}},
        }),
      ],
    }),
    defineField({name: 'faqHelpTitle', title: 'Help card title', type: 'string', group: 'faq'}),
    defineField({name: 'faqHelpText', title: 'Help card text', type: 'text', rows: 2, group: 'faq'}),

    // Contact
    defineField({name: 'contactHeading', title: 'Heading', type: 'string', group: 'contact'}),
    defineField({name: 'contactIntro', title: 'Intro', type: 'text', rows: 3, group: 'contact'}),
  ],
  preview: {prepare: () => ({title: 'Homepage'})},
})
