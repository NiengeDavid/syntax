import { defineType, defineField } from "sanity";
import { Calculator } from "lucide-react";

export default defineType({
  name: "quote-block",
  title: "Quote Calculator Block",
  type: "object",
  icon: Calculator,
  fields: [
    defineField({
      name: "padding",
      title: "Section Padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      title: "Color Variant",
      type: "color-variant",
    }),
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      description: "Optional heading above the calculator",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Optional description text",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Quote Calculator",
        subtitle: "Interactive pricing calculator",
      };
    },
  },
});
