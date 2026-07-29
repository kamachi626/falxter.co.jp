import { expect, type Page, test } from "@playwright/test";

const fill = async (page: Page, category = "スポット保守・改修") => {
  await page.getByLabel(/会社名/).fill("テスト株式会社");
  await page.getByLabel(/氏名/).fill("テスト 太郎");
  await page.getByLabel(/メールアドレス/).fill("test@example.com");
  await page.getByLabel(/相談区分/).selectOption(category);
  await page.getByLabel(/希望時期/).fill("未定");
  await page
    .getByLabel(/現在の課題/)
    .fill("既存システムについて調査と改修の進め方を相談したいです。");
  await page.getByLabel(/個人情報/).check();
};

test("必須・メール・同意を検証する", async ({ page }) => {
  await page.goto("/contact/");
  await page.getByRole("button", { name: "問い合わせを送信する" }).click();
  expect(await page.getByLabel(/会社名/).evaluate((element) => element.matches(":invalid"))).toBe(
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
  await expect(page.getByText(/現在のサイトURL、希望するページや公開時期/)).toBeVisible();
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
    .getByLabel(/現在の課題/)
    .fill("1ページ会社サイト制作について、掲載内容と公開時期を相談したいです。");
  await page.getByRole("button", { name: "問い合わせを送信する" }).click();
  await expect(page.getByRole("status")).toContainText("受け付けました");
  expect(submittedCategory).toBe("1ページ会社サイト制作（15万円）");
});
