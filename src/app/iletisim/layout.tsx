import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "FPV Türkiye ile iletişime geçin. Soru, öneri veya işbirliği teklifleriniz için bize ulaşın.",
  alternates: { canonical: "/iletisim" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
