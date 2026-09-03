import "server-only"

import { cache } from "react"
import { z } from "zod"

import { readArticleContent } from "@/lib/content/rich-text"
import { resolveMediaUrl } from "@/lib/content/media"
import { createClient } from "@/lib/supabase/server"
import type {
  Article,
  ArticleBlock,
  ArticlePreview,
  Approach,
  BlogCategory,
  Partner,
  Project,
  Scenario,
  Service,
  SiteContent,
  SocialLink,
  TeamMember,
} from "@/types/content"
import type {
  BlogCategoryRow,
  BlogPostRow,
  ProjectGalleryRow,
  ProjectRow,
  ScenarioRow,
  ScenarioStepRow,
  ServiceRow,
} from "@/types/database"

const socialLinkSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  href: z.string().regex(/^(https?:\/\/|mailto:|tel:)/i),
})

const identitySchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  location: z.string().min(1),
  email: z.email(),
})

const heroSchema = z.object({
  lineOneBefore: z.string(),
  highlight: z.string().min(1),
  lineOneAfter: z.string(),
  lineTwo: z.string().min(1),
  ctaLabel: z.string().min(1),
  metaTop: z.string().min(1),
  metaLocation: z.string().min(1),
  metaServices: z.string().min(1),
  directionLabel: z.string(),
  scrollLabel: z.string(),
})

const manifestoSchema = z.object({
  eyebrow: z.string().min(1),
  lines: z
    .array(
      z.array(
        z.object({
          text: z.string(),
          tone: z.literal("muted").optional(),
          highlight: z.boolean().optional(),
        }),
      ),
    )
    .min(1),
})

const contactSchema = z.object({
  headingBefore: z.string(),
  headingHighlight: z.string().min(1),
  headingAfter: z.string(),
  ctaLabel: z.string().min(1),
  email: z.email(),
})

const studioSchema = z.object({
  titleBefore: z.string(),
  titleHighlight: z.string().min(1),
  titleAfter: z.string(),
  description: z.string(),
  trackSummary: z.string(),
  eyebrow: z.string(),
  label: z.string(),
  tracks: z.array(z.string()).min(1),
})

const seoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  ogTitle: z.string().min(1),
  ogDescription: z.string().min(1),
  ogImage: z.string().optional(),
})

const headingShape = {
  before: z.string(),
  highlight: z.string(),
  after: z.string(),
}
const routeSeoSchema = z.object({
  title: z.string(),
  description: z.string(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
})
const editorialSchema = z.object({
  services: z.object({
    eyebrow: z.string(),
    label: z.string(),
    firstLine: z.string(),
    ...headingShape,
  }),
  scenarios: z.object({
    eyebrow: z.string(),
    ...headingShape,
    description: z.string(),
    cta: z.string(),
  }),
  process: z.object({
    label: z.string(),
    steps: z
      .array(z.object({ no: z.string(), title: z.string(), desc: z.string() }))
      .min(1),
  }),
  philosophy: z.object({
    eyebrow: z.string(),
    firstLine: z.string(),
    ...headingShape,
  }),
  kinetic: z.object({ eyebrow: z.string(), words: z.array(z.string()).min(1) }),
  capabilities: z.object({
    eyebrow: z.string(),
    ...headingShape,
    description: z.string(),
    items: z.array(z.object({ ar: z.string(), en: z.string() })),
  }),
  blog: z.object({
    eyebrow: z.string(),
    label: z.string(),
    ...headingShape,
    topics: z.array(z.string()),
    allTitle: z.string(),
    emptyMessage: z.string(),
    breakWords: z.array(z.string()),
    breakBefore: z.string(),
    breakHighlight: z.string(),
    breakAfter: z.string(),
  }),
  navigation: z.array(
    z.object({
      label: z.string(),
      href: z.string().regex(/^\/(?![\/\\])/),
      match: z.string().optional(),
      sectionId: z.string().optional(),
    }),
  ),
  copyright: z.string(),
  routeSeo: z.object({
    studio: routeSeoSchema,
    contact: routeSeoSchema,
    blog: routeSeoSchema,
    works: routeSeoSchema,
  }),
})

const situationSchema = z.object({
  title: z.string(),
  lead: z.string(),
  body: z.string(),
})

const lookForSchema = z.object({
  title: z.string(),
  intro: z.string(),
  items: z.array(z.string()),
})

const outputsSchema = z.object({
  title: z.string(),
  note: z.string(),
  items: z.array(z.string()),
})

const philosophySchema = z.object({
  before: z.string(),
  highlight: z.string(),
  after: z.string(),
})

const ctaSchema = z.object({
  question: z.string(),
  action: z.string(),
})

function safeParse<T>(schema: z.ZodType<T>, value: unknown, fallback: T): T {
  const parsed = schema.safeParse(value)
  return parsed.success ? parsed.data : fallback
}

function formatPublishLabel(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(value))
    .toUpperCase()
}

