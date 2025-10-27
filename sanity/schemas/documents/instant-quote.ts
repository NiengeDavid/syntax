import { defineField, defineType } from "sanity";
import { Receipt } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "instantQuote",
  title: "Instant Quotes",
  type: "document",
  icon: Receipt,
  groups: [
    {
      name: "details",
      title: "Quote Details",
    },
    {
      name: "pricing",
      title: "Pricing",
    },
    {
      name: "contact",
      title: "Contact Info",
    },
  ],
  fields: [
    defineField({
      name: "quoteNumber",
      title: "Quote Number",
      type: "string",
      description: "Auto-generated quote reference number",
      readOnly: true,
    }),
    defineField({
      name: "pages",
      title: "Number of Pages",
      type: "number",
      group: "details",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "quoteSettings" }],
      group: "details",
      description: "Reference to the selected category from quote settings",
    }),
    defineField({
      name: "categorySnapshot",
      title: "Category Snapshot",
      type: "object",
      group: "details",
      description: "Snapshot of category details at time of quote",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "pricePerPage",
          title: "Price per Page",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "deliverable",
      title: "Deliverable",
      type: "string",
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "string",
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brandState",
      title: "Brand State",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "New Brand", value: "new" },
          { title: "Existing Brand", value: "existing" },
          { title: "Rebrand", value: "rebrand" },
        ],
      },
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      group: "pricing",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "conversionRate",
      title: "Conversion Rate",
      type: "number",
      group: "pricing",
      description: "Exchange rate used for currency conversion",
    }),
    defineField({
      name: "pricePerPage",
      title: "Price per Page",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "subtotal",
      title: "Subtotal",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "vatRate",
      title: "VAT Rate (%)",
      type: "number",
      group: "pricing",
      description: "VAT percentage applied",
    }),
    defineField({
      name: "vat",
      title: "VAT Amount",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "total",
      title: "Total",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "priceBreakdown",
      title: "Price Breakdown",
      type: "object",
      group: "pricing",
      fields: [
        defineField({
          name: "pagesTotal",
          title: "Pages Total",
          type: "number",
          description: "Number of pages × price per page",
        }),
        defineField({
          name: "pagesPrice",
          title: "Pages Price",
          type: "number",
          description: "Base price for pages",
        }),
        defineField({
          name: "deliverableMultiplier",
          title: "Deliverable Multiplier",
          type: "number",
          description: "Multiplier applied for deliverable type",
        }),
        defineField({
          name: "deliverableLabel",
          title: "Deliverable Label",
          type: "string",
          description: "Label of selected deliverable",
        }),
        defineField({
          name: "timelineMultiplier",
          title: "Timeline Multiplier",
          type: "number",
          description: "Multiplier applied for timeline",
        }),
        defineField({
          name: "timelineLabel",
          title: "Timeline Label",
          type: "string",
          description: "Label of selected timeline",
        }),
        defineField({
          name: "timelineEta",
          title: "Timeline ETA",
          type: "string",
          description: "Estimated time for delivery",
        }),
      ],
    }),
    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "company",
      title: "Company Name",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "notes",
      title: "Additional Notes",
      type: "text",
      group: "contact",
      rows: 4,
    }),
    defineField({
      name: "status",
      title: "Quote Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Sent", value: "sent" },
          { title: "Viewed", value: "viewed" },
          { title: "Accepted", value: "accepted" },
          { title: "Rejected", value: "rejected" },
          { title: "Expired", value: "expired" },
        ],
      },
      initialValue: "draft",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    orderRankField({ type: "instantQuote" }),
  ],
  preview: {
    select: {
      quoteNumber: "quoteNumber",
      email: "email",
      total: "total",
      currency: "currency",
      status: "status",
      createdAt: "createdAt",
    },
    prepare({ quoteNumber, email, total, currency, status, createdAt }) {
      return {
        title: quoteNumber || `Quote for ${email || "Unknown"}`,
        subtitle: `${currency} ${total?.toFixed(2)} • ${status} • ${new Date(
          createdAt
        ).toLocaleDateString()}`,
        media: Receipt,
      };
    },
  },
  orderings: [
    {
      title: "Created Date (Newest First)",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
    {
      title: "Created Date (Oldest First)",
      name: "createdAtAsc",
      by: [{ field: "createdAt", direction: "asc" }],
    },
    {
      title: "Total (Highest First)",
      name: "totalDesc",
      by: [{ field: "total", direction: "desc" }],
    },
    {
      title: "Status",
      name: "status",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
});
