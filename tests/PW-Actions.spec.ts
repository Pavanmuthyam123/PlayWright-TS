import {test,expect,Locator} from "@playwright/test"


//Text Input/Text Box/Input Box
//Radio Buttons
//Check Boxes
test("Text Input Actions",async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/")

    const Inputbox:Locator=page.locator("#name")
    await expect(Inputbox).toBeVisible() //Visibility of Element
    await expect(Inputbox).toBeEnabled() //Enable of Elelment

    const MaxLength:string|null=await Inputbox.getAttribute("maxlength") //Returns the value of maxlength attribute of element
    expect(MaxLength).toBe("15")

    await Inputbox.fill("Pavan")

    const enteredvalue:string=await Inputbox.inputValue()
    console.log("Input Value of FirstName: ",enteredvalue);
    expect(enteredvalue).toBe("Pavan")

    await page.waitForTimeout(5000)

})


test("Verify Radio Buttons",async ({page})=>
{
await page.goto("https://testautomationpractice.blogspot.com/")

//css
const male:Locator=page.locator("#male")  //Male radio Button

//Assertions
await expect(male).toBeVisible()
await expect(male).toBeEnabled()

 expect(await male.isChecked()).toBe(false)

 //Action 
 await male.check()
 //expect(await male.isChecked()).toBe(true)
 await expect(male).toBeChecked() //Preferable


await page.waitForTimeout(5000)

})


//Check Boxes

test.only("Verify Check Boxes",async ({page})=>
{
await page.goto("https://testautomationpractice.blogspot.com/")

//css
const Checkbox:Locator=page.getByLabel("Sunday") //Check box

//Assertions
await expect(Checkbox).toBeVisible()
await expect(Checkbox).toBeEnabled()

await Checkbox.check()  //Selected the checkbox
await expect(Checkbox).toBeChecked() //Verifed slected or not


//Select all checkboxes and assert each is checked
//Approach 2
const days:string[]=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const checkingBoxes:Locator[]=days.map(index=> page.getByLabel(index))
//Assert
expect(checkingBoxes.length).toBe(7)

//Clicking all check boxes
 for(const seleting of checkingBoxes)
{
    await seleting.check()
    await expect(seleting).toBeChecked()
} 

 
    //uncheck last 3 checkboxes and assert
for(const seleting of checkingBoxes.slice(-3))
{
    await seleting.uncheck()
    await expect(seleting).not.toBeChecked()
}


//If Checked--Do unckeck and If Uncheked --Do Checked and Assertions for both
for(const seleting of checkingBoxes.slice(-3))
{
    if(await seleting.isChecked())
    {
        //only if checked
    await seleting.uncheck()
    await expect(seleting).not.toBeChecked()
    }
    else
    {
        //Only if not checked
    await seleting.uncheck()
    await expect(seleting).not.toBeChecked()

    }
    
}


await page.waitForTimeout(5000)

//Selecting randomly checkboxes ---1,3,6
const indexs:number[]=[1,3,6]

for(const i of indexs)
{
 checkingBoxes[i].check() 
 await expect(checkingBoxes[i]).toBeChecked()  
}


//Select the Check Box based on label

const weekname:string="Friday"

for(const label of days)
{
    if(label.toLowerCase()===weekname.toLowerCase())
    {
        const checkbox=page.getByLabel(label)
        checkbox.click()
        await expect(checkbox).toBeChecked()
    }
}


})
