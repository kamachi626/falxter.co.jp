import { expect, test } from "@playwright/test";

const pages = [
  "/",
  "/services/",
  "/services/corporate-website/",
  "/services/system-support/",
  "/cases/",
  "/company/",
  "/contact/",
  "/privacy/",
];

test("各ページにSEO基本要素がある", async ({ page }) => {
  for (const path of pages) {
    await page.goto(path);
    await expect(page).toHaveTitle(/FALXTER/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^http/);
    await expect(page.locator("h1")).toHaveCount(1);
  }
});

test("ページごとにOGP画像を切り替える", async ({ page, request }) => {
  const pageImages = [
    ["/", "/images/og-default.png"],
    ["/company/", "/images/og-default.png"],
    ["/services/system-support/", "/images/og-system-support.png"],
    ["/services/corporate-website/", "/images/corporate-website.png"],
  ] as const;

  for (const [path, expectedImagePath] of pageImages) {
    await page.goto(path);
    const ogImage = page.locator('meta[property="og:image"]');
    const ogImageUrl = await ogImage.getAttribute("content");
    expect(ogImageUrl).not.toBeNull();
    expect(new URL(ogImageUrl ?? "").pathname).toBe(expectedImagePath);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
      "content",
      ogImageUrl ?? "",
    );

    const imageResponse = await request.get(expectedImagePath);
    expect(imageResponse.ok()).toBe(true);
    expect(imageResponse.headers()["content-type"]).toContain("image/png");
  }
});

test("トップのdescriptionは既存システム支援を主軸にする", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "FALXTER株式会社は、資料や仕様が不足した既存業務システムやWebアプリケーションの調査、引き継ぎ、保守・改修を代表エンジニアが直接支援します。",
  );
});
test("お問い合わせのdescriptionとOGPを現在のサービス構成へ統一する", async ({ page }) => {
  const description =
    "既存システムの調査・引き継ぎ・保守・改修、周辺機能や新規システムの開発、コーポレートサイト制作についてご相談ください。";
  await page.goto("/contact/");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", description);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    description,
  );
});
test("サービス一覧のdescriptionとOGPを2つのサービス領域へ統一する", async ({ page }) => {
  const description =
    "既存システムの調査・引き継ぎ・保守・改修、周辺機能や新規システムの開発、中小企業向けコーポレートサイト制作を提供しています。";
  await page.goto("/services/");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", description);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    description,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/services\/$/);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", /\/services\/$/);
});
test("sitemapは統合した2商品を含み技術記事を含まない", async ({ request }) => {
  const standard = await request.get("/sitemap.xml");
  expect(standard.ok()).toBe(true);
  const indexBody = await standard.text();
  const sitemapPath = new URL(
    indexBody.match(/<loc>(.*?)<\/loc>/)?.[1] ?? "",
    "http://127.0.0.1:4321",
  ).pathname;
  const sitemap = await request.get(sitemapPath);
  expect(sitemap.ok()).toBe(true);
  const body = await sitemap.text();
  for (const path of ["/services/corporate-website/", "/services/system-support/"]) {
    expect(body).toContain(path);
  }
  expect(body).not.toContain("/services/system-assessment/");
  expect(body).not.toContain("/services/system-maintenance/");
  expect(body).not.toContain("/insights/");
  expect(body).not.toContain("/blog/");
  expect(body).not.toContain("/news/");
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("Sitemap: https://falxter.co.jp/sitemap.xml");
});

test("CSPでCloudflare Web Analyticsの自動挿入を許可する", async ({ request }) => {
  const response = await request.get("/");
  const csp = response.headers()["content-security-policy"] ?? "";
  expect(csp).toContain("https://static.cloudflareinsights.com");
  expect(csp).toMatch(/connect-src[^;]*'self'/);
});

test("health checkが200を返す", async ({ request }) => {
  const response = await request.get("/api/health/");
  expect(response.status()).toBe(200);
});

test("Web制作詳細のSEOとOGPに2つの固定料金プランを反映する", async ({ page }) => {
  const title = "中小企業向けWebサイト制作・15万円／30万円固定｜FALXTER株式会社";
  const description =
    "中小企業向けに、1ページ15万円と最大5ページ30万円の固定料金でコーポレートサイトを制作します。スマートフォン対応、問い合わせフォーム、基本SEO、公開作業まで対応します。";
  await page.goto("/services/corporate-website/");
  await expect(page).toHaveTitle(title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", description);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", title);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    description,
  );
});
