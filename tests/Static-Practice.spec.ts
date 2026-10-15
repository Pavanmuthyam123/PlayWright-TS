import {test,expect,Locator} from "@playwright/test"

test("Praticing the Static Web Tables",async ({page})=>
{
    await page.goto("https://assertqa.com/practice/webtables")
    const table:Locator=page.locator("table[id='employees-table'] tbody")
    await expect(table).toBeVisible()

    //Count Number of Rows

    const tablerow:Locator=table.locator("tr")
    const RowCount:number=await tablerow.count()
    console.log("Total Rows: ",RowCount);
    await expect(tablerow).toHaveCount(5)

    //Count Number of Columns

    const tablecol:Locator=page.locator("table[id='employees-table'] th")
    const ColCount:number=await tablecol.count()
    console.log("Column Count: ",ColCount);
    await expect(tablecol).toHaveCount(8)
    
//3) Read all data from 2nd Row (Index 2 means 3rd Row Data Including Header)
    const SecondRowCells:Locator=tablerow.nth(2).locator("td")

    const SecondRowTexts:string[]=await SecondRowCells.allInnerTexts()
    console.log("2nd Row Data: ",SecondRowTexts)

     //4)Read All Data from the table(Excluding the Header)

  const allrowData= await tablerow.all()
  for(let row of allrowData)  //Slice(1) Skips Header Row
  {
    const colms=await row.locator("td").allInnerTexts()
    console.log(colms.join("\t"));
    
  }


// 5) Calculate Total Prices of the Books

let totalprice: number = 0;

for (let row of allrowData) {
    const Cells = await row.locator("td").allInnerTexts();
    const Price = Cells[5].replace(/[$,]/g, "").trim();

    totalprice = totalprice + parseInt(Price);
}

console.log(totalprice);


  expect(totalprice).toBe(410000)  //Assertion

    await page.waitForTimeout(5000)
})