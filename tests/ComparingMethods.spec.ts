import {test,expect,Locator} from "@playwright/test"
import { text } from "node:stream/consumers"

test("Verify Comparing Methods",async ({page})=>
{
    await page.goto("https://demowebshop.tricentis.com/")
    const title:Locator=page.locator(".product-title")
    await expect(title).toHaveCount(6)

    //innerText() vs textContent()
    //console.log(await title.nth(1).innerText()); //It Gives Exact Text
    //console.log(await title.nth(1).textContent()); //It Gives Text with Spaces


    //Count
   /*  const count:number=await title.count()
    
    for(let i=0;i<count;i++)
    {
        const ProductNames:string=await title.nth(i).innerText();  //It Gives Exact Text
        console.log(ProductNames);
        
    }

//2) allInnerText() allTextContent()
//const ProductNames:string[]=await title.allInnerTexts()
//console.log(ProductNames);

const ProductNames:string[]=await title.allTextContents()
console.log(ProductNames);

const TrimmedProducts:string[]=await ProductNames.map(text=>text.trim())
console.log(TrimmedProducts); */

//3) all()
const ProductLocators:Locator[]=await title.all()
console.log(ProductLocators);

for(let ProductLoc of ProductLocators)
{
    console.log(await ProductLoc.innerText());
    
}

    await page.waitForTimeout(5000)
})