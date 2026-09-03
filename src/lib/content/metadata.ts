import type { Metadata } from "next"
import { getSiteContent } from "@/lib/content/queries"
import type { EditorialContent } from "@/types/content"

export async function getRouteMetadata(
  key: keyof EditorialContent["routeSeo"],
  path: string,
): Promise<Metadata> {
  const content = await getSiteContent()
  const seo = content.editorial.routeSeo[key]
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: path },
    openGraph: {
      title: seo.ogTitle ?? seo.title,
      description: seo.ogDescription ?? seo.description,
      url: path,
    },
  }
}
