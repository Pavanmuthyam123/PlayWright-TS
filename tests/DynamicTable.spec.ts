import {test,expect,Locator} from "@playwright/test"
import { table } from "node:console"
import { text } from "node:stream/consumers"
test("Verify Dynamic Table",async ({page})=>
{
    await page.goto("https://practice.expandtesting.com/dynamic-table")

    const table:Locator=page.locator("table.table.table tbody")
    await expect(table).toBeVisible()

    //Number Of Rows

    const TableRows:Locator[]=await table.locator("tr").all()
    console.log("Number of Rows in a Table: ",TableRows.length);
    
    expect(TableRows).toHaveLength(4)

    //Step-1 For Chrome Process get Value of Cpu Load
    //Read Each Row  Check Chrome Presence
let CpuLoad=''
    for(const row of TableRows)
    {   
        const ProcessName:string=await row.locator("td").nth(0).innerText();
        if(ProcessName==="Chrome")
        {
           //const Cpu=await row.locator("td:has-text('%')").innerText()  //Css Syntax
           CpuLoad=await row.locator("td",{hasText:'%'}).innerText()   //Playwright Syntax
           console.log("CPU Load of Chrome: ",CpuLoad);
           break;
        }
    }

//Step-2 Compare with value in the Yellow Label
const YellowBoxTxt:string=await page.locator("#chrome-cpu").innerText()
console.log("Yellow Box: ",YellowBoxTxt);

if(YellowBoxTxt.includes(CpuLoad))
{
    console.log("CPU Load of Chrome is Equal");
    
}
else
{
    console.log("CPU Load of Chrome is not Equal");
    
}
expect(YellowBoxTxt).toContain(CpuLoad)


    await page.waitForTimeout(5000)
})



test.only("Verify Dynamic Web Table From Test Automation Practice", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const Table: Locator = page.locator("table#taskTable tbody");
    await expect(Table).toBeVisible();

    // Number of Rows
    const TableRows: Locator[] = await Table.locator("tr").all();
    console.log("Total Number of Rows: ", TableRows.length);

    expect(TableRows).toHaveLength(4);

    // Step-1: Get Memory Size of Firefox Process
    let memory = "";

    for (const row of TableRows) {

        const ProcessName: string =
            await row.locator("td").nth(0).innerText();

        if (ProcessName === "Firefox") 
            {

            const Cells: Locator[] = await row.locator("td").all();

            for (const cell of Cells) {

                const CellText: string = await cell.innerText();

                if (CellText.includes("MB")) {
                    memory = CellText;
                    break;
                }
            }

            console.log("Memory Size of Firefox process: ", memory);
            break;
        }
    }

    // Step-2: Compare with Firefox Memory Label
    const txtbox: string =await page.locator("strong.firefox-memory").innerText();

    console.log("TextBox: ", txtbox);

    if (txtbox.includes(memory)) 
    {
        console.log("Memory Size of Firefox process is Equal");
    } 
    else 
    {
        console.log("Memory Size of Firefox process is not Equal");
    }

    expect(txtbox).toContain(memory);

    await page.waitForTimeout(5000);
});
