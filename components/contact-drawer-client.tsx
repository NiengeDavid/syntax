"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import { useState, useEffect } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { CONTACT_QUERYResult, SETTINGS_QUERYResult } from "@/sanity.types";

interface ContactDrawerClientProps {
  contactInfo: CONTACT_QUERYResult;
  settings: SETTINGS_QUERYResult;
}

export function ContactDrawerClient({
  contactInfo,
  settings,
}: ContactDrawerClientProps) {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleEmailClick = () => {
    if (contactInfo?.email) {
      window.location.href = `mailto:${contactInfo.email}`;
    }
  };

  const handlePhoneClick = () => {
    if (contactInfo?.phone) {
      window.location.href = `tel:${contactInfo.phone}`;
    }
  };

  const handleWhatsAppClick = () => {
    if (contactInfo?.whatsapp) {
      const message = encodeURIComponent(contactInfo?.whatsappMessage || "");
      window.open(
        `https://wa.me/${contactInfo?.whatsapp?.replace(
          /\D/g,
          ""
        )}?text=${message}`,
        "_blank"
      );
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open Contact Menu"
          variant="outline"
          className="w-fit p-5 cursor-pointer focus-visible:ring-1 focus-visible:ring-offset-1"
        >
          <Phone className="dark:text-white" />
          <span>
            Contact us
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <div className="mx-auto">
            <Logo settings={settings} />
          </div>
          <div className="sr-only">
            <SheetTitle>Contact Us</SheetTitle>
            <SheetDescription>Contact us panel</SheetDescription>
          </div>
        </SheetHeader>
        <div className="pt-10 pb-20">
          <div className="px-4">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                {contactInfo?.title}
              </h2>
              <p className="text-muted-foreground text-lg">
                {contactInfo?.description}
              </p>
            </div>

            {/* Contact Actions */}
            <div className="space-y-4 mb-12">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
                Get In Touch
              </h3>

              {contactInfo?.email && (
                <Button
                  onClick={handleEmailClick}
                  variant="outline"
                  size="lg"
                  className="w-full justify-start gap-3 h-auto py-4 cursor-pointer"
                >
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-semibold">Email</div>
                    <div className="text-sm text-muted-foreground">
                      {contactInfo.email}
                    </div>
                  </div>
                </Button>
              )}

              {contactInfo?.whatsapp && (
                <Button
                  onClick={handleWhatsAppClick}
                  variant="outline"
                  size="lg"
                  className="w-full justify-start gap-3 h-auto py-4 cursor-pointer"
                >
                  <MessageCircle className="h-5 w-5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-semibold">WhatsApp</div>
                    <div className="text-sm text-muted-foreground">
                      {contactInfo.phone}
                    </div>
                  </div>
                </Button>
              )}

              {contactInfo?.phone && (
                <Button
                  onClick={handlePhoneClick}
                  variant="outline"
                  size="lg"
                  className="w-full justify-start gap-3 h-auto py-4 cursor-pointer"
                >
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-semibold">Call</div>
                    <div className="text-sm text-muted-foreground">
                      {contactInfo.phone}
                    </div>
                  </div>
                </Button>
              )}
            </div>

            {/* Address */}
            {contactInfo?.address && (
              <div className="mb-12">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
                  Location
                </h3>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-muted-foreground" />
                  <p className="text-foreground/80">{contactInfo.address}</p>
                </div>
              </div>
            )}

            {/* Social Links */}
            {contactInfo?.socials && contactInfo.socials.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
                  Follow Us
                </h3>
                <div className="flex flex-wrap gap-3">
                  {contactInfo.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors text-sm font-medium"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
