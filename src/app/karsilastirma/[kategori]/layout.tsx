import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ürün Karşılaştırma",
  description:
    "FPV drone, motor, ESC, kamera ve VTX ürünlerini detaylı olarak karşılaştırın. Özellikler, fiyatlar ve performans verileri.",
  alternates: { canonical: "/karsilastirma" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
