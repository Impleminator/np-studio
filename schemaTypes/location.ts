import {defineField, defineType} from 'sanity'

export const location = defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Venue name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Location URL',
      type: 'url',
      description: 'Link to map or venue website',
    }),
  ],
  preview: {
    select: {name: 'name', city: 'city'},
    prepare({name, city}) {
      return {
        title: name || 'Unnamed location',
        subtitle: city ?? undefined,
      }
    },
  },
})
