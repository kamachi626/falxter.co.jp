import { expect, test } from "@playwright/test";

const services = [
  { title: "中小企業向けコーポレートサイト制作", path: "/services/corporate-website/" },
  { title: "既存システム診断・引き継ぎ", path: "/services/system-assessment/" },
  { title: "既存システムの保守・改修", path: "/services/system-maintenance/" },
];

test("トップと主要ページを表示できる", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".hero-message")).toHaveText("技術者が直接、最後まで。");
  await expect(page.locator(".site-header").getByText("技術者が直接、最後まで。")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "引き継げない、直せない、仕様が分からない。既存システムの調査から改善まで。",
  );
  for (const path of ["/services/", "/cases/", "/company/", "/contact/", "/privacy/"]) {
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
  }
});

test("トップに2サービスと具体的な条件を表示する", async ({ page }) => {
  await page.goto("/");
  const serviceCards = page.locator("article.service");
  await expect(serviceCards).toHaveCount(2);
  await expect(serviceCards.locator("h3")).toHaveText([
    "既存システムの調査・引き継ぎ・保守・改修",
    "中小企業向けコーポレートサイト制作",
  ]);

  const systemCard = serviceCards.filter({ hasText: "既存システム支援" });
  await expect(
    systemCard.getByText("業務システム、Webアプリケーション、クラウド環境"),
  ).toBeVisible();
  await expect(systemCard.getByText("対応", { exact: true })).toHaveCount(0);
  await expect(systemCard.locator(".price-grid dt")).toHaveText([
    "調査・引き継ぎ",
    "スポット・新規開発",
    "継続保守",
  ]);
  await expect(systemCard.locator(".price-grid dd")).toHaveText([
    "50万円〜（税別）",
    "個別見積もり",
    "月額30万円〜（税別）",
  ]);
  await systemCard.locator("summary").click();
  await expect(systemCard.locator(".system-audience li")).toHaveCount(6);
  await expect(systemCard.getByText("仕様書や設計資料が不足しているシステム")).toBeVisible();
  await expect(systemCard.locator(".method-grid h4")).toHaveText([
    "調査・引き継ぎ",
    "スポット保守・改修",
    "継続保守・改修",
    "周辺機能・新規システム開発",
  ]);
  await expect(systemCard.locator(".method-price")).toHaveText([
    "料金50万円〜（税別）",
    "料金個別見積もり",
    "料金月額30万円〜（税別）",
    "料金個別見積もり",
  ]);
  await expect(systemCard.getByRole("link", { name: /調査・引き継ぎの詳細/ })).toHaveAttribute(
    "href",
    "/services/system-assessment/",
  );
  await expect(
    systemCard.getByRole("link", { name: /保守・改修・新規開発の詳細/ }),
  ).toHaveAttribute("href", "/services/system-maintenance/");

  const webCard = serviceCards.filter({ hasText: "中小企業向けコーポレートサイト制作" });
  await expect(webCard.getByText("対象", { exact: true })).toBeVisible();
  await expect(webCard.getByText("期間", { exact: true })).toBeVisible();
  await expect(webCard.getByText("料金", { exact: true })).toBeVisible();

  for (const service of services) {
    await page.goto(service.path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(service.title);
  }
});
test("対応例3件とFAQを表示する", async ({ page }) => {
  await page.goto("/");
  const cases = page.locator("article.case-card");
  await expect(cases).toHaveCount(3);
  await expect(cases.locator("h3")).toHaveText([
    "業務システムの保守引き継ぎ",
    "既存Webシステムの段階的な機能改修",
    "会員向けWebシステムの改修",
  ]);
  await expect(page.locator(".cases-section")).not.toContainText("Ruby on Rails");
  await expect(cases.locator(".case-hook")).toHaveText([
    "仕様書なしの引き継ぎ",
    "稼働中のWebシステムを段階改修",
    "影響範囲を調査して機能修正",
  ]);
  for (const label of ["課題", "対応内容", "目指す状態"]) {
    await expect(cases.first().getByText(label, { exact: true })).toBeVisible();
  }
  const faqs = page.locator(".faq-list details");
  await expect(faqs).toHaveCount(8);
  const technologyFaq = faqs.filter({ hasText: "どのような技術のシステムに対応できますか？" });
  await technologyFaq.locator("summary").click();
  await expect(technologyFaq.locator("p")).toContainText(
    "主な経験技術は、Java、PHP、Ruby on Rails、JavaScript、TypeScriptなどです。",
  );
  await faqs.first().locator("summary").click();
  await expect(faqs.first().locator("p")).toBeVisible();
});

test("問い合わせCTAを整理している", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator(".hero");
  await expect(hero.getByRole("link", { name: "まずは相談する" })).toHaveAttribute(
    "href",
    "/contact/",
  );
  await expect(hero.getByRole("link", { name: "サービス・料金を見る" })).toHaveAttribute(
    "href",
    "#services",
  );
  await expect(page.getByRole("link", { name: "Webサイト制作を相談する" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "システムについて相談する" })).toHaveCount(0);
});

