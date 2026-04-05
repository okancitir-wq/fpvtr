import { getRedis } from "@/lib/redis";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const POLL_KEY = "poll:forum-talep";
const VOTERS_KEY = "poll:forum-talep:voters";

const POLL_OPTIONS = [
  { key: "evet", label: "Evet, kesinlikle!" },
  { key: "belki", label: "Belki, içeriğe bağlı" },
  { key: "hayir", label: "Hayır, gerek yok" },
];

const QUESTION = "FPV Türkiye forumu açılsın mı?";

async function getIP(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

async function getPollData(ip: string) {
  const redis = getRedis();
  const [votes, hasVoted] = await Promise.all([
    redis.hgetall(POLL_KEY) as Promise<Record<string, string> | null>,
    redis.sismember(VOTERS_KEY, ip),
  ]);

  const options = POLL_OPTIONS.map((opt) => ({
    key: opt.key,
    label: opt.label,
    votes: Number(votes?.[opt.key] || 0),
  }));

  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0);

  return { question: QUESTION, options, totalVotes, hasVoted: Boolean(hasVoted) };
}

export async function GET() {
  const ip = await getIP();
  const data = await getPollData(ip);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const redis = getRedis();
  const ip = await getIP();

  const alreadyVoted = await redis.sismember(VOTERS_KEY, ip);
  if (alreadyVoted) {
    return NextResponse.json({ error: "Zaten oy kullandınız." }, { status: 400 });
  }

  const body = await request.json();
  const { option } = body;

  const validKeys = POLL_OPTIONS.map((o) => o.key);
  if (!option || !validKeys.includes(option)) {
    return NextResponse.json({ error: "Geçersiz seçenek." }, { status: 400 });
  }

  await Promise.all([
    redis.hincrby(POLL_KEY, option, 1),
    redis.sadd(VOTERS_KEY, ip),
  ]);

  const data = await getPollData(ip);
  return NextResponse.json(data);
}
