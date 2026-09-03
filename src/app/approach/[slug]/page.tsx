import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ApproachPage } from "@/components/approach/ApproachPage"
import { getApproachBySlug } from "@/lib/content/queries"

type ApproachRouteProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: ApproachRouteProps): Promise<Metadata> {
  const { slug } = await params
  const approach = await getApproachBySlug(slug)
  if (!approach) notFound()

  return {
    title: approach.seoTitle ?? approach.title,
    description: approach.seoDescription ?? approach.intro,
    alternates: { canonical: `/approach/${approach.slug}` },
    openGraph: {
      title: approach.seoTitle ?? approach.title,
      description: approach.seoDescription ?? approach.intro,
      url: `/approach/${approach.slug}`,
      images: [{ url: approach.ogImage ?? approach.cover, alt: approach.title }],
    },
  }
}

export default async function ApproachRoute({ params }: ApproachRouteProps) {
  const { slug } = await params
  const approach = await getApproachBySlug(slug)
  if (!approach) notFound()

  return <ApproachPage approach={approach} />
}
