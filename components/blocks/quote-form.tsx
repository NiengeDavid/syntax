"use client";

import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { QUOTE_SETTINGS_QUERYResult } from "@/sanity.types";
import { Spinner } from "../ui/spinner";

type Settings = QUOTE_SETTINGS_QUERYResult;

const QuoteSchema = z.object({
  pages: z.number().min(1, "At least 1 page"),
  category: z.string(),
  deliverable: z.string(),
  timeline: z.string(),
  brandState: z.string().optional(),
  currency: z.string(),
  email: z.string().email(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof QuoteSchema>;

export default function QuoteForm({ settings }: { settings: Settings }) {
  // defaults from settings
  const categories = settings?.categories ?? [];
  const deliverables = settings?.deliverables ?? [];
  const timelines = settings?.timelines ?? [];
  const baseCurrency = settings?.baseCurrency ?? "USD";
  const currencyOptions = settings?.currencyOptions ?? ["USD", "NGN"];
  const conversionRates = settings?.conversionRates ?? [
    { from: "USD", to: "NGN", rate: 1300 },
  ];
  const vatRate = Number(settings?.vatRate ?? 7.5);
  const minimumPrice = Number(settings?.minimumPrice ?? 500);

  const form = useForm<FormValues>({
    resolver: zodResolver(QuoteSchema),
    defaultValues: {
      pages: 1,
      category: categories[0]?.title ?? "Landing",
      deliverable: deliverables[1]?.key ?? "design-build",
      timeline: timelines[0]?.key ?? "standard",
      brandState: "I have no brand",
      currency: baseCurrency,
      email: "",
      notes: "",
    },
  });

  const [submitting, setSubmitting] = useState(false);

  const values = form.watch();

  // helpers to look up values by key/title
  const findCategory = (titleOrSlug: string) => {
    return (
      categories.find(
        (c: any) => c.title === titleOrSlug || c.slug?.current === titleOrSlug
      ) || categories[0]
    );
  };
  const findDeliverable = (key: string) =>
    deliverables.find((d: any) => d.key === key) || deliverables[0];
  const findTimeline = (key: string) =>
    timelines.find((t: any) => t.key === key) || timelines[0];

  const conversion = useMemo(() => {
    const to = values.currency;
    const from = baseCurrency;
    if (from === to) return { rate: 1, from, to };
    const hit = conversionRates.find(
      (r: any) => r.from === from && r.to === to
    );
    return hit ? { rate: hit.rate, from, to } : { rate: 1, from, to };
  }, [values.currency, baseCurrency, conversionRates]);

  const breakdown = useMemo(() => {
    const pages = Number(values.pages) || 1;
    const categoryObj = findCategory(values.category);
    const perPage = Number(categoryObj?.pricePerPage ?? 0);
    const deliverableObj = findDeliverable(values.deliverable);
    const timelineObj = findTimeline(values.timeline);

    const pagesTotal = pages * perPage;
    const deliverableMultiplier = Number(deliverableObj?.multiplier ?? 1);
    const timelineMultiplier = Number(timelineObj?.multiplier ?? 1);

    const subtotalBase =
      pagesTotal * deliverableMultiplier * timelineMultiplier;
    const subtotalConverted = subtotalBase * (conversion?.rate ?? 1);
    const vatAmount = (subtotalConverted * vatRate) / 100;
    let total = subtotalConverted + vatAmount;
    // apply minimum floor in base currency: convert minimumPrice (base) to selected currency
    const minInSelected = minimumPrice * (conversion?.rate ?? 1);
    if (total < minInSelected) {
      total = minInSelected;
    }

    return {
      pages,
      perPage,
      pagesTotal,
      deliverableMultiplier,
      timelineMultiplier,
      subtotal: subtotalConverted,
      vat: vatAmount,
      total,
    };
  }, [
    values.pages,
    values.category,
    values.deliverable,
    values.timeline,
    conversion,
    vatRate,
    minimumPrice,
  ]);

  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        conversionRate: conversion.rate,
        pricePerPage: breakdown.perPage,
        subtotal: breakdown.subtotal,
        vat: breakdown.vat,
        total: breakdown.total,
        priceBreakdown: {
          pagesTotal: breakdown.pagesTotal,
          deliverableMultiplier: breakdown.deliverableMultiplier,
          timelineMultiplier: breakdown.timelineMultiplier,
        },
      };

      // POST to API route
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.text();
        toast.error("Failed to submit quote", {
          description: err || "An error occurred while submitting the quote.",
        });
        return;
      }

      toast.success("Quote sent", {
        description:
          "We've saved your quote and sent you an email with the details.",
      });

      // reset form
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Could not send quote", {
        description: "There was an error. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* How many pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <h3 className="text-base font-medium mb-1">How many pages?</h3>
          <p className="text-sm text-muted-foreground">
            (Excluding your homepage)
          </p>
        </div>
        <div>
          <Input
            type="number"
            min={1}
            placeholder="0"
            {...form.register("pages", { valueAsNumber: true })}
          />
          {form.formState.errors.pages && (
            <p className="text-xs text-red-500 mt-1">
              {form.formState.errors.pages.message}
            </p>
          )}
        </div>
      </div>

      <Separator />

      {/* Project Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <h3 className="text-base font-medium mb-1">Project category</h3>
          <p className="text-sm text-muted-foreground">
            (Choose the type that best fits your project)
          </p>
        </div>
        <div>
          <Select
            onValueChange={(val) => form.setValue("category", val)}
            defaultValue={form.getValues("category")}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat: any) => (
                <SelectItem key={cat.slug?.current} value={cat.title}>
                  {cat.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Choose deliverables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <h3 className="text-base font-medium mb-1">Choose deliverables</h3>
          <p className="text-sm text-muted-foreground">
            (We offer design handover, or the full design+build)
          </p>
        </div>
        <div>
          <Select
            onValueChange={(val) => form.setValue("deliverable", val)}
            defaultValue={form.getValues("deliverable")}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {deliverables.map((d: any) => (
                <SelectItem key={d.key} value={d.key}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <h3 className="text-base font-medium mb-1">Project timeline</h3>
          <p className="text-sm text-muted-foreground">
            (How quickly do you need this delivered?)
          </p>
        </div>
        <div>
          <Select
            onValueChange={(val) => form.setValue("timeline", val)}
            defaultValue={form.getValues("timeline")}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timelines.map((t: any) => (
                <SelectItem key={t.key} value={t.key}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Currency Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <h3 className="text-base font-medium mb-1">Preferred currency</h3>
          <p className="text-sm text-muted-foreground">
            (Select the currency for your quote)
          </p>
        </div>
        <div>
          <Select
            onValueChange={(val) => form.setValue("currency", val)}
            defaultValue={form.getValues("currency")}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencyOptions.map((curr) => (
                <SelectItem key={curr} value={curr}>
                  {curr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* State of your brand */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <h3 className="text-base font-medium mb-1">State of your brand</h3>
          <p className="text-sm text-muted-foreground">
            (No problem if you aren't fully figuring out the style)
          </p>
        </div>
        <div>
          <Select
            onValueChange={(val) => form.setValue("brandState", val)}
            defaultValue={form.getValues("brandState")}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="I have no brand">I have no brand</SelectItem>
              <SelectItem value="I have brand assets">
                I have brand assets
              </SelectItem>
              <SelectItem value="Need brand consult">
                Need brand consult
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Where shall we send the quote */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <h3 className="text-base font-medium mb-1">
            Where shall we send the quote?
          </h3>
          <p className="text-sm text-muted-foreground">
            (In around two 3-4 mins, tops)
          </p>
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email address"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-xs text-red-500 mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
      </div>

      <Separator />

      {/* Submit button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={submitting} size="lg" className="cursor-pointer">
          {submitting ? (
            <>
              <Spinner className="mr-2" />
              Sending...
            </>
          ) : (
            "Send me my quote 🡽"
          )}
        </Button>
      </div>
    </form>
  );
}
