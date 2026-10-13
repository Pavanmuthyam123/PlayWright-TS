import {test,expect,Locator} from "@playwright/test"
import { text } from "node:stream/consumers"


test("Verify Sorted DropDown",async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/")

    const DropDownOptions:Locator=page.locator("#animals>option") //Sorted

    //const DropDownOptions:Locator=page.locator("#colors>option")  //not Sorted

   // console.log(await DropDownOptions.allTextContents());
    
   
const optionstext:string[]=(await DropDownOptions.allTextContents()).map(text => text.trim())
//console.log(optionstext);

const OriginalList:string[]=[...optionstext]
const SortedList:string[]=[...optionstext].sort()  //... spread operator It will not change orginal values to sort

console.log("Original List: ",optionstext);
console.log("Sorted List: ",SortedList);

expect(OriginalList).toEqual(SortedList)



    await page.waitForTimeout(5000)
})