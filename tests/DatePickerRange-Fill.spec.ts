import { test, expect, Locator } from "@playwright/test"

test("Verify Date Picker 3 - Select Date Range", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/")

    // Date Picker 3 - Start Date
    const startDate: Locator = page.locator("#start-date")
    await expect(startDate).toBeVisible()

    // Date Picker 3 - End Date
    const endDate: Locator = page.locator("#end-date")
    await expect(endDate).toBeVisible()

    // Fill Start Date
    await startDate.fill("2027-10-25")

    // Fill End Date
    await endDate.fill("2027-10-30")

    // Verify Start Date
    await expect(startDate).toHaveValue("2027-10-25")

    // Verify End Date
    await expect(endDate).toHaveValue("2027-10-30")

    // Click Submit button
    await page.locator(".submit-btn").click()

    // Verify the result
    const result: Locator = page.locator("#result")
    await expect(result).toBeVisible()

    console.log("Start Date: 25 October 2027")
    console.log("End Date: 30 October 2027")

    await page.waitForTimeout(3000)
})