function toService(row: ServiceRow): Service {
  return {
    id: row.id,
    slug: row.slug,
    number: row.number,
    title: row.title_ar,
    tags: row.tags,
    description: row.description_ar,
    image: resolveMediaUrl(row.image_url),
    imageAlt: row.image_alt_ar,
  }
}

function toScenario(row: ScenarioRow): Scenario {
  return {
    id: row.id,
    number: row.number,
    slug: row.slug,
    title: row.title_ar,
    focus: row.focus,
    keywords: row.keywords,
    description: row.description_ar,
    cover: resolveMediaUrl(row.cover_image_url),
    coverAlt: row.cover_alt_ar,
  }
}

function toApproach(row: ScenarioRow, steps: ScenarioStepRow[]): Approach {
  const situation = safeParse(situationSchema, row.situation_ar, {
    title: "الموقف",
    lead: "",
    body: "",
  })
  const lookFor = safeParse(lookForSchema, row.what_we_look_for, {
    title: "عن ماذا نبحث؟",
    intro: "",
    items: [],
  })
  const outputs = safeParse(outputsSchema, row.possible_outputs, {
    title: "ما الذي يمكن أن نخرج به؟",
    note: "",
    items: [],
  })
  const philosophy = safeParse(philosophySchema, row.philosophy_ar, {
    before: "",
    highlight: "",
    after: "",
  })
  const cta = safeParse(ctaSchema, row.cta_ar, {
    question: "مشروعك قريب من هذا السيناريو؟",
    action: "خلينا نحدد اتجاهه.",
  })

  return {
    id: row.id,
    slug: row.slug,
    no: row.number,
    scenario: row.scenario_label,
    title: row.title_ar,
    intro: row.intro_ar,
    keywords: row.hero_keywords,
    cover: resolveMediaUrl(row.cover_image_url),
    situation,
    lookFor,
    process: {
      title: "كيف نتحرك؟",
      stages: steps
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((step) => ({ no: step.step_number, label: step.title_ar })),
    },
    outputs,
    philosophy,
    cta,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
    ogImage: resolveMediaUrl(row.og_image_url ?? row.cover_image_url),
  }
}

function toArticle(row: BlogPostRow, category?: BlogCategoryRow): Article {
  const publishedAt = row.published_at ?? row.created_at
  const blocks = readArticleContent(row.content)

  return {
    id: row.id,
    slug: row.slug,
    title: row.title_ar,
    excerpt: row.excerpt_ar,
    deck: row.deck_ar,
    coverImage: resolveMediaUrl(row.cover_image_url),
    coverAlt: row.cover_alt_ar,
    categorySlug: category?.slug ?? "uncategorized",
    category: category?.name_ar ?? "غير مصنف",
    categoryEn: category?.name_en ?? "Journal",
    author: row.author_name,
    publishDate: publishedAt,
    publishLabel: formatPublishLabel(publishedAt),
    readingTime: `${row.reading_time} MIN`,
    featured: row.is_featured,
    content: blocks.map((block) =>
      block.type === "image"
        ? { ...block, src: resolveMediaUrl(block.src) }
        : block,
    ),
    related: row.related_slugs,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
    ogImage: resolveMediaUrl(row.og_image_url ?? row.cover_image_url),
  }
}

