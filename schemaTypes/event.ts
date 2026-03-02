import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'listSummary',
      title: 'Short text (list)',
      type: 'string',
      description: 'Optional line of text shown under the title in event lists',
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
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'startDate',
      title: 'Start date & time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End date & time',
      type: 'datetime',
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const startDate = (context.parent as {startDate?: string})?.startDate
          if (!endDate || !startDate) return true
          return endDate > startDate || 'End date must be after start date'
        }),
    }),
    defineField({
      name: 'allDay',
      title: 'All day event',
      type: 'boolean',
      initialValue: false,
      description: 'Check if this is an all-day event',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'location'}],
      description: 'Optional. Leave empty if the event has no specific venue.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'Link to event page or registration',
    }),
    defineField({
      name: 'featured',
      title: 'Featured event',
      type: 'boolean',
      initialValue: false,
      description: 'Show prominently on calendar',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      category: 'category.title',
    },
    prepare({title, startDate, category}) {
      const date = startDate ? new Date(startDate).toLocaleDateString() : 'No date'
      return {
        title,
        subtitle: `${date}${category ? ` • ${category}` : ''}`,
      }
    },
  },
})
