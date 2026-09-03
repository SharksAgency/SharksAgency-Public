import Link from "next/link"

import { ArticleCover, ArticleImage } from "@/components/blog/ArticleMedia"
import { CopyArticleLink } from "@/components/blog/CopyArticleLink"
import { NextArticle } from "@/components/blog/NextArticle"
import { ReadingProgress } from "@/components/blog/ReadingProgress"
import type { Article, ArticleBlock } from "@/types/content"

function ArticleBlock({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-lg leading-[2] text-navy/80 md:text-xl">
          {block.text}
        </p>
      )
    case "h2":
      return (
        <h2 className="mt-4 text-[7vw] font-bold leading-tight tracking-tight text-navy md:text-[2.4vw]">
          {block.text}
        </h2>
      )
    case "h3":
      return (
        <h3 className="mt-2 text-[5vw] font-semibold leading-tight tracking-tight text-navy md:text-[1.7vw]">
          {block.text}
        </h3>
      )
    case "quote":
      return (
        <blockquote className="relative py-4 md:-mx-10">
          <p className="border-r-2 border-azure pr-6 text-[6vw] font-bold leading-[1.3] tracking-tight text-navy md:pr-8 md:text-[2.6vw]">
            {block.text}
          </p>
          {block.cite && (
            <cite className="mt-3 block pr-6 font-meta text-[11px] uppercase not-italic tracking-[0.2em] text-navy/45 md:pr-8">
              {block.cite}
            </cite>
          )}
        </blockquote>
      )
    case "highlight":
      return (
        <p className="text-xl font-semibold leading-relaxed text-navy md:text-2xl">
          <span className="box-decoration-clone bg-azure/10 px-1 text-azure">
            {block.text}
          </span>
        </p>
      )
    case "list":
      return (
        <ul className="flex flex-col gap-4">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-4 text-lg leading-relaxed text-navy/80 md:text-xl"
            >
              <span
                className="mt-3 h-1.5 w-3 shrink-0 bg-azure"
                style={{ clipPath: "polygon(0 0,100% 50%,0 100%)" }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case "image":
      return <ArticleImage block={block} />
  }
}

export function BlogArticle({
  article,
  related,
}: {
  article: Article
  related: Article[]
}) {
  const nextArticle = related[0]
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharks.agency"
  const articleUrl = `${baseUrl}/blog/${article.slug}`
  const encodedUrl = encodeURIComponent(articleUrl)
  const encodedTitle = encodeURIComponent(article.title)

  return (
    <article className="relative bg-canvas">
      <ReadingProgress />

      <header className="px-6 pt-40 md:px-12 md:pt-48">
        <div className="mx-auto max-w-[1100px]">
          <Link
            href="/blog"
            data-cursor="link"
            className="font-meta text-[11px] uppercase tracking-[0.3em] text-navy/45 transition-colors hover:text-azure"
          >
            ← Journal / {article.categoryEn}
          </Link>
          <span className="mt-6 block font-meta text-[11px] uppercase tracking-[0.35em] text-azure">
            {article.category}
          </span>
          <h1 className="mt-5 text-[10vw] font-bold leading-[1.04] tracking-tight text-navy md:text-[4.4vw]">
            {article.title}
          </h1>
          <p className="mt-8 max-w-[48ch] text-xl leading-relaxed text-navy/60 md:text-2xl">
            {article.deck}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-navy/12 pt-6 font-meta text-[11px] uppercase tracking-[0.2em] text-navy/45">
            <span className="text-navy/70">{article.author}</span>
            <span className="text-navy/20">—</span>
            <time dateTime={article.publishDate} dir="ltr">
              {article.publishLabel}
            </time>
            <span className="text-navy/20">—</span>
            <span dir="ltr">{article.readingTime}</span>
          </div>
        </div>
      </header>

      <ArticleCover src={article.coverImage} alt={article.coverAlt || article.title} />

      <div className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8">
          <aside
            className="hidden md:col-span-3 md:block"
            aria-label="بيانات المقال"
          >
            <div className="sticky top-28 flex flex-col gap-6 font-meta text-[11px] uppercase tracking-[0.2em] text-navy/45">
              <div>
                <div className="text-navy/35">Category</div>
                <div className="mt-1 text-navy/70">{article.category}</div>
              </div>
              <div>
                <div className="text-navy/35">Date</div>
                <time
                  className="mt-1 block text-navy/70"
                  dateTime={article.publishDate}
                  dir="ltr"
                >
                  {article.publishLabel}
                </time>
              </div>
              <div>
                <div className="text-navy/35">Reading</div>
                <div className="mt-1 text-navy/70" dir="ltr">
                  {article.readingTime}
                </div>
              </div>
              <div>
                <div className="text-navy/35">Share</div>
                <div className="mt-2 flex gap-3 text-navy/70">
                  <a
                    href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="hover:text-azure"
                    aria-label="مشاركة على X"
                  >
                    X
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="hover:text-azure"
                    aria-label="مشاركة على LinkedIn"
                  >
                    in
                  </a>
                  <CopyArticleLink url={articleUrl} />
                </div>
              </div>
            </div>
          </aside>

          <div className="col-span-12 flex flex-col gap-8 md:col-span-8 md:col-start-4 md:gap-10">
            {article.content.map((block, index) => (
              <ArticleBlock key={`${block.type}-${index}`} block={block} />
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-navy/12 px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-12 flex items-center gap-5">
              <h2 className="text-[8vw] font-bold tracking-tight text-navy md:text-[2.6vw]">
                لا تتوقف هنا.
              </h2>
              <span className="h-px flex-1 bg-navy/15" />
            </div>
            <div className="border-t border-navy/12">
              {related.map((item, index) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  data-cursor="link"
                  className="group relative flex items-baseline justify-between gap-6 border-b border-navy/12 py-8"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="font-meta text-[11px] uppercase tracking-[0.25em] text-navy/40 transition-colors group-hover:text-azure">
                      Next / 0{index + 1}
                    </span>
                    <span className="text-[6vw] font-bold leading-tight tracking-tight text-navy transition-transform duration-500 group-hover:translate-x-[-0.5rem] md:text-[2.4vw]">
                      {item.title}
                    </span>
                  </div>
                  <span className="shrink-0 text-2xl text-navy transition-all duration-300 group-hover:-translate-x-1 group-hover:text-azure">
                    ↖
                  </span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-azure transition-transform duration-[700ms] group-hover:scale-x-100"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {nextArticle && (
        <NextArticle
          slug={nextArticle.slug}
          title={nextArticle.title}
          category={nextArticle.category}
        />
      )}
    </article>
  )
}
