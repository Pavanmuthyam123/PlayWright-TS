import {test,expect,Locator} from "@playwright/test"

test("Static Web Table",async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/")

    const table:Locator=page.locator("table[name='BookTable'] tbody")
    await expect(table).toBeVisible()


    //1)Count Number of rows

    const Tablerows:Locator=table.locator("tr")
    await expect(Tablerows).toHaveCount(7)

    const rowcount:number=await Tablerows.count()
    console.log("No.of Rows In Table",rowcount);


    //2)Count Number of Columns

    const TableColumns:Locator=Tablerows.locator("th")
    await expect(TableColumns).toHaveCount(4)
    
    const Columnscount:number=await TableColumns.count()
    console.log("No.of Columns In Table",Columnscount);


    //3) Read all data from 2nd Row (Index 2 means 3rd Row Data Including Header)
    const SecondRowCells:Locator=Tablerows.nth(2).locator("td")

    const SecondRowTexts:string[]=await SecondRowCells.allInnerTexts()
    console.log("2nd Row Data: ",SecondRowTexts); //[ 'Learn Java', 'Mukesh', 'Java', '500' ]
    await expect(SecondRowCells).toHaveText([ 'Learn Java', 'Mukesh', 'Java', '500' ])

    //Using For of Loop
    for(let txt of SecondRowTexts)
    {
        console.log(txt);
        
    }


    //4)Read All Data from the table(Excluding the Header)

  const allrowData= await Tablerows.all()
  for(let row of allrowData.slice(1))  //Slice(1) Skips Header Row
  {
    const colms=await row.locator("td").allInnerTexts()
    console.log(colms.join("\t"));
    
  }


  //5) Print Book names where author is mukesh
    for(let row of allrowData.slice(1))  //Slice(1) Skips Header Row
  {
    const Cells=await row.locator("td").allInnerTexts()
    const author=Cells[1]
    const book=Cells[0]
    if(author==="Mukesh")
    {
        console.log(`${author} \t ${book}`);
        
    }
  }


  //Calculate Total Prices of the Books

  let totalprice:number=0

  for(let row of allrowData.slice(1))  //Slice(1) Skips Header Row
  {
    const Cells=await row.locator("td").allInnerTexts()
    const Price=Cells[3]
   totalprice=totalprice+parseInt(Price)
  }

  console.log(totalprice);

  expect(totalprice).toBe(7100)  //Assertion
  

await page.waitForTimeout(5000)
})