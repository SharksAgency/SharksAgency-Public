import type { MetadataRoute } from "next"

import {
  getPublishedArticles,
  getPublishedProjects,
  getScenarios,
} from "@/lib/content/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharks.agency"
  const [scenarios, articles, projects] = await Promise.all([
    getScenarios(),
    getPublishedArticles(),
    getPublishedProjects(),
  ])
  const staticRoutes = ["", "/blog", "/studio", "/contact"]

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency:
        route === "/blog" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    })),
    ...scenarios.map((scenario) => ({
      url: `${baseUrl}/approach/${scenario.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articles.map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: new Date(article.publishDate),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...(projects.length > 0
      ? [
          {
            url: `${baseUrl}/works`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
          },
          ...projects.map((project) => ({
            url: `${baseUrl}/work/${project.slug}`,
            lastModified: new Date(project.publishedAt),
            changeFrequency: "yearly" as const,
            priority: 0.6,
          })),
        ]
      : []),
  ]
}
