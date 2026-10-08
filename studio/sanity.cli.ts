import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'uzwm237q',
    dataset: 'production',
  },
  // Hosted at https://tarlo.sanity.studio after `npm run deploy`
  studioHost: 'tarlo',
  deployment: {
    appId: 'fo8xutup0hohg1nok4xl7169',
    autoUpdates: true,
  },
})
