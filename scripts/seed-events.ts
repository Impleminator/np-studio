/**
 * Seed script: creates one category, three locations, and three example events
 * with descriptions. Run from studio directory:
 *   npx sanity exec scripts/seed-events.ts --with-user-token
 *
 * Requires being logged in (sanity login) so --with-user-token has effect.
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient().withConfig({apiVersion: '2024-01-01'})

/** Minimal portable text block (array of one paragraph) */
function blockContent(text: string) {
  return [
    {
      _type: 'block' as const,
      _key: 'seed-block',
      style: 'normal' as const,
      children: [{_type: 'span' as const, _key: 'a', text, marks: []}],
      markDefs: [],
    },
  ]
}

async function seed() {
  const categoryId = 'category-seed-feiringer'

  const category = await client.createOrReplace({
    _id: categoryId,
    _type: 'category',
    title: 'Feiringer',
    slug: {_type: 'slug', current: 'feiringer'},
    description: 'Feiring av årshjulet og særlige høytider.',
    color: '#3d5c3a',
  })
  console.log('Created category:', category.title)

  const locationIds = {
    oslo: 'location-seed-oslo',
    bergen: 'location-seed-bergen',
    tba: 'location-seed-tba',
  }

  await client.createOrReplace({
    _id: locationIds.oslo,
    _type: 'location',
    name: 'Utendørs plass',
    city: 'Oslo',
  })
  await client.createOrReplace({
    _id: locationIds.bergen,
    _type: 'location',
    name: 'Fellesskapslokale',
    city: 'Bergen',
  })
  await client.createOrReplace({
    _id: locationIds.tba,
    _type: 'location',
    name: 'TBA',
    city: 'Oslo',
  })
  console.log('Created 3 locations')

  const now = new Date()
  const inOneWeek = new Date(now)
  inOneWeek.setDate(inOneWeek.getDate() + 7)
  const inThreeWeeks = new Date(now)
  inThreeWeeks.setDate(inThreeWeeks.getDate() + 21)
  const inTwoMonths = new Date(now)
  inTwoMonths.setMonth(inTwoMonths.getMonth() + 2)

  const events = [
    {
      _id: 'event-seed-solhverv',
      title: 'Solverv – midtsommer',
      slug: {_type: 'slug', current: 'solverv-midsommer'},
      description: blockContent(
        'Vi feirer sommersolverv sammen med sang, felles måltid og ritual. Midtsommer er en av årshjulets store høytider – en dag for å takke solen og naturen. Alle er velkomne.'
      ),
      startDate: inOneWeek.toISOString(),
      endDate: new Date(inOneWeek.getTime() + 4 * 60 * 60 * 1000).toISOString(),
      allDay: false,
      featured: true,
      category: {_type: 'reference', _ref: categoryId},
      location: {_type: 'reference', _ref: locationIds.oslo},
    },
    {
      _id: 'event-seed-mabon',
      title: 'Mabon – høstjevndøgn',
      slug: {_type: 'slug', current: 'mabon-hostjevndogn'},
      description: blockContent(
        'Høstjevndøgn markerer likhet mellom dag og natt. Vi samles for å feire avlingen og ta farvel med sommeren. Et rolig og ettertenksomt arrangement med delt mat og felles samtale.'
      ),
      startDate: inThreeWeeks.toISOString(),
      allDay: true,
      featured: false,
      category: {_type: 'reference', _ref: categoryId},
      location: {_type: 'reference', _ref: locationIds.bergen},
    },
    {
      _id: 'event-seed-jul',
      title: 'Julefeiring',
      slug: {_type: 'slug', current: 'julefeiring'},
      description: blockContent(
        'Jul feires i fellesskap med tradisjoner som passer vår tro. Vi lyser lys, deler mat og historier, og markerer vintersolverv og håp om ny vekst. Sted blir bekreftet nærmere dato.'
      ),
      startDate: inTwoMonths.toISOString(),
      endDate: new Date(inTwoMonths.getTime() + 6 * 60 * 60 * 1000).toISOString(),
      allDay: false,
      featured: true,
      category: {_type: 'reference', _ref: categoryId},
      location: {_type: 'reference', _ref: locationIds.tba},
    },
  ]

  for (const event of events) {
    await client.createOrReplace({
      ...event,
      _type: 'event',
    })
    console.log('Created event:', event.title)
  }

  console.log('Done. 1 category, 3 locations and 3 events created/updated.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
