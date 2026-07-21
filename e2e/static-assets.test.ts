import { INVOICE_PDF_FONTS, STATIC_ASSETS_URL } from "@/config";
import { expect, test } from "@playwright/test";

test.describe("Static assets (fonts, images, videos) should be accessible", () => {
  test("should load static assets successfully", async ({ page }) => {
    /**
     * Test PDF fonts
     */
    for (const [, fonts] of Object.entries(INVOICE_PDF_FONTS)) {
      for (const [, fontUrl] of Object.entries(fonts)) {
        const fontResponse = await page.request.get(fontUrl);

        expect(fontResponse.status()).toBe(200);
        expect(fontResponse.headers()["content-type"]).toContain("font/ttf");
      }
    }
  });

  test("no CDN assets fail on app page", async ({ page }) => {
    const failed: string[] = [];

    // register a response listener to check for failed assets
    page.on("response", (res) => {
      if (res.url().startsWith(STATIC_ASSETS_URL) && !res.ok()) {
        failed.push(`${res.status()} ${res.url()}`);
      }
    });

    await page.goto("/");
    await expect(page).toHaveURL("/?template=default");

    expect(failed).toEqual([]);
  });
});
