import {defineField, defineType} from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link to',
      type: 'string',
      options: {
        list: [
          {title: 'URL', value: 'url'},
          {title: 'Page', value: 'page'},
          {title: 'Media file', value: 'file'},
        ],
        layout: 'radio',
      },
      initialValue: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      description: 'External URL (e.g. https://...) or path (e.g. /about)',
      hidden: ({parent}) => parent?.linkType !== 'url',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {linkType?: string}
          if (parent?.linkType === 'url' && !value) return 'URL is required'
          return true
        }),
    }),
    defineField({
      name: 'internal',
      title: 'Page',
      type: 'reference',
      to: [{type: 'page'}],
      hidden: ({parent}) => parent?.linkType !== 'page',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {linkType?: string}
          if (parent?.linkType === 'page' && !value) return 'Please select a page'
          return true
        }),
    }),
    defineField({
      name: 'mediaFile',
      title: 'Media file',
      type: 'file',
      options: {
        storeOriginalFilename: true,
      },
      hidden: ({parent}) => parent?.linkType !== 'file',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {linkType?: string}
          if (parent?.linkType === 'file' && !value) return 'Please select a file'
          return true
        }),
    }),
  ],
})
