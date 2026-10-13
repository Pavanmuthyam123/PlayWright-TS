import {test,expect,Locator} from "@playwright/test"

test("Verify Xpath Locators", async ({page})=>
{
    await page.goto("https://www.w3schools.com/html/html_tables.asp")
    
    //Locate Element Itself
   const selfele:Locator=page.locator("//td[text()='Germany']/self::td")
   await expect(selfele).toHaveText("Germany")

    //Parent Axes Modifier
   const parentele:Locator= page.locator("//td[text()='Germany']/parent::tr")
   await expect(parentele).toContainText("Germany")

   //Child Axes
  const Secondrow:Locator= page.locator("//table[@id='customers']//tr[2]/child::td")
  await expect(Secondrow).toHaveCount(3)


  //Ancestor ---Germany Cell
  const acse:Locator=page.locator("//td[text()='Germany']/ancestor::table")
  await expect(acse).toHaveAttribute("id","customers")

})