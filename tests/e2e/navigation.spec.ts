import { expect, test } from "@playwright/test";

const services = [
  { title: "中小企業向けコーポレートサイト制作", path: "/services/corporate-website/" },
  { title: "既存システム支援", path: "/services/system-support/" },
];

test("トップと主要ページを表示できる", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".hero-message")).toHaveText("技術者が直接、最後まで。");
  await expect(page.locator(".site-header").getByText("技術者が直接、最後まで。")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "引き継げない、直せない、仕様が分からない。既存システムの調査から改善まで。",
  );
  for (const path of ["/services/", "/company/", "/contact/", "/privacy/"]) {
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
  const assessmentPackage = systemCard.locator(".assessment-package");
  await expect(assessmentPackage.getByRole("heading", { name: "調査・引き継ぎ" })).toBeVisible();
  await expect(assessmentPackage.getByText("50万円〜（税別）")).toBeVisible();
  await expect(assessmentPackage.getByText("標準 2〜4週間程度")).toBeVisible();
  await expect(assessmentPackage.locator("li")).toHaveText([
    "調査報告書",
    "システム構成の整理",
    "リスク一覧",
    "改善ロードマップ",
  ]);
  await expect(systemCard.locator(".price-grid dt")).toHaveText(["スポット・新規開発", "継続保守"]);
  await expect(systemCard.locator(".price-grid dd")).toHaveText([
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
    "/services/system-support/#assessment",
  );
  await expect(
    systemCard.getByRole("link", { name: /保守・改修・新規開発の詳細/ }),
  ).toHaveAttribute("href", "/services/system-support/#spot-maintenance");

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
  await expect(page.getByRole("heading", { name: "想定対応例" })).toBeVisible();
  await expect(page.locator(".cases-section .section-intro")).toContainText(
    "公開済みの実績ではなく",
  );
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
  for (const label of ["課題", "対応内容", "対応後の状態（想定）"]) {
    await expect(cases.first().getByText(label, { exact: true })).toBeVisible();
  }
  const faqs = page.locator(".faq-list details");
  await expect(faqs).toHaveCount(8);
  const technologyFaq = faqs.filter({ hasText: "どのような技術のシステムに対応できますか？" });
  await technologyFaq.locator("summary").click();
  await expect(technologyFaq.locator("p")).toHaveText(
    "主な経験技術は、Java、PHP、Ruby on Rails、JavaScript、TypeScriptなどです。記載のない技術についても、バージョン、依存ライブラリ、実行環境を確認した上で対応可否をご案内します。",
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
  await expect(links).toHaveCount(5);
  await expect(links).toHaveText([
    "サービス",
    "既存システム支援",
    "コーポレートサイト制作",
    "会社情報",
    "お問い合わせ",
  ]);
  await expect(page.locator('header a[href="/cases/"]')).toHaveCount(0);
  await expect(page.locator("footer .footer-grid b")).toHaveText("FALXTER株式会社");
  await expect(page.locator("footer .legal")).toHaveText("© 2026 FALXTER K.K.");
  await expect(page.locator("footer")).toContainText(
    "既存業務システムの調査・引き継ぎ・保守・改修を主軸に、周辺機能や中小規模の新規開発、コーポレートサイト制作にも対応します。",
  );
});

test("モバイルメニューをキーボードで開閉できる", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const button = page.getByRole("button", { name: "メニュー", exact: true });
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
  await expect(page.locator(".representative-role span")).toHaveText([
    "代表取締役",
    "ソフトウェアエンジニア",
  ]);
  await expect(page.getByRole("heading", { name: "対応可能な作業" })).toBeVisible();
  await expect(page.getByText("既存コードとDBを含むシステム調査")).toBeVisible();
  const technologyCard = page.locator(".technology-card");
  await expect(technologyCard.getByRole("heading", { name: "主な経験技術" })).toBeVisible();
  await expect(technologyCard.locator("dt")).toHaveText([
    "言語・フレームワーク",
    "データベース",
    "インフラ・運用",
  ]);
  await expect(technologyCard.locator("dd")).toHaveText([
    "Java / PHP（Laravel） / Ruby on Rails / TypeScript / JavaScript",
    "MySQL / PostgreSQL",
    "AWS / Linux / Docker",
  ]);
  await expect(technologyCard.locator(".technology-note")).toHaveText(
    "上記は主な経験技術です。記載のない技術についても、システム構成、バージョン、依存ライブラリ、実行環境を確認した上で対応可否をご案内します。",
  );
  await expect(page.getByText("主な使用技術", { exact: true })).toHaveCount(0);
});

