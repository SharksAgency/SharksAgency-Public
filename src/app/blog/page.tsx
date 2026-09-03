import type { Metadata } from "next"

import { BlogCatalog } from "@/components/blog/BlogCatalog"
import { BlogHero } from "@/components/blog/BlogHero"
import { FeaturedArticle } from "@/components/blog/FeaturedArticle"
import {
  getBlogCategories,
  getPublishedArticles,
  getSiteContent,
} from "@/lib/content/queries"
import { getRouteMetadata } from "@/lib/content/metadata"

export async function generateMetadata(): Promise<Metadata> {
  return getRouteMetadata("blog", "/blog")
}

export default async function BlogPage() {
  const [previews, categories, content] = await Promise.all([
    getPublishedArticles(),
    getBlogCategories(),
    getSiteContent(),
  ])
  const featured = previews.find((article) => article.featured) ?? previews[0]
  const articles = featured
    ? previews.filter((article) => article.slug !== featured.slug)
    : []

  return (
    <div className="bg-canvas">
      <BlogHero content={content.editorial.blog} />
      {featured ? (
        <>
          <FeaturedArticle article={featured} />
          <BlogCatalog articles={articles} categories={categories} content={content.editorial.blog} />
        </>
      ) : (
        <section className="bg-canvas px-6 py-24 md:px-12 md:py-32">
          <p className="mx-auto max-w-[1600px] border-t border-navy/12 py-16 text-lg text-navy/50">
            {content.editorial.blog.emptyMessage}
          </p>
        </section>
      )}
    </div>
  )
}