function toPreview(article: Article): ArticlePreview {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    coverImage: article.coverImage,
    categorySlug: article.categorySlug,
    category: article.category,
    categoryEn: article.categoryEn,
    author: article.author,
    publishDate: article.publishDate,
    publishLabel: article.publishLabel,
    readingTime: article.readingTime,
    featured: article.featured,
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
  }
}

function toProject(
  row: ProjectRow,
  gallery: ProjectGalleryRow[] = [],
): Project {
  const body: ArticleBlock[] = []
  const addSection = (title: string, text: string | null) => {
    if (!text) return
    body.push({ type: "h2", text: title }, { type: "p", text })
  }
  addSection("التحدي", row.challenge_ar)
  addSection("النهج", row.approach_ar)
  addSection("التنفيذ", row.execution_ar)
  addSection("النتيجة", row.result_ar)

  return {
    id: row.id,
    slug: row.slug,
    title: row.title_ar,
    excerpt: row.short_description_ar,
    clientName: row.client_name ?? undefined,
    year: row.year ?? undefined,
    category: row.category ?? undefined,
    services: row.services,
    coverImage: resolveMediaUrl(row.cover_image_url),
    coverAlt: row.cover_alt_ar,
    body,
    publishedAt: row.updated_at,
    featured: row.is_featured,
    gallery: gallery
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((item) => ({
        id: item.id,
        image: resolveMediaUrl(item.image_url),
        imageAlt: item.alt_text_ar,
        caption: item.caption_ar ?? undefined,
      })),
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
  }
}

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const client = await createClient()
  const { data, error } = await client
    .from("site_settings")
    .select("key,value")
    .eq("is_public", true)
  if (error)
    throw new Error("Unable to load website settings.", { cause: error })
  const settings = new Map((data ?? []).map((item) => [item.key, item.value]))
  const seo = seoSchema.parse(settings.get("default_seo"))
  return {
    identity: identitySchema.parse(settings.get("site_identity")),
    hero: heroSchema.parse(settings.get("home_hero")),
    manifesto: manifestoSchema.parse(settings.get("home_manifesto")),
    contact: contactSchema.parse(settings.get("contact")),
    studio: studioSchema.parse(settings.get("studio")),
    seo: { ...seo, ogImage: resolveMediaUrl(seo.ogImage) || undefined },
    socialLinks: z.array(socialLinkSchema).parse(settings.get("social_links")),
    editorial: editorialSchema.parse(settings.get("editorial")),
  }
})

export const getServices = cache(async (): Promise<Service[]> => {
  const client = await createClient()
  const { data, error } = await client
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order")
  if (error) throw new Error("Unable to load services.", { cause: error })
  return (data ?? []).map(toService)
})

export const getScenarios = cache(async (): Promise<Scenario[]> => {
  const client = await createClient()
  const { data, error } = await client
    .from("scenarios")
    .select("*")
    .eq("is_published", true)
    .order("sort_order")
  if (error) throw new Error("Unable to load scenarios.", { cause: error })
  return (data ?? []).map(toScenario)
})

export const getApproachBySlug = cache(
  async (slug: string): Promise<Approach | null> => {
    const client = await createClient()
    const { data: scenario, error } = await client
      .from("scenarios")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle()
    if (error) throw new Error("Unable to load scenario.", { cause: error })
    if (!scenario) return null
    const [{ data: steps, error: stepsError }, content] = await Promise.all([
      client
        .from("scenario_steps")
        .select("*")
        .eq("scenario_id", scenario.id)
        .order("sort_order"),
      getSiteContent(),
    ])
    if (stepsError)
      throw new Error("Unable to load scenario steps.", { cause: stepsError })
    const approach = toApproach(scenario, steps ?? [])
    approach.process.title = content.editorial.process.label
    return approach
  },
)

export const getBlogCategories = cache(async (): Promise<BlogCategory[]> => {
  const client = await createClient()
  const { data, error } = await client
    .from("blog_categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order")
  if (error)
    throw new Error("Unable to load blog categories.", { cause: error })
  return (data ?? []).map((row) => ({
    slug: row.slug,
    label: row.name_ar,
    labelEn: row.name_en,
  }))
})

