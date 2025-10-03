import { defineType, defineField } from "sanity";

export default defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text" }),
    defineField({ name: "mainImage", title: "Main image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },        
        { type: "image" },       
        // you can add custom blocks/embeds later (video embeds, quotes, callouts)
      ]
    }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime" }),
    defineField({ name: "ogImage", title: "Open Graph image", type: "image" }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Optional manual SEO title. Max 60 characters recommended.",
      validation: (Rule) => Rule.max(60).warning("Keep SEO titles under 60 characters for best results")
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      description: "Optional manual SEO description. Max 160 characters recommended.",
      validation: (Rule) => Rule.max(160).warning("Keep SEO descriptions under 160 characters for best results")
    }),
  ]
});