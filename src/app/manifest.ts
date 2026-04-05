import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FPV Türkiye",
    short_name: "FPV TR",
    description:
      "FPV drone haberleri, ürün karşılaştırmaları, hesaplayıcılar ve Türkiye FPV topluluğu.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#06b6d4",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
