import type { APIRoute } from "astro";
import { sendContactMail } from "../../lib/mailer";
import { verifyTurnstile } from "../../lib/turnstile";
import { contactSchema } from "../../lib/validation";

const MAX_BYTES = 16_384;
const buckets = new Map<string, { count: number; reset: number }>();
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
export const POST: APIRoute = async ({ request, clientAddress }) => {
  const type = request.headers.get("content-type") || "";
  if (
    !type.includes("application/json") &&
    !type.includes("application/x-www-form-urlencoded") &&
    !type.includes("multipart/form-data")
  )
    return json(415, {
      success: false,
      code: "UNSUPPORTED_MEDIA_TYPE",
      message: "送信形式を確認してください。",
    });
  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BYTES)
    return json(413, {
      success: false,
      code: "PAYLOAD_TOO_LARGE",
      message: "入力内容が長すぎます。",
    });
  let raw: Record<string, unknown>;
  try {
    if (type.includes("application/json")) {
      const text = await request.text();
      if (new TextEncoder().encode(text).length > MAX_BYTES) throw new Error();
      raw = JSON.parse(text);
    } else {
      const form = await request.formData();
      raw = Object.fromEntries(form);
    }
  } catch {
    return json(400, {
      success: false,
      code: "INVALID_REQUEST",
      message: "送信内容を確認してください。",
    });
  }
  if (raw.website) return json(200, { success: true });
  const now = Date.now();
  const key = clientAddress || "unknown";
  const bucket = buckets.get(key);
  if (bucket && bucket.reset > now && bucket.count >= 5)
    return json(429, {
      success: false,
      code: "RATE_LIMITED",
      message: "時間をおいて再度お試しください。",
    });
  buckets.set(key, {
    count: bucket && bucket.reset > now ? bucket.count + 1 : 1,
    reset: bucket && bucket.reset > now ? bucket.reset : now + 600_000,
  });
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success)
    return json(422, {
      success: false,
      code: "VALIDATION_ERROR",
      message: "入力内容を確認してください。",
    });
  if (!(await verifyTurnstile(parsed.data.turnstileToken)))
    return json(422, {
      success: false,
      code: "TURNSTILE_ERROR",
      message: "セキュリティ確認に失敗しました。再度お試しください。",
    });
  try {
    await sendContactMail(parsed.data);
    return json(200, { success: true });
  } catch (error) {
    console.error("contact delivery failed", {
      error: error instanceof Error ? error.message : "unknown",
      pii: "[REDACTED]",
    });
    return json(500, {
      success: false,
      code: "DELIVERY_ERROR",
      message: "送信できませんでした。時間をおいて再度お試しください。",
    });
  }
};
export const ALL: APIRoute = () =>
  json(405, { success: false, code: "METHOD_NOT_ALLOWED", message: "許可されていない操作です。" });
