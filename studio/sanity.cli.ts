import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'uzwm237q',
    dataset: 'production',
  },
  // Hosted at https://tarlo.sanity.studio after `npm run deploy`
  studioHost: 'tarlo',
  deployment: {
    autoUpdates: true,
  },
})
