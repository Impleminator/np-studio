import {link} from './objects/link'
import {heroLink} from './objects/heroLink'
import {page} from './page'
import {category} from './category'
import {location} from './location'
import {event} from './event'
import {hero} from './sections/hero'
import {textBlock} from './sections/textBlock'
import {imageSection} from './sections/imageSection'
import {cta} from './sections/cta'
import {columns} from './sections/columns'
import {eventsSection} from './sections/eventsSection'
import {siteSettings} from './siteSettings'

export const schemaTypes = [
  // Documents
  page,
  siteSettings,
  category,
  location,
  event,
  // Objects (used inside documents)
  link,
  heroLink,
  // Section blocks (used in page.sections)
  hero,
  textBlock,
  imageSection,
  cta,
  columns,
  eventsSection,
]
