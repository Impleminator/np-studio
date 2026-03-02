import {defineField, defineType} from 'sanity'

export const heroLink = defineType({
  name: 'heroLink',
  title: 'Hero call to action',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'linkType',
      title: 'Link to',
      type: 'string',
      options: {
        list: [
          {title: 'URL', value: 'url'},
          {title: 'Page', value: 'page'},
        ],
        layout: 'radio',
      },
      initialValue: 'url',
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      description: 'External URL (e.g. https://...) or path (e.g. /about)',
      hidden: ({parent}) => parent?.linkType !== 'url',
    }),
    defineField({
      name: 'internal',
      title: 'Page',
      type: 'reference',
      to: [{type: 'page'}],
      hidden: ({parent}) => parent?.linkType !== 'page',
    }),
  ],
})

