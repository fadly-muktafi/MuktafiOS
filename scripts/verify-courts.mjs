/**
 * Visual verification — screenshot hero + playbook sections.
 * Usage: start dev server, then `node scripts/verify-courts.mjs`
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

await page.goto(BASE, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1500);

// Skip boot
const skip = page.locator("#boot-overlay >> text=Skip");
if (await skip.count()) await skip.click();
await page.waitForTimeout(2000);

// Hero (court right side)
const hero = page.locator("#home");
await page.screenshot({ path: "scripts/verify-hero.png", clip: await hero.boundingBox() });

// Playbook section
const system = page.locator("#system");
await system.scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await system.screenshot({ path: "scripts/verify-system.png" });

console.log("errors:", errors.length ? errors : "none");
await browser.close();
