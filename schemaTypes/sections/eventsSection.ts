import {defineField, defineType} from 'sanity'

export const eventsSection = defineType({
  name: 'eventsSection',
  title: 'Events section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Filter by category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Show only events from this category (optional)',
    }),
    defineField({
      name: 'limit',
      title: 'Number of events',
      type: 'number',
      description: 'Maximum number of events to display',
      initialValue: 6,
      validation: (Rule) => Rule.min(1).max(20),
    }),
    defineField({
      name: 'featuredOnly',
      title: 'Featured events only',
      type: 'boolean',
      initialValue: false,
      description: 'Show only featured events',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      category: 'category.title',
      limit: 'limit',
    },
    prepare({heading, category, limit}) {
      return {
        title: 'Events section',
        subtitle: `${heading || 'Events'}${category ? ` • ${category}` : ''}${limit ? ` • ${limit} events` : ''}`,
      }
    },
  },
})
