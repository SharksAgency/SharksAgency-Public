import { z } from "zod"
import type { ArticleBlock } from "@/types/content"
import type { Json } from "@/types/database"

type RichNode = {
  type: string
  text?: string
  attrs?: Record<string, Json>
  content?: RichNode[]
}

const nodeSchema: z.ZodType<RichNode> = z.lazy(() =>
  z.object({
    type: z.string(),
    text: z.string().optional(),
    attrs: z.record(z.string(), z.json()).optional(),
    content: z.array(nodeSchema).optional(),
  }),
)

const documentSchema = z.object({
  type: z.literal("doc"),
  content: z.array(nodeSchema),
})

function plainText(node: RichNode): string {
  if (node.type === "hardBreak") return "\n"
  return node.text ?? node.content?.map(plainText).join("") ?? ""
}

/** Maps trusted node types to the site's existing editorial components; never renders raw HTML. */
export function readArticleContent(value: Json): ArticleBlock[] {
  const document = documentSchema.parse(value)
  return document.content.flatMap((node): ArticleBlock[] => {
    const text = plainText(node)
    switch (node.type) {
      case "paragraph":
        return [{ type: "p", text }]
      case "heading":
        return [{ type: node.attrs?.level === 3 ? "h3" : "h2", text }]
      case "blockquote":
        return [
          {
            type: "quote",
            text,
            cite:
              typeof node.attrs?.cite === "string"
                ? node.attrs.cite
                : undefined,
          },
        ]
      case "sharksHighlight":
        return [{ type: "highlight", text }]
      case "bulletList":
      case "orderedList":
        return [{ type: "list", items: (node.content ?? []).map(plainText) }]
      case "image": {
        const src = node.attrs?.src
        if (typeof src !== "string") return []
        return [
          {
            type: "image",
            src,
            alt:
              typeof node.attrs?.alt === "string" ? node.attrs.alt : undefined,
            caption:
              typeof node.attrs?.caption === "string"
                ? node.attrs.caption
                : undefined,
            break: node.attrs?.fullWidth === true,
          },
        ]
      }
      default:
        return []
    }
  })
}
