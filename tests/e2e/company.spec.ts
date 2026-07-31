import { expect, test } from "@playwright/test";

const companyPath = "/company/";

test("会社概要と代表者情報を現在の事業内容で表示する", async ({ page }) => {
  await page.goto(companyPath);

  await expect(page.locator("h1")).toHaveText("会社情報");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "会社概要", level: 2 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "代表者紹介", level: 2 })).toBeVisible();
  await expect(page.getByText("技術者が直接、ご相談から実施まで対応します。")).toBeVisible();
  await expect(page.getByRole("heading", { name: "蒲地 章悟", level: 3 })).toBeVisible();
  await expect(page.locator(".representative-role span")).toHaveText([
    "代表取締役／",
    "ソフトウェアエンジニア",
  ]);
  await expect(page.locator(".representative-role span").first()).toHaveCSS(
    "white-space",
    "nowrap",
  );
  await expect(page.getByRole("heading", { name: "得意分野", level: 3 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "対応工程", level: 3 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "主な経験技術", level: 3 })).toBeVisible();
  await expect(page.getByText("関連経験", { exact: true })).toHaveCount(0);

  await expect(
    page.getByText("Java / Ruby on Rails / PHP（Laravel） / TypeScript / JavaScript"),
  ).toBeVisible();
  await expect(page.getByText("MySQL / PostgreSQL")).toBeVisible();
  await expect(page.getByText("AWS / Linux / Docker")).toBeVisible();
  await expect(
    page.locator(".representative-card, .representative-name, .profile-block, .profile-grid"),
  ).toHaveCount(0);

  const cta = page.locator(".company-cta");
  await expect(
    cta.getByRole("heading", { name: "会社やサービスについて、ご相談ください。" }),
  ).toBeVisible();
  await expect(cta.getByRole("link", { name: "相談内容を送る" })).toHaveAttribute(
    "href",
    "/contact/",
  );
});

for (const width of [375, 768, 1024, 1440]) {
  test(`${width}pxで会社情報の列数とCTA配置を保つ`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(companyPath);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);

    const columnCount = (selector: string) =>
      page
        .locator(selector)
        .evaluate(
          (element) => getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length,
        );

    expect(await columnCount(".information-layout")).toBe(width <= 900 ? 1 : 2);
    expect(await columnCount(".representative-profile")).toBe(width <= 900 ? 1 : 2);
    expect(await columnCount(".expertise-grid")).toBe(width <= 720 ? 1 : 2);
    expect(await columnCount(".technology-list")).toBe(width <= 900 ? 1 : 3);

    await expect(page.locator(".representative-profile")).toHaveCSS("display", "grid");
    await expect(page.locator(".company-lead")).toHaveCSS("text-wrap", "balance");
    await expect(page.locator(".representative-role span").last()).toHaveCSS(
      "white-space",
      "nowrap",
    );
    await expect(page.locator(".company-cta")).toHaveCSS("text-align", "center");
    await expect(page.locator(".company-cta .button")).toBeVisible();
  });
}
