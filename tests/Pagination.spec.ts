import {test,expect,Locator} from "@playwright/test"

test("Verify Pagination Table",async ({page})=>
{

   await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html")
    let hasmorepages=true
     while(hasmorepages)
     {
        const rows:Locator[]=await page.locator("#example tbody tr").all() //It will return in array format

        //for will printing all rows from first page 
        for(let row of rows)
        {
            console.log(await row.innerText())
        }

        //step-2 TO verify next page is there or not 

        //button[aria-label='Next']
        //button[aria-controls='example']:has-text(">")
        //button[aria-controls='example']:nth-child(9)
        const nextbutton:Locator=page.locator("button[aria-label='Next']")
        const isdisabled=await nextbutton.getAttribute("class")
        if(isdisabled?.includes("disabled"))
        {
            hasmorepages=false
        }
        else
        {
            await nextbutton.click()
        }
     }

})

test("Verify the Filter and Check the Rows Count",async ({page})=>
{
    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html")

    const dropdown:Locator=page.locator("#dt-length-0")
    await dropdown.selectOption({label:"25"})

        //Approach-1
    /* const rows=await page.locator("#example tbody tr").all()
    expect(rows.length).toBe(25)  //Assertion */

    //Approach-2
    const rows2=page.locator("#example tbody tr")
    expect(rows2).toHaveCount(25)  //Assertion


await page.waitForTimeout(5000)

})

test.only("Searching the Specific Data in a Table",async ({page})=>
{
    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html")

    const SearchBox:Locator=page.locator("#dt-search-0")
    await SearchBox.fill("Michelle House")

    const rows=await page.locator("#example tbody tr").all()
    if(rows.length>=1)
    {   
        let matchFound=false
        for(let row of rows)
        {
            const text =await row.innerText()  //Entire Row Data
            if(text.includes("Michelle House"))
            {
                matchFound=true 
                break 
            }
        }

        expect(matchFound).toBeTruthy()
    }
    else
    {
        console.log("No Rows Found");
        
    }


await page.waitForTimeout(5000)

})