"use client";

import { useState } from "react";
import { frequencyBands, findByFrequency } from "@/lib/calculators";

const bandColors: Record<string, string> = {
  A: "bg-red-500/20 text-red-400 border-red-500/30",
  B: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  E: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  F: "bg-green-500/20 text-green-400 border-green-500/30",
  R: "bg-fpv-cyan/20 text-fpv-cyan border-fpv-cyan/30",
  L: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

export default function FrekansPage() {
  const [selectedBand, setSelectedBand] = useState("R");
  const [selectedChannel, setSelectedChannel] = useState(1);
  const [searchFreq, setSearchFreq] = useState("");

  const band = frequencyBands.find((b) => b.band === selectedBand)!;
  const channel = band.channels.find((c) => c.channel === selectedChannel);
  const frequency = channel?.frequency ?? 0;

  const searchResult = searchFreq
    ? findByFrequency(parseInt(searchFreq))
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-zinc-100">
        Frekans Hesaplayıcı
      </h1>
      <p className="mt-2 text-zinc-400">
        5.8GHz FPV video frekans band ve kanal tablosu.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Selector */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Band Seçin
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {frequencyBands.map((b) => (
                <button
                  key={b.band}
                  onClick={() => {
                    setSelectedBand(b.band);
                    setSelectedChannel(1);
                  }}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                    selectedBand === b.band
                      ? bandColors[b.band]
                      : "border-fpv-border text-zinc-500 hover:border-zinc-600"
                  }`}
                >
                  {b.band}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Kanal Seçin
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {band.channels.map((ch) => (
                <button
                  key={ch.channel}
                  onClick={() => setSelectedChannel(ch.channel)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                    selectedChannel === ch.channel
                      ? "border-fpv-cyan bg-fpv-cyan/10 text-fpv-cyan"
                      : "border-fpv-border text-zinc-500 hover:border-zinc-600"
                  }`}
                >
                  CH{ch.channel}
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="rounded-xl border border-fpv-cyan/30 bg-fpv-cyan/5 p-6 text-center">
            <p className="text-sm text-zinc-400">Seçilen Frekans</p>
            <p className="mt-2 text-5xl font-bold text-fpv-cyan">
              {frequency} <span className="text-2xl">MHz</span>
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Band {selectedBand} - Kanal {selectedChannel}
            </p>
          </div>

          {/* Reverse lookup */}
          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Frekans ile Ara (MHz)
            </label>
            <input
              type="number"
              placeholder="Örn: 5806"
              value={searchFreq}
              onChange={(e) => setSearchFreq(e.target.value)}
              className="mt-2 w-full rounded-lg border border-fpv-border bg-fpv-card px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-fpv-cyan focus:outline-none"
            />
            {searchFreq && (
              <p className="mt-2 text-sm">
                {searchResult ? (
                  <span className="text-fpv-lime">
                    Band {searchResult.band} - Kanal {searchResult.channel}
                  </span>
                ) : (
                  <span className="text-zinc-500">
                    Eşleşen band/kanal bulunamadı
                  </span>
                )}
              </p>
            )}
          </div>
        </div>

        {/* Full band chart */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">
            Tüm Band/Kanal Tablosu
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-fpv-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-fpv-border bg-fpv-card">
                  <th className="px-3 py-2 text-left font-medium text-zinc-400">
                    Band
                  </th>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((ch) => (
                    <th
                      key={ch}
                      className="px-3 py-2 text-center font-medium text-zinc-400"
                    >
                      CH{ch}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {frequencyBands.map((b) => (
                  <tr key={b.band} className="border-b border-fpv-border">
                    <td
                      className={`px-3 py-2 font-medium ${
                        bandColors[b.band]?.split(" ")[1] || "text-zinc-300"
                      }`}
                    >
                      {b.band}
                    </td>
                    {b.channels.map((ch) => {
                      const isSelected =
                        b.band === selectedBand &&
                        ch.channel === selectedChannel;
                      return (
                        <td
                          key={ch.channel}
                          onClick={() => {
                            setSelectedBand(b.band);
                            setSelectedChannel(ch.channel);
                          }}
                          className={`cursor-pointer px-3 py-2 text-center transition-all ${
                            isSelected
                              ? "bg-fpv-cyan/20 font-bold text-fpv-cyan"
                              : "text-zinc-400 hover:bg-fpv-card"
                          }`}
                        >
                          {ch.frequency}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
