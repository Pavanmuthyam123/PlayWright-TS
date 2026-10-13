import { test, expect } from "@playwright/test";

test("Verify Page Title", async ({ page }) => {

    await page.goto("https://practice.softwaretestingmentor.com/", {
        waitUntil: "domcontentloaded"
    });

    let pavan: string = await page.title();

    console.log(pavan);

    await expect(page).toHaveTitle(
        "Automation Practice Website | Software Testing Mentor & RCV Academy"
    );

});