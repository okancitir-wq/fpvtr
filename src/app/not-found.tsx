import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-7xl font-bold glow-text">404</p>
      <h1 className="mt-4 text-2xl font-bold text-zinc-100">
        Sayfa Bulunamadı
      </h1>
      <p className="mt-2 text-zinc-400">
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
      </p>
      <div className="mt-8">
        <Button href="/">Ana Sayfaya Dön</Button>
      </div>
    </div>
  );
}
