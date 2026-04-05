import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motor Hesaplayıcı",
  description:
    "FPV drone motor itki ve verimlilik hesaplayıcısı. Motor KV, pil voltajı ve pervane boyutuna göre performans tahminleri.",
  alternates: { canonical: "/hesaplayici/motor" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
