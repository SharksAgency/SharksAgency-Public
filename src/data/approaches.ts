import { IMAGES } from "@/lib/images"

export type ApproachStage = {
  no: string
  label: string
}

export type Approach = {
  slug: string
  no: string
  /** English eyebrow line, e.g. "SCENARIO 01" */
  scenario: string
  title: string
  intro: string
  /** Sparse hero keywords (English, uppercase) */
  keywords: string[]
  cover: string
  situation: {
    title: string
    lead: string
    body: string
  }
  lookFor: {
    title: string
    intro: string
    items: string[]
  }
  process: {
    title: string
    stages: ApproachStage[]
  }
  outputs: {
    title: string
    note: string
    items: string[]
  }
  philosophy: {
    /** Text before the highlighted word */
    before: string
    highlight: string
    /** Text after the highlighted word */
    after: string
  }
  cta: {
    question: string
    action: string
  }
}

/**
 * Approach / scenario pages — NOT case studies. Each explains how Sharks THINKS
 * about a type of challenge. No clients, results, metrics, or pretend work.
 */
export const APPROACHES: Approach[] = [
  {
    slug: "from-idea-to-brand",
    no: "01",
    scenario: "Scenario 01 — Capabilities in Action",
    title: "من فكرة إلى علامة",
    intro:
      "مشروع يبدأ من الصفر ويحتاج إلى تحديد موقعه، بناء هويته، وصناعة نظام واضح يمكن أن ينطلق منه.",
    keywords: ["Positioning", "Strategy", "Identity", "System", "Launch"],
    cover: IMAGES.work1,
    situation: {
      title: "الموقف",
      lead: "الفكرة موجودة، لكن مكانها في السوق غير واضح بعد.",
      body: "الجمهور لم يُحدد بدقة، والهوية ما زالت مجرد تصورات متفرقة. هناك حماس كبير للانطلاق، لكن غياب الوضوح يجعل كل قرار لاحق أصعب مما يجب — من الاسم إلى الشكل إلى طريقة الحديث.",
    },
    lookFor: {
      title: "عن ماذا نبحث؟",
      intro: "قبل أن نصمم أي شيء، نطرح الأسئلة التي تحدد المسار.",
      items: [
        "السوق",
        "الجمهور",
        "المنافسة",
        "الفرصة",
        "الموقع",
        "الشخصية",
        "الاتجاه",
      ],
    },
    process: {
      title: "كيف نتحرك؟",
      stages: [
        { no: "01", label: "نبحث" },
        { no: "02", label: "نحدد الموقع" },
        { no: "03", label: "نبني الاستراتيجية" },
        { no: "04", label: "نصمم الهوية" },
        { no: "05", label: "نجهّز الانطلاق" },
      ],
    },
    outputs: {
      title: "ما الذي يمكن أن نخرج به؟",
      note: "لا يحتاج كل مشروع إلى الأدوات نفسها. نحدد ما يجب بناؤه بعد فهم المشكلة.",
      items: [
        "Brand Strategy",
        "Positioning",
        "Visual Identity",
        "Brand Guidelines",
        "Creative Direction",
        "Launch Direction",
        "Website",
        "Social System",
      ],
    },
    philosophy: {
      before: "لا نبدأ من قائمة خدمات.\nنبدأ من ",
      highlight: "المشكلة",
      after: ".",
    },
    cta: {
      question: "مشروعك قريب من هذا السيناريو؟",
      action: "خلينا نحدد اتجاهه.",
    },
  },
  {
    slug: "from-chaos-to-system",
    no: "02",
    scenario: "Scenario 02 — Capabilities in Action",
    title: "من حضور مشتت إلى نظام",
    intro:
      "علامة موجودة بالفعل لكن هويتها ومحتواها وتجربتها لا تعمل كمنظومة واحدة، فنعيد ترتيبها في نظام متّسق.",
    keywords: ["Audit", "Rebrand", "System", "Content", "Consistency"],
    cover: IMAGES.work3,
    situation: {
      title: "الموقف",
      lead: "العلامة تعمل، لكنها تبدو مختلفة في كل مكان تظهر فيه.",
      body: "الشعار شيء، والموقع شيء آخر، والمحتوى يقوله شخص مختلف في كل مرة. لا يوجد خطأ واحد كبير، بل عشرات القرارات الصغيرة التي تراكمت بدون نظام يجمعها. النتيجة: حضور مشتت يُضعف الثقة بدل أن يبنيها.",
    },
    lookFor: {
      title: "عن ماذا نبحث؟",
      intro: "نقرأ ما هو موجود أولًا قبل أن نقترح ما يجب تغييره.",
      items: [
        "التناقضات",
        "نقاط التواصل",
        "الصوت",
        "البنية",
        "الفجوات",
        "ما يستحق البقاء",
        "الأولويات",
      ],
    },
    process: {
      title: "كيف نتحرك؟",
      stages: [
        { no: "01", label: "نراجع" },
        { no: "02", label: "نحدد الأساس" },
        { no: "03", label: "نعيد البناء" },
        { no: "04", label: "نوحّد النظام" },
        { no: "05", label: "نطبّق ونوثّق" },
      ],
    },
    outputs: {
      title: "ما الذي يمكن أن نخرج به؟",
      note: "لا يحتاج كل مشروع إلى الأدوات نفسها. نحدد ما يجب بناؤه بعد فهم المشكلة.",
      items: [
        "Brand Audit",
        "Rebrand",
        "Design System",
        "Brand Guidelines",
        "Content System",
        "Voice & Tone",
        "Templates",
        "Rollout Plan",
      ],
    },
    philosophy: {
      before: "لا نبدأ بإصلاح الشكل.\nنبدأ بإصلاح ",
      highlight: "النظام",
      after: ".",
    },
    cta: {
      question: "مشروعك قريب من هذا السيناريو؟",
      action: "خلينا نحدد اتجاهه.",
    },
  },
  {
    slug: "from-product-to-experience",
    no: "03",
    scenario: "Scenario 03 — Capabilities in Action",
    title: "من منتج إلى تجربة",
    intro:
      "منتج جيد يحتاج إلى تجربة رقمية أوضح وهوية تجعل قيمته أسهل في الفهم والاستخدام.",
    keywords: ["Product", "Experience", "UX", "Interface", "Clarity"],
    cover: IMAGES.work2,
    situation: {
      title: "الموقف",
      lead: "المنتج جيد، لكن قيمته لا تصل بالسرعة الكافية.",
      body: "المستخدم يحتاج إلى وقت أطول من اللازم ليفهم ماذا يفعل المنتج ولماذا يهمّه. الواجهة تعمل، لكنها لا تروي قصة واضحة، والهوية لا تساند التجربة. الفجوة ليست في المنتج نفسه، بل في الطريقة التي يُقدَّم بها.",
    },
    lookFor: {
      title: "عن ماذا نبحث؟",
      intro: "نبدأ من المستخدم والرحلة قبل أن نلمس البكسل.",
      items: [
        "المستخدم",
        "الرحلة",
        "الاحتكاك",
        "القيمة",
        "الوضوح",
        "اللحظة الأولى",
        "الثقة",
      ],
    },
    process: {
      title: "كيف نتحرك؟",
      stages: [
        { no: "01", label: "نفهم" },
        { no: "02", label: "نرسم الرحلة" },
        { no: "03", label: "نبسّط التجربة" },
        { no: "04", label: "نصمم الواجهة" },
        { no: "05", label: "نختبر ونحسّن" },
      ],
    },
    outputs: {
      title: "ما الذي يمكن أن نخرج به؟",
      note: "لا يحتاج كل مشروع إلى الأدوات نفسها. نحدد ما يجب بناؤه بعد فهم المشكلة.",
      items: [
        "UX Strategy",
        "User Flows",
        "UI Design",
        "Design System",
        "Prototype",
        "Visual Identity",
        "Website",
        "Product Direction",
      ],
    },
    philosophy: {
      before: "لا نبدأ من الشاشات.\nنبدأ من ",
      highlight: "التجربة",
      after: ".",
    },
    cta: {
      question: "مشروعك قريب من هذا السيناريو؟",
      action: "خلينا نحدد اتجاهه.",
    },
  },
]

export function getApproach(slug: string | undefined) {
  return APPROACHES.find((a) => a.slug === slug)
}

/** Map a scenario number (01/02/03) to its approach slug for cross-linking. */
export const SCENARIO_SLUG: Record<string, string> = {
  "01": "from-idea-to-brand",
  "02": "from-chaos-to-system",
  "03": "from-product-to-experience",
}
