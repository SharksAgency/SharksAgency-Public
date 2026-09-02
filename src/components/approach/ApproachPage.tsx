"use client"
import { useLayoutEffect, useRef, useState } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import type { Approach } from "@/data/approaches"
import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"

function Hero({ a }: { a: Approach }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 }, true)

  return (
    <header
      ref={ref}
      dir="rtl"
      className="relative overflow-hidden bg-canvas px-6 pb-24 pt-40 md:px-12 md:pb-40 md:pt-56"
    >
      <span
        aria-hidden
        dir="ltr"
        className="pointer-events-none absolute -left-4 top-24 select-none font-meta text-[38vw] font-bold leading-none tracking-tighter text-navy/[0.04] md:top-28 md:text-[26vw]"
      >
        {a.no}
      </span>

      <div className="relative mx-auto max-w-[1600px]">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-azure" />
          <span className="font-meta text-[11px] uppercase tracking-[0.3em] text-azure">
            {a.scenario}
          </span>
        </div>

        <div className="mt-8 overflow-hidden">
          <h1
            className="text-[13vw] font-bold leading-[0.95] tracking-tight text-navy transition-transform duration-[1100ms] ease-brand md:text-[7.5vw]"
            style={{ transform: inView ? "translateY(0)" : "translateY(105%)" }}
          >
            {a.title}
          </h1>
        </div>

        <p
          className="mt-10 max-w-[52ch] text-xl leading-relaxed text-navy/70 transition-all duration-[900ms] md:text-2xl"
          style={{
            transitionDelay: "0.25s",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {a.intro}
        </p>
        <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t border-navy/12 pt-8">
          {a.keywords.map((k, i) => (
            <span
              key={k}
              dir="ltr"
              className="font-meta text-[11px] uppercase tracking-[0.3em] text-navy/40 transition-all duration-700"
              style={{
                transitionDelay: `${0.4 + i * 0.08}s`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(10px)",
              }}
            >
              {k}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}

function Situation({ a }: { a: Approach }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 }, true)

  return (
    <section
      ref={ref}
      dir="rtl"
      className="bg-canvas px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-12 md:col-span-3">
          <div className="flex items-center gap-3 md:sticky md:top-32">
            <span
              className="h-1.5 w-3 bg-azure"
              style={{ clipPath: "polygon(0 0,100% 50%,0 100%)" }}
            />
            <h2 className="font-meta text-[11px] uppercase tracking-[0.3em] text-navy/50">
              {a.situation.title}
            </h2>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <p
            className="text-[6.5vw] font-semibold leading-[1.15] tracking-tight text-navy transition-all duration-[900ms] md:text-[3vw]"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
            }}
          >
            {a.situation.lead}
          </p>
          <p
            className="mt-8 max-w-[56ch] text-lg leading-relaxed text-navy/60 transition-all duration-[900ms] md:text-xl"
            style={{
              transitionDelay: "0.15s",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
            }}
          >
            {a.situation.body}
          </p>
        </div>
      </div>
    </section>
  )
}

function LookForRow({
  item,
  i,
}: {
  item: string
  i: number
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 }, true)
  return (
    <div
      ref={ref}
      className="group relative flex items-center justify-between overflow-hidden border-b border-navy/12 py-6 md:py-8"
    >
      <div className="flex items-baseline gap-6 md:gap-10">
        <span
          dir="ltr"
          className="font-meta text-sm tabular-nums text-navy/30 transition-colors duration-300 group-hover:text-azure"
        >
          0{i + 1}
        </span>
        <span
          className="text-[8vw] font-bold leading-none tracking-tight text-navy transition-transform duration-[800ms] ease-brand group-hover:-translate-x-2 md:text-[3.2vw]"
          style={{ transform: inView ? "translateY(0)" : "translateY(80%)" }}
        >
          {item}
        </span>
      </div>
      <span
        aria-hidden
        className="translate-x-4 font-meta text-2xl text-azure opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
      >
        ↖
      </span>
    </div>
  )
}