async function getCategoryMap(
  client: Awaited<ReturnType<typeof createClient>>,
) {
  const { data, error } = await client
    .from("blog_categories")
    .select("*")
    .eq("is_active", true)
  if (error)
    throw new Error("Unable to load blog categories.", { cause: error })
  return new Map((data ?? []).map((category) => [category.id, category]))
}

export const getPublishedArticles = cache(
  async (): Promise<ArticlePreview[]> => {
    const client = await createClient()
    const [{ data, error }, categories] = await Promise.all([
      client
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false }),
      getCategoryMap(client),
    ])
    if (error)
      throw new Error("Unable to load published articles.", { cause: error })
    return (data ?? []).map((row) =>
      toPreview(
        toArticle(
          row,
          row.category_id ? categories.get(row.category_id) : undefined,
        ),
      ),
    )
  },
)

export const getArticleBySlug = cache(
  async (slug: string): Promise<Article | null> => {
    const client = await createClient()
    const { data, error } = await client
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .maybeSingle()
    if (error) throw new Error("Unable to load article.", { cause: error })
    if (!data) return null
    const categories = await getCategoryMap(client)
    return toArticle(
      data,
      data.category_id ? categories.get(data.category_id) : undefined,
    )
  },
)

export const getRelatedArticles = cache(
  async (slugs: string[]): Promise<Article[]> => {
    if (!slugs.length) return []
    const client = await createClient()
    const [{ data, error }, categories] = await Promise.all([
      client
        .from("blog_posts")
        .select("*")
        .in("slug", slugs)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString()),
      getCategoryMap(client),
    ])
    if (error)
      throw new Error("Unable to load related articles.", { cause: error })
    const bySlug = new Map(
      (data ?? []).map((row) => [
        row.slug,
        toArticle(
          row,
          row.category_id ? categories.get(row.category_id) : undefined,
        ),
      ]),
    )
    return slugs.flatMap((slug) => {
      const article = bySlug.get(slug)
      return article ? [article] : []
    })
  },
)

export const getPublishedProjects = cache(async (): Promise<Project[]> => {
  const client = await createClient()
  const { data, error } = await client
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("sort_order")
  if (error) throw new Error("Unable to load projects.", { cause: error })
  return (data ?? []).map((row) => toProject(row))
})

export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | null> => {
    const client = await createClient()
    const { data, error } = await client
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle()
    if (error) throw new Error("Unable to load project.", { cause: error })
    if (!data) return null
    const { data: gallery, error: galleryError } = await client
      .from("project_gallery")
      .select("*")
      .eq("project_id", data.id)
      .order("sort_order")
    if (galleryError)
      throw new Error("Unable to load project gallery.", {
        cause: galleryError,
      })
    return toProject(data, gallery ?? [])
  },
)

export const getActivePartners = cache(async (): Promise<Partner[]> => {
  const client = await createClient()
  const { data, error } = await client
    .from("partners")
    .select("*")
    .eq("is_active", true)
    .order("sort_order")
  if (error) throw new Error("Unable to load partners.", { cause: error })
  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    type: z.enum(["partner", "client", "collaborator"]).parse(row.type),
    logo: row.logo_url ? resolveMediaUrl(row.logo_url) : undefined,
    websiteUrl:
      row.website_url && /^https?:\/\//i.test(row.website_url)
        ? row.website_url
        : undefined,
  }))
})

export const getActiveTeam = cache(async (): Promise<TeamMember[]> => {
  const client = await createClient()
  const { data, error } = await client
    .from("team_members")
    .select("*")
    .eq("is_active", true)
    .order("sort_order")
  if (error) throw new Error("Unable to load team.", { cause: error })
  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    roleTitle: row.role_ar,
    bio: row.bio_ar ?? undefined,
    image: row.photo_url ? resolveMediaUrl(row.photo_url) : undefined,
    socialLinks: safeParse<SocialLink[]>(
      z.array(socialLinkSchema),
      row.social_links,
      [],
    ),
  }))
})
