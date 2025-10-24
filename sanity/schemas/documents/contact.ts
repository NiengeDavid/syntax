import { defineField, defineType } from "sanity";
import { Phone } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "contact",
  title: "Contact Information",
  type: "document",
  icon: Phone,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
    }),
    defineField({
      name: "whatsappMessage",
      title: "WhatsApp Default Message",
      type: "text",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Platform Name" },
            { name: "url", type: "url", title: "URL" },
            { name: "icon", type: "string", title: "Icon Name" },
          ],
        },
      ],
    }),
    orderRankField({ type: "contact" }),
  ],
});
