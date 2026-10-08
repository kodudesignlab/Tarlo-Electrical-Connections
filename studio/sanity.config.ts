import {defineConfig} from 'sanity'
import {structureTool, type StructureResolver} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, SINGLETONS} from './schemaTypes'

// Two fixed documents instead of lists: Harry just opens "Homepage" or
// "Contact & business details" and edits — no creating or deleting.
const structure: StructureResolver = (S) =>
  S.list()
    .title('Tarlo website')
    .items([
      S.listItem()
        .title('Homepage')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage').title('Homepage')),
      S.listItem()
        .title('Contact & business details')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Contact & business details'),
        ),
    ])

export default defineConfig({
  name: 'default',
  title: 'Tarlo Electrical Connections',
  projectId: 'uzwm237q',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    // Hide singletons from the "Create new document" menu
    templates: (templates) => templates.filter(({schemaType}) => !SINGLETONS.has(schemaType)),
  },

  document: {
    // No duplicate / delete on singletons
    actions: (actions, {schemaType}) =>
      SINGLETONS.has(schemaType)
        ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})
