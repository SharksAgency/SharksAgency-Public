"use client"

import "@dawod/thmanyah-font-web/sans.css"
import "./globals.css"
import ErrorPage from "./error"

export default function GlobalError(props: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-canvas text-navy">
        <main>
          <ErrorPage {...props} />
        </main>
      </body>
    </html>
  )
}
