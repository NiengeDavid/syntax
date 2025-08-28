import EmblaCarousel from "@/components/emblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = {
  dragFree: true,
  direction: "rtl",
  loop: true,
};
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Carousel3() {
  return <EmblaCarousel slides={SLIDES} options={OPTIONS} />;
}
