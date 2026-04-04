"use client";

import { useActionState } from "react";
import { sendContactEmail } from "./actions";
import { useRef } from "react";

export default function IletisimPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(sendContactEmail, {
    success: false,
    error: "",
  });

  if (state.success && formRef.current) {
    formRef.current.reset();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold text-zinc-100">İletişim</h1>
        <p className="mt-2 text-zinc-400">
          Soru, öneri veya işbirliği teklifleriniz için bize ulaşın.
        </p>

        {/* Contact info */}
        <div className="mt-8 flex flex-wrap gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fpv-cyan/10">
              <svg
                className="h-5 w-5 text-fpv-cyan"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <a
              href="mailto:okancitir@hotmail.com"
              className="text-sm text-zinc-300 hover:text-fpv-cyan transition-colors"
            >
              okancitir@hotmail.com
            </a>
          </div>
        </div>

        {/* Form */}
        <form ref={formRef} action={formAction} className="mt-10 space-y-5">
          {state.success && (
            <div className="rounded-lg border border-fpv-lime/30 bg-fpv-lime/5 p-4 text-sm text-fpv-lime">
              Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapacağız.
            </div>
          )}
          {state.error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-400">
              {state.error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-300"
              >
                Adınız
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Adınızı girin"
                className="mt-1 w-full rounded-lg border border-fpv-border bg-fpv-card px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-fpv-cyan focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300"
              >
                E-posta Adresiniz
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="ornek@email.com"
                className="mt-1 w-full rounded-lg border border-fpv-border bg-fpv-card px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-fpv-cyan focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-zinc-300"
            >
              Konu
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="Mesajınızın konusu"
              className="mt-1 w-full rounded-lg border border-fpv-border bg-fpv-card px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-fpv-cyan focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-zinc-300"
            >
              Mesajınız
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="Mesajınızı yazın..."
              className="mt-1 w-full resize-y rounded-lg border border-fpv-border bg-fpv-card px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-fpv-cyan focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-lg bg-fpv-cyan px-6 py-2.5 text-sm font-medium text-zinc-950 transition-all hover:bg-fpv-cyan/80 shadow-lg shadow-fpv-cyan/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Gönderiliyor...
              </>
            ) : (
              "Mesaj Gönder"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
