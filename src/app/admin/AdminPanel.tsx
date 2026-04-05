"use client";

import { useActionState, useRef, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  login,
  logout,
  createPost,
  updatePost,
  deletePost,
  getPostRaw,
} from "./actions";
import type { RawPost } from "./actions";
import type { BlogPost } from "@/types/blog";

const inputClass =
  "w-full rounded-lg border border-fpv-border bg-fpv-dark px-4 py-2.5 text-zinc-100 outline-none focus:border-fpv-cyan";

function CoverImageField({ defaultValue }: { defaultValue: string }) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    if (data.url) setUrl(data.url);
    setUploading(false);
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm text-zinc-400">
        Kapak Görseli
      </label>
      <input type="hidden" name="coverImage" value={url} />
      <div className="flex gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/gorsel.jpg"
          className={inputClass}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="shrink-0 rounded-lg border border-fpv-border bg-fpv-card px-4 py-2.5 text-sm text-zinc-300 transition-all hover:border-fpv-cyan/50 hover:text-fpv-cyan disabled:opacity-50"
        >
          {uploading ? "Yükleniyor..." : "Dosya Yükle"}
        </button>
      </div>
      {url && (
        <div className="relative mt-3 aspect-video w-48 overflow-hidden rounded-lg border border-fpv-border">
          <Image src={url} alt="Önizleme" fill className="object-cover" />
        </div>
      )}
    </div>
  );
}

