import type { MetadataRoute } from "next"

import { APPROACHES } from "@/data/approaches"
import { ARTICLES } from "@/data/blog"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharks.agency"
  const staticRoutes = ["", "/blog", "/studio", "/contact"]

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency:
        route === "/blog" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...APPROACHES.map((approach) => ({
      url: `${baseUrl}/approach/${approach.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...ARTICLES.map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: new Date(article.publishDate),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ]
}
