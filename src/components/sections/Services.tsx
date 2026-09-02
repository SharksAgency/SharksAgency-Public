"use client"

// Systematic per-row variations (not chaos) — kept subtle so nothing collides.
/* Number — expressive but contained in its own column */

import Image from "next/image"

import { services, type Service } from "@/data/services"
import { useInView } from "@/hooks/useInView"
import { Tag } from "@/components/ui/Tag"

function Row({
  service,
  index,
}: {
  service: Service
  index: number
}) {
  const { ref, inView } = useInView<HTMLDivElement>(
    { threshold: 0, rootMargin: "-30% 0px -30% 0px" },
    false,
  )
  const imgLower = index === 0 ? "md:mt-10" : ""
  const bigNumber = index === 1 ? "md:text-[5.5vw]" : "md:text-[4.5vw]"
  const tagsOffset = index === 2 ? "md:translate-x-4" : ""

  return (
    <div
      ref={ref}
      data-active={inView}
      className="group relative border-t border-navy/12 py-12 md:py-16"
    >
      <div className="grid grid-cols-12 items-start gap-6 md:gap-8">
        <div className="col-span-3 md:col-span-2">
          <span
            className={
              "block font-meta text-5xl font-medium leading-none tabular-nums transition-all duration-700 ease-brand " +
              bigNumber +
              (inView
                ? " translate-y-0 text-azure opacity-100"
                : " text-navy/25 opacity-70 md:translate-y-2")
            }
          >
            {service.number}
          </span>
        </div>
        <div className="col-span-9 md:col-span-4">
          <div
            className={
              "relative aspect-[4/5] overflow-hidden bg-navy/5 " + imgLower
            }
            style={{
              clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(8% 8% 8% 8%)",
              transition: "clip-path 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              sizes="(min-width: 768px) 33vw, 75vw"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-brand"
              style={{ transform: inView ? "scale(1)" : "scale(1.08)" }}
            />
            <span
              dir="ltr"
              className="pointer-events-none absolute right-3 top-3 font-meta text-[10px] uppercase tracking-[0.2em] text-white mix-blend-difference"
            >
              0{index + 1} / 04
            </span>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 md:pr-4">
          <div className="overflow-hidden">
            <h3
              className="text-[9vw] font-bold leading-[1.05] tracking-tight text-navy transition-transform duration-[900ms] ease-brand md:text-[4vw]"
              style={{
                transform: inView ? "translateY(0)" : "translateY(110%)",
              }}
            >
              {service.title}
            </h3>
          </div>

          <div className={"mt-6 flex flex-wrap gap-2 " + tagsOffset}>
            {service.tags.map((tag, i) => (
              <span
                key={tag}
                className="transition-all duration-500 ease-brand"
                style={{
                  transitionDelay: `${0.1 + i * 0.06}s`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(10px)",
                }}
              >
                <Tag>{tag}</Tag>
              </span>
            ))}
          </div>

          <p
            className="mt-8 max-w-[46ch] text-lg leading-relaxed text-navy/70 transition-all duration-700 md:text-xl"
            style={{
              transitionDelay: "0.25s",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(14px)",
            }}
          >
            {service.description}
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-visible">
        <span
          className="absolute inset-y-0 right-0 block h-px bg-azure transition-[width] duration-[900ms] ease-brand"
          style={{ width: inView ? "100%" : "0%" }}
        />
        <span
          aria-hidden
          className="absolute -top-[3px] block h-[7px] w-3 bg-azure transition-[right] duration-[900ms] ease-brand"
          style={{
            right: inView ? "calc(100% - 12px)" : "0%",
            clipPath: "polygon(0 100%, 100% 100%, 100% 0)",
          }}
        />
      </div>
    </div>
  )
}

export function Services() {
  return (
    <section
      id="services"
      dir="rtl"
      className="relative scroll-mt-24 bg-canvas px-6 py-32 md:px-12"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-24 grid grid-cols-12 items-end gap-6">
          <div className="col-span-12 md:col-span-4">
            <span className="font-meta text-[11px] uppercase tracking-[0.3em] text-azure">
              What We Do
            </span>
            <div className="mt-2 font-meta text-[11px] uppercase tracking-[0.3em] text-navy/50">
              خدماتنا
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-[8vw] font-bold leading-[1.05] tracking-tight text-navy md:text-[3.4vw]">
              لا نقدّم قائمة خدمات.
              <br />
              نبني <span className="text-azure">المنظومة</span> التي يحتاجها
              المشروع.
            </h2>
          </div>
        </div>
        <div className="border-b border-navy/12">
          {services.map((service, index) => (
            <Row key={service.number} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
