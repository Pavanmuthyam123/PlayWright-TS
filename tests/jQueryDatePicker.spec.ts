import {test,expect,Locator,Page} from "@playwright/test"

async function selectdate(targetYear:string,targetMonth:string,targetDate:string,page:Page,isFuture:boolean)
{
    while(true)
    {

        const currentMonth=await page.locator(".ui-datepicker-month").textContent()
        const currentYear=await page.locator(".ui-datepicker-year").textContent()

        if(currentMonth===targetMonth && currentYear===targetYear)
        {
            break
        }

        if(isFuture=true)
        {
            //Future
            await page.locator(".ui-datepicker-next").click() //Future Dates/month/yyyy
        }
        else
        {
            //Past
            await page.locator(".ui-datepicker-prev").click()    //Past Dates/mm/yyyy
        }
    }

    const alldates:Locator[]=await page.locator(".ui-datepicker-calendar tbody td").all()  //all will return in array format

    for(let dt of alldates)
    {
        const datetxt=await dt.innerText()
        if(datetxt===targetDate)
        {
           await dt.click()
           break
        }
    }

    //await page.waitForTimeout(5000)
    
}



test("Verify JQuery Date Pickers",async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/")

    const datePicker:Locator=page.locator("#datepicker")
    await expect(datePicker).toBeVisible()

    //1) Using Fill Method --Approach-1
    //datePicker.fill("10/03/2001")    //mm/dd/yyyy

    //Approach-2 using DatePicker
    await datePicker.click()   //Open the DatePicker

    //Future Target Varibles
    const year="2027"
    const month="December"
    const date="10"

    //Past data Set

    //Future Target Varibles
    /*const year="2027"
    const month="December"
    const date="10"*/

    selectdate(year,month,date,page,true)

    const expectedDate="12/10/2027"  //mm//dd//yyyy
    await expect(datePicker).toHaveValue(expectedDate)

    await page.waitForTimeout(5000)
})