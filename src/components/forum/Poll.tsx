"use client";

import { useEffect, useState } from "react";

interface PollOption {
  key: string;
  label: string;
  votes: number;
}

interface PollData {
  question: string;
  options: PollOption[];
  totalVotes: number;
  hasVoted: boolean;
}

const barColors: Record<string, string> = {
  evet: "bg-fpv-cyan",
  belki: "bg-fpv-orange",
  hayir: "bg-red-500",
};

export function Poll() {
  const [poll, setPoll] = useState<PollData | null>(null);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/poll")
      .then((r) => r.json())
      .then(setPoll);
  }, []);

  async function vote(option: string) {
    setVoting(true);
    setError("");
    const res = await fetch("/api/poll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ option }),
    });
    const data = await res.json();
    if (res.ok) {
      setPoll(data);
    } else {
      setError(data.error);
    }
    setVoting(false);
  }

  if (!poll) {
    return (
      <div className="card-glow mx-auto mt-10 max-w-lg p-6 text-center text-zinc-500">
        Anket yükleniyor...
      </div>
    );
  }

  return (
    <div className="card-glow mx-auto mt-10 max-w-lg p-6">
      <h2 className="text-lg font-bold text-zinc-100">{poll.question}</h2>
      <p className="mt-1 text-xs text-zinc-500">
        Toplam {poll.totalVotes} oy
        {poll.hasVoted && (
          <span className="ml-2 text-fpv-cyan">· Oyunuz kaydedildi</span>
        )}
      </p>

      <div className="mt-5 space-y-3">
        {poll.options.map((opt) => {
          const pct = poll.totalVotes > 0
            ? Math.round((opt.votes / poll.totalVotes) * 100)
            : 0;

          return (
            <div key={opt.key}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-zinc-200">{opt.label}</span>
                <span className="text-zinc-400">
                  %{pct} ({opt.votes})
                </span>
              </div>

              <div className="relative h-9 overflow-hidden rounded-lg border border-fpv-border bg-fpv-dark">
                <div
                  className={`absolute inset-y-0 left-0 transition-all duration-500 ${barColors[opt.key] || "bg-fpv-cyan"} opacity-20`}
                  style={{ width: `${pct}%` }}
                />
                {!poll.hasVoted && (
                  <button
                    onClick={() => vote(opt.key)}
                    disabled={voting}
                    className="relative z-10 flex h-full w-full items-center px-4 text-sm text-zinc-300 transition-colors hover:text-fpv-cyan disabled:opacity-50"
                  >
                    Oy ver
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}
