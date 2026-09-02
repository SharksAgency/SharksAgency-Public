export type NavigationItem = {
  label: string
  href: string
  match?: string
  sectionId?: string
}

export const navigation: NavigationItem[] = [
  { label: "الرئيسية", href: "/", match: "/" },
  { label: "أعمالنا", href: "/#work", match: "/approach", sectionId: "work" },
  { label: "خدماتنا", href: "/#services", sectionId: "services" },
  {
    label: "الاستوديو",
    href: "/studio",
    match: "/studio",
    sectionId: "studio",
  },
  { label: "المدونة", href: "/blog", match: "/blog" },
]
