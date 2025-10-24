import { fetchSanityContact, fetchSanitySettings } from "@/sanity/lib/fetch";
import { ContactDrawerClient } from "@/components/contact-drawer-client";

export async function ContactDrawer() {
  const contactInfo = await fetchSanityContact();
  const settings = await fetchSanitySettings();

  return <ContactDrawerClient contactInfo={contactInfo} settings={settings} />;
}
