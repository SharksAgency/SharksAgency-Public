"use client"

/** Areas Sharks is built to work in — presented as editorial typography, not
 *  client logos or partner names. Honest for a new agency: where we can make a
 *  difference, not who we've worked with. */

import { useInView } from "@/hooks/useInView"
import type { EditorialContent, Partner } from "@/types/content"

export function Clients({
  partners,
  content,
}: {
  partners: Partner[]
  content: EditorialContent["capabilities"]
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 })
  const items = partners.length
    ? partners.map((partner) => ({
        ar: partner.name,
        en:
          partner.type === "client"
            ? "Client"
            : partner.type === "collaborator"
              ? "Collaborator"
              : "Partner",
        href: partner.websiteUrl,
      }))
    : content.items.map((space) => ({ ...space, href: undefined }))

  return (
    <section dir="rtl" className="relative bg-canvas px-6 py-40 md:px-12">
      <div ref={ref} className="mx-auto max-w-[1600px]">
        <div className="mb-16 grid grid-cols-12 items-end gap-6">
          <div className="col-span-12 md:col-span-8">
            <span className="font-meta text-[11px] uppercase tracking-[0.3em] text-azure">
              {partners.length ? "Selected Partners" : content.eyebrow}
            </span>
            <h2 className="mt-3 max-w-[18ch] text-[8vw] font-bold leading-[1.05] tracking-tight text-navy md:text-[3.4vw]">
              {partners.length ? (
                <>
                  شركاء نتحرك معهم نحو{" "}
                  <span className="text-azure">الأمام</span>.
                </>
              ) : (
                <>
                  {content.before}
                  <span className="text-azure">{content.highlight}</span>
                  {content.after}
                </>
              )}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className="max-w-[28ch] text-navy/55 md:mr-auto md:text-left">
              {partners.length
                ? "جهات موثقة نعتز بالعمل والتعاون معها."
                : content.description}
            </p>
          </div>
        </div>

        <div className="border-t border-navy/12">
          {items.map((s, i) => {
            const Element = s.href ? "a" : "div"
            return (
              <Element
                key={s.ar}
                {...(s.href
                  ? { href: s.href, target: "_blank", rel: "noreferrer" }
                  : {})}
                className="group flex items-baseline justify-between gap-4 border-b border-navy/12 py-5 transition-all duration-500 ease-brand md:py-6"
                style={{
                  transitionDelay: `${i * 0.05}s`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(18px)",
                }}
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-meta text-sm tabular-nums text-navy/30 transition-colors duration-300 group-hover:text-azure">
                    0{i + 1}
                  </span>
                  <span className="text-[9vw] font-bold leading-none tracking-tight text-navy transition-colors duration-300 group-hover:text-azure md:text-[4vw]">
                    {s.ar}
                  </span>
                </div>
                <span className="font-meta text-[11px] uppercase tracking-[0.25em] text-navy/35 transition-colors duration-300 group-hover:text-navy/70">
                  {s.en}
                </span>
              </Element>
            )
          })}
        </div>
      </div>
    </section>
  )
}
