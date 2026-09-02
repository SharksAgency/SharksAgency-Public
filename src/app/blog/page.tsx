import type { Metadata } from "next"

import { BlogCatalog } from "@/components/blog/BlogCatalog"
import { BlogHero } from "@/components/blog/BlogHero"
import { FeaturedArticle } from "@/components/blog/FeaturedArticle"
import { getArticlePreviews } from "@/data/blog"

export const metadata: Metadata = {
  title: "المدونة",
  description:
    "Sharks Journal — أفكار عن الاستراتيجية والهوية والتصميم والتسويق والويب.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Sharks Journal",
    description: "نكتب عن الأشياء التي تغيّر الاتجاه.",
    url: "/blog",
  },
}

export default function BlogPage() {
  const previews = getArticlePreviews()
  const featured = previews.find((article) => article.featured) ?? previews[0]
  const articles = previews.filter((article) => article.slug !== featured.slug)

  return (
    <div className="bg-canvas">
      <BlogHero />
      <FeaturedArticle article={featured} />
      <BlogCatalog articles={articles} />
    </div>
  )
}
