"use client"

/**
 * Minimal custom cursor (desktop only). Default: small navy dot. Over
 * interactive elements an azure ring expands; over projects it becomes VIEW ↗.
 * Inside the Hero it dims so the shark stays the primary mouse interaction.
 */
// Ring trails the dot with easing.
/* Dot */

import { useEffect, useRef, useState } from "react"

import { useFinePointer, useReducedMotion } from "@/hooks/useReducedMotion"

type Variant = "default" | "link" | "cta" | "view"
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const variantRef = useRef<Variant>("default")
  const dimRef = useRef(false)
  const [variant, setVariant] = useState<Variant>("default")
  const [dim, setDim] = useState(false)
  const finePointer = useFinePointer()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!finePointer || reducedMotion) return

    const root = document.documentElement
    root.classList.add("cursor-hidden")

    let rx = window.innerWidth / 2
    let ry = window.innerHeight / 2
    let dx = rx
    let dy = ry
    let raf = 0

    const onMove = (e: PointerEvent) => {
      dx = e.clientX
      dy = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`
      }
      const target = e.target instanceof HTMLElement ? e.target : null
      const el = target?.closest<HTMLElement>("[data-cursor]")
      const nextVariant = el?.dataset.cursor as Variant | undefined ?? "default"
      const nextDim = Boolean(target?.closest("[data-cursor-dim]"))

      if (nextVariant !== variantRef.current) {
        variantRef.current = nextVariant
        setVariant(nextVariant)
      }
      if (nextDim !== dimRef.current) {
        dimRef.current = nextDim
        setDim(nextDim)
      }
    }

    const loop = () => {
      rx += (dx - rx) * 0.18
      ry += (dy - ry) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      root.classList.remove("cursor-hidden")
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [finePointer, reducedMotion])

  if (!finePointer || reducedMotion) return null

  const showLabel = variant === "view"
  const expanded = variant === "cta" || variant === "link" || variant === "view"

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ opacity: dim ? 0.15 : variant === "default" ? 1 : 0.4 }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-navy" />
      </div>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden items-center justify-center md:flex"
        style={{ opacity: dim ? 0.2 : 1 }}
      >
        <div
          className="flex items-center justify-center rounded-full border border-azure transition-all duration-300 ease-out"
          style={{
            width: showLabel ? 74 : expanded ? 44 : 26,
            height: showLabel ? 74 : expanded ? 44 : 26,
            backgroundColor: showLabel ? "var(--color-azure)" : "transparent",
            borderColor: "var(--color-azure)",
          }}
        >
          {showLabel && (
            <span className="font-meta text-[10px] font-medium uppercase tracking-[0.15em] text-white">
              View ↗
            </span>
          )}
        </div>
      </div>
    </>
  )
}
