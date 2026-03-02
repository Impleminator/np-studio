import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Site logo',
      type: 'image',
      options: {hotspot: true},
      description: 'Shown in the header. Leave empty to use the site title as text.',
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default meta description',
      type: 'text',
      rows: 3,
      description: 'Used when a page has no custom meta description',
    }),
    defineField({
      name: 'homepage',
      title: 'Homepage',
      type: 'reference',
      to: [{type: 'page'}],
      description: 'Select the page to use as the homepage',
    }),
    defineField({
      name: 'headerNav',
      title: 'Header navigation',
      type: 'array',
      of: [{type: 'link'}],
    }),
    defineField({
      name: 'footerNav',
      title: 'Footer navigation',
      type: 'array',
      of: [{type: 'link'}],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site settings',
      }
    },
  },
})
