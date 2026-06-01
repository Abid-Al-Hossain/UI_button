import { test, expect } from "@playwright/test";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const targetUrl = process.env.BUTTON_SMOKE_URL || "http://127.0.0.1:3015";

test("button studio code, copy, download, preset, and reset parity", async ({ page }) => {
  const downloadPath = join(tmpdir(), `ui-button-export-${Date.now()}.jsx`);

  await page.goto(targetUrl, { waitUntil: "networkidle" });
  await expect(page.getByTestId("preview-download-panel")).toBeVisible();
  await expect(page.getByTestId("preview-stage")).toBeVisible();

  await page.getByTestId("preview-download-panel").getByRole("button", { name: "Code" }).click();
  await expect(page.getByTestId("code-panel")).toBeVisible();

  const visibleCode = await page.getByTestId("code-raw-value").inputValue();
  expect(visibleCode).toContain("export default function");
  expect(visibleCode).toContain("<button");

  await page.getByTestId("copy-code-button").click();
  await page.waitForTimeout(250);
  const copiedCode = await page.evaluate(() => navigator.clipboard.readText());
  expect(copiedCode).toBe(visibleCode);

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export React component" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/\.jsx$/);
  await download.saveAs(downloadPath);
  const downloadedCode = readFileSync(downloadPath, "utf8");
  expect(downloadedCode).toBe(visibleCode);
  if (existsSync(downloadPath)) rmSync(downloadPath);

  await page.getByTestId("preview-download-panel").getByRole("button", { name: "Design" }).click();
  const firstApply = page.locator('[data-audit="preset-apply-button"]').first();
  await expect(firstApply).toBeVisible();
  await firstApply.click();
  await expect(page.getByTestId("preview-stage-preview")).toBeVisible();

  await page.getByTestId("preview-download-panel").getByRole("button", { name: "Code" }).click();
  const presetCode = await page.getByTestId("code-raw-value").inputValue();
  expect(presetCode).toContain("export default function");
  expect(presetCode).toContain("<button");

  await page.getByRole("button", { name: "Reset to default" }).click();
  await page.getByTestId("preview-download-panel").getByRole("button", { name: "Design" }).click();
  await expect(page.getByTestId("preview-stage-preview")).toBeVisible();

  await page.getByTestId("preview-download-panel").getByRole("button", { name: "Code" }).click();
  const resetCode = await page.getByTestId("code-raw-value").inputValue();
  expect(resetCode).toContain("export default function");
  expect(resetCode).toContain("<button");
});
