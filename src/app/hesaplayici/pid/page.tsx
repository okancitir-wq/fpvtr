"use client";

import { useState } from "react";
import { getPidRecommendation, generateBetaflightCommands } from "@/lib/calculators";

export default function PidPage() {
  const [frameSize, setFrameSize] = useState<"3" | "5" | "7">("5");
  const [weight, setWeight] = useState<"hafif" | "orta" | "agir">("orta");
  const [style, setStyle] = useState<"freestyle" | "yaris" | "sinematik">("freestyle");
  const [copied, setCopied] = useState(false);

  const profile = getPidRecommendation(frameSize, weight, style);
  const commands = generateBetaflightCommands(profile);

  const handleCopy = () => {
    navigator.clipboard.writeText(commands);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectClass = (active: boolean) =>
    `rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
      active
        ? "border-fpv-cyan bg-fpv-cyan/10 text-fpv-cyan"
        : "border-fpv-border text-zinc-500 hover:border-zinc-600"
    }`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-zinc-100">PID Ayar Yardımcısı</h1>
      <p className="mt-2 text-zinc-400">
        Drone tipine ve uçuş stilinize göre PID başlangıç değerleri alın.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Çerçeve Boyutu
            </label>
            <div className="mt-2 flex gap-2">
              {(["3", "5", "7"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFrameSize(size)}
                  className={selectClass(frameSize === size)}
                >
                  {size}&quot;
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Ağırlık Sınıfı
            </label>
            <div className="mt-2 flex gap-2">
              {([
                { value: "hafif", label: "Hafif" },
                { value: "orta", label: "Orta" },
                { value: "agir", label: "Ağır" },
              ] as const).map((w) => (
                <button
                  key={w.value}
                  onClick={() => setWeight(w.value)}
                  className={selectClass(weight === w.value)}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Uçuş Stili
            </label>
            <div className="mt-2 flex gap-2">
              {([
                { value: "freestyle", label: "Freestyle" },
                { value: "yaris", label: "Yarış" },
                { value: "sinematik", label: "Sinematik" },
              ] as const).map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStyle(s.value)}
                  className={selectClass(style === s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4 text-sm text-yellow-400">
            Bu değerler başlangıç noktasıdır. Uçuşta ince ayar gerekebilir.
            Blackbox kayıt yaparak PID Toolbox ile analiz etmenizi öneririz.
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* PID Table */}
          <div className="overflow-hidden rounded-xl border border-fpv-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-fpv-border bg-fpv-card">
                  <th className="px-4 py-3 text-left font-medium text-zinc-400">
                    Eksen
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-red-400">
                    P
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-fpv-lime">
                    I
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-fpv-cyan">
                    D
                  </th>
                </tr>
              </thead>
              <tbody>
                {(["roll", "pitch", "yaw"] as const).map((axis) => (
                  <tr key={axis} className="border-b border-fpv-border">
                    <td className="px-4 py-3 font-medium capitalize text-zinc-200">
                      {axis === "roll" ? "Roll" : axis === "pitch" ? "Pitch" : "Yaw"}
                    </td>
                    <td className="px-4 py-3 text-center text-xl font-bold text-red-400">
                      {profile[axis].p}
                    </td>
                    <td className="px-4 py-3 text-center text-xl font-bold text-fpv-lime">
                      {profile[axis].i}
                    </td>
                    <td className="px-4 py-3 text-center text-xl font-bold text-fpv-cyan">
                      {profile[axis].d}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Betaflight CLI */}
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-zinc-300">
                Betaflight CLI Komutları
              </h3>
              <button
                onClick={handleCopy}
                className="rounded-lg border border-fpv-border px-3 py-1 text-xs text-zinc-400 transition-colors hover:border-fpv-cyan hover:text-fpv-cyan"
              >
                {copied ? "Kopyalandı!" : "Kopyala"}
              </button>
            </div>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-fpv-lime font-mono">
              {commands}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
