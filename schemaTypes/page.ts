import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {collapsible: true},
      fields: [
        {name: 'metaTitle', title: 'Meta title', type: 'string'},
        {name: 'metaDescription', title: 'Meta description', type: 'text', rows: 3},
        {name: 'ogImage', title: 'OG image', type: 'image'},
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {type: 'hero'},
        {type: 'textBlock'},
        {type: 'imageSection'},
        {type: 'cta'},
        {type: 'columns'},
        {type: 'eventsSection'},
      ],
    }),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current'},
    prepare({title, slug}) {
      return {
        title,
        subtitle: slug ? `/${slug}` : undefined,
      }
    },
  },
})
