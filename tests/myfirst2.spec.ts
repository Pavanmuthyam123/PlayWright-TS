import { test, expect } from "@playwright/test";

test("Verify Page Url", async ({ page }) => {

    await page.goto("https://practice.softwaretestingmentor.com/");

    let url: string = await page.url();
    console.log(url);

    await expect(page).toHaveURL(/softwaretestingmentor/);
});