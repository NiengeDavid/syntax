import { fetchSanityQuoteSettings } from "@/sanity/lib/fetch";
import QuoteCalculator from "@/components/blocks/quote/quote-calculator";
import { PAGE_QUERYResult } from "@/sanity.types";

type QuoteBlockProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "quote-block" }
>;

export default async function Quote(props: QuoteBlockProps) {
  const settings = await fetchSanityQuoteSettings();
  //console.log("Quote settings:", settings);
  //console.log("Quote block props:", props);

  if (!settings) {
    return null;
  }

  return <QuoteCalculator settings={settings} {...props} />;
}
