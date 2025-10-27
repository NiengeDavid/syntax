import React from "react";
import QuoteForm from "@/components/blocks/quote-form";
import { fetchSanityQuoteSettings } from "@/sanity/lib/fetch";

export default async function Quote() {
  const settings = await fetchSanityQuoteSettings();

  if (!settings) {
    return (
      <div className="container mx-auto px-4 py-20">
        <p className="text-neutral-700 dark:text-neutral-300">
          Quote settings not configured.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - benefits / glossary (visual similar to Image 1) */}
        <aside className="lg:col-span-1">
          <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide mb-6">
            Benefits & Pricing
          </h3>

          <div className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed space-y-6">
            <p>
              The mystery and complexity often associated with web design
              pricing can be a hurdle. We use a price-per-page approach with no
              hidden costs.
            </p>

            <div className="mt-8">
              <h4 className="text-xs font-medium text-neutral-500 uppercase mb-2">
                Estimate Glossary
              </h4>
              <ul className="text-xs space-y-2">
                <li>
                  <strong>Number of Pages</strong>: Typical pages (About,
                  Contact, Team, Support).
                </li>
                <li>
                  <strong>Deliverables</strong>: Design only or Design & Build.
                </li>
                <li>
                  <strong>Timeline</strong>: Standard / Fast / Rush multipliers
                  apply.
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Right column - form */}
        <main className="lg:col-span-2">
          <QuoteForm settings={settings} />
        </main>
      </div>
    </div>
  );
}