test("公開中ページの主要ナビゲーションを表示する", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('header img[src^="/images/logo.png"]')).toBeVisible();
  const links = page.locator("nav.desktop a");
  await expect(links).toHaveCount(3);
  await expect(links).toHaveText(["サービス", "会社情報", "お問い合わせ"]);
  await expect(page.locator('header a[href="/cases/"]')).toHaveCount(0);
  await expect(page.locator("footer")).toContainText(
    "既存業務システムの調査・引き継ぎ・保守・改修を主軸に、周辺機能や中小規模の新規開発、コーポレートサイト制作にも対応します。",
  );
});

test("モバイルメニューをキーボードで開閉できる", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const button = page.getByRole("button", { name: "メニュー" });
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(button).toHaveAttribute("aria-expanded", "false");
});

test("404を表示する", async ({ page }) => {
  const response = await page.goto("/not-found/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("ページが見つかりません");
});

test("代表者プロフィールと対応可能な作業を表示する", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "蒲地 章悟" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "対応可能な作業" })).toBeVisible();
  await expect(page.getByText("既存コードとDBを含むシステム調査")).toBeVisible();
});

test("draft事例を公開事例一覧に表示しない", async ({ page }) => {
  await page.goto("/cases/");
  await expect(page.getByText("公開可能な支援事例は、現在準備中です。")).toBeVisible();
  await expect(page.getByText("法人向け管理システムの保守・追加開発")).toHaveCount(0);
});

for (const width of [375, 768, 1024, 1440]) {
  test(`${width}pxで可読性、操作領域、横はみ出しを満たす`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);
    await expect(page.locator("h1")).toHaveCount(1);
    const flowColumns = await page
      .locator(".flow")
      .evaluate(
        (element) => getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length,
      );
    const expectedFlowColumns = width <= 560 ? 1 : width <= 800 ? 2 : width <= 1100 ? 3 : 6;
    expect(flowColumns, `${width}pxの工程列数`).toBe(expectedFlowColumns);
    const heroMessageFontSize = await page
      .locator(".hero-message")
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
    expect(heroMessageFontSize).toBeGreaterThanOrEqual(18);
    expect(heroMessageFontSize).toBeLessThanOrEqual(22);
    for (const selector of [
      ".hero .lead",
      ".issue-groups li",
      ".service-summary",
      ".feature-grid p",
      ".representative-copy p",
      ".faq-list p",
    ]) {
      const fontSize = await page
        .locator(selector)
        .first()
        .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
      expect(fontSize).toBeGreaterThanOrEqual(16);
    }
    const buttonHeight = await page
      .locator(".hero")
      .getByRole("link", { name: "まずは相談する" })
      .evaluate((element) => element.getBoundingClientRect().height);
    expect(buttonHeight).toBeGreaterThanOrEqual(44);
    if (width <= 768) await expect(page.getByRole("button", { name: "メニュー" })).toBeVisible();
  });
}

test("FAQアンカー移動時に固定ヘッダーが見出しへ重ならない", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 800 });
  await page.goto("/#faq");
  await page.waitForTimeout(100);
  const header = await page.locator(".site-header").boundingBox();
  const heading = await page.locator("#faq-heading").boundingBox();
  expect(header?.y).toBe(0);
  expect(heading?.y ?? 0).toBeGreaterThanOrEqual((header?.height ?? 0) + 8);
});

