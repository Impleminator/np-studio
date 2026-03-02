import {defineField, defineType} from 'sanity'

export const imageSection = defineType({
  name: 'imageSection',
  title: 'Image section',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Full width', value: 'full'},
          {title: 'Contained', value: 'contained'},
        ],
        layout: 'radio',
      },
      initialValue: 'contained',
    }),
  ],
  preview: {
    select: {caption: 'caption', media: 'image'},
    prepare({caption, media}) {
      return {
        title: 'Image section',
        subtitle: caption,
        media,
      }
    },
  },
})
