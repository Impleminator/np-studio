import {defineField, defineType} from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
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
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color for calendar display (e.g. #FF5733)',
      validation: (Rule) => Rule.regex(/^#[0-9A-F]{6}$/i),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      color: 'color',
    },
    prepare({title, color}) {
      return {
        title,
        subtitle: color ? `Color: ${color}` : undefined,
      }
    },
  },
})
