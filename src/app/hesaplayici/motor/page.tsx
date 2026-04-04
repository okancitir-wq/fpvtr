"use client";

import { useState } from "react";
import { calculateMotorThrust } from "@/lib/calculators";

export default function MotorPage() {
  const [kv, setKv] = useState(1750);
  const [cells, setCells] = useState(6);
  const [propSize, setPropSize] = useState("5");
  const [motorCount, setMotorCount] = useState(4);
  const [auw, setAuw] = useState(650);

  const result = calculateMotorThrust(kv, cells, propSize, motorCount, auw);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-zinc-100">
        Motor İtki Hesaplayıcı
      </h1>
      <p className="mt-2 text-zinc-400">
        Motor, batarya ve pervane bilgilerine göre itki/ağırlık oranını
        hesaplayın.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Motor KV
            </label>
            <input
              type="number"
              value={kv}
              onChange={(e) => setKv(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-fpv-border bg-fpv-card px-3 py-2 text-sm text-zinc-100 focus:border-fpv-cyan focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Batarya Hücre Sayısı
            </label>
            <div className="mt-1 flex gap-2">
              {[3, 4, 5, 6].map((c) => (
                <button
                  key={c}
                  onClick={() => setCells(c)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                    cells === c
                      ? "border-fpv-cyan bg-fpv-cyan/10 text-fpv-cyan"
                      : "border-fpv-border text-zinc-500 hover:border-zinc-600"
                  }`}
                >
                  {c}S
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Pervane Boyutu (inç)
            </label>
            <select
              value={propSize}
              onChange={(e) => setPropSize(e.target.value)}
              className="mt-1 w-full rounded-lg border border-fpv-border bg-fpv-card px-3 py-2 text-sm text-zinc-100 focus:border-fpv-cyan focus:outline-none"
            >
              <option value="3">3 inç</option>
              <option value="4">4 inç</option>
              <option value="5">5 inç</option>
              <option value="5.1">5.1 inç</option>
              <option value="6">6 inç</option>
              <option value="7">7 inç</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Motor Sayısı
            </label>
            <div className="mt-1 flex gap-2">
              {[3, 4, 6, 8].map((m) => (
                <button
                  key={m}
                  onClick={() => setMotorCount(m)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                    motorCount === m
                      ? "border-fpv-cyan bg-fpv-cyan/10 text-fpv-cyan"
                      : "border-fpv-border text-zinc-500 hover:border-zinc-600"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Toplam Ağırlık / AUW (gram)
            </label>
            <input
              type="number"
              value={auw}
              onChange={(e) => setAuw(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-fpv-border bg-fpv-card px-3 py-2 text-sm text-zinc-100 focus:border-fpv-cyan focus:outline-none"
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-fpv-border bg-fpv-card p-5 text-center">
              <p className="text-xs text-zinc-500">Tahmini RPM</p>
              <p className="mt-1 text-2xl font-bold text-zinc-100">
                {result.rpm.toLocaleString("tr-TR")}
              </p>
            </div>
            <div className="rounded-xl border border-fpv-border bg-fpv-card p-5 text-center">
              <p className="text-xs text-zinc-500">Motor Başı İtki</p>
              <p className="mt-1 text-2xl font-bold text-zinc-100">
                {result.thrustPerMotor.toLocaleString("tr-TR")}g
              </p>
            </div>
            <div className="rounded-xl border border-fpv-border bg-fpv-card p-5 text-center">
              <p className="text-xs text-zinc-500">Toplam İtki</p>
              <p className="mt-1 text-2xl font-bold text-zinc-100">
                {result.totalThrust.toLocaleString("tr-TR")}g
              </p>
            </div>
            <div className="rounded-xl border border-fpv-cyan/30 bg-fpv-cyan/5 p-5 text-center">
              <p className="text-xs text-zinc-500">İtki/Ağırlık Oranı</p>
              <p className={`mt-1 text-3xl font-bold ${result.color}`}>
                {result.thrustToWeightRatio}:1
              </p>
            </div>
          </div>

          {/* Recommendation */}
          <div className="rounded-xl border border-fpv-border bg-fpv-card p-5">
            <h3 className="text-sm font-medium text-zinc-300">Değerlendirme</h3>
            <p className={`mt-2 text-sm ${result.color}`}>
              {result.recommendation}
            </p>
          </div>

          {/* Ratio bar */}
          <div>
            <div className="flex justify-between text-xs text-zinc-500">
              <span>1:1</span>
              <span>3:1</span>
              <span>5:1</span>
              <span>8:1</span>
              <span>10+:1</span>
            </div>
            <div className="mt-1 h-3 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-50% to-fpv-cyan transition-all duration-300"
                style={{
                  width: `${Math.min((result.thrustToWeightRatio / 10) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
