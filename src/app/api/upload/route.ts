import { put } from "@vercel/blob";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";
const SESSION_VALUE = "authenticated";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (cookieStore.get(SESSION_COOKIE)?.value !== SESSION_VALUE) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
  }

  const blob = await put(`blog/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  return NextResponse.json({ url: blob.url });
}
