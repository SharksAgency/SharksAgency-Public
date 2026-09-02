import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ApproachPage } from "@/components/approach/ApproachPage"
import { APPROACHES, getApproach } from "@/data/approaches"

type ApproachRouteProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return APPROACHES.map((approach) => ({ slug: approach.slug }))
}

export async function generateMetadata({
  params,
}: ApproachRouteProps): Promise<Metadata> {
  const { slug } = await params
  const approach = getApproach(slug)
  if (!approach) return {}

  return {
    title: approach.title,
    description: approach.intro,
    alternates: { canonical: `/approach/${approach.slug}` },
    openGraph: {
      title: approach.title,
      description: approach.intro,
      url: `/approach/${approach.slug}`,
      images: [{ url: approach.cover, alt: approach.title }],
    },
  }
}

export default async function ApproachRoute({ params }: ApproachRouteProps) {
  const { slug } = await params
  const approach = getApproach(slug)
  if (!approach) notFound()

  return <ApproachPage approach={approach} />
}
