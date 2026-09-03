import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { ProjectsIndex } from "@/components/projects/ProjectsIndex"
import { getPublishedProjects } from "@/lib/content/queries"
import { getRouteMetadata } from "@/lib/content/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const projects = await getPublishedProjects()
  if (!projects.length) redirect("/#work")
  return getRouteMetadata("works", "/works")
}

export default async function WorksPage() {
  const projects = await getPublishedProjects()
  if (!projects.length) redirect("/#work")
  return <ProjectsIndex projects={projects} />
}
