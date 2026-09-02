"use client"

/**
 * Short intro loader (~1.4s). White screen, small SHARKS wordmark, a thin azure
 * line grows, a tiny fin cuts through it, then the whole panel clips away to
 * reveal the Hero.
 */

import { useEffect, useState } from "react"

import { useReducedMotion } from "@/hooks/useReducedMotion"
import { FinShape } from "@/components/ui/FinTransition"
export function Loader({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const leaveDelay = reducedMotion ? 0 : 1200
    const finishDelay = reducedMotion ? 1 : 1950
    const t1 = window.setTimeout(() => setLeaving(true), leaveDelay)
    const t2 = window.setTimeout(() => {
      setGone(true)
      onDone()
    }, finishDelay)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [onDone, reducedMotion])

  if (gone) return null

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-canvas transition-[clip-path] duration-700 ease-fin"
      style={{ clipPath: leaving ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)" }}
    >
      <div className="relative flex flex-col items-center gap-6">
        <span className="font-meta text-xs font-medium uppercase tracking-[0.6em] text-navy">
          Sharks
        </span>

        <div className="relative h-px w-56 overflow-visible">
          <span
            className="absolute inset-y-0 right-0 block h-px w-full origin-right bg-azure"
            style={{
              animation: "line-grow 1.1s cubic-bezier(0.16,1,0.3,1) 0.15s both",
            }}
          />
          <span
            className="absolute -top-2 block h-3 w-4"
            style={{
              animation:
                "fin-travel 1.1s cubic-bezier(0.16,1,0.3,1) 0.15s both",
            }}
          >
            <FinShape className="h-full w-full" />
          </span>
        </div>
      </div>

      <style>{`
        @keyframes fin-travel {
          from { right: 0%; opacity: 0; }
          15%  { opacity: 1; }
          to   { right: 100%; opacity: 1; }
        }
      `}</style>
    </div>
  )
}
