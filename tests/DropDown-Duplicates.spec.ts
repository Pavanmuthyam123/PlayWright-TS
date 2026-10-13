import {test,expect,Locator} from "@playwright/test"
import { text } from "node:stream/consumers"



test("Verify Sorted DropDown",async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/")

    const DropDownOptions:Locator=page.locator("#colors>option")  //Having Duplicates
    const optionstxt:string[]= (await DropDownOptions.allTextContents()).map(text=>text.trim())

    //Array and Tuple Allows Duplicates but Set doesnt allow duplicates

    //create set

    const myset=new Set<string>()  //set -Duplicates not allowed
    const duplicate:string[]=[]  //Array -Allow duplicates

    for(const text of optionstxt)
    {
        if(myset.has(text))
        {
            duplicate.push(text)

        }
        else
        {
            myset.add(text)
        }
            
    }

    console.log("Duplicate Options: ",duplicate);
    
 
})