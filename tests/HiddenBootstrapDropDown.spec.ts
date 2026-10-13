import {test,expect,Locator} from "@playwright/test"

test("Verify Hidden Dropdowm Bootstrap",async ({page})=>
{

await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

//Login 

await page.locator("input[name='username']").fill("Admin") //css
await page.locator('[name="password"]').fill("admin123")//css
await page.locator('[type="submit"]').click() //css

 // Verify Dashboard Text
    const dashboard: Locator = page.getByRole("heading", { name: "Dashboard" }); //pw locator

    await expect(dashboard).toBeVisible();

    console.log("Dashboard text is displayed successfully");


//Click on the PIM

await page.getByText("PIM").click()

//capture all drop down
await page.locator('form i').nth(0).click()
await page.waitForTimeout(5000)

//Capture all the options from drop down and count
const options:Locator=page.locator("div[role='option'] span")
const count:number=await options.count()
console.log("Number of Options: ",count);
await page.waitForTimeout(3000)
//Print all the options

console.log("Printing all the options........");


for(let i=0;i<count;i++)
{
    //console.log(await options.nth(i).innerText())
    console.log(await options.nth(i).textContent());
    
}


//select or Click on option
for(let i=0;i<count;i++)
{
const text:string=await options.nth(i).innerText()
if(text==="Full-Time Probation")
{
    await options.nth(i).click() 
    break
}
}
    await page.waitForTimeout(5000)
})



test.only("Verify Hidden Drop Down Practice", async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    // Login
    await page.locator("input[name='username']").fill("Admin");
    await page.locator('[name="password"]').fill("admin123");
    await page.locator('[type="submit"]').click();

    // Dashboard Verify
    const dashboard: Locator = page.getByRole("heading", { name: "Dashboard" });

    await expect(dashboard).toBeVisible();
    console.log("Dashboard Visible Successfully");

    // PIM Clicking
    await page.getByText("PIM").click();

    // Open Sub Unit Dropdown
    await page.locator("form i").nth(3).click();
    await page.waitForTimeout(2000);

    // Capture and Count Options
    const options: Locator = page.locator("div[role='option'] span");
    const count: number = await options.count();

    console.log("Number of Options:", count);

    // Print All Options
    console.log("Printing All Sub Unit Options...");

    for (let i = 0; i < count; i++) {
        console.log(await options.nth(i).innerText());
    }

    // Select Engineering
    for (let i = 0; i < count; i++) {

        const text: string = (await options.nth(i).innerText()).trim();

        if (text === "Engineering") {
            await options.nth(i).click();
            console.log("Engineering Selected Successfully");
            break;
        }
    }

    await page.waitForTimeout(3000);
});