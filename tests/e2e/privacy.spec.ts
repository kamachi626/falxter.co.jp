import { expect, test } from "@playwright/test";

const privacyPath = "/privacy/";

test("12項目のプライバシーポリシーと公式リンクを表示する", async ({ page }) => {
  await page.goto(privacyPath);

  await expect(page.locator("h1")).toHaveText("プライバシーポリシー");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator(".policy-section")).toHaveCount(12);
  await expect(page.locator(".policy-toc a")).toHaveCount(12);
  await expect(page.getByText("TODO", { exact: false })).toHaveCount(0);
  await expect(page.getByText("運用開始前", { exact: false })).toHaveCount(0);

  const officialLinks = [
    ["Googleによる情報の使用", "https://policies.google.com/technologies/partner-sites?hl=ja"],
    ["Google Analyticsオプトアウトアドオン", "https://tools.google.com/dlpage/gaoptout?hl=ja"],
    [
      "Cloudflare Turnstile Privacy Addendum",
      "https://www.cloudflare.com/turnstile-privacy-policy/",
    ],
  ] as const;

  for (const [name, href] of officialLinks) {
    const link = page.getByRole("link", { name });
    await expect(link).toHaveAttribute("href", href);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  }

  await expect(page.getByText("制定日：2026年7月31日")).toBeVisible();
  await expect(page.getByRole("link", { name: "customer@falxter.co.jp" })).toHaveAttribute(
    "href",
    "mailto:customer@falxter.co.jp",
  );
});

test("目次アンカー移動時に固定ヘッダーが見出しへ重ならない", async ({ page }) => {
  await page.goto(privacyPath);
  await page.locator('.policy-toc a[href="#analytics"]').click();
  await page.waitForTimeout(800);

  const header = await page.locator(".site-header").boundingBox();
  const section = await page.locator("#analytics").boundingBox();
  expect(section?.y ?? 0).toBeGreaterThanOrEqual((header?.height ?? 0) + 8);
  expect(section?.y ?? Number.POSITIVE_INFINITY).toBeLessThan(700);
});

for (const width of [375, 768, 1024, 1440]) {
  test(`${width}pxで本文・目次・外部リンクが横にはみ出さない`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(privacyPath);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);

    const columns = await page
      .locator(".privacy-layout")
      .evaluate(
        (element) => getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length,
      );
    expect(columns).toBe(width <= 900 ? 1 : 2);
    await expect(page.locator(".policy-toc")).toHaveCSS(
      "position",
      width <= 900 ? "static" : "sticky",
    );
    await expect(page.locator(".privacy-content")).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)",
    );
  });
}
