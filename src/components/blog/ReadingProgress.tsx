"use client"

import { useEffect, useRef } from "react"

export function ReadingProgress() {
  const progressRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight
        const progress =
          scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0
        progressRef.current?.style.setProperty(
          "transform",
          `scaleX(${progress})`,
        )
      })
    }

    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => {
      window.removeEventListener("scroll", update)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      className="fixed inset-x-0 top-0 z-[600] h-[2px] bg-transparent"
      aria-hidden
    >
      <span
        ref={progressRef}
        className="block h-full origin-right scale-x-0 bg-azure"
      />
    </div>
  )
}
