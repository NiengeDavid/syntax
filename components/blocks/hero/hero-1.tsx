// components/blocks/hero-1.tsx
import Link from "next/link";
import PortableTextRenderer from "@/components/portable-text-renderer";
import WorkCard from "@/components/ui/work-card";
import { PAGE_QUERYResult } from "@/sanity.types";
import { Separator } from "@/components/ui/separator";

type Hero1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "hero-1" }
>;

export default function Hero1({ tagLine, title, body, works }: Hero1Props) {
  if (!works || works.length === 0) return null;

  return (
    <div className="container dark:bg-background py-20 lg:pt-40">
      <Separator className="mb-12" />
      {/* ---------- HEAD ---------- */}
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

      {/* ---------- WORKS ---------- */}
      <WorkCard works={works} />

      {/* ---------- FOOTER (≤3 items) ---------- */}
      {works.length <= 3 && (
        <div className="mt-8 text-right">
          <Link href="/work" className="text-lg font-medium hover:underline">
            View All
          </Link>
        </div>
      )}
    </div>
  );
}
