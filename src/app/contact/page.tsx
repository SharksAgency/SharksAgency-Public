import type { Metadata } from "next"

import { Contact } from "@/components/sections/Contact"

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "ابدأ حديثًا مع Sharks Agency حول مشروعك واتجاهه القادم.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return <Contact asPage />
}
