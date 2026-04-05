import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#06b6d4",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fpvtr.com"),
  title: {
    default: "FPV Türkiye - FPV Drone Topluluğu",
    template: "%s | FPV Türkiye",
  },
  description:
    "FPV drone haberleri, ürün karşılaştırmaları, PID ve frekans hesaplayıcıları. Türkiye'nin FPV drone topluluğu.",
  keywords: [
    "FPV",
    "FPV drone",
    "FPV Türkiye",
    "drone yarışı",
    "freestyle drone",
    "Betaflight",
    "PID ayarları",
    "drone motor",
    "FPV gözlük",
    "drone karşılaştırma",
  ],
  authors: [{ name: "FPV Türkiye" }],
  creator: "FPV Türkiye",
  openGraph: {
    locale: "tr_TR",
    siteName: "FPV Türkiye",
    type: "website",
    url: "https://www.fpvtr.com",
    title: "FPV Türkiye - FPV Drone Topluluğu",
    description:
      "FPV drone haberleri, ürün karşılaştırmaları, hesaplayıcılar ve Türkiye FPV topluluğu.",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "FPV Türkiye" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FPV Türkiye - FPV Drone Topluluğu",
    description:
      "FPV drone haberleri, ürün karşılaştırmaları, hesaplayıcılar ve Türkiye FPV topluluğu.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://www.fpvtr.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.fpvtr.com/#organization",
                  name: "FPV Türkiye",
                  url: "https://www.fpvtr.com",
                  logo: "https://www.fpvtr.com/logo.png",
                  description:
                    "Türkiye'nin FPV drone topluluğu. Haberler, incelemeler, rehberler ve araçlar.",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.fpvtr.com/#website",
                  url: "https://www.fpvtr.com",
                  name: "FPV Türkiye",
                  publisher: { "@id": "https://www.fpvtr.com/#organization" },
                  inLanguage: "tr",
                },
              ],
            }),
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
