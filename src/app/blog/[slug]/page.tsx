import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogArticle } from "@/components/blog/BlogArticle"
import {
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/content/queries"

type ArticlePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${article.slug}`,
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt,
      publishedTime: article.publishDate,
      authors: [article.author],
      images: [{ url: article.ogImage ?? article.coverImage, alt: article.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt,
      images: [article.ogImage ?? article.coverImage],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const related = await getRelatedArticles(article.related)
  return <BlogArticle article={article} related={related} />
}
