import { Resend } from "resend";
import type { ContactInput } from "./validation";
import { escapeHtml } from "./validation";
export async function sendContactMail(data: ContactInput) {
  const transport = import.meta.env.MAIL_TRANSPORT || "mock";
  if (transport === "mock") {
    if (import.meta.env.PROD) throw new Error("MAIL_TRANSPORT=mock is forbidden in production");
    console.info("[mock-mail] contact received", {
      category: data.category,
      messageLength: data.message.length,
      pii: "[REDACTED]",
    });
    return;
  }
  const apiKey = import.meta.env.RESEND_API_KEY,
    from = import.meta.env.CONTACT_FROM_EMAIL,
    to = import.meta.env.CONTACT_TO_EMAIL,
    replyTo = import.meta.env.CONTACT_REPLY_TO_EMAIL;
  if (!apiKey || !from || !to) throw new Error("Mail configuration is incomplete");
  const resend = new Resend(apiKey);
  const text = `会社名: ${data.company}\n氏名: ${data.name}\nメール: ${data.email}\n電話: ${data.phone || "未入力"}\n相談区分: ${data.category}\n希望時期: ${data.timing}\n予算帯: ${data.budget}\n\n${data.message}`;
  const html = `<h1>お問い合わせ</h1><pre>${escapeHtml(text)}</pre>`;
  const notice = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: `[お問い合わせ] ${data.category}`,
    text,
    html,
  });
  if (notice.error) throw new Error("Notification mail failed");
  const auto = await resend.emails.send({
    from,
    to: [data.email],
    replyTo: replyTo || to,
    subject: "お問い合わせを受け付けました｜FALXTER株式会社",
    text: `${data.name} 様\n\nお問い合わせを受け付けました。内容を確認のうえご連絡します。\n\n※このメールは自動送信です。`,
    html: `<p>${escapeHtml(data.name)} 様</p><p>お問い合わせを受け付けました。内容を確認のうえご連絡します。</p><p>※このメールは自動送信です。</p>`,
  });
  if (auto.error) throw new Error("Auto-reply mail failed");
}
