import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PID Hesaplayıcı",
  description:
    "Betaflight PID ayarları hesaplayıcısı. Drone frame boyutu, ağırlık ve uçuş stiline göre önerilen PID değerlerini hesaplayın.",
  alternates: { canonical: "/hesaplayici/pid" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
