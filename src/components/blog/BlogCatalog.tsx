"use client"

import { useMemo, useState } from "react"

import { ArticleIndex } from "@/components/blog/ArticleIndex"
import { CategoryNav } from "@/components/blog/CategoryNav"
import type { ArticlePreview, BlogCategory, EditorialContent } from "@/types/content"

export function BlogCatalog({
  articles,
  categories,
  content,
}: {
  articles: ArticlePreview[]
  categories: BlogCategory[]
  content: EditorialContent["blog"]
}) {
  const [category, setCategory] = useState("all")
  const filtered = useMemo(() => {
    if (category === "all") return articles
    return articles.filter((article) => article.categorySlug === category)
  }, [articles, category])
  const firstGroup = filtered.slice(0, 3)
  const secondGroup = filtered.slice(3)

  return (
    <>
      <section className="relative bg-canvas px-6 md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-12 flex flex-col gap-8 md:mb-16">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[8vw] font-bold tracking-tight text-navy md:text-[2.6vw]">
                {content.allTitle}
              </h2>
              <span className="font-meta text-[11px] uppercase tracking-[0.3em] text-navy/40">
                <span dir="ltr" className="tabular-nums">
                  {String(filtered.length).padStart(2, "0")}
                </span>{" "}
                Articles
              </span>
            </div>
            <CategoryNav
              active={category}
              onChange={setCategory}
              categories={categories}
            />
          </div>

          {filtered.length === 0 ? (
            <p className="border-t border-navy/12 py-16 text-lg text-navy/50">
              لا توجد مقالات في هذا التصنيف بعد.
            </p>
          ) : (
            <ArticleIndex articles={firstGroup} />
          )}
        </div>
      </section>

      {secondGroup.length > 0 && <TypographyBreak content={content} />}
      {secondGroup.length > 0 && (
        <section className="relative bg-canvas px-6 md:px-12">
          <div className="mx-auto max-w-[1600px]">
            <ArticleIndex articles={secondGroup} />
          </div>
        </section>
      )}
    </>
  )
}

function TypographyBreak({ content }: { content: EditorialContent["blog"] }) {

  return (
    <section className="relative overflow-hidden bg-canvas py-32 md:py-48">
      <div className="px-6 md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col gap-1 md:gap-2">
            {content.breakWords.map((word) => (
              <span
                key={word}
                className="text-[16vw] font-bold leading-[0.9] tracking-tight text-navy md:text-[9vw]"
              >
                {word}
              </span>
            ))}
            <span className="text-[16vw] font-bold leading-[0.9] tracking-tight text-navy md:text-[9vw]">
              {content.breakBefore}<span className="text-azure">{content.breakHighlight}</span>{content.breakAfter}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
