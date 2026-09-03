import type { Metadata } from "next"

import { Contact } from "@/components/sections/Contact"
import { getSiteContent } from "@/lib/content/queries"
import { getRouteMetadata } from "@/lib/content/metadata"

export async function generateMetadata(): Promise<Metadata> {
  return getRouteMetadata("contact", "/contact")
}

export default async function ContactPage() {
  const content = await getSiteContent()
  return <Contact asPage content={content} />
}
