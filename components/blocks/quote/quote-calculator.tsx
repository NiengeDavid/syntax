"use client";

import { QUOTE_SETTINGS_QUERYResult } from "@/sanity.types";
import QuoteForm from "../quote-form";
import { Separator } from "@/components/ui/separator";

interface QuoteCalculatorProps {
  settings: QUOTE_SETTINGS_QUERYResult;
  title?: string | null;
  description?: string | null;
  padding?: any;
  colorVariant?: any;
}

export default function QuoteCalculator({
  settings,
  title,
  description,
}: QuoteCalculatorProps) {
  return (
    <div className="container mx-auto px-4">
      <Separator className="my-4" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - benefits / glossary (visual similar to Image 1) */}
        <aside className="lg:col-span-1">
          {title && (
            <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide mb-6">
              {title}
            </h3>
          )}

          <div className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed space-y-6">
            {description && <p>{description}</p>}

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
