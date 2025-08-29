"use client";

import React from "react";
import SectionContainer from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import { PAGE_QUERYResult } from "@/sanity.types";
import EmblaCarousel from "@/components/emblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

const CAROUSEL_SIZES = {
  one: "basis-full",
  two: "basis-full md:basis-1/2",
  three: "basis-full md:basis-1/2 lg:basis-1/3",
} as const;

const IMAGE_SIZES = {
  one: "h-[30rem] sm:h-[40rem] lg:h-[45rem] xl:h-[50rem] 2xl:h-[55rem]",
  two: "h-[30rem] md:h-[25rem] lg:h-[35rem] xl:h-[40rem] 2xl:h-[45rem]",
  three: "h-[30rem] md:h-[30rem] xl:h-[35rem] 2xl:h-[40rem]",
} as const;

type CarouselSize = keyof typeof CAROUSEL_SIZES;

type Carousel1 = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "carousel-1" }
>;

interface Carousel1Props
  extends Omit<NonNullable<Carousel1>, "_type" | "_key"> {
  size: CarouselSize | null;
  indicators: "none" | "dots" | "count" | null;
}

export default function Carousel1({
  padding,
  colorVariant,
  size = "one",
  indicators = "none",
  images,
}: Carousel1Props) {
  const color = stegaClean(colorVariant);
  const stegaIndicators = stegaClean(indicators);
  const stegaSize = stegaClean(size) as CarouselSize;

  // Configure Embla options
  const OPTIONS: EmblaOptionsType = {
    dragFree: true,
    direction: "rtl",
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  };

  // Transform Sanity images into slides for EmblaCarousel
  const emblaSlides =
    images?.map((image, index) => (
      <div
        key={`${index}-${image.alt}`}
        className={cn(
          "flex justify-center items-center w-full",
          CAROUSEL_SIZES[stegaSize]
        )}
      >
        {image && (
          <div
            className={cn(
              "relative mx-auto overflow-hidden rounded-2xl w-full",
              IMAGE_SIZES[stegaSize],
              stegaSize === "one" ? "max-w-[35rem]" : undefined
            )}
          >
            <Image
              className="object-cover"
              src={urlFor(image).url()}
              alt={image.alt || ""}
              fill
              placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
              blurDataURL={image.asset?.metadata?.lqip || ""}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              quality={100}
            />
          </div>
        )}
      </div>
    )) || [];

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <SectionContainer color={color} padding={padding}>
      <EmblaCarousel
        slides={emblaSlides}
        options={OPTIONS}
        indicators={stegaIndicators ?? undefined}
        showArrows={true}
      />
    </SectionContainer>
  );
}
