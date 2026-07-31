import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  CONTACT_FROM_EMAIL,
  CONTACT_REPLY_TO_EMAIL,
  CONTACT_TO_EMAIL,
  MAIL_TRANSPORT,
  PLAYWRIGHT_TEST,
} from "astro:env/server";
import { AwsClient } from "aws4fetch";
import type { ContactInput } from "./validation";
import { escapeHtml } from "./validation";

type Mail = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
};

const encodeBase64 = (value: string) => {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
};

const normalizeFromEmail = (value: string) => {
  const match = /^\s*(.*?)\s*<([^<>]+)>\s*$/.exec(value);
  if (!match) return value.trim();

  const displayName = match[1].trim();
  const address = match[2].trim();
  if (!displayName || /^[\x20-\x7e]+$/.test(displayName))
    return displayName ? `${displayName} <${address}>` : address;

  return `=?UTF-8?B?${encodeBase64(displayName)}?= <${address}>`;
};

const sendWithSes = async (client: AwsClient, region: string, mail: Mail) => {
  const response = await client.fetch(
    `https://email.${region}.amazonaws.com/v2/email/outbound-emails`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        FromEmailAddress: mail.from,
        Destination: { ToAddresses: [mail.to] },
        ReplyToAddresses: [mail.replyTo],
        Content: {
          Simple: {
            Subject: { Charset: "UTF-8", Data: mail.subject },
            Body: {
              Text: { Charset: "UTF-8", Data: mail.text },
              Html: { Charset: "UTF-8", Data: mail.html },
            },
          },
        },
      }),
    },
  );

  if (!response.ok) {
    const errorType = response.headers.get("x-amzn-errortype")?.split(":")[0] || "UnknownError";
    throw new Error(`SES delivery failed (${response.status} ${errorType})`);
  }
};

export async function sendContactMail(data: ContactInput) {
  const transport = MAIL_TRANSPORT;
  if (transport === "mock") {
    if (import.meta.env.PROD && PLAYWRIGHT_TEST !== "1")
      throw new Error("MAIL_TRANSPORT=mock is forbidden in production");
    console.info("[mock-mail] contact received", {
      category: data.category,
      messageLength: data.message.length,
      pii: "[REDACTED]",
    });
    return;
  }
  if (transport !== "ses") throw new Error("Unsupported mail transport");

  const region = AWS_REGION,
    accessKeyId = AWS_ACCESS_KEY_ID,
    secretAccessKey = AWS_SECRET_ACCESS_KEY,
    from = CONTACT_FROM_EMAIL,
    to = CONTACT_TO_EMAIL,
    replyTo = CONTACT_REPLY_TO_EMAIL;
  if (!region || !accessKeyId || !secretAccessKey || !from || !to)
    throw new Error("Mail configuration is incomplete");

  const ses = new AwsClient({
    region,
    service: "ses",
    accessKeyId,
    secretAccessKey,
    retries: 1,
  });
  const normalizedFrom = normalizeFromEmail(from);
  const text = `会社名・屋号: ${data.company || "未入力"}\n氏名: ${data.name}\nメール: ${data.email}\n電話: ${data.phone || "未入力"}\n相談区分: ${data.category}\n希望時期: ${data.timing}\n予算帯: ${data.budget}\n\n${data.message}`;
  const html = `<h1>お問い合わせ</h1><pre>${escapeHtml(text)}</pre>`;

  await sendWithSes(ses, region, {
    from: normalizedFrom,
    to,
    replyTo: data.email,
    subject: `[お問い合わせ] ${data.category}`,
    text,
    html,
  });

  await sendWithSes(ses, region, {
    from: normalizedFrom,
    to: data.email,
    replyTo: replyTo || to,
    subject: "お問い合わせを受け付けました｜FALXTER株式会社",
    text: `${data.name} 様\n\nお問い合わせを受け付けました。内容を確認のうえご連絡します。\n\n※このメールは自動送信です。`,
    html: `<p>${escapeHtml(data.name)} 様</p><p>お問い合わせを受け付けました。内容を確認のうえご連絡します。</p><p>※このメールは自動送信です。</p>`,
  });
}
