import {
  PLAYWRIGHT_TEST,
  TURNSTILE_EXPECTED_HOSTNAME,
  TURNSTILE_SECRET_KEY,
} from "astro:env/server";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(token: string, ip?: string) {
  const secret = TURNSTILE_SECRET_KEY;
  if (import.meta.env.MODE === "test" || PLAYWRIGHT_TEST === "1") return true;
  if (!secret || !token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(VERIFY_URL, { method: "POST", body, signal: controller.signal });
    if (!response.ok) return false;
    const result = (await response.json()) as { success: boolean; hostname?: string };
    const expected = TURNSTILE_EXPECTED_HOSTNAME;
    return result.success && (!expected || result.hostname === expected);
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
