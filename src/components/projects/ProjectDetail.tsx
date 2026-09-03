import Image from "next/image"
import Link from "next/link"

import type { ArticleBlock, Project } from "@/types/content"

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article dir="rtl" className="bg-canvas px-6 pb-32 pt-40 md:px-12 md:pt-52">
      <div className="mx-auto max-w-[1600px]">
        <Link
          href="/works"
          className="font-meta text-xs uppercase tracking-[0.25em] text-azure"
          data-cursor="link"
        >
          ← Selected work
        </Link>
        <div className="mt-12 grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <span className="font-meta text-[11px] uppercase tracking-[0.3em] text-navy/40">
              {project.category ?? "Project"}
            </span>
            <h1 className="mt-5 text-[12vw] font-bold leading-[0.95] tracking-tight text-navy md:text-[6vw]">
              {project.title}
            </h1>
            <p className="mt-8 max-w-[48ch] text-xl leading-relaxed text-navy/60 md:text-2xl">
              {project.excerpt}
            </p>
          </div>
          <div className="md:col-span-4 md:text-left">
            {project.clientName && (
              <p className="text-lg text-navy">{project.clientName}</p>
            )}
            {project.year && (
              <p
                dir="ltr"
                className="mt-2 font-meta text-xs uppercase tracking-[0.25em] text-navy/45"
              >
                {project.year}
              </p>
            )}
          </div>
        </div>

        <div className="relative mt-20 aspect-[16/9] overflow-hidden bg-navy/5">
          <Image
            src={project.coverImage}
            alt={project.coverAlt}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>

        <div className="mx-auto mt-20 max-w-[900px]">
          <ProjectBlocks blocks={project.body} />
        </div>

        {project.gallery.length > 0 && (
          <div className="mt-24 grid gap-6 md:grid-cols-2">
            {project.gallery.map((item) => (
              <figure key={item.id}>
                <div className="relative aspect-[4/3] overflow-hidden bg-navy/5">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                {item.caption && (
                  <figcaption className="mt-3 text-sm text-navy/45">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

function ProjectBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-8 text-lg leading-relaxed text-navy/75 md:text-xl">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                className="pt-8 text-3xl font-semibold text-navy md:text-4xl"
              >
                {block.text}
              </h2>
            )
          case "h3":
            return (
              <h3 key={index} className="pt-6 text-2xl font-semibold text-navy">
                {block.text}
              </h3>
            )
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-r-2 border-azure py-3 pr-6 text-2xl font-semibold text-navy"
              >
                {block.text}
              </blockquote>
            )
          case "highlight":
            return (
              <p key={index} className="bg-azure/10 p-6 text-navy">
                {block.text}
              </p>
            )
          case "list":
            return (
              <ul key={index} className="list-disc space-y-2 pr-6">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
          case "image":
            return (
              <figure
                key={index}
                className={block.break ? "-mx-6 my-14 md:-mx-24" : "my-10"}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-navy/5">
                  <Image
                    src={block.src}
                    alt={block.caption ?? ""}
                    fill
                    sizes="(min-width: 768px) 900px, 100vw"
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-3 text-sm text-navy/45">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )
          default:
            return <p key={index}>{block.text}</p>
        }
      })}
    </div>
  )
}
