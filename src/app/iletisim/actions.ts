"use server";

import nodemailer from "nodemailer";

interface ContactFormState {
  success: boolean;
  error: string;
}

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { success: false, error: "Lütfen tüm alanları doldurun." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Geçerli bir e-posta adresi girin." };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"FPV Türkiye İletişim" <${process.env.SMTP_USER}>`,
      to: "okancitir@hotmail.com",
      replyTo: email,
      subject: `[FPV Türkiye] ${subject}`,
      text: `Gönderen: ${name} (${email})\n\nKonu: ${subject}\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #06b6d4;">FPV Türkiye - Yeni İletişim Mesajı</h2>
          <p><strong>Gönderen:</strong> ${name}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Konu:</strong> ${subject}</p>
          <hr style="border-color: #27272a;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return { success: true, error: "" };
  } catch {
    return {
      success: false,
      error: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.",
    };
  }
}