function LookFor({ a }: { a: Approach }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 }, true)
  return (
    <section dir="rtl" className="bg-canvas px-6 py-28 md:px-12 md:py-40">
      <div ref={ref} className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex flex-col justify-between gap-6 md:mb-24 md:flex-row md:items-end">
          <h2 className="text-[10vw] font-bold leading-none tracking-tight text-navy md:text-[4.5vw]">
            عن ماذا <span className="text-azure">نبحث</span>؟
          </h2>
          <p
            className="max-w-[30ch] text-navy/55 transition-opacity duration-700"
            style={{ opacity: inView ? 1 : 0 }}
          >
            {a.lookFor.intro}
          </p>
        </div>
        <div>
          {a.lookFor.items.map((item, i) => (
            <LookForRow key={item} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSequence({ a }: { a: Approach }) {
  const stages = a.process.stages
  const wrapRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLSpanElement>(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const wrapper = wrapRef.current
    if (!wrapper || reducedMotion) return

    gsap.registerPlugin(ScrollTrigger)
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        onUpdate: ({ progress }) => {
          progressLineRef.current?.style.setProperty(
            "width",
            `${progress * 100}%`,
          )
          const next = Math.min(
            stages.length - 1,
            Math.floor(progress * stages.length),
          )
          if (next !== activeRef.current) {
            activeRef.current = next
            setActive(next)
          }
        },
      })
    }, wrapper)

    return () => context.revert()
  }, [reducedMotion, stages.length])

  if (reducedMotion) {
    return (
      <section className="bg-canvas px-6 py-28 md:px-12 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="font-meta text-[11px] uppercase tracking-[0.3em] text-azure">
            {a.process.title} — How We Move
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-5">
            {stages.map((stage) => (
              <li key={stage.no} className="border-t border-navy/12 pt-5">
                <span className="font-meta text-5xl text-azure">
                  {stage.no}
                </span>
                <h3 className="mt-4 text-2xl font-bold text-navy">
                  {stage.label}
                </h3>
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  return (
    <section
      dir="rtl"
      className="relative bg-canvas"
      ref={wrapRef}
      style={{ height: `${stages.length * 65}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-6 md:px-12">
          <div className="pt-28 md:pt-32">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-azure" />
              <h2 className="font-meta text-[11px] uppercase tracking-[0.3em] text-azure">
                {a.process.title} — How We Move
              </h2>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-12 items-center gap-8">
            <div className="col-span-12 md:col-span-7">
              <div
                className="relative overflow-hidden leading-[0.8]"
                style={{
                  height: "0.8em",
                  fontSize: "clamp(9rem, 30vw, 26rem)",
                }}
              >
                <div
                  className="font-meta font-bold tabular-nums text-navy transition-transform duration-[700ms] ease-brand will-change-transform"
                  style={{ transform: `translateY(${-active * 100}%)` }}
                >
                  {stages.map((s) => (
                    <div
                      key={s.no}
                      dir="ltr"
                      className="h-[0.8em] leading-[0.8]"
                    >
                      {s.no}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="flex gap-6 md:gap-8">
                <div className="relative w-px shrink-0 bg-navy/12">
                  <span
                    className="absolute right-0 top-0 block w-px origin-top bg-azure"
                    style={{
                      height: `${((active + 1) / stages.length) * 100}%`,
                      transition: "height 0.6s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                  <span
                    aria-hidden
                    className="absolute -right-[3px] block h-2 w-[7px] bg-azure"
                    style={{
                      top: `${((active + 1) / stages.length) * 100}%`,
                      transform: "translateY(-100%) rotate(90deg)",
                      clipPath: "polygon(0 0,100% 50%,0 100%)",
                      transition: "top 0.6s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </div>

                <ul className="flex flex-col gap-5 md:gap-7">
                  {stages.map((s, i) => {
                    const on = i === active
                    const done = i < active
                    return (
                      <li key={s.no} className="flex items-center gap-4">
                        <span
                          dir="ltr"
                          className={
                            "font-meta text-sm tabular-nums transition-colors duration-500 " +
                            (on
                              ? "text-azure"
                              : done
                                ? "text-navy/40"
                                : "text-navy/25")
                          }
                        >
                          {s.no}
                        </span>
                        <span
                          className={
                            "text-2xl font-bold tracking-tight transition-all duration-500 md:text-4xl " +
                            (on
                              ? "text-navy opacity-100"
                              : "text-navy/35 opacity-70") +
                            (on ? " -translate-x-1" : "")
                          }
                        >
                          {s.label}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="relative mb-10 h-px w-full bg-navy/10">
            <span
              ref={progressLineRef}
              className="absolute right-0 top-0 block h-px bg-azure"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Outputs({ a }: { a: Approach }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 }, true)
  return (
    <section dir="rtl" className="bg-canvas px-6 py-28 md:px-12 md:py-40">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1600px] grid-cols-12 gap-8 md:gap-12"
      >
        <div className="col-span-12 md:col-span-4">
          <h2 className="text-[9vw] font-bold leading-[1.05] tracking-tight text-navy md:text-[3.4vw]">
            ما الذي يمكن أن نخرج به؟
          </h2>
          <p className="mt-8 max-w-[34ch] text-lg leading-relaxed text-navy/60">
            {a.outputs.note}
          </p>
          <span className="mt-6 inline-block font-meta text-[11px] uppercase tracking-[0.3em] text-azure">
            Possible outputs — not a fixed package
          </span>
        </div>

        <div className="col-span-12 md:col-span-8">
          <ul className="grid grid-cols-1 border-t border-navy/12 sm:grid-cols-2">
            {a.outputs.items.map((item, i) => (
              <li
                key={item}
                dir="ltr"
                className="group flex items-baseline gap-4 border-b border-navy/12 py-5 text-right transition-colors duration-500 sm:odd:border-l sm:odd:border-l-navy/12 sm:odd:pl-8"
                style={{
                  transitionDelay: `${i * 0.05}s`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(12px)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "0.6s",
                }}
              >
                <span className="font-meta text-xs tabular-nums text-navy/30">
                  0{i + 1}
                </span>
                <span className="font-meta text-xl font-medium text-navy transition-colors duration-300 group-hover:text-azure md:text-2xl">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Philosophy({ a }: { a: Approach }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 }, true)
  return (
    <section dir="rtl" className="bg-canvas px-6 py-40 md:px-12 md:py-56">
      <div ref={ref} className="mx-auto max-w-[1400px]">
        <span
          className="font-meta text-[11px] uppercase tracking-[0.3em] text-navy/40 transition-opacity duration-700"
          style={{ opacity: inView ? 1 : 0 }}
        >
          A note on how we think
        </span>
        <p
          className="mt-10 whitespace-pre-line text-[9vw] font-bold leading-[1.1] tracking-tight text-navy transition-all duration-[1000ms] ease-brand md:text-[5vw]"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
          }}
        >
          {a.philosophy.before}
          <span className="text-azure">{a.philosophy.highlight}</span>
          {a.philosophy.after}
        </p>
      </div>
    </section>
  )
}

function ApproachCTA({ a }: { a: Approach }) {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-canvas px-6 py-40 md:px-12"
    >
      <div className="mx-auto max-w-[1600px]">
        <p className="max-w-[24ch] text-[7vw] font-semibold leading-[1.1] tracking-tight text-navy md:text-[3vw]">
          {a.cta.question}
        </p>

        <Link
          href="/contact"
          data-cursor="cta"
          className="group relative mt-8 inline-block"
        >
          <span className="block origin-right text-[14vw] font-bold leading-none tracking-tighter text-navy transition-all duration-500 ease-brand group-hover:[transform:scaleX(1.05)] group-hover:text-azure md:text-[8vw]">
            {a.cta.action}
            <span
              dir="ltr"
              className="inline-block transition-transform duration-500 ease-brand group-hover:translate-x-6"
            >
              {" "}
              ↗
            </span>
          </span>
          <span className="absolute -bottom-2 right-0 block h-1 w-0 bg-azure transition-[width] duration-500 ease-brand group-hover:w-full" />
          <span className="pointer-events-none absolute left-[-30%] top-0 h-full w-1/4 -skew-x-12 bg-azure/20 opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100" />
        </Link>

        <div className="mt-20 border-t border-navy/12 pt-8">
          <Link
            href="/#work"
            data-cursor="link"
            className="group inline-flex items-center gap-3 font-meta text-sm uppercase tracking-[0.25em] text-navy/50 transition-colors duration-300 hover:text-azure"
          >
            <span
              dir="ltr"
              className="inline-block transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
            كل السيناريوهات
          </Link>
        </div>
      </div>
    </section>
  )
}

export function ApproachPage({ approach: a }: { approach: Approach }) {
  return (
    <>
      <Hero a={a} />
      <Situation a={a} />
      <LookFor a={a} />
      <ProcessSequence a={a} />
      <Outputs a={a} />
      <Philosophy a={a} />
      <ApproachCTA a={a} />
    </>
  )
}
