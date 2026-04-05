import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Poll } from "@/components/forum/Poll";

export const metadata: Metadata = {
  title: "Forum",
  description:
    "FPV Türkiye topluluk forumu. FPV drone hakkında tartışmalar, sorular ve deneyim paylaşımları.",
  alternates: { canonical: "/forum" },
};

export default function ForumPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-fpv-cyan/10">
        <svg
          className="h-10 w-10 text-fpv-cyan"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743"
          />
        </svg>
      </div>
      <h1 className="mt-6 text-3xl font-bold text-zinc-100">
        Forum Yapım Aşamasında
      </h1>
      <p className="mt-3 max-w-md text-zinc-400">
        Forum sayfamız şu anda yapım aşamasındadır. En kısa sürede
        hizmetinize sunulacaktır. Anlayışınız için teşekkür ederiz.
      </p>
      <div className="mt-8">
        <Button href="/">Ana Sayfaya Dön</Button>
      </div>

      <Poll />
    </div>
  );
}
