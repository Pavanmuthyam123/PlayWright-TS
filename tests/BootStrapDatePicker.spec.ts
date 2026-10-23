
import { test, expect, Locator } from '@playwright/test';

test('Booking.com Date Picker Test - Check-in and Check-out', async ({ page }) => {

    // Open Booking.com website
    await page.goto('https://www.booking.com/');

    // Open the date picker using CSS locator
    const datePicker: Locator = page.locator('[data-testid="searchbox-dates-container"]');

    await expect(datePicker).toBeVisible({ timeout: 15000 });
    await datePicker.click();

    // CSS locator for calendar month headings
    const monthLocator: Locator = page.locator('[data-testid="searchbox-datepicker-calendar"] h3');

    // CSS locator for Next month button
    const nextMonth: Locator = page.locator('button[aria-label="Next month"]');

    // ==================================================
    // CHECK-IN DATE SELECTION
    // ==================================================

    // Required check-in date: 25 October 2026
    let checkinYear: string = '2026';
    let checkinMonth: string = 'October';
    let checkinDay: string = '25';

    // Navigate to the required check-in month and year
    while (true) 
        {

        // Get the first calendar's month and year
        const checkInMonthYear: string = await monthLocator.nth(0).innerText();

        console.log('Check-in calendar:', checkInMonthYear);

        // Separate month and year
        const currentMonth: string = checkInMonthYear.split(' ')[0];
        const currentYear: string = checkInMonthYear.split(' ')[1];

        // Stop when the required month and year match
        if (currentMonth === checkinMonth && currentYear === checkinYear) 
        {
            break;
        }
        else 
        {
            // Move to the next month
            await nextMonth.click();
        }
    }

    // Get all date cells from the first calendar
    let allDates: Locator[] = await page.locator('[data-testid="searchbox-datepicker-calendar"] table tbody').nth(0).locator('td').all();

    // Track whether check-in date was selected
    let checkinDateSelected: boolean = false;

    // Iterate through all date cells
    for (let date of allDates) 
        {

        // Read the date text
        const dateText: string = (await date.innerText()).trim();

        // Select the required check-in day
        if (dateText === checkinDay && await date.isVisible()) 
        {
            await date.click();
            checkinDateSelected = true;
            break;
        }
    }

    // Verify check-in date selection
    expect(checkinDateSelected).toBeTruthy();


    // ==================================================
    // CHECK-OUT DATE SELECTION
    // ==================================================

    // Required check-out date: 25 October 2027
    let checkoutYear: string = '2027';
    let checkoutMonth: string = 'October';
    let checkoutDay: string = '25';

    // Navigate to the required check-out month and year
    while (true) 
        {

        // Get the second calendar's month and year
        const checkOutMonthYear: string = await monthLocator.nth(1).innerText();

        //console.log('Check-out calendar:', checkOutMonthYear);

        // Separate month and year
        const currentMonth: string = checkOutMonthYear.split(' ')[0];
        const currentYear: string = checkOutMonthYear.split(' ')[1];

        // Stop when the required month and year match
        if (currentMonth === checkoutMonth && currentYear === checkoutYear) 
        {
            break;
        }
        else {
            // Move to the next month
            await nextMonth.click();
        }
    }

    // Get all date cells from the second calendar
    allDates = await page.locator('[data-testid="searchbox-datepicker-calendar"] table tbody').nth(1).locator('td').all();

    // Track whether check-out date was selected
    let checkoutDateSelected: boolean = false;

    // Iterate through all date cells
    for (let date of allDates) 
        {

        // Read the date text
        const dateText: string = (await date.innerText()).trim();

        // Select the required check-out day
        if (dateText === checkoutDay && await date.isVisible()) {
            await date.click();

            checkoutDateSelected = true;
            break;
        }
    }

    // Verify check-out date selection
    expect(checkoutDateSelected).toBeTruthy();

    // Print the selected dates
    console.log('Check-in date selected: 25 October 2026');
    console.log('Check-out date selected: 25 October 2027');

    // Keep the browser open briefly
    await page.waitForTimeout(10000);

});
