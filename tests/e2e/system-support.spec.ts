import { expect, test } from "@playwright/test";

const systemSupportPath = "/services/system-support/";

const serviceSections = [
  {
    id: "assessment",
    title: "既存システムの調査・引き継ぎ",
    price: "50万円〜（税別）",
  },
  {
    id: "spot-maintenance",
    title: "スポット保守・改修",
    price: "個別見積もり",
  },
  {
    id: "ongoing-maintenance",
    title: "継続保守・改修",
    price: "月額30万円〜（税別）",
  },
  {
    id: "development",
    title: "周辺機能・新規システム開発",
    price: "個別見積もり",
  },
] as const;

test("既存システム支援を4つの対応内容として1ページに統合する", async ({ page }) => {
  await page.goto(systemSupportPath);

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("既存システム支援");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("main")).not.toContainText("診断");
  await expect(page.locator(".support-option")).toHaveCount(4);

  await expect(page.locator(".route-note")).toHaveText(
    "状況に応じて、必要な工程から対応します。修正内容が明確な場合は、調査・引き継ぎを経ずに、スポット保守・改修から開始できます。",
  );

  for (const service of serviceSections) {
    const section = page.locator(`#${service.id}`);
    await expect(section).toHaveCount(1);
    await expect(section.getByRole("heading", { level: 2, name: service.title })).toBeVisible();
    await expect(section.locator(".option-meta dd").first()).toHaveText(service.price);
    await expect(section.getByRole("link", { name: /この内容について相談する/ })).toHaveAttribute(
      "href",
      /\/contact\/\?service=/,
    );
  }

  const assessment = page.locator("#assessment");
  await expect(assessment.getByRole("heading", { level: 3, name: "主な調査対象" })).toBeVisible();
  await expect(assessment.getByRole("heading", { level: 3, name: "成果物" })).toBeVisible();
  await expect(assessment.getByText("調査報告書", { exact: true })).toBeVisible();
  await expect(assessment.getByText("引き継ぎ資料", { exact: true })).toBeVisible();
});

test("ページ内ナビゲーション、相談例、進め方、技術、対応範囲、FAQを表示する", async ({ page }) => {
  await page.goto(systemSupportPath);

  expect(
    await page
      .locator(".support-page-nav a")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href"))),
  ).toEqual(["#assessment", "#spot-maintenance", "#ongoing-maintenance", "#development"]);
  await expect(page.locator(".consultation-list li")).toHaveCount(8);
  await expect(page.locator(".support-process li")).toHaveCount(4);
  await expect(page.locator(".technology-list dt")).toHaveText([
    "アプリケーション開発",
    "データベース",
    "インフラ・運用",
  ]);
  await expect(page.locator(".exclusion-list li")).toHaveCount(6);

  const faqs = page.locator(".faq-list details");
  await expect(faqs).toHaveCount(6);
  expect(await faqs.evaluateAll((items) => items.every((item) => !item.hasAttribute("open")))).toBe(
    true,
  );
  await faqs.first().locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(faqs.first()).toHaveAttribute("open", "");
  await expect(faqs.first().locator("p")).toBeVisible();

  await expect(page.getByRole("link", { name: "既存システムについて相談する" })).toHaveCount(2);
});

test("統合ページのSEO、OGP、パンくず、Service構造化データを設定する", async ({ page }) => {
  const title = "既存システムの調査・引き継ぎ・保守・改修｜FALXTER株式会社";
  const description =
    "資料や仕様が十分でない既存業務システムの調査・引き継ぎから、スポット改修、継続保守、周辺機能・新規システム開発まで対応します。";

  await page.goto(systemSupportPath);
  await expect(page).toHaveTitle(title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", description);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", title);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    description,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/services\/system-support\/$/,
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    /\/services\/system-support\/$/,
  );

  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(jsonLd.some((entry) => entry.includes('"@type":"BreadcrumbList"'))).toBe(true);
  expect(jsonLd.some((entry) => entry.includes('"@type":"Service"'))).toBe(true);
});

test("旧詳細URLを新ページの該当箇所へ恒久的にリダイレクトする", async ({ request }) => {
  for (const redirect of [
    {
      from: "/services/system-assessment/",
      to: "/services/system-support/#assessment",
    },
    {
      from: "/services/system-maintenance/",
      to: "/services/system-support/#spot-maintenance",
    },
  ]) {
    const response = await request.get(redirect.from, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(response.headers().location).toBe(redirect.to);
  }
});

for (const width of [375, 768, 1024, 1440]) {
  test(`${width}pxで統合ページが横にはみ出さずアンカーが固定ヘッダーに隠れない`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`${systemSupportPath}#spot-maintenance`);
    await page.waitForTimeout(100);

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);

    const header = await page.locator(".site-header").boundingBox();
    const target = await page.locator("#spot-maintenance").boundingBox();
    expect(target?.y ?? 0).toBeGreaterThanOrEqual((header?.height ?? 0) + 8);

    const h1Metrics = await page.locator("h1").evaluate((element) => {
      const range = document.createRange();
      range.selectNodeContents(element);
      return {
        fontSize: Number.parseFloat(getComputedStyle(element).fontSize),
        lineCount: range.getClientRects().length,
      };
    });
    const expectedH1Size = Math.min(48, Math.max(28.8, width * 0.04));
    expect(Math.abs(h1Metrics.fontSize - expectedH1Size)).toBeLessThanOrEqual(0.2);
    expect(h1Metrics.lineCount).toBe(1);

    const exclusionsHeadingLines = await page
      .getByRole("heading", { level: 2, name: "対応できない範囲" })
      .evaluate((element) => {
        const range = document.createRange();
        range.selectNodeContents(element);
        return range.getClientRects().length;
      });
    expect(exclusionsHeadingLines).toBe(1);

    const pageNavColumns = await page
      .locator(".support-page-nav ul")
      .evaluate(
        (element) => getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length,
      );
    expect(pageNavColumns).toBe(width <= 700 ? 2 : 4);

    const optionColumns = await page
      .locator("#assessment .support-option-grid")
      .evaluate(
        (element) => getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length,
      );
    expect(optionColumns).toBe(width <= 900 ? 1 : 2);
  });
}
