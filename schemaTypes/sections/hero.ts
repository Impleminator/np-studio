import {defineField, defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'cta',
      title: 'Call to action',
      type: 'heroLink',
    }),
  ],
  preview: {
    select: {heading: 'heading'},
    prepare({heading}) {
      return {
        title: 'Hero',
        subtitle: heading,
      }
    },
  },
})
