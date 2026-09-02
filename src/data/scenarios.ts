import { IMAGES } from "@/lib/images"

export type Scenario = {
  number: string
  slug: string
  title: string
  focus: string
  keywords: string[]
  description: string
  cover: string
  coverAlt: string
}

export const scenarios: Scenario[] = [
  {
    number: "01",
    slug: "from-idea-to-brand",
    title: "من فكرة إلى علامة",
    focus: "Positioning · Identity · System",
    keywords: ["التموضع", "الهوية", "نظام العلامة"],
    description:
      "مشروع يبدأ من الصفر ويحتاج إلى تحديد موقعه، بناء هويته، وصناعة نظام واضح يمكن أن ينطلق منه بثقة.",
    cover: IMAGES.work1,
    coverAlt: "تكوين بصري تجريدي لسيناريو بناء علامة من فكرة",
  },
  {
    number: "02",
    slug: "from-chaos-to-system",
    title: "من حضور مشتت إلى نظام",
    focus: "Rebrand · Content · Experience",
    keywords: ["إعادة العلامة", "المحتوى", "التجربة"],
    description:
      "علامة موجودة بالفعل لكن هويتها ومحتواها وتجربتها لا تعمل كمنظومة واحدة — فنعيد ترتيبها في نظام متّسق.",
    cover: IMAGES.work3,
    coverAlt: "تكوين بصري تجريدي لسيناريو تحويل الحضور المشتت إلى نظام",
  },
  {
    number: "03",
    slug: "from-product-to-experience",
    title: "من منتج إلى تجربة",
    focus: "Product · UX · Identity",
    keywords: ["المنتج", "تجربة المستخدم", "الهوية"],
    description:
      "منتج جيد يحتاج إلى تجربة رقمية أوضح وهوية تجعل قيمته أسهل في الفهم والاستخدام.",
    cover: IMAGES.work2,
    coverAlt: "تكوين بصري تجريدي لسيناريو تحويل المنتج إلى تجربة",
  },
]
