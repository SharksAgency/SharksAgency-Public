"use client"
import { useInView } from "@/hooks/useInView"
import type { SiteContent } from "@/types/content"


export function Studio({
  asPage = false,
  content,
}: {
  asPage?: boolean
  content: SiteContent["studio"]
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })
  const Heading = asPage ? "h1" : "h2"

  return (
    <section
      id="studio"
      dir="rtl"
      className="relative scroll-mt-24 bg-canvas px-6 py-40 md:px-12"
    >
      <div ref={ref} className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <span className="font-meta text-[11px] uppercase tracking-[0.3em] text-azure">
              {content.eyebrow}
            </span>
            <div className="mt-2 font-meta text-[11px] uppercase tracking-[0.3em] text-navy/50">
              {content.label}
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Heading className="text-[8vw] font-bold leading-[1.08] tracking-tight text-navy md:text-[3.6vw]">
              {content.titleBefore}
              <span className="text-azure">{content.titleHighlight}</span>
              {content.titleAfter}
            </Heading>
            <p className="mt-8 max-w-[40ch] text-xl leading-relaxed text-navy/60 md:text-2xl">
              {content.description}
            </p>
          </div>
        </div>
        <div className="mt-28 grid grid-cols-12 items-end gap-8 border-t border-navy/12 pt-12">
          <div className="col-span-12 flex items-baseline gap-6 md:col-span-4">
            <span className="text-[22vw] font-bold leading-none tracking-tighter text-navy md:text-[9vw]">
              {String(content.tracks.length).padStart(2, "0")}
            </span>
            <span className="max-w-[14ch] text-lg text-navy/60">
              {content.trackSummary}
            </span>
          </div>

          <div className="col-span-12 md:col-span-8">
            <ul className="divide-y divide-navy/12">
              {content.tracks.map((t, i) => (
                <li
                  key={t}
                  className="group flex items-center justify-between py-5 transition-all duration-500"
                  style={{
                    transitionDelay: `${i * 0.08}s`,
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(16px)",
                  }}
                >
                  <span className="font-meta text-4xl font-medium uppercase tracking-tight text-navy transition-colors duration-300 group-hover:text-azure md:text-5xl">
                    {t}
                  </span>
                  <span className="font-meta text-sm text-navy/40">
                    0{i + 1}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
