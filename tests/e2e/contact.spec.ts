import { expect, type Page, test } from "@playwright/test";

const fill = async (page: Page, category = "スポット保守・改修") => {
  await page.getByLabel(/会社名/).fill("テスト株式会社");
  await page.getByLabel(/氏名/).fill("テスト 太郎");
  await page.getByLabel(/メールアドレス/).fill("test@example.com");
  await page.getByLabel(/相談区分/).selectOption(category);
  await page.locator('select[name="timing"]').selectOption("未定");
  await page
    .getByLabel(/ご相談内容/)
    .fill("既存システムについて調査と改修の進め方を相談したいです。");
  await page.getByLabel(/個人情報/).check();
};

test("必須・メール・同意を検証する", async ({ page }) => {
  await page.goto("/contact/");
  await page.getByRole("button", { name: "問い合わせを送信する" }).click();
  expect(
    await page.getByLabel(/会社名・屋号/).evaluate((element) => element.matches(":invalid")),
  ).toBe(false);
  expect(await page.getByLabel(/氏名/).evaluate((element) => element.matches(":invalid"))).toBe(
    true,
  );
  await page.getByLabel(/メールアドレス/).fill("invalid");
  expect(
    await page.getByLabel(/メールアドレス/).evaluate((element) => element.matches(":invalid")),
  ).toBe(true);
  expect(await page.getByLabel(/個人情報/).isChecked()).toBe(false);
});

test("APIエラーを表示する", async ({ page }) => {
  await page.route("**/api/contact/", (route) =>
    route.fulfill({
      status: 422,
      contentType: "application/json",
      body: JSON.stringify({ success: false, message: "入力内容を確認してください。" }),
    }),
  );
  await page.goto("/contact/");
  await fill(page);
  await page.getByRole("button", { name: "問い合わせを送信する" }).click();
  await expect(page.getByRole("status")).toContainText("入力内容");
});

test("成功表示と二重送信防止", async ({ page }) => {
  let calls = 0;
  await page.route("**/api/contact/", async (route) => {
    calls++;
    await new Promise((resolve) => setTimeout(resolve, 200));
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"success":true}' });
  });
  await page.goto("/contact/");
  await fill(page);
  const button = page.locator('button[type="submit"]');
  await button.click();
  await expect(button).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("受け付けました");
  expect(calls).toBe(1);
});

test("相談区分にシステム支援5種とWeb制作3種がある", async ({ page }) => {
  await page.goto("/contact/");
  await expect(page.getByLabel(/相談区分/).locator("option")).toHaveText([
    "選択してください",
    "既存システムの調査・引き継ぎ",
    "スポット保守・改修",
    "継続保守・改修",
    "周辺機能・新規システム開発",
    "どの対応が適切か相談したい",
    "1ページ会社サイト制作（15万円）",
    "最大5ページのコーポレートサイト制作（30万円）",
    "どちらのプランが適切か相談したい",
    "協業・業務委託",
    "その他",
  ]);
  const categoryGroups = page.getByLabel(/相談区分/).locator("optgroup");
  await expect(categoryGroups).toHaveCount(3);
  await expect(categoryGroups.nth(0)).toHaveAttribute("label", "既存システム支援");
  await expect(categoryGroups.nth(1)).toHaveAttribute("label", "Webサイト制作");
  await expect(categoryGroups.nth(2)).toHaveAttribute("label", "その他");
  await expect(page.locator('select[name="timing"]').locator("option")).toHaveText([
    "未定",
    "できるだけ早く",
    "1か月以内",
    "3か月以内",
    "半年以内",
    "それ以降",
  ]);
  await expect(page.getByLabel(/予算帯/)).not.toHaveAttribute("required", "");
  await expect(page.getByLabel(/予算帯/)).toHaveValue("未定");
  await expect(page.getByText(/現在のサイトURL、希望するページ/)).toBeVisible();
});
test("クエリパラメータで相談区分を事前選択する", async ({ page }) => {
  const cases = [
    ["one-page-website", "1ページ会社サイト制作（15万円）"],
    ["five-page-website", "最大5ページのコーポレートサイト制作（30万円）"],
    ["website-consultation", "どちらのプランが適切か相談したい"],
    ["corporate-website", "どちらのプランが適切か相談したい"],
    ["system-assessment", "既存システムの調査・引き継ぎ"],
    ["spot-maintenance", "スポット保守・改修"],
    ["continuous-maintenance", "継続保守・改修"],
    ["new-system-development", "周辺機能・新規システム開発"],
    ["system-maintenance", "どの対応が適切か相談したい"],
    ["system-consultation", "どの対応が適切か相談したい"],
  ];
  for (const [service, category] of cases) {
    await page.goto(`/contact/?service=${service}`);
    await expect(page.getByLabel(/相談区分/)).toHaveValue(category);
  }
});
test("選択したWeb制作プランを送信内容に反映する", async ({ page }) => {
  let submittedCategory = "";
  await page.route("**/api/contact/", async (route) => {
    submittedCategory = route.request().postDataJSON().category;
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"success":true}' });
  });
  await page.goto("/contact/?service=one-page-website");
  await fill(page, "1ページ会社サイト制作（15万円）");
  await page
    .getByLabel(/ご相談内容/)
    .fill("1ページ会社サイト制作について、掲載内容と公開時期を相談したいです。");
  await page.getByRole("button", { name: "問い合わせを送信する" }).click();
  await expect(page.getByRole("status")).toContainText("受け付けました");
  expect(submittedCategory).toBe("1ページ会社サイト制作（15万円）");
});

