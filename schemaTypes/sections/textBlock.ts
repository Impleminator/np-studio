import {defineField, defineType} from 'sanity'

export const textBlock = defineType({
  name: 'textBlock',
  title: 'Text block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {heading: 'heading'},
    prepare({heading}) {
      return {
        title: 'Text block',
        subtitle: heading,
      }
    },
  },
})
