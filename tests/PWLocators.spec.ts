//Bulit in Locators

/* These are the recommended built-in locators.

page.getByRole() to locate by explicit and implicit accessibility attributes.(Intractive elements)
page.getByText() to locate by text content.(Non-Intreactive elements)
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured). */

//Dom--->Document Object Model
//Dom is a API interface by browser
import {test,expect,Locator} from "@playwright/test"
test("Playwright Locators",async ({page})=>
{
   await page.goto("https://practice.softwaretestingmentor.com/")

  /*  Locate by alt text
        All images should have an alt attribute that describes the image. You can locate an image based on the text alternative using page.getByAltText().
     */

        /* const logo:Locator = page.getByAltText("Software Testing Mentor") //alt=softerware testing mentor
        await expect(logo).toBeVisible() */

        await expect(page.getByAltText("Software Testing Mentor")).toBeVisible()


//Find an element by the text it contains. You can match by a substring, exact string, or a regular expression when using page.getByText().
//use this locator to find no interactive elemnts like div,span,p
//for intreactive elements like button,input,a,etc..use role locators

await expect(page.getByText("Diamond Sponsor")).toBeVisible() //Provide substring like Sponsor also works

//Locate by role   -->Role is not an attribute
//The page.getByRole() 
// locator reflects how users and assistive technology perceive the page, 
// for example whether some element is a button or a checkbox. 
// When locating by role, you should usually pass the accessible name as well, 
// so that the locator pinpoints the exact element.

await page.getByRole("listitem",{name:"RCV Academy eStore"}).click()

await expect(page.getByRole("heading",{name:"Top Electronics & Gadgets "})).toBeVisible()


await page.getByRole("link",{name:"Register"}).click()
await expect(page.getByRole("heading",{name:"Create your account"})).toBeVisible()


// Get by Label
// Use for form fields with visible labels

await page.getByLabel("First Name").fill("Pavan");
await page.getByLabel("Last Name").fill("Muthyam");
await page.getByLabel("Email Address").fill("abc@gmail.com");
await page.getByLabel("Phone Number").fill("8778894790");

await page.getByLabel("Password", { exact: true }).fill("Test@123"); //Password lo vunna accessable element matrame kavvali({exact:True})
//await page.getByLabel("Confirm password", { exact: true }).fill("Test@123");


//GetByPlaceHolder --->To Locate input by placeholder
//await page.getByPlaceholder("Repeat your password").fill("Test@123")


//GetbyTitle --->It is an attribute

//await expect(page.getByTitle("Home-Title")).toHaveText("Home")  //Pratice Purpose

//GetByTestID()--->used with data-testid attribute

await page.getByTestId("reg-confirm-password").fill("Test@123")

})
