export type Service = {
  id: string
  slug: string
  number: string
  title: string
  tags: string[]
  description: string
  image: string
  imageAlt: string
}

export type Scenario = {
  id: string
  number: string
  slug: string
  title: string
  focus: string
  keywords: string[]
  description: string
  cover: string
  coverAlt: string
}

export type ApproachStage = {
  no: string
  label: string
}

export type Approach = {
  id: string
  slug: string
  no: string
  scenario: string
  title: string
  intro: string
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
    before: string
    highlight: string
    after: string
  }
  cta: {
    question: string
    action: string
  }
  seoTitle?: string
  seoDescription?: string
  ogImage?: string
}

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "highlight"; text: string }
  | { type: "list"; items: string[] }
  | {
      type: "image"
      src: string
      alt?: string
      caption?: string
      break?: boolean
    }

export type Article = {
  id: string
  slug: string
  title: string
  excerpt: string
  deck: string
  coverImage: string
  coverAlt: string
  categorySlug: string
  category: string
  categoryEn: string
  author: string
  publishDate: string
  publishLabel: string
  readingTime: string
  featured?: boolean
  content: ArticleBlock[]
  related: string[]
  seoTitle?: string
  seoDescription?: string
  ogImage?: string
}

export type ArticlePreview = Omit<
  Article,
  "deck" | "content" | "related" | "coverAlt"
>

export type BlogCategory = {
  slug: string
  label: string
  labelEn: string
}

export type ProjectGalleryItem = {
  id: string
  image: string
  imageAlt: string
  caption?: string
}

export type Project = {
  id: string
  slug: string
  title: string
  excerpt: string
  clientName?: string
  year?: number
  category?: string
  services: string[]
  coverImage: string
  coverAlt: string
  body: ArticleBlock[]
  publishedAt: string
  featured: boolean
  gallery: ProjectGalleryItem[]
  seoTitle?: string
  seoDescription?: string
}

export type Partner = {
  id: string
  name: string
  type: "partner" | "client" | "collaborator"
  logo?: string
  websiteUrl?: string
}

export type TeamMember = {
  id: string
  name: string
  roleTitle: string
  bio?: string
  image?: string
  socialLinks: SocialLink[]
}

export type SocialLink = {
  label: string
  value: string
  href: string
}

export type ManifestoSegment = {
  text: string
  tone?: "muted"
  highlight?: boolean
}

export type SiteContent = {
  identity: {
    name: string
    shortName: string
    location: string
    email: string
  }
  hero: {
    lineOneBefore: string
    highlight: string
    lineOneAfter: string
    lineTwo: string
    ctaLabel: string
    metaTop: string
    metaLocation: string
    metaServices: string
    directionLabel: string
    scrollLabel: string
  }
  manifesto: {
    eyebrow: string
    lines: ManifestoSegment[][]
  }
  contact: {
    headingBefore: string
    headingHighlight: string
    headingAfter: string
    ctaLabel: string
    email: string
  }
  studio: {
    titleBefore: string
    titleHighlight: string
    titleAfter: string
    description: string
    trackSummary: string
    eyebrow: string
    label: string
    tracks: string[]
  }
  seo: {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
    ogImage?: string
  }
  socialLinks: SocialLink[]
  editorial: EditorialContent
}

export type RouteSeo = {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
}

export type EditorialContent = {
  services: {
    eyebrow: string
    label: string
    firstLine: string
    before: string
    highlight: string
    after: string
  }
  scenarios: {
    eyebrow: string
    before: string
    highlight: string
    after: string
    description: string
    cta: string
  }
  process: {
    label: string
    steps: { no: string; title: string; desc: string }[]
  }
  philosophy: {
    eyebrow: string
    firstLine: string
    before: string
    highlight: string
    after: string
  }
  kinetic: { eyebrow: string; words: string[] }
  capabilities: {
    eyebrow: string
    before: string
    highlight: string
    after: string
    description: string
    items: { ar: string; en: string }[]
  }
  blog: {
    eyebrow: string
    label: string
    before: string
    highlight: string
    after: string
    topics: string[]
    allTitle: string
    emptyMessage: string
    breakWords: string[]
    breakBefore: string
    breakHighlight: string
    breakAfter: string
  }
  navigation: {
    label: string
    href: string
    match?: string
    sectionId?: string
  }[]
  copyright: string
  routeSeo: Record<"studio" | "contact" | "blog" | "works", RouteSeo>
}
