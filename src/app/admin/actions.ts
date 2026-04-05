"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  savePost,
  removePost,
  getPostRawData,
  postExists,
  getAllPosts,
} from "@/lib/blog";
import type { BlogCategory } from "@/types/blog";

const SESSION_COOKIE = "admin_session";
const SESSION_VALUE = "authenticated";

function getPassword(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD environment variable is not set");
  return pw;
}

async function requireAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE;
}

export async function login(
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string } | null> {
  const password = formData.get("password") as string;

  if (!password || password !== getPassword()) {
    return { error: "Şifre yanlış." };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });

  return null;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  return requireAuth();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface CreatePostResult {
  error?: string;
  success?: boolean;
}

export async function createPost(
  _prev: CreatePostResult | null,
  formData: FormData
): Promise<CreatePostResult> {
  if (!(await requireAuth())) return { error: "Yetkisiz erişim." };

  const title = (formData.get("title") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const category = formData.get("category") as BlogCategory;
  const tagsRaw = (formData.get("tags") as string)?.trim();
  const featured = formData.get("featured") === "on";
  const content = (formData.get("content") as string)?.trim();
  const coverImage = (formData.get("coverImage") as string)?.trim() || "";
  const author = (formData.get("author") as string)?.trim() || "FPV Türkiye";
  const date =
    (formData.get("date") as string)?.trim() ||
    new Date().toISOString().split("T")[0];

  if (!title || !excerpt || !category || !content) {
    return { error: "Başlık, özet, kategori ve içerik zorunludur." };
  }

  const slug = slugify(title);
  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  if (await postExists(slug)) {
    return { error: "Bu slug ile bir yazı zaten mevcut." };
  }

  await savePost({
    slug,
    title,
    date,
    author,
    excerpt,
    category,
    tags,
    featured,
    coverImage,
    content,
  });

  revalidatePath("/blog");
  revalidatePath("/");

  return { success: true };
}

export interface RawPost {
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  featured: boolean;
  coverImage: string;
  content: string;
}

export async function getPostRaw(slug: string): Promise<RawPost | null> {
  if (!(await requireAuth())) return null;

  const stored = await getPostRawData(slug);
  if (!stored) return null;

  return {
    title: stored.title,
    slug: stored.slug,
    date: stored.date,
    author: stored.author || "FPV Türkiye",
    excerpt: stored.excerpt,
    category: stored.category as BlogCategory,
    tags: stored.tags || [],
    featured: stored.featured || false,
    coverImage: stored.coverImage || "",
    content: stored.content,
  };
}

export async function updatePost(
  _prev: CreatePostResult | null,
  formData: FormData
): Promise<CreatePostResult> {
  if (!(await requireAuth())) return { error: "Yetkisiz erişim." };

  const originalSlug = (formData.get("originalSlug") as string)?.trim();
  const title = (formData.get("title") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const category = formData.get("category") as BlogCategory;
  const tagsRaw = (formData.get("tags") as string)?.trim();
  const featured = formData.get("featured") === "on";
  const content = (formData.get("content") as string)?.trim();
  const coverImage = (formData.get("coverImage") as string)?.trim() || "";
  const author = (formData.get("author") as string)?.trim() || "FPV Türkiye";
  const date =
    (formData.get("date") as string)?.trim() ||
    new Date().toISOString().split("T")[0];

  if (!originalSlug || !title || !excerpt || !category || !content) {
    return { error: "Başlık, özet, kategori ve içerik zorunludur." };
  }

  const newSlug = slugify(title);
  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const existed = await removePost(originalSlug);
  if (!existed) {
    return { error: "Düzenlenecek yazı bulunamadı." };
  }

  await savePost({
    slug: newSlug,
    title,
    date,
    author,
    excerpt,
    category,
    tags,
    featured,
    coverImage,
    content,
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${originalSlug}`);
  revalidatePath(`/blog/${newSlug}`);
  revalidatePath("/");

  return { success: true };
}

export async function deletePost(slug: string): Promise<{ error?: string }> {
  if (!(await requireAuth())) return { error: "Yetkisiz erişim." };

  const existed = await removePost(slug);
  if (!existed) return { error: "Yazı bulunamadı." };

  revalidatePath("/blog");
  revalidatePath("/");
  return {};
}

export { getAllPosts };
