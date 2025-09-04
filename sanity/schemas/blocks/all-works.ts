import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "all-works",
  type: "object",
  title: "All Works",
  description: "A list of all works",
  icon: Newspaper,
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      title: "Color Variant",
      description: "Select a background color variant",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "All Works",
      };
    },
  },
});
