import { expect, test } from "@playwright/test";

const corporateWebsitePath = "/services/corporate-website/";

const plans = [
  {
    id: "one-page-plan",
    name: "1ページ会社サイト制作",
    price: "15万円（税別）",
    scope: "1ページ・8セクションまで",
    duration: "3〜4週間",
  },
  {
    id: "five-page-plan",
    name: "最大5ページのコーポレートサイト制作",
    price: "30万円（税別）",
    scope: "最大5ページ",
    duration: "4〜6週間",
  },
] as const;

test("コーポレートサイト制作を専用レイアウトで表示する", async ({ page }) => {
  await page.goto(corporateWebsitePath);

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "中小企業向けコーポレートサイト制作",
  );
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator(".plan-card")).toHaveCount(2);

  for (const plan of plans) {
    const card = page.locator(`#${plan.id}`);
    await expect(card.getByRole("heading", { level: 3, name: plan.name })).toBeVisible();
    await expect(card.getByText(plan.price, { exact: true })).toBeVisible();
    await expect(card.getByText(plan.scope, { exact: true })).toBeVisible();
    await expect(card.getByText(plan.duration, { exact: true })).toBeVisible();
    await expect(card.getByText("初稿に対する一括修正1回", { exact: true })).toBeVisible();
  }

  await expect(page.getByRole("link", { name: "Webサイト制作について相談する" })).toHaveCount(2);
  await expect(
    page.getByRole("link", { name: "Webサイト制作について相談する" }).first(),
  ).toHaveAttribute("href", "/contact/?service=website-consultation");
});

