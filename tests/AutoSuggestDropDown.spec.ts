
import { test, expect,Locator } from "@playwright/test";

test("Verify AutoSuggestions DropDowns", async ({ page }) => {

    await page.goto("https://www.flipkart.com/");

    const searchBox = page.locator('input[name="q"]:not([readonly])');

    await expect(searchBox).toBeVisible();
    await expect(searchBox).toBeEnabled();

    await searchBox.fill("Mobiles");

    await expect(searchBox).toHaveValue("Mobiles");

    //Get Suggest options ---->Ctrl+shit+p on dom ----->emulate focues page

    const options:Locator=page.locator("ul>a>li")

    const count=await options.count()
    console.log("Number of Options: ",count);


    //Printing one particular option
    console.log("5Th option Printing: ",await options.nth(5).innerText());
    

    //Printing All the Suggest options in the console

 
    for(let i=0;i<count;i++)
    {   
        console.log("All options Text:",await options.nth(i).textContent());
        

    } 
//select on the Mobile under 25000
for(let i=0;i<count;i++)
{
    const txt=await options.nth(i).innerText()
    if(txt==='Mobile under 25000')
    {
        options.nth(i).click()
        break
    }
}

    await page.waitForTimeout(3000);
});
