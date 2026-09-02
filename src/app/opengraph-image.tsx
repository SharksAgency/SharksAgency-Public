import { ImageResponse } from "next/og"

export const alt = "Sharks Agency — نصنع الاتجاه"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#02040a",
        color: "#ffffff",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          width: 980,
        }}
      >
        <div
          style={{
            color: "#007fff",
            display: "flex",
            fontSize: 24,
            letterSpacing: 8,
          }}
        >
          SHARKS AGENCY
        </div>
        <div style={{ display: "flex", fontSize: 94, fontWeight: 700 }}>
          We make the direction.
        </div>
        <div
          style={{
            background: "#007fff",
            display: "flex",
            height: 5,
            width: 260,
          }}
        />
      </div>
    </div>,
    size,
  )
}
