import type { Metadata } from "next"

import { Contact } from "@/components/sections/Contact"
import { Philosophy } from "@/components/sections/Philosophy"
import { Process } from "@/components/sections/Process"
import { Studio } from "@/components/sections/Studio"

export const metadata: Metadata = {
  title: "الاستوديو",
  description:
    "كيف يفكر استوديو Sharks Agency، وكيف تتحرك مساراته كمنظومة واحدة.",
  alternates: { canonical: "/studio" },
}

export default function StudioPage() {
  return (
    <>
      <Studio asPage />
      <Process />
      <Philosophy />
      <Contact />
    </>
  )
}
