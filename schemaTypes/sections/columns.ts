import {defineField, defineType} from 'sanity'

export const columns = defineType({
  name: 'columns',
  title: 'Columns',
  type: 'object',
  fields: [
    defineField({
      name: 'columns',
      title: 'Number of columns',
      type: 'string',
      options: {
        list: [
          {title: '2 columns', value: '2'},
          {title: '3 columns', value: '3'},
        ],
        layout: 'radio',
      },
      initialValue: '2',
    }),
    defineField({
      name: 'column1',
      title: 'Column 1',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'column2',
      title: 'Column 2',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'column3',
      title: 'Column 3',
      type: 'array',
      of: [{type: 'block'}],
      hidden: ({parent}) => parent?.columns !== '3',
    }),
  ],
  preview: {
    select: {columns: 'columns'},
    prepare({columns: colCount}) {
      return {
        title: 'Columns',
        subtitle: `${colCount || 2} columns`,
      }
    },
  },
})