test("問い合わせフォームを意図した2列配置で表示する", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/contact/");

  const boxes = await page.locator(".form-grid > label").evaluateAll((labels) =>
    labels.map((label) => {
      const rect = label.getBoundingClientRect();
      return { x: rect.x, y: rect.y, width: rect.width };
    }),
  );
  expect(boxes).toHaveLength(7);
  expect(Math.abs(boxes[0].y - boxes[1].y)).toBeLessThan(2);
  expect(Math.abs(boxes[2].y - boxes[3].y)).toBeLessThan(2);
  expect(boxes[4].width).toBeGreaterThan(boxes[0].width * 1.9);
  expect(Math.abs(boxes[5].y - boxes[6].y)).toBeLessThan(2);
});

test("会社名・屋号を空欄にした通常フォーム形式をAPIが受理する", async ({ request }) => {
  const port = process.env.PLAYWRIGHT_PORT || "4321";
  const response = await request.post("/api/contact/", {
    headers: { origin: `http://127.0.0.1:${port}` },
    form: {
      company: "",
      name: "テスト 太郎",
      email: "test@example.com",
      phone: "",
      category: "スポット保守・改修",
      timing: "未定",
      budget: "未定",
      message: "既存システムについて調査と改修の進め方を相談したいです。",
      privacy: "on",
      turnstileToken: "development-token",
      website: "",
    },
  });
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ success: true });
});
test("問い合わせ見出しを短くし、1行で表示する", async ({ page }) => {
  for (const viewport of [
    { width: 375, height: 812 },
    { width: 768, height: 900 },
    { width: 1024, height: 900 },
    { width: 1440, height: 1000 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/contact/");
    const heading = page.locator(".contact-heading");
    await expect(heading).toHaveText("システム・Webのご相談");
    expect(
      await heading.evaluate((element) => {
        const range = document.createRange();
        range.selectNodeContents(element);
        return range.getClientRects().length;
      }),
      `${viewport.width}pxの見出し`,
    ).toBe(1);
    await expect(heading).toHaveCSS("white-space", "nowrap");
    await expect(page.locator(".contact-lead")).toHaveCSS("word-break", "keep-all");
    expect(
      await page.locator("body").evaluate((body) => body.scrollWidth <= body.clientWidth + 1),
      `${viewport.width}pxの横はみ出し`,
    ).toBe(true);
  }
});
