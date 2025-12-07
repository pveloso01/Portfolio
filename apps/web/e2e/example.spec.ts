import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Pedro Veloso/i);
  });

  test("should have proper SEO meta tags", async ({ page }) => {
    await page.goto("/");

    // Check for essential meta tags
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveCount(1);

    // Check for Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveCount(1);
  });

  test("should be accessible", async ({ page }) => {
    await page.goto("/");

    // Basic accessibility checks
    const main = page.locator("main");
    await expect(main).toBeVisible();
  });
});
