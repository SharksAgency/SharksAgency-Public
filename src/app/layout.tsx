import type { Metadata, Viewport } from "next"
import "@dawod/thmanyah-font-web/sans.css"
import "lenis/dist/lenis.css"
import "./globals.css"

import { CustomCursor } from "@/components/interactions/CustomCursor"
import { SmoothScroll } from "@/components/animations/SmoothScroll"
import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { getSiteContent } from "@/lib/content/queries"

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharks.agency",
)

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent()
  return {
    metadataBase: siteUrl,
    applicationName: "SharksAgency",
    title: {
      default: content.seo.title,
      template: "%s | Sharks Agency",
    },
    description: content.seo.description,
    keywords: [
      "Sharks Agency",
      "وكالة إبداعية",
      "استراتيجية العلامة",
      "الهوية البصرية",
      "التجارب الرقمية",
    ],
    authors: [{ name: "Sharks Agency" }],
    creator: "Sharks Agency",
    publisher: "Sharks Agency",
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "ar_PS",
      url: "/",
      siteName: "Sharks Agency",
      title: content.seo.ogTitle,
      description: content.seo.ogDescription,
      ...(content.seo.ogImage ? { images: [content.seo.ogImage] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.ogTitle,
      description: content.seo.ogDescription,
      ...(content.seo.ogImage ? { images: [content.seo.ogImage] } : {}),
    },
    icons: {
      icon: "/brand/sharks-agency-mark.png",
      apple: "/brand/sharks-agency-mark.png",
    },
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e18" },
  ],
}

const themeBootScript = `
  try {
    const stored = localStorage.getItem("sharks-theme");
    const dark = stored === "dark" || (!stored && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  } catch {}
`

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const content = await getSiteContent()

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="bg-canvas text-navy">
        <a href="#main-content" className="skip-link">
          انتقل إلى المحتوى
        </a>
        <SmoothScroll />
        <CustomCursor />
        <Navbar
          navigation={content.editorial.navigation}
          ctaLabel={content.contact.ctaLabel}
        />
        <main id="main-content">{children}</main>
        <Footer content={content} />
      </body>
    </html>
  )
}
