import { IMAGES } from "@/lib/images"

export type Service = {
  number: string
  title: string
  tags: string[]
  description: string
  image: string
  imageAlt: string
}

export const services: Service[] = [
  {
    number: "01",
    title: "الاستراتيجية والنمو",
    tags: [
      "Strategy",
      "Research",
      "Market Analysis",
      "Brand Positioning",
      "Growth",
    ],
    description:
      "نبدأ بفهم السوق والجمهور والمنافسة، ثم نحدد المسار الذي يمكن للعلامة أن تتحرك فيه بوضوح.",
    image: IMAGES.strategy,
    imageAlt: "تكوينات معمارية خرسانية تجريدية",
  },
  {
    number: "02",
    title: "الهوية والإبداع",
    tags: [
      "Brand Strategy",
      "Visual Identity",
      "Logo Design",
      "Guidelines",
      "Creative Direction",
    ],
    description: "نبني هوية يمكن تذكّرها، لا مجرد عناصر بصرية جميلة.",
    image: IMAGES.identity,
    imageAlt: "مصمم يرسم أفكارًا بصرية على جهاز لوحي",
  },
  {
    number: "03",
    title: "التسويق والتواصل",
    tags: [
      "Campaign Strategy",
      "Social Media",
      "Digital Marketing",
      "Communication",
    ],
    description:
      "نحوّل الاستراتيجية إلى حضور متّسق يصل إلى الجمهور الصحيح ويصنع أثرًا حقيقيًا.",
    image: IMAGES.marketing,
    imageAlt: "مسارات ضوئية طويلة تعبّر عن الحركة",
  },
  {
    number: "04",
    title: "المحتوى والتجارب الرقمية",
    tags: [
      "Content",
      "Web Design",
      "UI / UX",
      "Motion",
      "Creative Development",
    ],
    description: "نصمم نقاط التواصل التي يعيش من خلالها الجمهور تجربة العلامة.",
    image: IMAGES.digital,
    imageAlt: "ملمس أزرق تجريدي",
  },
]
