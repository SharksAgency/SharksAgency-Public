"use client"
// Session storage can be unavailable; the visual intro remains a safe fallback.
// The intro still completes when storage is unavailable.
import { useCallback, useEffect, useState } from "react"

import { Loader } from "@/components/animations/Loader"
import { Hero } from "@/components/sections/Hero"
import type { SiteContent } from "@/types/content"

const SESSION_KEY = "sharks-intro-seen"

export function HomeIntro({ content }: { content: SiteContent["hero"] }) {
  const [ready, setReady] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        if (sessionStorage.getItem(SESSION_KEY) === "true") {
          setShowLoader(false)
          setReady(true)
        }
      } catch {}
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "true")
    } catch {}
    setShowLoader(false)
    setReady(true)
  }, [])

  return (
    <>
      {showLoader && <Loader onDone={finishIntro} />}
      <Hero ready={ready} content={content} />
    </>
  )
}
