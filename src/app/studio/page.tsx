import type { Metadata } from "next"

import { Contact } from "@/components/sections/Contact"
import { Philosophy } from "@/components/sections/Philosophy"
import { Process } from "@/components/sections/Process"
import { Studio } from "@/components/sections/Studio"
import { getSiteContent } from "@/lib/content/queries"
import { getRouteMetadata } from "@/lib/content/metadata"

export async function generateMetadata(): Promise<Metadata> {
  return getRouteMetadata("studio", "/studio")
}

export default async function StudioPage() {
  const content = await getSiteContent()

  return (
    <>
      <Studio asPage content={content.studio} />
      <Process content={content.editorial.process} />
      <Philosophy content={content.editorial.philosophy} />
      <Contact content={content} />
    </>
  )
}
