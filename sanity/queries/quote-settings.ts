import { groq } from "next-sanity";

export const QUOTE_SETTINGS_QUERY = groq`*[_type == "quoteSettings"][0]{
  _id,
  title,
  _key,
  currencyOptions,
  conversionRates[]{
    from,
    to,
    rate
  },
  vatRate,
  minimumPrice,
  baseCurrency,
  categories[]{
    title,
    pricePerPage,
    slug,
    description
  },
  deliverables[]{
    key,
    label,
    multiplier,
    description
  },
  timelines[]{
    key,
    label,
    multiplier,
    eta
  }
}`;
