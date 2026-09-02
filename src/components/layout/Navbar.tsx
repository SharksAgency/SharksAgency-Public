"use client"

/** Fixed RTL navbar. Tightens on scroll; nav labels swap vertically on hover;
 *  a tiny azure fin marker sits under the active item. Route-aware active state
 *  for the real routes (home / blog); section links jump to the homepage. */

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { navigation } from "@/data/navigation"
import { ThemeToggle } from "@/components/navigation/ThemeToggle"
import { SharkButton } from "@/components/ui/SharkButton"
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const pathname = usePathname() ?? ""

  const sectionItems = useMemo(
    () => navigation.filter((item) => item.sectionId),
    [],
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    // Section highlighting only applies on the home route. Route matches still
    // drive active state on secondary pages.
    if (pathname !== "/") {
      return
    }

    const sections = sectionItems
      .map((item) => item.sectionId)
      .filter((id): id is string => Boolean(id))
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.5, 0.8] },
    )

    sections.forEach((section) => observer.observe(section))

    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.45) {
        setActiveSection(null)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [pathname, sectionItems])

  const isActive = (match?: string) => {
    if (!match) return false
    if (match === "/") return pathname === "/"
    return pathname.startsWith(match)
  }

  return (
    <header
      dir="rtl"
      className={
        "fixed inset-x-0 top-0 z-[500] border-b bg-canvas/85 backdrop-blur-md transition-all duration-500 ease-brand " +
        (scrolled ? "border-navy/10 py-3" : "border-transparent py-5")
      }
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          data-cursor="link"
          className="flex items-center gap-3"
          aria-label="Sharks Agency — الرئيسية"
        >
          <Image
            src="/brand/sharks-agency-mark.png"
            alt=""
            width={32}
            height={34}
            className="h-8 w-8 object-contain"
            priority
          />
          <span className="font-meta text-[13px] font-semibold uppercase tracking-[0.28em] text-navy">
            Sharks<span className="text-azure">.</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-9 md:flex"
          aria-label="التنقل الرئيسي"
        >
          {navigation.map((item) => {
            const active =
              pathname === "/"
                ? item.sectionId
                  ? activeSection === item.sectionId
                  : item.match === "/"
                    ? activeSection === null
                    : false
                : isActive(item.match)
            const inner = (
              <>
                <span className="relative block h-[1.4em] overflow-hidden">
                  <span className="block transition-transform duration-[400ms] ease-brand group-hover:[transform:translateY(-50%)]">
                    <span className={active ? "text-azure" : "text-navy"}>
                      {item.label}
                    </span>
                    <span className="block text-azure">{item.label}</span>
                  </span>
                </span>
                <span
                  aria-hidden
                  className={
                    "absolute -bottom-0.5 right-1/2 h-0 w-0 translate-x-1/2 border-x-[4px] border-b-[5px] border-x-transparent border-b-azure transition-opacity duration-300 " +
                    (active
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-60")
                  }
                />
              </>
            )
            const cls =
              "group relative block overflow-hidden py-1 text-[15px] leading-tight"
            return (
              <Link
                key={item.label}
                href={item.href}
                data-cursor="link"
                className={cls}
                aria-current={active ? "page" : undefined}
              >
                {inner}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <ThemeToggle />
          <SharkButton href="/contact">لنتحدث</SharkButton>
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Link
            href="/blog"
            data-cursor="link"
            className="font-meta text-xs font-medium uppercase tracking-widest text-navy"
          >
            المدونة
          </Link>
          <Link
            href="/contact"
            className="font-meta text-xs font-medium uppercase tracking-widest text-navy"
          >
            لنتحدث ↗
          </Link>
        </div>
      </div>
    </header>
  )
}
