/**
 * Verify 5-mode rotation in the Playbook section.
 * Clicks Support tab and screenshots; checks no console errors.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

await page.goto(BASE, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1500);

const skip = page.locator("#boot-overlay >> text=Skip");
if (await skip.count()) await skip.click();
await page.waitForTimeout(1200);

const system = page.locator("#system");
await system.scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);

// Click "Support" tab (4th of 5) and let the rotation settle
await page.locator('#system [role="tab"]', { hasText: "Support" }).click();
await page.waitForTimeout(800);

await system.screenshot({ path: "scripts/verify-rotation.png" });

// Also capture Lead
await page.locator('#system [role="tab"]', { hasText: "Lead" }).click();
await page.waitForTimeout(800);
await system.screenshot({ path: "scripts/verify-rotation-lead.png" });

console.log("errors:", errors.length ? errors : "none");
await browser.close();
