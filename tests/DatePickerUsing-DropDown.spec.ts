
import { test, expect, Locator, Page } from "@playwright/test";

async function selectdate(
    targetYear: string,
    targetMonth: string,
    targetDate: string,
    page: Page
) {
    // Select Month and Year using dropdowns
    await page.locator(".ui-datepicker-month").selectOption(targetMonth);
    await page.locator(".ui-datepicker-year").selectOption(targetYear);

    // Get all dates
    const alldates: Locator[] = await page.locator(".ui-datepicker-calendar tbody td").all();

    // Select required date
    for (let dt of alldates) 
    {
        const datetxt = await dt.innerText();

        if (datetxt.trim() === targetDate) 
        {
            await dt.click();
            break;
        }
    }
}

test("Verify JQuery Date Picker 2", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    // Date Picker 2
    const datePicker: Locator = page.locator("#txtDate");

    await expect(datePicker).toBeVisible();

    // Open Date Picker 2
    await datePicker.click();

    // Target date: 25 October 2026
    const year = "2026";
    const month = "9";  // October
    const date = "25";

    // Select date
    await selectdate(year, month, date, page);

    // Verify selected date
    await expect(datePicker).toHaveValue("25/10/2026");

    await page.waitForTimeout(5000);
});
