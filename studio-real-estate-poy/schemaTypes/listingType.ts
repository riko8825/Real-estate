import {defineField, defineType} from 'sanity'

export const listingType = defineType({
  name: 'listing',
  title: 'Listing',
  type: 'document',
  fields: [
    // ── Basic info ──────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Property title',
      type: 'string',
      description: 'e.g. "Pratumnak Pool Villa", "Jomtien Sea View Condo"',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Listing type',
      type: 'string',
      options: {
        list: [
          {title: 'For Sale', value: 'sale'},
          {title: 'For Rent', value: 'rent'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      initialValue: 'sale',
    }),
    defineField({
      name: 'propertyType',
      title: 'Property type',
      type: 'string',
      options: {
        list: [
          {title: 'Condo', value: 'condo'},
          {title: 'Pool Villa', value: 'villa'},
          {title: 'House', value: 'house'},
          {title: 'Land', value: 'land'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'area',
      title: 'Area / Neighbourhood',
      type: 'string',
      options: {
        list: [
          {title: 'Pratumnak', value: 'pratumnak'},
          {title: 'Jomtien', value: 'jomtien'},
          {title: 'Wongamat', value: 'wongamat'},
          {title: 'Naklua', value: 'naklua'},
          {title: 'Central Pattaya', value: 'central'},
          {title: 'East Pattaya', value: 'east'},
          {title: 'Banglamung', value: 'banglamung'},
        ],
      },
      validation: (rule) => rule.required(),
    }),

    // ── Price ───────────────────────────────────────────────
    defineField({
      name: 'priceThb',
      title: 'Price (THB)',
      type: 'number',
      description: 'For rent listings: monthly price in THB',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'priceUsd',
      title: 'Price (USD, approximate)',
      type: 'number',
      description: 'Optional — leave blank to auto-calculate later',
    }),

    // ── Specs ───────────────────────────────────────────────
    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      description: 'Set 0 for land/studio',
      validation: (rule) => rule.required().integer().min(0).max(20),
      initialValue: 1,
    }),
    defineField({
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      validation: (rule) => rule.integer().min(0).max(20),
      initialValue: 1,
    }),
    defineField({
      name: 'sizeSqm',
      title: 'Size (sqm)',
      type: 'number',
      description: 'Floor area in square meters. For land use square wah (sqw) in features instead.',
      validation: (rule) => rule.positive(),
    }),

    // ── Media ───────────────────────────────────────────────
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery (additional photos)',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      options: {layout: 'grid'},
    }),

    // ── Features + description ──────────────────────────────
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'Short tags: "Private Pool", "Sea View", "Chanote Title", "Furnished", etc.',
    }),
    defineField({
      name: 'description',
      title: 'Full description',
      type: 'array',
      of: [{type: 'block'}],
    }),

    // ── Status + meta ───────────────────────────────────────
    defineField({
      name: 'isFeatured',
      title: 'Featured on homepage',
      type: 'boolean',
      description: 'Show this listing in the homepage Properties section',
      initialValue: false,
    }),
    defineField({
      name: 'isAvailable',
      title: 'Available',
      type: 'boolean',
      description: 'Uncheck to hide from the public site (sold/rented out)',
      initialValue: true,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],

  // ── Studio UI preview ────────────────────────────────────
  preview: {
    select: {
      title: 'title',
      type: 'type',
      area: 'area',
      price: 'priceThb',
      media: 'mainImage',
    },
    prepare({title, type, area, price, media}) {
      const typeLabel = type === 'rent' ? 'For Rent' : 'For Sale'
      const priceLabel = price ? `฿${price.toLocaleString()}${type === 'rent' ? '/mo' : ''}` : 'No price'
      return {
        title: title || 'Untitled',
        subtitle: `${typeLabel} · ${area || '?'} · ${priceLabel}`,
        media,
      }
    },
  },

  // ── Sorting options in Studio ───────────────────────────
  orderings: [
    {title: 'Newest first', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
    {title: 'Price (low to high)', name: 'priceAsc', by: [{field: 'priceThb', direction: 'asc'}]},
    {title: 'Price (high to low)', name: 'priceDesc', by: [{field: 'priceThb', direction: 'desc'}]},
  ],
})
