export type NavigationItem = {
  label: string
  href: string
  match?: string
}

export const navigation: NavigationItem[] = [
  { label: "الرئيسية", href: "/", match: "/" },
  { label: "أعمالنا", href: "/#work" },
  { label: "خدماتنا", href: "/#services" },
  { label: "الاستوديو", href: "/studio", match: "/studio" },
  { label: "المدونة", href: "/blog", match: "/blog" },
]
