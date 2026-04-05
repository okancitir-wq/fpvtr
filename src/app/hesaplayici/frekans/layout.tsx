import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frekans Hesaplayıcı",
  description:
    "FPV drone VTX frekans planlaması. Kanallar arası girişimi önlemek için en uygun frekans kombinasyonlarını hesaplayın.",
  alternates: { canonical: "/hesaplayici/frekans" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
