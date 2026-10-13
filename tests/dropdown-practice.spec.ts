
import { test, expect, Locator } from "@playwright/test";
import { count } from "node:console";

// 1. Native Dropdown
test("Verify native drop downs", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    // Login
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Locate native dropdown
    const dropdown = page.locator('[data-test="product-sort-container"]');

    // Print all options
    const options = dropdown.locator("option");
    const count = await options.count();

    console.log("Total options:", count);

    for (let i = 0; i < count; i++) {
        console.log(await options.nth(i).innerText());
    }

    // Select Price: Low to High
    await dropdown.selectOption("lohi");
    await expect(dropdown).toHaveValue("lohi");
});

// 2. Single Dropdown - Selection Methods
test("Verify Single Dropdown with select tag", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    // Login
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Locate dropdown
    const dropdown = page.locator('[data-test="product-sort-container"]');

    // Method 1: Visible text
    await dropdown.selectOption("Name (A to Z)");
    await expect(dropdown).toHaveValue("az");

    // Method 2: Attribute value
    await dropdown.selectOption({ value: "za" });
    await expect(dropdown).toHaveValue("za");

    // Method 3: Label
    await dropdown.selectOption({ label: "Price (high to low)" });
    await expect(dropdown).toHaveValue("hilo");

    // Method 4: Index
    await dropdown.selectOption({ index: 2 });
    await expect(dropdown).toHaveValue("lohi");

    // Check number of options
    const dropdownoptions: Locator = dropdown.locator("option");
    await expect(dropdownoptions).toHaveCount(4);

    // Get all option texts
    const optionstxt: string[] = await dropdownoptions.allTextContents();
    console.log("Single dropdown options:", optionstxt);

    // Verify option exists
    expect(optionstxt).toContain("Price (high to low)");

    // Print all options
    for (const option of optionstxt) {
        console.log(option);
    }
});

// 3. Multi-Select Dropdown
test("Verify the Multi Select-DropDown", async ({ page }) => {
    await page.goto("https://demoqa.com/select-menu");

    // Locate Multi-Select dropdown
   // const dropdown = page.locator("#react-select-4-placeholder")
     //   .locator("..");
     const dropdown=page.locator("div[id='selectMenuContainer'] div[class='row'] div[class='css-19bb58m']")

    // Open dropdown
    await dropdown.click();

   // Locate only the Multi-Select options using CSS
 const dropdownoptions: Locator = page.locator(
     '[role="option"]'
 );
    // 1. Check number of options
    await expect(dropdownoptions).toHaveCount(4);

    // 2. Get all option texts
    const optionstxt: string[] =
        await dropdownoptions.allTextContents();

    console.log("Multi-select options:", optionstxt);

    // 3. Verify option exists
    expect(optionstxt).toContain("Green");

    // 4. Print all options
    for (const option of optionstxt) {
        console.log(option);
    }

    // 5. Select Green and Blue from this dropdown only
    await dropdownoptions.filter({ hasText: "Green" }).click();
    await dropdownoptions.filter({ hasText: "Blue" }).click();

    // 6. Verify selected options
   const selectedOptions = page.locator("#selectMenuContainer [class='css-1p3m7a8-multiValue']");

    await expect(selectedOptions).toHaveCount(2);

    // 7. Print selected options
    console.log("Selected options:",await selectedOptions.allTextContents());
});



//Auto Suggestions 


test("Get all Amazon suggestions", async ({ page }) => {
  await page.goto("https://www.amazon.in/");

  const searchBox = page.getByRole("searchbox", {
    name: "Search Amazon.in"
  });

  await searchBox.fill("watches");

  const suggestions = page.locator("#sac-autocomplete-results-container [role='row']");

  await expect(suggestions.first()).toBeVisible();
  //Count of suggestions
    console.log("Total suggestions:", await suggestions.count());
    console.log(await suggestions.nth(5).innerText());
  
  //console.log(await suggestions.allTextContents());

  //Print all options suggested 
    const count = await suggestions.count();
  for(let i=0;i<count;i++)
  {
    console.log(await suggestions.nth(i).innerText());
  }


  //select watches for woman option

  for(let i=0;i<count;i++)
  {

    const selectedtxt =await suggestions.nth(i).innerText();
    if(selectedtxt=="watches for woman")
    {
        suggestions.nth(i).click()
        break;
    }
  }

  await page.waitForTimeout(5000)
});


//Hidden Elements 

test.only("Handle DemoQA custom dropdown", async ({ page }) => {

  // STEP 1: Open website
  await page.goto("https://demoqa.com/select-menu");

  // STEP 2: Find dropdown control
  const dropdown = page.locator("#withOptGroup");

  // STEP 3: Verify dropdown locator
  console.log("Dropdown count:",await dropdown.count());

  await expect(dropdown).toBeVisible();

  // STEP 4: Open dropdown
  await dropdown.click();

  // STEP 5: Find options list parent
 const options: Locator = page.locator("#react-select-2-listbox [role='option']");

  // STEP 7: Print options count
  console.log("Total options:", await options.count());

  // STEP 8: Print all option texts
  console.log("All options:",await options.allTextContents());

  // Print all the options
console.log("Print all the options......");

const count = await options.count();
for (let i = 0; i < count; i++) 
    {
    console.log(await options.nth(i).innerText());
    }
  // STEP 9: Find the exact option we want
   const targetOption = page.locator("#react-select-2-listbox [role='option']").filter({ hasText: "Group 2, option 2" });

  await expect(targetOption).toBeVisible();

  // STEP 10: Select the option
  await targetOption.click();

  // STEP 11: Verify selected value
  await expect(dropdown).toContainText("Group 2, option 2");

  console.log("Dropdown option selected successfully");
});
