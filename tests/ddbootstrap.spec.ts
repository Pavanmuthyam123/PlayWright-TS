
import { test, expect, Locator } from '@playwright/test';

test('Booking.com Date Picker - Check-in and Check-out', async ({ page }) => {

    // Open Booking.com
    await page.goto('https://www.booking.com/');

    // Open the date picker
    const datePicker: Locator = page.locator('[data-testid="searchbox-dates-container"]');
    await expect(datePicker).toBeVisible();
    await datePicker.click();

    // ==================================================
    // CHECK-IN DATE: 25 OCTOBER 2026
    // ==================================================

    let checkinYear: string = '2026';
    let checkinMonth: string = 'October';
    let checkinDay: string = '25';

    // Calendar month headings
    const monthLocator: Locator = page.locator("h3[aria-live='polite']");

    // Next month button
    const nextMonth: Locator = page.locator("button[aria-label='Next month']");

    // Navigate to the required check-in month
    while (true) {

        const monthYear: string = await monthLocator.nth(0).innerText();

        console.log('Check-in calendar:', monthYear);

        const currentMonth: string = monthYear.split(' ')[0];
        const currentYear: string = monthYear.split(' ')[1];

        // Stop when October 2026 is displayed
        if (currentMonth === checkinMonth && currentYear === checkinYear) {
            break;
        }

        // Move to the next month
        await nextMonth.click();
    }

    // Get date cells from the first calendar
    const checkinDates: Locator[] = await page
        .locator('table.b8fcb0c66a tbody')
        .nth(0)
        .locator('td')
        .all();

    let checkinSelected: boolean = false;

    // Find and click the required check-in day
    for (const date of checkinDates) {

        const dateText: string = (await date.innerText()).trim();

        if (dateText === checkinDay && await date.isVisible()) {
            await date.click();
            checkinSelected = true;
            break;
        }
    }

    // Verify check-in selection
    expect(checkinSelected).toBeTruthy();

    // ==================================================
    // CHECK-OUT DATE: 25 JULY 2027
    // ==================================================

    let checkoutYear: string = '2027';
    let checkoutMonth: string = 'July';
    let checkoutDay: string = '25';

    // Navigate to the required check-out month
    // Check the visible calendar headings each time
    let checkoutMonthFound: boolean = false;

    while (true) {

        const monthCount: number = await monthLocator.count();
        let requiredMonthFound: boolean = false;

        // Check both displayed calendar months
        for (let i = 0; i < monthCount; i++) {

            const monthYear: string = await monthLocator.nth(i).innerText();

            console.log('Calendar month:', monthYear);

            const currentMonth: string = monthYear.split(' ')[0];
            const currentYear: string = monthYear.split(' ')[1];

            if (currentMonth === checkoutMonth && currentYear === checkoutYear) {
                requiredMonthFound = true;
                break;
            }
        }

        // Stop if July 2027 is displayed
        if (requiredMonthFound) {
            checkoutMonthFound = true;
            break;
        }

        // Move forward one month
        await nextMonth.click();
    }

    // Verify the checkout month was found
    expect(checkoutMonthFound).toBeTruthy();

    // Find the calendar heading for July 2027
    let checkoutCalendarIndex: number = 0;

    for (let i = 0; i < await monthLocator.count(); i++) {

        const monthYear: string = await monthLocator.nth(i).innerText();

        const currentMonth: string = monthYear.split(' ')[0];
        const currentYear: string = monthYear.split(' ')[1];

        if (currentMonth === checkoutMonth && currentYear === checkoutYear) {
            checkoutCalendarIndex = i;
            break;
        }
    }

    // Get date cells from the July 2027 calendar
    const checkoutDates: Locator[] = await page
        .locator('table.b8fcb0c66a tbody')
        .nth(checkoutCalendarIndex)
        .locator('td')
        .all();

    let checkoutSelected: boolean = false;

    // Find and click the required check-out day
    for (const date of checkoutDates) {

        const dateText: string = (await date.innerText()).trim();

        if (dateText === checkoutDay && await date.isVisible()) {
            await date.click();
            checkoutSelected = true;
            break;
        }
    }

    // Verify check-out selection
    expect(checkoutSelected).toBeTruthy();

    console.log('Check-in: 25 October 2026');
    console.log('Check-out: 25 July 2027');

    // Keep the browser open briefly
    await page.waitForTimeout(3000);
});
