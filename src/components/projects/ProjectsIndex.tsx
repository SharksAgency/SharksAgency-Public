import Image from "next/image"
import Link from "next/link"

import type { Project } from "@/types/content"

export function ProjectsIndex({ projects }: { projects: Project[] }) {
  return (
    <section dir="rtl" className="bg-canvas px-6 pb-32 pt-40 md:px-12 md:pt-52">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex items-end justify-between gap-8 border-b border-navy/12 pb-8">
          <div>
            <span className="font-meta text-[11px] uppercase tracking-[0.3em] text-azure">
              Selected work
            </span>
            <h1 className="mt-4 text-[12vw] font-bold leading-none tracking-tight text-navy md:text-[6vw]">
              أعمالنا
            </h1>
          </div>
          <span
            dir="ltr"
            className="font-meta text-xs uppercase tracking-[0.25em] text-navy/45"
          >
            {String(projects.length).padStart(2, "0")} Projects
          </span>
        </div>

        <div className="grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-24">
          {projects.map((project, index) => (
            <article key={project.id} className={index % 2 ? "md:mt-24" : ""}>
              <Link
                href={`/work/${project.slug}`}
                className="group block"
                data-cursor="link"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-navy/5">
                  <Image
                    src={project.coverImage}
                    alt={project.coverAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-brand group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-navy md:text-4xl">
                      {project.title}
                    </h2>
                    <p className="mt-3 max-w-[36ch] text-navy/55">
                      {project.excerpt}
                    </p>
                  </div>
                  <span dir="ltr" className="font-meta text-xs text-navy/40">
                    {project.year ?? String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
