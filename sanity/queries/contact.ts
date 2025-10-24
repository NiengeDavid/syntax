import { groq } from "next-sanity";

export const CONTACT_QUERY = groq`*[_type == "contact"][0]{
  _id,
  title,
  description,
  email,
  phone,
  whatsapp,
  whatsappMessage,
  address,
  socials[]{
    name,
    url,
    icon
  }
}`;
