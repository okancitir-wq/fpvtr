import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-fpv-cyan/5 via-fpv-dark to-fpv-lime/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-fpv-cyan)_0%,_transparent_50%)] opacity-10" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl">
            Türkiye&apos;nin{" "}
            <span className="glow-text">FPV Drone</span>{" "}
            Topluluğu
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
            FPV drone haberleri, detaylı ürün karşılaştırmaları, PID ve frekans
            hesaplayıcıları. Türkiye FPV topluluğunun buluşma noktası.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/blog">Blog&apos;u Keşfet</Button>
            <Button href="/karsilastirma" variant="secondary">
              Ürünleri Karşılaştır
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
    </section>
  );
}
