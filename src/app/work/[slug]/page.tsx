import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectDetail } from "@/components/projects/ProjectDetail"
import { getProjectBySlug } from "@/lib/content/queries"

type ProjectRouteProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()
  return {
    title: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.excerpt,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.seoTitle ?? project.title,
      description: project.seoDescription ?? project.excerpt,
      url: `/work/${project.slug}`,
      images: [{ url: project.coverImage, alt: project.coverAlt }],
    },
  }
}

export default async function ProjectRoute({ params }: ProjectRouteProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()
  return <ProjectDetail project={project} />
}
