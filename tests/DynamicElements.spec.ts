//Dynamic Web Elements
import {test,expect,Locator} from "@playwright/test"
test("Verify Dynamic Elements",async ({page})=>
{
   await page.goto("https://testautomationpractice.blogspot.com/")

    /*//Loop to click 5 Times
    for(let i=1;i<=5;i++)
    {
       await page.locator("//button[text()='STOP' or text()='START']").click() //Locate the button START or STOP
        await page.waitForTimeout(2000)
    } */
    

        //Using CSS Locator

    //Loop to click 5 Times
   /*  for(let i=1;i<=5;i++)
    {
       await page.locator("button[name='start'],button[name='stop']").click() //Locate the button START or STOP
        await page.waitForTimeout(2000)
    } */


        //Using Playwright Locator

    //Loop to click 5 Times
    for(let i=1;i<=5;i++)
    {
       await page.getByRole("button",{name:/START|STOP/}).click()           //Locate the button START or STOP
        await page.waitForTimeout(2000)
    }


})