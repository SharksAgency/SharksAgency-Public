import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SharksAgency",
    short_name: "Sharks",
    description: "Sharks Agency — نصنع الاتجاه.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#007fff",
    lang: "ar",
    dir: "rtl",
    icons: [
      {
        src: "/brand/sharks-agency-mark.png",
        sizes: "1540x1652",
        type: "image/png",
      },
    ],
  }
}
