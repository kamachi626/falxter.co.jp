import { expect, test } from "@playwright/test";

const showcasePages = [
  { path: "/", before: "#services", after: ".cases-section" },
  {
    path: "/services/corporate-website/",
    before: ".feature-section",
    after: ".inclusion-section",
  },
] as const;

const screenshotLabels = [
  "おもちゃの三景様のPC表示",
  "おもちゃの三景様のスマートフォン表示",
] as const;

const showcaseHighlights = [
  "写真とイラストで伝えるお店の雰囲気",
  "楽しみ方が見つかる情報構成",
  "来店・お問い合わせにつながる導線",
] as const;

for (const showcasePage of showcasePages) {
  test(`${showcasePage.path}で実作例と相談への導線を表示する`, async ({ page }) => {
    await page.goto(showcasePage.path);

    const showcase = page.getByRole("region", { name: "Webサイト制作の作例" });
    await expect(showcase).toHaveCount(1);
    await expect(showcase).toHaveAttribute("id", "website-examples");
    await expect(showcase).toHaveAttribute("aria-labelledby", "website-examples-heading");
    await expect(
      showcase.getByRole("heading", { level: 2, name: "Webサイト制作の作例", exact: true }),
    ).toBeVisible();
    await expect(
      showcase.getByRole("heading", { level: 3, name: "おもちゃの三景 様", exact: true }),
    ).toBeVisible();

    for (const title of showcaseHighlights) {
      await expect(showcase.getByRole("heading", { name: title, exact: true })).toBeVisible();
    }

    const siteLink = showcase.getByRole("link", { name: /^公開サイトを見る/ });
    await expect(siteLink).toHaveAttribute("href", "https://toyshop-sankei.webounds.com/");
    await expect(siteLink).toHaveAttribute("target", "_blank");
    const linkRelations = (await siteLink.getAttribute("rel"))?.split(/\s+/) ?? [];
    expect(linkRelations).toEqual(expect.arrayContaining(["noopener", "noreferrer"]));

    const quality = showcase.getByRole("region", { name: "モバイル・PCともに4項目100点" });
    await expect(quality).toBeVisible();
    await expect(quality.locator("time")).toHaveAttribute("datetime", "2026-11-25");
    for (const report of [
      { label: "モバイルの測定結果", device: "mobile" },
      { label: "PCの測定結果", device: "desktop" },
    ]) {
      const reportLink = quality.getByRole("link", { name: new RegExp(`^${report.label}`) });
      await expect(reportLink).toHaveAttribute(
        "href",
        `https://pagespeed.web.dev/analysis/https-toyshop-sankei-webounds-com/lth2cqjuqlbghhsd8422fp?form_factor=${report.device}`,
      );
      await expect(reportLink).toHaveAttribute("target", "_blank");
      await expect(reportLink).toHaveAttribute("rel", "noopener noreferrer");
    }

    expect(
      await page.evaluate(({ before, after }) => {
        const showcase = document.querySelector("#website-examples");
        const precedingSection = document.querySelector(before);
        const followingSection = document.querySelector(after);
        if (!showcase || !precedingSection || !followingSection) return false;
        return (
          Boolean(
            precedingSection.compareDocumentPosition(showcase) & Node.DOCUMENT_POSITION_FOLLOWING,
          ) &&
          Boolean(
            showcase.compareDocumentPosition(followingSection) & Node.DOCUMENT_POSITION_FOLLOWING,
          )
        );
      }, showcasePage),
    ).toBe(true);

    const consultation = showcase.getByRole("link", {
      name: "Webサイト制作について相談する",
      exact: true,
    });
    await expect(consultation).toHaveAttribute("href", "/contact/?service=website-consultation");
    await consultation.click();
    await expect(page.locator('select[name="category"]')).toHaveValue(
      "どちらのプランが適切か相談したい",
    );
  });

  for (const width of [375, 1440]) {
    test(`${showcasePage.path}の作例画像が${width}pxで読み込まれ横にはみ出さない`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(showcasePage.path);

      const showcase = page.getByRole("region", { name: "Webサイト制作の作例" });
      for (const label of screenshotLabels) {
        const screenshot = showcase.getByRole("img", { name: label, exact: true });
        await screenshot.scrollIntoViewIfNeeded();
        await expect(screenshot).toBeVisible();
        await expect
          .poll(() =>
            screenshot.evaluate((element) => {
              const image = element as HTMLImageElement;
              return image.complete && image.naturalWidth > 0 && image.naturalHeight > 0;
            }),
          )
          .toBe(true);

        const dimensions = await screenshot.evaluate((element) => {
          const image = element as HTMLImageElement;
          const bounds = image.getBoundingClientRect();
          return {
            width: bounds.width,
            height: bounds.height,
            left: bounds.left,
            right: bounds.right,
            intrinsicWidth: Number(image.getAttribute("width")),
            intrinsicHeight: Number(image.getAttribute("height")),
            naturalRatio: image.naturalWidth / image.naturalHeight,
          };
        });
        expect(dimensions.width).toBeGreaterThan(0);
        expect(dimensions.height).toBeGreaterThan(0);
        expect(dimensions.left).toBeGreaterThanOrEqual(-1);
        expect(dimensions.right).toBeLessThanOrEqual(width + 1);
        expect(dimensions.intrinsicWidth).toBeGreaterThan(0);
        expect(dimensions.intrinsicHeight).toBeGreaterThan(0);
        expect(dimensions.intrinsicWidth / dimensions.intrinsicHeight).toBeCloseTo(
          dimensions.naturalRatio,
          2,
        );
      }

      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        ),
      ).toBeLessThanOrEqual(1);
    });
  }

  test(`${showcasePage.path}でJavaScript無効時も作例とリンクを利用できる`, async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
    const page = await context.newPage();
    try {
      await page.goto(showcasePage.path);
      const showcase = page.getByRole("region", { name: "Webサイト制作の作例" });
      await expect(
        showcase.getByRole("heading", { name: "おもちゃの三景 様", exact: true }),
      ).toBeVisible();
      await expect(showcase.getByRole("link", { name: /^公開サイトを見る/ })).toBeVisible();
      await expect(
        showcase.getByRole("link", { name: "Webサイト制作について相談する", exact: true }),
      ).toBeVisible();
    } finally {
      await context.close();
    }
  });
}
