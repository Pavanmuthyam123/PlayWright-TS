import {test,expect,Locator} from "@playwright/test"


test("Verify Single DropDown",async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/")

    //Select Option from Ten Dropdowns (4 Ways)

    //Approach-1
    //await page.locator("#country").selectOption("India")  //Visible text
    

    //Approach-2
    //await page.locator("#country").selectOption({value:'uk'})  //By using value Attribute 

    //Approach-3
    //await page.locator("#country").selectOption({label:"India"}) //By Using label

    //Approach-4
    //await page.locator("#country").selectOption({index:5})  //By Using index

    //2)Check/Count Number of options in the DropDown
    const DropDownOptions:Locator=page.locator("#country>option") //await no need for Locator
    await expect(DropDownOptions).toHaveCount(10)

    //3) Check Number of Option present in the DropDown

    const optionsText:string[]=(await DropDownOptions.allTextContents()).map(text=>text.trim()) //Capture all option texts
    console.log(optionsText);

    //Assert
    expect(optionsText).toContain('China')  //In that options we check china option present or not


    /* //4)Printing Options from the Drop Down
    for(const option of optionsText)
    {
        console.log(option);
        
    } */



    await page.waitForTimeout(5000)




})