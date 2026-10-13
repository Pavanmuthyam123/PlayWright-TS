import {test,expect,Locator} from "@playwright/test"

test("Verify Multi Selecting",async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/")

    //Select Option from Ten Dropdowns (4 Ways)
    //await page.locator("#colors").selectOption(["Red","Blue","Green"])  //Using Visible Text
    //await page.locator("#colors").selectOption(["red","green","white"]) //Using Value Attribute
    //await page.locator("#colors").selectOption([{label:"Red"},{label:"Green"},{label:"Yellow"}]) //Using Label
    await page.locator("#colors").selectOption([{index:1},{index:5},{index:2}]) //Using Indexes

    //2)Check/Count Number of options in the DropDown

    const DropDownOptions:Locator=page.locator("#colors>option") //await no need for Locator
    await expect(DropDownOptions).toHaveCount(7)

    //3) Check Number of Option present in the DropDown

    const optionsText:string[]=(await DropDownOptions.allTextContents()).map(text=>text.trim()) //Capture all option texts
    console.log(optionsText);

     //Assert
    expect(optionsText).toContain('Green')  //In that options we check Green option present or not



    //4)Printing Options from the Drop Down
for(const option of optionsText)
    {
        console.log(option);
        
    } 






    await page.waitForTimeout(5000)
})