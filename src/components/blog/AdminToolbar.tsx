"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePost } from "@/app/admin/actions";

export function AdminToolbar({ slug }: { slug: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleted, setDeleted] = useState(false);

  function handleDelete() {
    if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;
    startTransition(async () => {
      const result = await deletePost(slug);
      if (!result.error) {
        setDeleted(true);
        router.push("/blog");
      }
    });
  }

  if (deleted) return null;

  return (
    <div className="mb-8 flex items-center gap-3 rounded-lg border border-fpv-cyan/20 bg-fpv-cyan/5 px-4 py-3">
      <span className="mr-auto text-sm text-fpv-cyan">Admin</span>
      <a
        href={`/admin?edit=${slug}`}
        className="rounded-lg border border-fpv-cyan/30 px-4 py-1.5 text-xs font-medium text-fpv-cyan transition-all hover:bg-fpv-cyan/10"
      >
        Düzenle
      </a>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="rounded-lg border border-red-500/30 px-4 py-1.5 text-xs font-medium text-red-400 transition-all hover:bg-red-500/10 disabled:opacity-50"
      >
        {isPending ? "Siliniyor..." : "Sil"}
      </button>
    </div>
  );
}
