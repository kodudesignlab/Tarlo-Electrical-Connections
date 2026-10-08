import {homePage} from './homePage'
import {siteSettings} from './siteSettings'

export const schemaTypes = [homePage, siteSettings]

export const SINGLETONS = new Set(['homePage', 'siteSettings'])
