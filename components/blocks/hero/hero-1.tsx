import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERYResult } from "@/sanity.types";

type Hero1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "hero-1" }
>;

export default function Hero1({
  tagLine,
  title,
  body,
  image,
  links,
  works,
}: Hero1Props) {
  
  if (!works || works.length === 0) return null;

  // First work
  const [first, ...rest] = works;

  // Group the rest into pairs
  const pairs: (typeof works)[] = [];
  for (let i = 0; i < rest.length; i += 2) {
    pairs.push(rest.slice(i, i + 2));
  }

  return (
    <div className="container dark:bg-background py-20 lg:pt-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-12">
        <div className="flex flex-col justify-center">
          {tagLine && (
            <h1 className="leading-[0] font-sans animate-fade-up [animation-delay:100ms] opacity-0">
              <span className="text-base font-semibold">{tagLine}</span>
            </h1>
          )}
          {title && (
            <h2 className="mt-6 font-bold leading-[1.1] text-4xl md:text-5xl lg:text-6xl animate-fade-up [animation-delay:200ms] opacity-0">
              {title}
            </h2>
          )}
        </div>
        <div className="flex flex-col justify-center">
          {body && (
            <div className="text-lg mt-6 animate-fade-up [animation-delay:300ms] opacity-0">
              <PortableTextRenderer value={body} />
            </div>
          )}
        </div>
      </div>
      <div className="py-12">
        {/* First Featured Work */}
        <div className="mb-8">
          <Link
            href={`/works/${first?.slug?.current}`}
            className="group block relative"
          >
            <div className="relative w-full overflow-hidden shadow-lg bg-neutral-100 dark:bg-neutral-800">
              <Image
                src={first?.coverImage ? urlFor(first.coverImage).url() : ""}
                alt={first?.coverImage?.alt ?? first.title ?? ""}
                className="object-cover transition-transform group-hover:scale-105"
                width={
                  first?.coverImage?.asset?.metadata?.dimensions?.width || 800
                }
                height={
                  first?.coverImage?.asset?.metadata?.dimensions?.height || 960
                }
                placeholder={
                  first?.coverImage?.asset?.metadata?.lqip ? "blur" : undefined
                }
                blurDataURL={first?.coverImage?.asset?.metadata?.lqip || ""}
                quality={100}
              />
            </div>
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-50 text-left group-hover:underline transition-all">
              {first.title}
            </h2>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300 text-left">
              {first.brief}
            </p>
            {/* All clickable */}
            <span
              className="absolute inset-0"
              aria-label={`View ${first.title}`}
            ></span>
          </Link>
        </div>
        {/* Rest of Featured Works in pairs */}
        <div className="flex flex-col gap-8">
          {pairs.map((pair, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-8">
              {pair.map((work, i) => (
                <Link
                  href={`/works/${work?.slug?.current}`}
                  key={work?.slug?.current}
                  className="group flex-1 block relative"
                >
                  <div className="relative w-full overflow-hidden shadow-md bg-neutral-100 dark:bg-neutral-800">
                    <Image
                      src={
                        first?.coverImage ? urlFor(first.coverImage).url() : ""
                      }
                      alt={first?.coverImage?.alt ?? first.title ?? ""}
                      className="object-cover transition-transform group-hover:scale-105"
                      width={
                        first?.coverImage?.asset?.metadata?.dimensions?.width ||
                        800
                      }
                      height={
                        first?.coverImage?.asset?.metadata?.dimensions
                          ?.height || 800
                      }
                      placeholder={
                        first?.coverImage?.asset?.metadata?.lqip
                          ? "blur"
                          : undefined
                      }
                      blurDataURL={
                        first?.coverImage?.asset?.metadata?.lqip || ""
                      }
                      quality={100}
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-neutral-900 dark:text-neutral-50 text-left group-hover:underline transition-all">
                    {work.title}
                  </h3>
                  <p className="mt-2 text-neutral-700 dark:text-neutral-300 text-left">
                    {work.brief}
                  </p>
                  <span
                    className="absolute inset-0"
                    aria-label={`View ${work?.title}`}
                  ></span>
                </Link>
              ))}
              {/* If odd number, fill space on desktop */}
              {pair.length === 1 && <div className="hidden md:block flex-1" />}
            </div>
          ))}
        </div>
        <div className="mt-8 text-right">
          <Link
            href="/works"
            className="text-lg font-medium hover:underline"
          >
            View All
          </Link>
        </div>
      </div>
    </div>
  );
}