test("特徴、標準内容、構成例、役割分担、標準外、制作フローを表示する", async ({ page }) => {
  await page.goto(corporateWebsitePath);

  await expect(page.locator(".feature-list li")).toHaveCount(3);
  await expect(page.locator(".inclusion-list li")).toHaveCount(8);
  await expect(page.locator(".comparison-panel")).toHaveCount(2);
  await expect(page.locator(".responsibility-grid > section")).toHaveCount(2);
  await expect(page.locator(".exclusion-list li")).toHaveCount(11);
  await expect(page.locator(".website-process li")).toHaveCount(6);
  await expect(page.locator(".plan-section .section-note")).toHaveCount(1);
  await expect(page.locator(".standard-notes p")).toHaveCount(3);
  await expect(page.locator(".exclusion-section .section-note")).toHaveCount(1);

  await expect(
    page.getByText("検索順位の保証や継続的なSEO施策は含みません。", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByText("原稿作成、取材、撮影、ロゴ制作は標準料金に含まれません。", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByText("修正は、初稿に対する一括修正1回を標準範囲とします。", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByText("最大5ページには、お問い合わせページを含みます。", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "標準的なプライバシーポリシー、問い合わせ送信完了ページ、404ページはページ数に含みません。",
      { exact: false },
    ),
  ).toBeVisible();
  await expect(
    page.getByText("独自の規程や法務要件に合わせた文案作成は個別見積もりとなります。", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "ドメイン、サーバー、有料の外部サービスや各種サービスの契約料・利用料は、制作料金に含まれません。",
      { exact: false },
    ),
  ).toBeVisible();
  await expect(
    page.getByText("法的助言や法的妥当性を保証するものではありません。", { exact: false }),
  ).toBeVisible();
});

test("FAQは初期状態で閉じ、キーボードで開閉できる", async ({ page }) => {
  await page.goto(corporateWebsitePath);

  const faqs = page.locator(".website-faq details");
  await expect(faqs).toHaveCount(11);
  expect(await faqs.evaluateAll((items) => items.every((item) => !item.hasAttribute("open")))).toBe(
    true,
  );

  const revisionFaq = faqs.filter({ hasText: "修正1回とは、どのような意味ですか？" });
  await expect(revisionFaq).toContainText(
    "初稿をご確認いただいた後、修正内容をまとめてご連絡いただき、その内容を一括して反映する1回を指します。",
  );

  const firstSummary = faqs.first().locator("summary");
  await firstSummary.focus();
  await page.keyboard.press("Enter");
  await expect(faqs.first()).toHaveAttribute("open", "");
  await expect(faqs.first().locator("p")).toBeVisible();
});

test("SEO、OGP、パンくず、Service構造化データを設定する", async ({ page }) => {
  const title = "中小企業向けWebサイト制作・15万円／30万円固定｜FALXTER株式会社";
  const description =
    "中小企業向けに、1ページ15万円と最大5ページ30万円の固定料金でコーポレートサイトを制作します。スマートフォン対応、問い合わせフォーム、基本SEO、公開作業まで対応します。";

  await page.goto(corporateWebsitePath);
  await expect(page).toHaveTitle(title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", description);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    description,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/services\/corporate-website\/$/,
  );

  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  const parsedJsonLd = jsonLd.map((entry) => JSON.parse(entry));
  expect(jsonLd.some((entry) => entry.includes('"@type":"BreadcrumbList"'))).toBe(true);

  const serviceJsonLd = parsedJsonLd.find((entry) => entry["@type"] === "Service");
  expect(serviceJsonLd).toBeDefined();
  if (process.env.EXPECTED_SITE_URL) {
    expect(serviceJsonLd.url).toBe(
      new URL(corporateWebsitePath, process.env.EXPECTED_SITE_URL).toString(),
    );
  }
  expect(serviceJsonLd.offers).toEqual([
    {
      "@type": "Offer",
      name: "1ページ会社サイト制作",
      url: new URL("#one-page-plan", serviceJsonLd.url).toString(),
      price: 150000,
      priceCurrency: "JPY",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: 150000,
        priceCurrency: "JPY",
        valueAddedTaxIncluded: false,
      },
      description: "15万円（税別）、1ページ・8セクションまで、制作期間3〜4週間",
    },
    {
      "@type": "Offer",
      name: "最大5ページのコーポレートサイト制作",
      url: new URL("#five-page-plan", serviceJsonLd.url).toString(),
      price: 300000,
      priceCurrency: "JPY",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: 300000,
        priceCurrency: "JPY",
        valueAddedTaxIncluded: false,
      },
      description: "30万円（税別）、最大5ページ、制作期間4〜6週間",
    },
  ]);
});

test("料金プランのアンカーが固定ヘッダーに隠れない", async ({ page }) => {
  for (const id of ["one-page-plan", "five-page-plan"]) {
    await page.goto(`${corporateWebsitePath}#${id}`);
    await page.waitForTimeout(100);

    const header = await page.locator(".site-header").boundingBox();
    const plan = await page.locator(`#${id}`).boundingBox();
    expect(plan?.y ?? 0).toBeGreaterThanOrEqual((header?.height ?? 0) + 8);
    expect(plan?.y ?? Number.POSITIVE_INFINITY).toBeLessThan(700);
  }
});

for (const width of [375, 768, 1024, 1440]) {
  test(`${width}pxで横にはみ出さず、各グリッドが適切に切り替わる`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(corporateWebsitePath);

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);

    const h1Metrics = await page.locator("h1 span").evaluateAll((spans) => ({
      lineCounts: spans.map((span) => {
        const range = document.createRange();
        range.selectNodeContents(span);
        return range.getClientRects().length;
      }),
      visualRows: new Set(spans.map((span) => Math.round(span.getBoundingClientRect().top))).size,
    }));
    expect(h1Metrics.lineCounts.every((lineCount) => lineCount === 1)).toBe(true);
    expect(h1Metrics.visualRows).toBe(width <= 520 ? 2 : 1);

    const columnCount = async (selector: string) =>
      page
        .locator(selector)
        .evaluate(
          (element) => getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length,
        );

    expect(await columnCount(".plan-grid")).toBe(width <= 720 ? 1 : 2);
    expect(await columnCount(".feature-list")).toBe(width <= 720 ? 1 : 3);
    expect(await columnCount(".inclusion-list")).toBe(width <= 520 ? 1 : width <= 900 ? 2 : 4);
    expect(await columnCount(".website-process")).toBe(width <= 520 ? 1 : width <= 900 ? 2 : 3);

    if (width > 720) {
      const priceTops = await page
        .locator(".plan-price")
        .evaluateAll((prices) => prices.map((price) => price.getBoundingClientRect().top));
      expect(Math.abs(priceTops[0] - priceTops[1])).toBeLessThanOrEqual(1);
      const detailTops = await page
        .locator(".plan-card dl")
        .evaluateAll((details) => details.map((detail) => detail.getBoundingClientRect().top));
      expect(Math.abs(detailTops[0] - detailTops[1])).toBeLessThanOrEqual(1);
    }
  });
}