test("ヒーローの改善までを分割せず、モバイルメニュー後もヘッダーを固定する", async ({ page }) => {
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const keepTogetherLines = await page.locator(".keep-together").evaluate((element) => {
      const range = document.createRange();
      range.selectNodeContents(element);
      return range.getClientRects().length;
    });
    expect(keepTogetherLines).toBe(1);
  }
  await page.setViewportSize({ width: 375, height: 812 });
  const menu = page.getByRole("button", { name: "メニュー" });
  await menu.click();
  await page.keyboard.press("Escape");
  await page.locator("#faq").scrollIntoViewIfNeeded();
  const header = await page.locator(".site-header").boundingBox();
  expect(header?.y).toBe(0);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("サービス、代表者、FAQ、CTAの視覚密度を保つ", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator(".service-scope[open]")).toHaveCount(0);
  await expect(page.locator(".service-labels")).toHaveText([
    "01既存システム支援まずはこちら",
    "02Webサイト制作",
  ]);
  await expect(page.locator("article.service.service-secondary")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "相談内容を、そのまま技術判断へ" })).toBeVisible();
  const flowNumberSize = await page
    .locator(".flow b")
    .first()
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
  expect(flowNumberSize).toBeGreaterThanOrEqual(20);
  const representativeColumns = await page
    .locator(".representative-grid > div")
    .evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().width));
  expect(representativeColumns[1] / representativeColumns[0]).toBeGreaterThan(1.8);
  for (const selector of [".cases-section", ".process-section", ".representative-section"]) {
    const paddingTop = await page
      .locator(selector)
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).paddingTop));
    expect(paddingTop, `${selector}の上余白`).toBeLessThanOrEqual(76);
  }
  const capabilityPadding = await page
    .locator(".capability-grid section")
    .first()
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).paddingLeft));
  expect(capabilityPadding).toBeGreaterThanOrEqual(24);
  const faqWidth = await page
    .locator(".faq-container")
    .evaluate((element) => element.getBoundingClientRect().width);
  expect(faqWidth).toBeGreaterThanOrEqual(900);
  await expect(page.locator(".assurances li")).toHaveCount(3);
  const assuranceFontSize = await page
    .locator(".assurances li")
    .first()
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
  expect(assuranceFontSize).toBeGreaterThanOrEqual(16);
});

test("主要セクションのアンカーが全画面幅で固定ヘッダーに重ならない", async ({ page }) => {
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const target of ["services", "process", "faq"]) {
      await page.goto("/");
      await page.goto(`/#${target}`);
      await page.waitForTimeout(100);
      const header = await page.locator(".site-header").boundingBox();
      const headingSelector = target === "faq" ? "#faq-heading" : `#${target} .heading`;
      const heading = await page.locator(headingSelector).boundingBox();
      expect(header?.y).toBe(0);
      expect(heading?.y ?? 0, `${width}px #${target}`).toBeGreaterThanOrEqual(
        (header?.height ?? 0) + 8,
      );
    }
  }
});

