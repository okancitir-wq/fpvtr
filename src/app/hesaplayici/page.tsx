import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hesaplayıcılar",
  description:
    "FPV drone pilotları için frekans hesaplayıcı, PID ayar yardımcısı ve motor itki hesaplayıcısı.",
};

const tools = [
  {
    title: "Frekans Hesaplayıcı",
    description:
      "5.8GHz band ve kanal tablosu. Frekans seçimi ve girişim kontrolü.",
    href: "/hesaplayici/frekans",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
      </svg>
    ),
  },
  {
    title: "PID Ayar Yardımcısı",
    description:
      "Drone tipine ve uçuş stilinize göre PID başlangıç değerleri alın.",
    href: "/hesaplayici/pid",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
  {
    title: "Motor İtki Hesaplayıcı",
    description:
      "Motor KV, batarya ve pervane bilgilerine göre itki/ağırlık oranı hesaplayın.",
    href: "/hesaplayici/motor",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

export default function HesaplayiciPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-zinc-100">Hesaplayıcılar</h1>
      <p className="mt-2 text-zinc-400">
        FPV uçuşlarınızı optimize etmeniz için pratik araçlar.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card className="group h-full text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-fpv-cyan/10 text-fpv-cyan transition-transform group-hover:scale-110">
                {tool.icon}
              </div>
              <h2 className="mt-4 text-lg font-semibold text-zinc-100">
                {tool.title}
              </h2>
              <p className="mt-2 text-sm text-zinc-400">{tool.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
