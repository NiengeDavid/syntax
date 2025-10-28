"use client";

import { QUOTE_SETTINGS_QUERYResult } from "@/sanity.types";
import QuoteForm from "../quote-form";
import { Separator } from "@/components/ui/separator";
import { Tag, Flame, Paintbrush, Rocket, Grid3x3, Clock } from "lucide-react";

interface QuoteCalculatorProps {
  settings: QUOTE_SETTINGS_QUERYResult;
  title?: string | null;
  description?: string | null;
  padding?: any;
  colorVariant?: any;
}

const benefits = [
  {
    icon: Tag,
    title: "Know the price right from the get go.",
    description: "Transparent",
    number: "01",
  },
  {
    icon: Flame,
    title: "Turn-key websites without any fuss.",
    description: "Hassle Free",
    number: "02",
  },
  {
    icon: Paintbrush,
    title: "Completely custom & beautifully designed.",
    description: "Unique",
    number: "03",
  },
  {
    icon: Rocket,
    title: "Get started as quickly as you want.",
    description: "Fast",
    number: "04",
  },
  {
    icon: Grid3x3,
    title: "Start with few, and add more later.",
    description: "Adaptable",
    number: "05",
  },
  {
    icon: Clock,
    title: "Don't waste time in multiple meetings.",
    description: "Efficient",
    number: "06",
  },
];

export default function QuoteCalculator({
  settings,
  title,
  description,
}: QuoteCalculatorProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <Separator className="mb-12" />
      {/* Header Section */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {title && (
          <h2 className="lg:col-span-1 w-full text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
            {title}
          </h2>
        )}
        <div className="lg:col-span-2">
          {description && <p>{description}</p>}

          {/* Benefits Grid */}
          <div className="w-full mt-10">
            <span className="text-xs text-start text-muted-foreground">
              Benefits &#10549;
            </span>
            <Separator className="my-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="space-y-3">
                    <Icon className="w-6 h-6 text-muted-foreground" />
                    <h3 className="text-base font-medium leading-snug">
                      {benefit.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="text-xs">{benefit.number}</span>
                      <span>{benefit.description}</span>
                    </div>
                    <Separator className="my-2" />
                  </div>
                );
              })}
            </div>
          </div>
          {/* <Separator /> */}
        </div>
      </div>

      {/* Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left column - Glossary */}
        <aside className="lg:col-span-1 lg:max-w-xs">
          <div className="space-y-6">
            <div className="text-muted-foreground">
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-4">
                Estimate Glossary
              </h4>
              <div className="space-y-4 text-sm">
                <div>
                  <strong className="block mb-1">Number of Pages</strong>
                  <p className="leading-relaxed">
                    An estimate as to how many pages you need (excluding
                    homepage). <br /> Typical pages: About, Contact, Team,
                    Support.
                  </p>
                </div>
                <div>
                  <strong className="block mb-1">Deliverables</strong>
                  <p className="leading-relaxed">
                    We offer three deliverables:
                    <br />
                    <span className="block mt-1">
                      1. Design only: Great for those who can build it
                      themselves.
                    </span>
                    <span className="block">
                      2. Design & Build: Ideal for those who want everything
                      handed to them.
                    </span>
                    <span className="block">
                      3. Fully managed: For those who want everything
                      taken care of by us.
                    </span>
                  </p>
                </div>
                <div>
                  <strong className="block mb-1">Timeline</strong>
                  <p className="leading-relaxed">
                    Delivery type: Standard, Fast, or Rush.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right column - Form */}
        <main className="lg:col-span-2">
          <div className="mb-8">
            <span className="text-xs text-start text-muted-foreground">
              Get an instant estimate &#10549;
            </span>
            <Separator className="my-2" />
          </div>
          <QuoteForm settings={settings} />
        </main>
      </div>
    </div>
  );
}
