//Import Statement
import {test,expect,Locator} from "@playwright/test"

//Test Statement/Function
test("Verify Xpath Locators", async ({page})=>
{

    await page.goto("https://demowebshop.tricentis.com/")

    //Absolute Xpath
   const absLogo:Locator= page.locator("//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]")
   await expect(absLogo).toBeVisible()

   //Relative Xpath
    const relLogo:Locator= page.locator("//img[@alt='Tricentis Demo Web Shop']")
    await expect(relLogo).toBeVisible()

    //Conatiner--Function
    const Products:Locator=page.locator("//h2/a[contains(@href,'computer')]")
    const ProdsCount:number= await Products.count()
    console.log("Total Products:",ProdsCount)
    expect(ProdsCount).toBeGreaterThan(0)

    //console.log(await products.textcontent()) 

    console.log("First Product Name:",await Products.first().textContent());
    console.log("Second Product Name:",await Products.last().textContent());
    console.log("Nth Product Name:",await Products.nth(2).textContent());


    //Get all product titles/text

    let ProductTitle:String[]=await Products.allTextContents()
    for(let pt of ProductTitle)
    {
        console.log(pt);
        
    }
    

    //Start-With 

    const buildingProducts:Locator=page.locator("URL")

    // text()
    const reglink:Locator=page.locator("//a[text()='Register']")
    await expect(reglink).toBeVisible()

    //Last()

    const lastele:Locator=page.locator("//div[@class='column follow-us']//li[last()]")
    await expect(lastele).toBeVisible()

})


