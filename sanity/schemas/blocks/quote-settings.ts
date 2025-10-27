import { defineField, defineType } from "sanity";
import { Calculator } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "quoteSettings",
  title: "Quote Settings",
  type: "document",
  icon: Calculator,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Quote Settings",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "currencyOptions",
      title: "Currency Options",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["USD", "NGN"],
      description: "List of supported currencies (display order).",
    }),
    defineField({
      name: "conversionRates",
      title: "Conversion Rates",
      type: "array",
      of: [
        defineField({
          name: "conversionRate",
          type: "object",
          fields: [
            defineField({
              name: "from",
              type: "string",
              title: "From Currency (e.g. USD)",
            }),
            defineField({
              name: "to",
              type: "string",
              title: "To Currency (e.g. NGN)",
            }),
            defineField({
              name: "rate",
              type: "number",
              title: "Rate (1 from = rate to)",
            }),
          ],
          preview: {
            select: {
              from: "from",
              to: "to",
              rate: "rate",
            },
            prepare({ from, to, rate }) {
              return {
                title: `${from} → ${to}`,
                subtitle: `Rate: ${rate}`,
              };
            },
          },
        }),
      ],
      initialValue: [{ from: "USD", to: "NGN", rate: 1300 }],
      description:
        "Rates to convert currencies. We'll show USD/NGN conversion rate.",
    }),
    defineField({
      name: "vatRate",
      title: "VAT Rate (percent)",
      type: "number",
      initialValue: 7.5,
      description: "VAT percentage applied to subtotal (e.g., 7.5).",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "minimumPrice",
      title: "Minimum Price Floor (USD)",
      type: "number",
      initialValue: 500,
      description: "Minimum total price (in base currency USD) to enforce.",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "baseCurrency",
      title: "Base Currency",
      type: "string",
      initialValue: "USD",
      description: "Base currency for price-per-page values.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories (price per page)",
      type: "array",
      of: [
        defineField({
          name: "category",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Category Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "pricePerPage",
              title: "Price per Page (base currency)",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: "title",
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: "title",
              price: "pricePerPage",
            },
            prepare({ title, price }) {
              return {
                title: title,
                subtitle: `$${price} per page`,
              };
            },
          },
        }),
      ],
      initialValue: [
        {
          title: "Landing",
          pricePerPage: 150,
          slug: { current: "landing" },
        },
        {
          title: "Corporate",
          pricePerPage: 250,
          slug: { current: "corporate" },
        },
        {
          title: "Ecommerce",
          pricePerPage: 400,
          slug: { current: "ecommerce" },
        },
        {
          title: "eLearning",
          pricePerPage: 350,
          slug: { current: "elearning" },
        },
        {
          title: "Business",
          pricePerPage: 300,
          slug: { current: "business" },
        },
      ],
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables / Multipliers",
      type: "array",
      of: [
        defineField({
          name: "deliverable",
          type: "object",
          fields: [
            defineField({
              name: "key",
              title: "Key",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "multiplier",
              title: "Multiplier",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
          ],
          preview: {
            select: {
              label: "label",
              multiplier: "multiplier",
            },
            prepare({ label, multiplier }) {
              return {
                title: label,
                subtitle: `${multiplier}x multiplier`,
              };
            },
          },
        }),
      ],
      initialValue: [
        {
          key: "design-only",
          label: "Design only",
          multiplier: 0.8,
        },
        {
          key: "design-build",
          label: "Design & Build",
          multiplier: 1.0,
        },
        {
          key: "fully-managed",
          label: "Fully managed",
          multiplier: 1.25,
        },
      ],
    }),
    defineField({
      name: "timelines",
      title: "Timeline Multipliers",
      type: "array",
      of: [
        defineField({
          name: "timeline",
          type: "object",
          fields: [
            defineField({
              name: "key",
              title: "Key",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "multiplier",
              title: "Multiplier",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "eta",
              title: "ETA Text",
              type: "string",
            }),
          ],
          preview: {
            select: {
              label: "label",
              eta: "eta",
              multiplier: "multiplier",
            },
            prepare({ label, eta, multiplier }) {
              return {
                title: label,
                subtitle: `${eta} • ${multiplier}x`,
              };
            },
          },
        }),
      ],
      initialValue: [
        {
          key: "standard",
          label: "Standard (6-8 wks)",
          multiplier: 1.0,
          eta: "6–8 weeks",
        },
        {
          key: "fast",
          label: "Fast (3-4 wks)",
          multiplier: 1.15,
          eta: "3–4 weeks",
        },
        {
          key: "rush",
          label: "Rush (1-2 wks)",
          multiplier: 1.35,
          eta: "1–2 weeks",
        },
      ],
    }),
    orderRankField({ type: "contact" }),
  ],
  preview: {
    prepare() {
      return {
        title: "Quote Settings",
      };
    },
  },
});
