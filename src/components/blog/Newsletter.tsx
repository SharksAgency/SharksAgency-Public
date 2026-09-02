"use client"

/**
 * Minimal newsletter moment — an editorial horizontal composition, not a boxed
 * card. Thin underline input; a single tiny orange dot is the site's rare accent.
 */

import { useState } from "react"
export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  return (
    <section
      dir="rtl"
      className="relative bg-canvas px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 items-end gap-8 border-t border-navy/12 pt-12">
          <div className="col-span-12 md:col-span-6">
            <span className="flex items-center gap-2 font-meta text-[11px] uppercase tracking-[0.35em] text-navy/50">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange" />
              Sharks Journal
            </span>
            <h2 className="mt-5 max-w-[16ch] text-[8vw] font-bold leading-[1.05] tracking-tight text-navy md:text-[3vw]">
              نرسل ما يستحق القراءة فقط.
            </h2>
          </div>

          <div className="col-span-12 md:col-span-6">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (email.trim()) setSubmitted(true)
              }}
              className="group flex items-center gap-4 border-b border-navy/25 pb-3 transition-colors focus-within:border-azure"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="بريدك الإلكتروني"
                aria-label="البريد الإلكتروني"
                dir="rtl"
                className="w-full bg-transparent text-xl text-navy outline-none placeholder:text-navy/35 md:text-2xl"
              />
              <button
                type="submit"
                data-cursor="cta"
                className="flex shrink-0 items-center gap-2 whitespace-nowrap text-lg font-semibold text-navy transition-colors duration-300 hover:text-azure"
              >
                اشترك
                <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
                  ↖
                </span>
              </button>
            </form>
            <p className="mt-4 font-meta text-[11px] uppercase tracking-[0.2em] text-navy/40">
              {submitted
                ? "قائمة Sharks Journal ستنطلق قريبًا."
                : "No noise. Direction only."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
