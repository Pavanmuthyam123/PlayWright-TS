import { test, expect, Locator } from "@playwright/test"

test("Verify Date Picker 3 - Different Years", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/")

    // Start Date
    const startDate: Locator = page.locator("#start-date")
    await expect(startDate).toBeVisible()

    // End Date
    const endDate: Locator = page.locator("#end-date")
    await expect(endDate).toBeVisible()

    // Fill Start Date - October 2026
    await startDate.fill("2026-10-25")

    // Fill End Date - January 2027
    await endDate.fill("2027-01-10")

    // Verify Start Date
    await expect(startDate).toHaveValue("2026-10-25")

    // Verify End Date
    await expect(endDate).toHaveValue("2027-01-10")

    // Click Submit
    await page.locator(".submit-btn").click()

    // Verify Result
    const result: Locator = page.locator("#result")
    await expect(result).toBeVisible()

    console.log("Start Date: 25 October 2026")
    console.log("End Date: 10 January 2027")

    await page.waitForTimeout(3000)

})