test("支援事例ページを公開しない", async ({ page }) => {
  for (const path of ["/cases/", "/cases/example/"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("ページが見つかりません");
  }
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
    if (width <= 768)
      await expect(page.getByRole("button", { name: "メニュー", exact: true })).toBeVisible();
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
  const menu = page.getByRole("button", { name: "メニュー", exact: true });
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
  await expect(
    page.getByRole("heading", { name: "営業担当を介さず、代表エンジニアが直接確認" }),
  ).toBeVisible();
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
    expect(ctaLineCounts, `${width}px .cta-heading span`).toEqual([1, 1]);

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
  await expect(webService.locator(".website-plan")).toHaveCount(2);
  await expect(webService.locator(".website-plan-facts dd")).toHaveText([
    "15万円（税別）",
    "1ページ・8セクションまで",
    "3〜4週間",
    "30万円（税別）",
    "最大5ページ",
    "4〜6週間",
  ]);
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
    "最大5ページのコーポレートサイト制作",
  ]);
  await expect(plans.first()).toContainText("15万円（税別）");
  await expect(plans.first()).toContainText("8セクションまで");
  await expect(plans.first()).toContainText("3〜4週間");
  await expect(plans.last()).toContainText("30万円（税別）");
  await expect(plans.last()).toContainText("最大5ページ");
  await expect(plans.last()).toContainText("4〜6週間");
  await expect(page.getByRole("heading", { name: "両プランに共通して含まれる内容" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "制作の流れ" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Webサイト制作について相談する" }).first(),
  ).toHaveAttribute("href", "/contact/?service=website-consultation");
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
    for (const selector of [".plan-card", ".plan-card dd", ".website-cta"]) {
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
  const button = page.locator(".website-cta a.button");
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
test("既存システム支援フローをHTMLの読み順とレスポンシブ表示で保つ", async ({ page }) => {
  await page.goto("/");

  const servicesSection = page.locator("#services");
  const supportFlow = servicesSection.locator("figure.system-support-flow");
  await expect(supportFlow).toHaveCount(1);
  await expect(
    supportFlow.getByRole("heading", { level: 3, name: "既存システム支援の進め方" }),
  ).toBeVisible();
  await expect(supportFlow.locator("ol.flow-steps > li h4")).toHaveText([
    "事前確認",
    "現状調査",
    "報告・方針決定",
  ]);
  await expect(supportFlow.locator("ol.flow-steps > li > p")).toHaveText([
    "現在の課題と管理状況を確認します。",
    "コード、DB、実行環境を調査します。",
    "リスクと対応の優先順位を明確にします。",
  ]);
  await expect(supportFlow.locator("ul.flow-options-list > li h4")).toHaveText([
    "スポット保守・改修",
    "継続保守・改修",
    "周辺機能・新規開発",
  ]);
  await expect(supportFlow.locator("ul.flow-options-list > li > p")).toHaveText([
    "不具合修正・機能追加",
    "継続改修・運用支援",
    "管理画面・APIなどの新規開発",
  ]);
  await expect(supportFlow.getByText("その後の対応", { exact: true })).toBeVisible();
  expect(
    await servicesSection.evaluate((section) => {
      const flow = section.querySelector(".system-support-flow");
      const cards = section.querySelector(".service-grid");
      return Boolean(
        flow && cards && flow.compareDocumentPosition(cards) & Node.DOCUMENT_POSITION_FOLLOWING,
      );
    }),
  ).toBe(true);

  const systemCard = servicesSection.locator("article.system-service");
  const webCard = servicesSection.locator("article.web-service");
  await expect(systemCard.locator(".included-summary")).toHaveCount(0);
  await expect(webCard.locator(".included-summary")).toHaveText(
    "スマートフォン対応・問い合わせフォーム・基本SEO・公開作業込み",
  );
  await systemCard.locator("summary").click();
  await expect(systemCard.locator(".method-grid")).toBeVisible();

  for (const viewport of [
    { width: 375, height: 812 },
    { width: 1440, height: 1000 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const responsiveFlow = page.locator(".system-support-flow");
    expect(
      await responsiveFlow.evaluate((element) => element.scrollWidth <= element.clientWidth + 1),
    ).toBe(true);
    expect(
      await page
        .locator("body")
        .evaluate((element) => element.scrollWidth <= element.clientWidth + 1),
    ).toBe(true);

    const stepBoxes = await responsiveFlow.locator(".flow-step").evaluateAll((items) =>
      items.map((item) => {
        const rect = item.getBoundingClientRect();
        return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
      }),
    );
    const optionBoxes = await responsiveFlow
      .locator(".flow-options-list > li")
      .evaluateAll((items) =>
        items.map((item) => {
          const rect = item.getBoundingClientRect();
          return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
        }),
      );

    if (viewport.width === 1440) {
      expect(
        Math.max(...stepBoxes.map((box) => box.y)) - Math.min(...stepBoxes.map((box) => box.y)),
      ).toBeLessThan(2);
      expect(
        Math.max(...optionBoxes.map((box) => box.y)) - Math.min(...optionBoxes.map((box) => box.y)),
      ).toBeLessThan(2);
      expect(Math.min(...optionBoxes.map((box) => box.y))).toBeGreaterThan(
        Math.max(...stepBoxes.map((box) => box.y)),
      );
      const flowHeight = await responsiveFlow.evaluate(
        (element) => element.getBoundingClientRect().height,
      );
      expect(flowHeight).toBeGreaterThanOrEqual(250);
      expect(flowHeight).toBeLessThanOrEqual(340);
      const connectors = await responsiveFlow.evaluate((element) => {
        const arrow = element.querySelector(".flow-step");
        const branch = element.querySelector(".flow-options");
        if (!arrow || !branch) throw new Error("Flow connectors are missing");
        return {
          arrowWidth: Number.parseFloat(getComputedStyle(arrow, "::after").width),
          branchWidth: getComputedStyle(branch, "::before").borderLeftWidth,
        };
      });
      expect(connectors.arrowWidth).toBeGreaterThan(0);
      expect(connectors.branchWidth).toBe("2px");
    } else {
      expect(stepBoxes[1].y).toBeGreaterThan(stepBoxes[0].y);
      expect(stepBoxes[2].y).toBeGreaterThan(stepBoxes[1].y);
      expect(optionBoxes[0].y).toBeGreaterThan(stepBoxes[2].y);
      expect(optionBoxes[1].y).toBeGreaterThan(optionBoxes[0].y);
      expect(optionBoxes[2].y).toBeGreaterThan(optionBoxes[1].y);
    }
  }
});
test("サービス小メニューをPCとモバイルで操作できる", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const desktopMenu = page.locator(".desktop-service-nav");
  const desktopTrigger = desktopMenu.locator(".service-trigger");
  const desktopSubmenu = desktopMenu.locator(".service-submenu");
  await expect(desktopTrigger).toHaveAttribute("href", "/services/");
  await expect(desktopSubmenu).toHaveCSS("visibility", "hidden");

  await desktopMenu.hover();
  await expect(desktopSubmenu).toHaveCSS("visibility", "visible");
  await expect(desktopSubmenu).toHaveCSS("opacity", "1");
  await expect(desktopSubmenu.locator("a")).toHaveText([
    "既存システム支援",
    "コーポレートサイト制作",
  ]);
  const submenuLayout = await desktopSubmenu.evaluate((menu) => {
    const rect = menu.getBoundingClientRect();
    const firstLink = menu.querySelector("a");
    return {
      display: getComputedStyle(menu).display,
      position: getComputedStyle(menu).position,
      height: rect.height,
      withinViewport: rect.left >= 0 && rect.right <= window.innerWidth,
      linkDisplay: firstLink ? getComputedStyle(firstLink).display : "",
      linkMinHeight: firstLink ? Number.parseFloat(getComputedStyle(firstLink).minHeight) : 0,
    };
  });
  expect(submenuLayout).toMatchObject({
    display: "grid",
    position: "absolute",
    withinViewport: true,
    linkDisplay: "flex",
    linkMinHeight: 46,
  });
  expect(submenuLayout.height).toBeGreaterThanOrEqual(92);
  expect(
    await desktopSubmenu
      .locator("a")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href"))),
  ).toEqual(["/services/system-support/", "/services/corporate-website/"]);

  await page.mouse.move(0, 0);
  await expect(desktopSubmenu).toHaveCSS("visibility", "hidden");
  await desktopTrigger.focus();
  await expect(desktopSubmenu).toHaveCSS("visibility", "visible");
  await page.keyboard.press("Escape");
  await expect(desktopTrigger).toBeFocused();
  await expect(desktopSubmenu).toHaveCSS("visibility", "hidden");

  await page.goto("/services/system-support/");
  await expect(page.locator(".desktop-service-nav")).toHaveClass(/active/);
  await expect(page.locator('.service-submenu a[aria-current="page"]')).toHaveText(
    "既存システム支援",
  );

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.locator("#faq").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  expect((await page.locator(".site-header").boundingBox())?.y).toBe(0);
  const menuButton = page.getByRole("button", { name: "メニュー", exact: true });
  const scrollBeforeOpen = await page.evaluate(() => window.scrollY);
  const menuButtonBox = await menuButton.boundingBox();
  if (!menuButtonBox) throw new Error("メニューボタンが表示されていません");
  await page.mouse.click(
    menuButtonBox.x + menuButtonBox.width / 2,
    menuButtonBox.y + menuButtonBox.height / 2,
  );
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollBeforeOpen);
  const mobilePanel = page.locator("#mobile-menu");
  const mobileBackdrop = page.locator(".mobile-menu-backdrop");
  const mobileServiceMenu = page.locator(".mobile-service-nav");
  await expect(menuButton).toBeFocused();
  await expect(mobilePanel).toHaveCSS("position", "fixed");
  await expect(mobilePanel).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(mobileBackdrop).toBeVisible();
  const headerBox = await page.locator(".site-header").boundingBox();
  const panelBox = await mobilePanel.boundingBox();
  expect(Math.abs((panelBox?.y ?? 0) - (headerBox?.height ?? 0) - 12)).toBeLessThanOrEqual(1);
  expect(panelBox?.x).toBe(16);
  expect(panelBox?.width).toBe(343);
  expect(panelBox?.height ?? 999).toBeLessThan(260);
  await mobileServiceMenu.locator("summary").click();
  await expect(mobileServiceMenu).toHaveAttribute("open", "");
  await expect(mobileServiceMenu.locator(".mobile-service-submenu a")).toHaveText([
    "サービス一覧",
    "既存システム支援",
    "コーポレートサイト制作",
  ]);
  expect(
    await mobileServiceMenu
      .locator(".mobile-service-submenu a")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href"))),
  ).toEqual(["/services/", "/services/system-support/", "/services/corporate-website/"]);
  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(mobileServiceMenu).not.toHaveAttribute("open", "");
});
test("スクロール後もモバイルメニューをコンパクトに固定表示する", async ({ page }) => {
  for (const viewport of [
    { width: 375, height: 812 },
    { width: 550, height: 900 },
    { width: 768, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.locator("#faq").scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    expect(
      await page.evaluate(() => window.scrollY),
      `${viewport.width}pxのスクロール位置`,
    ).toBeGreaterThan(0);

    const header = page.locator(".site-header");
    const panel = page.locator("#mobile-menu");
    const backdrop = page.locator(".mobile-menu-backdrop");
    const menuButton = page.getByRole("button", { name: "メニュー", exact: true });
    const scrollBeforeOpen = await page.evaluate(() => window.scrollY);
    const menuButtonBox = await menuButton.boundingBox();
    if (!menuButtonBox) throw new Error("メニューボタンが表示されていません");
    await page.mouse.click(
      menuButtonBox.x + menuButtonBox.width / 2,
      menuButtonBox.y + menuButtonBox.height / 2,
    );
    expect(await page.evaluate(() => window.scrollY)).toBe(scrollBeforeOpen);

    await expect(panel).toBeVisible();
    await expect(backdrop).toBeVisible();
    await expect(panel).toHaveCSS("position", "fixed");
    await expect(panel).toHaveCSS("background-color", "rgb(255, 255, 255)");
    const headerBox = await header.boundingBox();
    const panelBox = await panel.boundingBox();
    expect(headerBox?.y, `${viewport.width}pxでヘッダーを固定`).toBe(0);
    const expectedWidth = Math.min(352, viewport.width - 32);
    expect(
      Math.abs((panelBox?.x ?? 0) + (panelBox?.width ?? 0) - (viewport.width - 16)),
      `${viewport.width}pxの右端`,
    ).toBeLessThanOrEqual(1);
    expect(
      Math.abs((panelBox?.y ?? 999) - (headerBox?.height ?? 0) - 12),
      `${viewport.width}pxの上端`,
    ).toBeLessThanOrEqual(1);
    expect(
      Math.abs((panelBox?.width ?? 0) - expectedWidth),
      `${viewport.width}pxの横幅`,
    ).toBeLessThanOrEqual(1);
    expect((panelBox?.height ?? viewport.height) < viewport.height / 2).toBe(true);
    expect(
      await page.evaluate(() =>
        document
          .elementFromPoint(8, window.innerHeight / 2)
          ?.classList.contains("mobile-menu-backdrop"),
      ),
      `${viewport.width}pxで背面を覆う`,
    ).toBe(true);

    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(backdrop).toBeHidden();
  }
});

test("トップページのモーションを一度だけ実行し、軽減設定では無効化する", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await expect(page.locator("html")).toHaveClass(/motion-ready/);
  await expect(page.locator(".hero-message")).toHaveCSS("opacity", "1");

  const flow = page.locator(".system-support-flow[data-reveal='flow']");
  await flow.scrollIntoViewIfNeeded();
  await expect(flow).toHaveClass(/is-revealed/);
  await expect
    .poll(
      () =>
        flow.evaluate((element) => {
          const firstStep = element.querySelector(".flow-step");
          const branch = element.querySelector(".flow-options");
          const options = [...element.querySelectorAll(".flow-options-list > li")];
          if (!firstStep || !branch) throw new Error("フロー図の要素が見つかりません");
          return (
            Number.parseFloat(getComputedStyle(firstStep, "::after").opacity) >= 0.95 &&
            Number.parseFloat(getComputedStyle(branch, "::before").opacity) >= 0.95 &&
            options.every((option) => Number.parseFloat(getComputedStyle(option).opacity) >= 0.95)
          );
        }),
      { timeout: 1500 },
    )
    .toBe(true);

  await page.locator(".hero").scrollIntoViewIfNeeded();
  await flow.scrollIntoViewIfNeeded();
  await expect(flow).toHaveClass(/is-revealed/);

  const detailLinkArrow = page.locator(".service-links a").first().locator("span");
  await detailLinkArrow.locator("..").hover();
  await expect(detailLinkArrow).toHaveCSS("transform", "matrix(1, 0, 0, 1, 3, 0)");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.locator("html")).not.toHaveClass(/motion-ready/);
  const reducedTarget = page.locator("[data-reveal]").first();
  await expect(reducedTarget).toHaveCSS("opacity", "1");
  await expect(reducedTarget).toHaveCSS("transform", "none");
});

test("サービス一覧を主従のある2領域として表示する", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/services/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "既存システム支援とコーポレートサイト制作",
  );
  await expect(page.getByRole("heading", { level: 2 })).toHaveText([
    "既存システム支援",
    "コーポレートサイト制作",
    "どのサービスが適切か分からない場合も、ご相談ください。",
  ]);
  await expect(page.locator(".service-card h3")).toHaveText([
    "既存システムの調査・引き継ぎ",
    "既存システムの保守・改修",
    "中小企業向けコーポレートサイト制作",
  ]);
  await expect(page.locator("main")).not.toContainText("診断");

  await expect(page.locator("#system-support")).toHaveCount(1);

  const systemCards = page.locator(".system-service-grid > .service-card");
  const webCard = page.locator(".web-domain > .web-service-card");
  await expect(systemCards).toHaveCount(2);
  await expect(webCard).toHaveCount(1);
  await expect(page.locator(".system-service-grid .web-service-card")).toHaveCount(0);

  await expect(
    systemCards.nth(0).getByText("担当者不在、資料不足、構成や仕様が分からないシステム"),
  ).toBeVisible();
  await expect(systemCards.nth(0).locator(".price-list dd")).toHaveText("50万円〜（税別）");
  await expect(systemCards.nth(1).getByText("周辺機能・新規システム開発にも対応")).toBeVisible();
  await expect(systemCards.nth(1).locator(".price-list dd")).toHaveText([
    "個別見積もり",
    "月額30万円〜（税別）",
    "個別見積もり",
  ]);
  await expect(webCard.getByText("新しく会社サイトを用意したい中小企業・個人事業者")).toBeVisible();
  const websitePlanPanels = webCard.locator(".website-plan");
  await expect(websitePlanPanels).toHaveCount(2);
  await expect(websitePlanPanels.locator("h4")).toHaveText([
    "1ページ会社サイト制作",
    "最大5ページのコーポレートサイト制作",
  ]);
  await expect(websitePlanPanels.locator(".website-plan-description")).toHaveText([
    "会社概要、サービス、代表者情報、問い合わせなどを1ページにまとめたい事業者向け",
    "会社情報やサービス内容をページごとに分け、一般的な会社サイトとして整備したい事業者向け",
  ]);
  await expect(websitePlanPanels.locator(".website-plan-facts dd")).toHaveText([
    "15万円（税別）",
    "1ページ・8セクションまで",
    "3〜4週間",
    "30万円（税別）",
    "最大5ページ",
    "4〜6週間",
  ]);
  await expect(webCard.locator(".website-plan.service-card")).toHaveCount(0);
  await expect(webCard.getByRole("link", { name: "詳しく見る" })).toHaveCount(1);

  const cards = page.locator(".service-card");
  await expect(cards.nth(0).getByRole("link", { name: "詳しく見る" })).toHaveAttribute(
    "href",
    "/services/system-support/#assessment",
  );
  await expect(cards.nth(1).getByRole("link", { name: "詳しく見る" })).toHaveAttribute(
    "href",
    "/services/system-support/#spot-maintenance",
  );
  await expect(cards.nth(2).getByRole("link", { name: "詳しく見る" })).toHaveAttribute(
    "href",
    "/services/corporate-website/",
  );

  const systemBoxes = await systemCards.evaluateAll((items) =>
    items.map((item) => {
      const rect = item.getBoundingClientRect();
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
    }),
  );
  expect(Math.abs(systemBoxes[0].y - systemBoxes[1].y)).toBeLessThan(2);
  expect(systemBoxes[1].x).toBeGreaterThan(systemBoxes[0].x);
  expect(systemBoxes[0].width).toBeLessThan(systemBoxes[1].width);
  expect(systemBoxes[0].height).toBeLessThan(systemBoxes[1].height);
  const systemGridBox = await page.locator(".system-service-grid").boundingBox();
  const webCardBox = await webCard.boundingBox();
  expect(Math.abs((systemGridBox?.width ?? 0) - (webCardBox?.width ?? 0))).toBeLessThan(2);
  const websitePlanBoxes = await websitePlanPanels.evaluateAll((items) =>
    items.map((item) => {
      const rect = item.getBoundingClientRect();
      return { x: rect.x, y: rect.y, height: rect.height };
    }),
  );
  expect(Math.abs(websitePlanBoxes[0].y - websitePlanBoxes[1].y)).toBeLessThan(2);
  expect(websitePlanBoxes[1].x).toBeGreaterThan(websitePlanBoxes[0].x);
  expect(Math.abs(websitePlanBoxes[0].height - websitePlanBoxes[1].height)).toBeLessThan(2);

  await expect(page.getByRole("link", { name: "サービスについて相談する" })).toHaveAttribute(
    "href",
    "/contact/",
  );

  for (const viewport of [
    { width: 375, height: 812 },
    { width: 768, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/services/");
    const responsiveCards = await page
      .locator(".service-card")
      .evaluateAll((items) => items.map((item) => item.getBoundingClientRect().y));
    expect(responsiveCards[1]).toBeGreaterThan(responsiveCards[0]);
    expect(responsiveCards[2]).toBeGreaterThan(responsiveCards[1]);
    if (viewport.width <= 650) {
      const responsivePlans = await page
        .locator(".website-plan")
        .evaluateAll((items) => items.map((item) => item.getBoundingClientRect().y));
      expect(responsivePlans[1]).toBeGreaterThan(responsivePlans[0]);
    }
    expect(
      await page.locator("body").evaluate((body) => body.scrollWidth <= body.clientWidth + 1),
      `${viewport.width}pxの横はみ出し`,
    ).toBe(true);
  }
});