function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <form action={formAction} className="card-glow w-full max-w-sm p-8">
        <h1 className="mb-6 text-2xl font-bold text-zinc-100">Admin Girişi</h1>
        <label className="mb-2 block text-sm text-zinc-400">Şifre</label>
        <input
          type="password"
          name="password"
          required
          className={`mb-4 ${inputClass}`}
        />
        {state?.error && (
          <p className="mb-4 text-sm text-red-400">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-fpv-cyan px-5 py-2.5 text-sm font-medium text-zinc-950 transition-all hover:bg-fpv-cyan/80 disabled:opacity-50"
        >
          {pending ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}

function PostForm({
  editingPost,
  onDone,
  onCancel,
  cameFromPost,
}: {
  editingPost: RawPost | null;
  onDone: () => void;
  onCancel: () => void;
  cameFromPost: boolean;
}) {
  const router = useRouter();
  const isEditing = editingPost !== null;

  const [state, formAction, pending] = useActionState(
    async (
      prev: { error?: string; success?: boolean } | null,
      formData: FormData
    ) => {
      const action = isEditing ? updatePost : createPost;
      const result = await action(prev, formData);
      if (result?.success) onDone();
      return result;
    },
    null
  );

  const today = new Date().toISOString().split("T")[0];

  return (
    <form action={formAction} className="card-glow space-y-5 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-zinc-100">
          {isEditing ? "Yazıyı Düzenle" : "Yeni Yazı Oluştur"}
        </h2>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              if (cameFromPost && editingPost) {
                router.push(`/blog/${editingPost.slug}`);
              } else {
                onCancel();
              }
            }}
            className="rounded-lg border border-fpv-border px-4 py-1.5 text-sm text-zinc-400 transition-all hover:border-zinc-500 hover:text-zinc-200"
          >
            Vazgeç
          </button>
        )}
      </div>

      {isEditing && (
        <input type="hidden" name="originalSlug" value={editingPost.slug} />
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm text-zinc-400">
            Başlık *
          </label>
          <input
            type="text"
            name="title"
            required
            defaultValue={editingPost?.title ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-zinc-400">Yazar</label>
          <input
            type="text"
            name="author"
            defaultValue={editingPost?.author ?? "FPV Türkiye"}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm text-zinc-400">
            Kategori *
          </label>
          <select
            name="category"
            required
            defaultValue={editingPost?.category ?? "rehber"}
            className={inputClass}
          >
            <option value="rehber">Rehber</option>
            <option value="haber">Haber</option>
            <option value="inceleme">İnceleme</option>
            <option value="ipucu">İpucu</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-zinc-400">Tarih</label>
          <input
            type="date"
            name="date"
            defaultValue={editingPost?.date ?? today}
            className={inputClass}
          />
        </div>
        <div className="flex items-end gap-3 pb-1">
          <label className="flex items-center gap-2 text-sm text-zinc-400">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={editingPost?.featured ?? false}
              className="h-4 w-4 accent-fpv-cyan"
            />
            Öne Çıkan
          </label>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-zinc-400">
          Etiketler{" "}
          <span className="text-zinc-600">(virgülle ayırın)</span>
        </label>
        <input
          type="text"
          name="tags"
          placeholder="fpv, drone, rehber"
          defaultValue={editingPost?.tags?.join(", ") ?? ""}
          className={inputClass}
        />
      </div>

      <CoverImageField defaultValue={editingPost?.coverImage ?? ""} />

      <div>
        <label className="mb-1.5 block text-sm text-zinc-400">Özet *</label>
        <textarea
          name="excerpt"
          required
          rows={2}
          defaultValue={editingPost?.excerpt ?? ""}
          className={`resize-none ${inputClass}`}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-zinc-400">
          İçerik (Markdown) *
        </label>
        <textarea
          name="content"
          required
          rows={14}
          defaultValue={editingPost?.content ?? ""}
          className={`font-mono text-sm ${inputClass}`}
          placeholder={"# Başlık\n\nMarkdown içerik buraya..."}
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-400">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-sm text-green-400">
          {isEditing
            ? "Yazı başarıyla güncellendi!"
            : "Yazı başarıyla oluşturuldu!"}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-fpv-cyan px-6 py-2.5 text-sm font-medium text-zinc-950 transition-all hover:bg-fpv-cyan/80 disabled:opacity-50"
      >
        {pending
          ? "Kaydediliyor..."
          : isEditing
            ? "Güncelle"
            : "Yayınla"}
      </button>
    </form>
  );
}

function PostList({
  posts,
  onEdit,
  onDeleted,
}: {
  posts: BlogPost[];
  onEdit: (slug: string) => void;
  onDeleted: () => void;
}) {
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const categoryLabels: Record<string, string> = {
    rehber: "Rehber",
    haber: "Haber",
    inceleme: "İnceleme",
    ipucu: "İpucu",
  };

  const categoryColors: Record<string, string> = {
    rehber: "text-fpv-cyan",
    haber: "text-fpv-orange",
    inceleme: "text-fpv-lime",
    ipucu: "text-purple-400",
  };

  function handleDelete(slug: string) {
    if (!confirm(`"${slug}" yazısını silmek istediğinize emin misiniz?`))
      return;
    setDeletingSlug(slug);
    startTransition(async () => {
      await deletePost(slug);
      setDeletingSlug(null);
      onDeleted();
    });
  }

  return (
    <div className="card-glow p-6">
      <h2 className="mb-4 text-xl font-bold text-zinc-100">
        Mevcut Yazılar ({posts.length})
      </h2>
      {posts.length === 0 ? (
        <p className="text-zinc-500">Henüz yazı yok.</p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="flex items-center justify-between rounded-lg border border-fpv-border bg-fpv-dark p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium ${categoryColors[post.category] || "text-zinc-400"}`}
                  >
                    {categoryLabels[post.category] || post.category}
                  </span>
                  {post.featured && (
                    <span className="text-xs text-yellow-500">★</span>
                  )}
                </div>
                <h3 className="truncate font-medium text-zinc-100">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-fpv-cyan"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-xs text-zinc-500">
                  {post.date} · {post.author}
                </p>
              </div>
              <div className="ml-4 flex shrink-0 gap-2">
                <button
                  onClick={() => onEdit(post.slug)}
                  className="rounded-lg border border-fpv-cyan/30 px-3 py-1.5 text-xs text-fpv-cyan transition-all hover:bg-fpv-cyan/10"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(post.slug)}
                  disabled={isPending && deletingSlug === post.slug}
                  className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-400 transition-all hover:bg-red-500/10 disabled:opacity-50"
                >
                  {isPending && deletingSlug === post.slug
                    ? "Siliniyor..."
                    : "Sil"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPanel({
  authenticated,
  posts,
  initialEditPost,
}: {
  authenticated: boolean;
  posts: BlogPost[];
  initialEditPost?: RawPost | null;
}) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingPost, setEditingPost] = useState<RawPost | null>(
    initialEditPost ?? null
  );
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [, startTransition] = useTransition();

  if (!authenticated) return <LoginForm />;

  function refresh() {
    setEditingPost(null);
    startTransition(() => setRefreshKey((k) => k + 1));
  }

  async function handleEdit(slug: string) {
    setLoadingEdit(true);
    const raw = await getPostRaw(slug);
    if (raw) {
      setEditingPost(raw);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setLoadingEdit(false);
  }

  return (
    <div key={refreshKey}>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <span className="glow-text">Admin Panel</span>
        </h1>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-lg border border-fpv-border px-4 py-2 text-sm text-zinc-400 transition-all hover:border-red-500/50 hover:text-red-400"
          >
            Çıkış Yap
          </button>
        </form>
      </div>

      {loadingEdit && (
        <div className="mb-6 text-center text-sm text-zinc-400">
          Yazı yükleniyor...
        </div>
      )}

      <div className="space-y-8">
        <PostForm
          key={editingPost?.slug ?? "new"}
          editingPost={editingPost}
          onDone={refresh}
          onCancel={() => setEditingPost(null)}
          cameFromPost={initialEditPost != null && editingPost?.slug === initialEditPost.slug}
        />
        <PostList
          posts={posts}
          onEdit={handleEdit}
          onDeleted={refresh}
        />
      </div>
    </div>
  );
}
