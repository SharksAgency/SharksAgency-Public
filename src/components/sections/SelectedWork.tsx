"use client"

/**
 * Realistic capability scenarios — NOT client case studies. Sharks is a new
 * agency; these describe the kinds of challenges we're built to solve and how we
 * approach them, presented as a stable vertical editorial sequence (no fragile
 * horizontal pin) with the same premium treatment.
 */

import Image from "next/image"
import Link from "next/link"

import { scenarios, type Scenario } from "@/data/scenarios"
import { useInView } from "@/hooks/useInView"
function ScenarioRow({
  s,
  index,
}: {
  s: Scenario
  index: number
}) {
  const { ref, inView } = useInView<HTMLDivElement>(
    { threshold: 0, rootMargin: "-15% 0px -20% 0px" },
    false,
  )
  const flip = index % 2 === 1
  const finCut = index === 1

  return (
    <div
      ref={ref}
      dir="rtl"
      data-active={inView}
      className="grid grid-cols-12 items-center gap-8 md:gap-12"
    >
      <div
        className={
          "col-span-12 md:col-span-6 " + (flip ? "md:order-2" : "md:order-1")
        }
      >
        <div
          data-cursor="view"
          className="group relative aspect-[16/11] overflow-hidden bg-navy/5"
          style={{
            clipPath: finCut
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 12%)"
              : inView
                ? "inset(0% 0% 0% 0%)"
                : "inset(8% 8% 8% 8%)",
            transition: "clip-path 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <Image
            src={s.cover}
            alt={s.coverAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-[1100ms] ease-brand group-hover:scale-[1.04]"
            style={{ transform: inView ? "scale(1)" : "scale(1.08)" }}
          />
          <span className="pointer-events-none absolute left-[-40%] top-0 h-full w-1/3 -skew-x-12 bg-azure/70 opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100" />
          <span
            dir="ltr"
            className="pointer-events-none absolute right-3 top-3 font-meta text-[10px] uppercase tracking-[0.2em] text-white mix-blend-difference"
          >
            Scenario {s.number}
          </span>
        </div>
      </div>
      <div
        className={
          "col-span-12 md:col-span-6 " +
          (flip ? "md:order-1 md:pr-4" : "md:order-2 md:pl-4")
        }
      >
        <div className="flex items-baseline gap-4">
          <span
            className="font-meta text-6xl font-medium leading-none tabular-nums text-azure/90 transition-all duration-700 md:text-7xl"
            style={{
              opacity: inView ? 1 : 0.3,
              transform: inView ? "translateY(0)" : "translateY(10px)",
            }}
          >
            {s.number}
          </span>
          <span className="font-meta text-[11px] uppercase tracking-[0.25em] text-navy/45">
            {s.focus}
          </span>
        </div>

        <h3
          className="mt-5 text-[9vw] font-bold leading-[1.05] tracking-tight text-navy transition-transform duration-[900ms] ease-brand md:text-[3.4vw]"
          style={{
            transform: inView ? "translateY(0)" : "translateY(18px)",
            opacity: inView ? 1 : 0,
          }}
        >
          {s.title}
        </h3>

        <p
          className="mt-5 max-w-[42ch] text-lg leading-relaxed text-navy/65 transition-all duration-700 md:text-xl"
          style={{
            transitionDelay: "0.1s",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(12px)",
          }}
        >
          {s.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {s.keywords.map((k, i) => (
            <span
              key={k}
              className="font-meta text-sm text-navy/50 transition-all duration-500"
              style={{
                transitionDelay: `${0.15 + i * 0.06}s`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(8px)",
              }}
            >
              <span className="text-azure/60">/</span> {k}
            </span>
          ))}
        </div>
        <Link
          href={`/approach/${s.slug}`}
          data-cursor="cta"
          className="group mt-9 inline-flex items-center gap-3 border-b border-navy/20 pb-1 text-navy transition-colors duration-300 hover:border-azure hover:text-azure"
        >
          <span className="text-lg">كيف نتعامل معها؟</span>
          <span
            dir="ltr"
            className="inline-block transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            ↗
          </span>
        </Link>
      </div>
    </div>
  )
}

export function SelectedWork() {
  return (
    <section
      id="work"
      className="relative scroll-mt-24 bg-canvas py-28 md:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div
          dir="rtl"
          className="mb-20 flex items-end justify-between gap-6 md:mb-28"
        >
          <div>
            <span className="font-meta text-[11px] uppercase tracking-[0.3em] text-azure">
              Capabilities in Action — 03
            </span>
            <h2 className="mt-3 text-[10vw] font-bold leading-none tracking-tight text-navy md:text-[4vw]">
              كيف <span className="text-azure">نتحرك</span>؟
            </h2>
          </div>
          <p className="hidden max-w-[26ch] text-navy/55 md:block">
            ليست أعمالًا سابقة، بل سيناريوهات تكشف طريقة تفكيرنا في التحديات.
          </p>
        </div>
        <div className="flex flex-col gap-24 md:gap-36">
          {scenarios.map((scenario, index) => (
            <ScenarioRow key={scenario.number} s={scenario} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