test("方針とCTAの見出しを泣き別れさせず、代表者の作業・領域を1列で表示する", async ({ page }) => {
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");

    const approachLineCounts = await page
      .locator(".approach-heading span")
      .evaluateAll((elements) =>
        elements.map((element) => {
          const range = document.createRange();
          range.selectNodeContents(element);
          return range.getClientRects().length;
        }),
      );
    expect(approachLineCounts, `${width}px .approach-heading span`).toEqual([1, 1]);

    const ctaLineCounts = await page.locator(".cta-heading span").evaluateAll((elements) =>
      elements.map((element) => {
        const range = document.createRange();
        range.selectNodeContents(element);
        return range.getClientRects().length;
      }),
    );
    expect(ctaLineCounts, `${width}px .cta-heading span`).toEqual([1, 1, 1]);

    for (const selector of [".supported-work", ".specialties"]) {
      const gridColumns = await page
        .locator(selector)
        .evaluate((element) => getComputedStyle(element).gridTemplateColumns);
      expect(gridColumns.trim().split(/\s+/), `${width}px ${selector}`).toHaveLength(1);

      const overflows = await page
        .locator(`${selector} li`)
        .evaluateAll((elements) =>
          elements.map((element) => element.scrollWidth - element.clientWidth),
        );
      expect(
        overflows.every((overflow) => overflow <= 1),
        `${width}px ${selector} に横はみ出しがない`,
      ).toBe(true);
    }
  }
});
test("Web制作を副次サービス内の2つの固定料金プランとして表示する", async ({ page }) => {
  await page.goto("/");
  const serviceCards = page.locator("article.service");
  const webCard = serviceCards.filter({ hasText: "中小企業向けコーポレートサイト制作" });
  await expect(webCard).toHaveCount(1);
  await expect(webCard).toHaveClass(/service-secondary/);
  await expect(
    webCard.getByText("1ページプラン：15万円（税別）／最大5ページプラン：30万円（税別）"),
  ).toBeVisible();
  await expect(webCard.getByText("1ページ：3〜4週間／最大5ページ：4〜6週間")).toBeVisible();
  await expect(
    webCard.getByText("スマートフォン対応・問い合わせフォーム・基本SEO・公開作業込み"),
  ).toBeVisible();
  await webCard.locator("summary").click();
  await expect(webCard.getByText(/1ページ・8セクションまで/)).toBeVisible();
  await expect(webCard.getByText(/最大5ページ／4〜6週間/)).toBeVisible();

  await page.goto("/services/");
  const webService = page.locator("article.web-service-card");
  await expect(webService).toHaveCount(1);
  await expect(webService.getByText("15万円（税別）／1ページ／3〜4週間")).toBeVisible();
  await expect(webService.getByText("30万円（税別）／最大5ページ／4〜6週間")).toBeVisible();
});
test("Web制作詳細で2プランの条件、SEO、CTAを表示する", async ({ page }) => {
  await page.goto("/services/corporate-website/");
  await expect(page).toHaveTitle("中小企業向けWebサイト制作・15万円／30万円固定｜FALXTER株式会社");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "中小企業向けに、1ページ15万円と最大5ページ30万円の固定料金でコーポレートサイトを制作します。スマートフォン対応、問い合わせフォーム、基本SEO、公開作業まで対応します。",
  );
  const plans = page.locator("article.plan-card");
  await expect(plans).toHaveCount(2);
  await expect(plans.locator("h3")).toHaveText([
    "1ページ会社サイト制作",
    "中小企業向けコーポレートサイト制作",
  ]);
  await expect(plans.first()).toContainText("15万円（税別）");
  await expect(plans.first()).toContainText("8セクションまで");
  await expect(plans.first()).toContainText("3〜4週間");
  await expect(plans.last()).toContainText("30万円（税別）");
  await expect(plans.last()).toContainText("最大5ページ");
  await expect(plans.last()).toContainText("4〜6週間");
  await expect(page.getByRole("heading", { name: "両プランに共通して含まれる内容" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "制作の流れ" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Webサイト制作について相談する" })).toHaveAttribute(
    "href",
    "/contact/?service=website-consultation",
  );
});

test("Web制作のプラン比較は4画面幅で横にはみ出さない", async ({ page }) => {
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/services/corporate-website/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
      `${width}pxの横はみ出し`,
    ).toBeLessThanOrEqual(1);
    const columns = await page
      .locator(".plan-grid")
      .evaluate(
        (element) => getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length,
      );
    expect(columns, `${width}pxのプラン列数`).toBe(width <= 720 ? 1 : 2);
    for (const selector of [".plan-card", ".plan-card dd", ".cta"]) {
      const overflows = await page
        .locator(selector)
        .evaluateAll((elements) =>
          elements.map((element) => element.scrollWidth - element.clientWidth),
        );
      expect(
        overflows.every((overflow) => overflow <= 1),
        `${width}px ${selector}`,
      ).toBe(true);
    }
  }
});

test("Web制作CTAの文字色と背景色のコントラストを保つ", async ({ page }) => {
  await page.goto("/services/corporate-website/");
  const button = page.locator(".cta a.button");
  await expect(button).toHaveText("Webサイト制作について相談する");

  const contrast = await button.evaluate((element) => {
    const parse = (value: string) =>
      value
        .match(/[\d.]+/g)
        ?.slice(0, 3)
        .map(Number) ?? [];
    const luminance = (rgb: number[]) => {
      const channels = rgb.map((value) => {
        const normalized = value / 255;
        return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
    };
    const style = getComputedStyle(element);
    const foreground = luminance(parse(style.color));
    const background = luminance(parse(style.backgroundColor));
    return {
      color: style.color,
      ratio: (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05),
    };
  });
  expect(contrast.color).toBe("rgb(255, 255, 255)");
  expect(contrast.ratio).toBeGreaterThanOrEqual(4.5);

  await button.hover();
  await expect(button).toHaveCSS("color", "rgb(255, 255, 255)");
  await button.focus();
  await expect(button).toBeFocused();
  await expect(button).toHaveCSS("color", "rgb(255, 255, 255)");
});
