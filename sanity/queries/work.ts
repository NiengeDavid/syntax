import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";

export const WORK_QUERY = groq`*[_type == "featuredWorks" && slug.current == $slug][0]{
    title,
    slug,
    coverImage{
      ${imageQuery}
    },
   excerpt,
   brief,
   categories[]->{
     title,
   },
   orientation,
    images[]{
      ${imageQuery}
    },
    _createdAt,
    _updatedAt,
    meta_title,
    meta_description,
    noindex,
    ogImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
    }
}`;

export const WORKS_QUERY = groq`*[_type == "featuredWorks" && defined(slug)] | order(_createdAt desc){
    title,
    slug,
    brief,
    coverImage{
      ${imageQuery}
    },
}`;

export const WORKS_SLUGS_QUERY = groq`*[_type == "featuredWorks" && defined(slug)]{slug}`;
