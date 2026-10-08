import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Contact & business details',
  type: 'document',
  description: 'Used across the whole site — header, contact section and footer.',
  fields: [
    defineField({
      name: 'phone',
      title: 'Phone number',
      type: 'string',
      description: 'As you want it shown, e.g. 0412 345 678',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (r) => r.email(),
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'string',
      description: 'e.g. Mon–Fri 7am–4pm',
    }),
    defineField({
      name: 'area',
      title: 'Service area (short)',
      type: 'string',
      initialValue: 'Northern Beaches, NSW',
    }),
    defineField({name: 'licence', title: 'Licence number', type: 'string'}),
    defineField({name: 'abn', title: 'ABN', type: 'string'}),
    defineField({name: 'instagram', title: 'Instagram link', type: 'url'}),
  ],
  preview: {prepare: () => ({title: 'Contact & business details'})},
})
