import { defineType, defineField } from "sanity";

export default defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "website", title: "Website", type: "url" }),
    defineField({ name: "discount", title: "Discount", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "priority", title: "Priority", type: "number" }),
  ]
});