import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity.types";

// Extract the work type from PAGE_QUERYResult
type Hero1Block = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "hero-1" }
>;

type WorkType = NonNullable<Hero1Block["works"]>[number];

interface WorkCardProps {
  works: NonNullable<WorkType>[];
}

export default function WorkCard({ works }: WorkCardProps) {
  if (!works || works.length === 0) return null;

  // First work
  const [first, ...rest] = works;

  // Group the rest into pairs
  const pairs: NonNullable<WorkType>[][] = [];
  for (let i = 0; i < rest.length; i += 2) {
    const pair = rest
      .slice(i, i + 2)
      .filter((work): work is NonNullable<WorkType> => work !== null);
    if (pair.length > 0) {
      pairs.push(pair);
    }
  }

  // Safe type guard for work properties
  const getWorkHref = (work: NonNullable<WorkType>) => {
    return work?.slug?.current ? `/work/${work.slug.current}` : "#";
  };

  const getImageSrc = (work: NonNullable<WorkType>) => {
    return work?.coverImage ? urlFor(work.coverImage).url() : "";
  };

  const getImageAlt = (work: NonNullable<WorkType>) => {
    return work?.coverImage?.alt ?? work?.title ?? "";
  };

  return (
    <div className="py-12">
      {/* First Featured Work */}
      {first && (
        <div className="mb-8">
          <Link href={getWorkHref(first)} className="group block relative">
            <div className="relative w-full overflow-hidden shadow-lg rounded-lg bg-neutral-100 dark:bg-neutral-800">
              {first.coverImage && (
                <Image
                  src={getImageSrc(first)}
                  alt={getImageAlt(first)}
                  className="object-cover transition-transform group-hover:scale-105"
                  width={
                    first.coverImage?.asset?.metadata?.dimensions?.width || 800
                  }
                  height={
                    first.coverImage?.asset?.metadata?.dimensions?.height || 960
                  }
                  placeholder={
                    first.coverImage?.asset?.metadata?.lqip ? "blur" : undefined
                  }
                  blurDataURL={first.coverImage?.asset?.metadata?.lqip || ""}
                  quality={100}
                />
              )}
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
      )}

      {/* Rest of Featured Works in pairs */}
      <div className="flex flex-col gap-8">
        {pairs.map((pair, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-8">
            {pair.map((work, index) => (
              <Link
                href={getWorkHref(work)}
                key={index}
                className="group flex-1 block relative"
              >
                <div className="relative w-full overflow-hidden shadow-md rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  {work.coverImage && (
                    <Image
                      src={getImageSrc(work)}
                      alt={getImageAlt(work)}
                      className="object-cover transition-transform group-hover:scale-105"
                      width={
                        work.coverImage?.asset?.metadata?.dimensions?.width ||
                        800
                      }
                      height={
                        work.coverImage?.asset?.metadata?.dimensions?.height ||
                        800
                      }
                      placeholder={
                        work.coverImage?.asset?.metadata?.lqip
                          ? "blur"
                          : undefined
                      }
                      blurDataURL={work.coverImage?.asset?.metadata?.lqip || ""}
                      quality={100}
                    />
                  )}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-neutral-900 dark:text-neutral-50 text-left group-hover:underline transition-all">
                  {work?.title}
                </h3>
                <p className="mt-2 text-neutral-700 dark:text-neutral-300 text-left">
                  {work?.brief}
                </p>
                <span
                  className="absolute inset-0"
                  aria-label={`View ${work.title}`}
                ></span>
              </Link>
            ))}
            {/* If odd number, fill space on desktop */}
            {pair.length === 1 && <div className="hidden md:block flex-1" />}
          </div>
        ))}
      </div>
    </div>
  );
}
