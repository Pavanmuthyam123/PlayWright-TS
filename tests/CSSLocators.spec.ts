//Css
//Types Of Css
/*
1.Absolute css
2.relative css

tag with id    ---->tag#id or #id
tag with class    ---->tag.class or .class
tag with any other attribute ---->tag[attribute=value] or [attribute=value]
tag with class and attribute----->tag.class[attribute=value] or .class[attribute = value]

page.locator(css/xpath)

*/

import {test,expect,Locator} from "@playwright/test"

test("Verifying Css Loactors",async ({page})=>
{
     await page.goto("https://demowebshop.tricentis.com/")


     //tag with ID
   /*  const search:Locator=page.locator("#small-searchterms")
    await search.fill("Books") */

    //await page.locator("#small-searchterms").fill("Books")
    
//Tag with class
    //await page.locator(".search-box-text").fill("Books")

//Tag with any other attribute tag[attri=value]
    //await page.locator("[name=q]").fill("Ram")

//Tag with class attribute=value
//.class[attri='value']

    await page.locator(".search-box-text[value='Search store']").fill("Pavan")


})
