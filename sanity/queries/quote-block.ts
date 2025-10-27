import { groq } from "next-sanity";

export const quoteBlockQuery = groq`
  _type == "quote-block" => {
    _type,
    _key,
    padding,
    colorVariant,
    title,
    description
  }
`;