const { expect } = require('chai');
const { Builder, driver, By, Key, until } = require('selenium-webdriver');
const mocha = require('mocha');
const { describe, it, before, after } = mocha;
const url = 'https://www.easyship.com/shipping-rate-calculator/usa-to-usa';

describe('Selenium Test', function() {
  let driver;
  
  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    
  });

  after(async function() {
  
  });

  

  it('Test 01: Verify click on the “Refine Search” will display “Dimensions” and “Product Category” fields', async function() {
    try{
        await driver.get(url);
        const WebFormSection = await driver.wait(until.elementLocated(By.className('c-rates-calculator-section__inputs')), { timeout: 300000 });
        const mainWindowHandle = await driver.getWindowHandle();
        const windowHandles = await driver.getAllWindowHandles();
        for (const handle of windowHandles) {
            if (handle !== mainWindowHandle) {
              await driver.switchTo().window(handle);
              break;
            }
        }
        await driver.close();
        await driver.switchTo().window(mainWindowHandle);
    
        const element = await webFormSection.findElement(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div/section[1]/div[1]/div[2]/form/div/p'));
        await element.click();
        const field = await driver.wait(until.elementLocated(By.xpath('//*[@id="rates.inputs.product-category"]'), 50000));
        const isDisplayed = await field.isDisplayed();
        expect(isDisplayed).to.equal(true);
    } catch(error){
        console.error(error);
    }
    });

    it('Test 02: Verify selecting country With Zip code in the “Shipping From” pull down menu will result as showing the “Zip Code” textbox in the right-hand side of “Shipping From” menu', async function() {
        try{
        await driver.get(url);
        const WebFormSection = await driver.wait(until.elementLocated(By.className('c-rates-calculator-section__inputs')), { timeout: 300000 });
        const mainWindowHandle = await driver.getWindowHandle();
        const windowHandles = await driver.getAllWindowHandles();
        for (const handle of windowHandles) {
            if (handle !== mainWindowHandle) {
              await driver.switchTo().window(handle);
              break;
            }
        }
        await driver.close();
        await driver.switchTo().window(mainWindowHandle);
    
        const webFormSection = await driver.findElement(By.className('c-rates-calculator-section__inputs'));
        const dropdown = await webFormSection.findElement(By.xpath('//*[@id="rates.inputs.origin"]'));
        const optionValue = '54';
        await dropdown.findElement(By.css(`option[value="${optionValue}"]`)).click();

        const field = await driver.wait(until.elementLocated(By.xpath('//*[@id="rates.inputs.origin-zip-code"]')), 5000);
        const isDisplayed = await field.isDisplayed();
        expect(isDisplayed).to.equal(true);
    } catch(error){
        console.error(error);
    }
  });

  it('Test 03: Verify click on “Calculate” with correct input will display shipping option with expected column of information', async function() {
    try{
    await driver.get(url);
    const WebFormSection = await driver.wait(until.elementLocated(By.className('c-rates-calculator-section__inputs')), { timeout: 300000 });
    const mainWindowHandle = await driver.getWindowHandle();
    const windowHandles = await driver.getAllWindowHandles();
    for (const handle of windowHandles) {
        if (handle !== mainWindowHandle) {
          await driver.switchTo().window(handle);
          break;
        }
    }
    await driver.close();
    await driver.switchTo().window(mainWindowHandle);
    
   //shipping From
    const webFormSection = await driver.findElement(By.className('c-rates-calculator-section__inputs'));
    const shippingFrom = await webFormSection.findElement(By.xpath('//*[@id="rates.inputs.origin"]'));
    const shippingFromValue = '54';
    await shippingFrom.findElement(By.css(`option[value="${shippingFromValue}"]`)).click();
    //Shipping From Zip
    const shippingZip = await webFormSection.findElement(By.xpath('//*[@id="rates.inputs.origin-zip-code"]'));
    await shippingZip.sendKeys('10001');
    
    //Shipping To
    const shippingTo = await webFormSection.findElement(By.xpath('//*[@id="rates.inputs.destination"]'));
    const shippingToValue = '14';
    await shippingTo.findElement(By.css(`option[value="${shippingToValue}"]`)).click();

    //Parcel weight
    const parcelWeight = await webFormSection.findElement(By.xpath('//*[@id="rates.inputs.weight"]'));
    await parcelWeight.sendKeys('1.5');

    //click calculate
    const calculateButton = await webFormSection.findElement(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div/section[1]/div[1]/div[2]/form/button'));
    await calculateButton.click();

    //check display column of information
    const courier = await driver.wait(until.elementLocated(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div/section[1]/div[2]/div/div[1]/div[2]/div/div[1]/p[1]')), { timeout: 50000 });
    const isDisplayed = [];
    isDisplayed[1] = await courier.isDisplayed();
    const deliveryTime = await driver.wait(until.elementLocated(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div/section[1]/div[2]/div/div[1]/div[2]/div/div[1]/p[2]')), { timeout: 50000 });
    isDisplayed[2] = await deliveryTime.isDisplayed();
    const tracking = await driver.wait(until.elementLocated(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div/section[1]/div[2]/div/div[1]/div[2]/div/div[1]/p[3]')), { timeout: 50000 });
    isDisplayed[3] = await tracking.isDisplayed();
    const rating = await driver.wait(until.elementLocated(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div/section[1]/div[2]/div/div[1]/div[2]/div/div[1]/p[4]')), { timeout: 50000 });
    isDisplayed[4] = await rating.isDisplayed();
    const serviceOption = await driver.wait(until.elementLocated(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div/section[1]/div[2]/div/div[1]/div[2]/div/div[1]/p[5]')), { timeout: 50000 });
    isDisplayed[5] = await serviceOption.isDisplayed();
    const totalCost = await driver.wait(until.elementLocated(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div/section[1]/div[2]/div/div[1]/div[2]/div/div[1]/p[6]')), { timeout: 50000 });
    isDisplayed[6] = await totalCost.isDisplayed();
    for (let i = 0; i < isDisplayed.length; i++) {
        expect(myArray[i]).to.equal(true);
      }
    } catch(error){
        console.error(error);
    }
  });

  it('Test 04: Verify click on “Calculate” for shipments that from NO couriers, the calculator will result as no courier results', async function() {
    try{
    await driver.get(url);
    const WebFormSection = await driver.wait(until.elementLocated(By.className('c-rates-calculator-section__inputs')), { timeout: 300000 });
    const mainWindowHandle = await driver.getWindowHandle();
    const windowHandles = await driver.getAllWindowHandles();
    for (const handle of windowHandles) {
        if (handle !== mainWindowHandle) {
          await driver.switchTo().window(handle);
          break;
        }
    }
    await driver.close();
    await driver.switchTo().window(mainWindowHandle);
    
   //shipping From
    const webFormSection = await driver.findElement(By.className('c-rates-calculator-section__inputs'));
    const shippingFrom2 = await webFormSection.findElement(By.xpath('//*[@id="rates.inputs.origin"]'));
    const shippingFromValue2 = '5';
    await shippingFrom2.findElement(By.css(`option[value="${shippingFromValue2}"]`)).click();
    
    //Shipping To
    const shippingTo2 = await webFormSection.findElement(By.xpath('//*[@id="rates.inputs.destination"]'));
    const shippingToValue2 = '14';
    await shippingTo2.findElement(By.css(`option[value="${shippingToValue2}"]`)).click();

    //Parcel weight
    const parcelWeight2 = await webFormSection.findElement(By.xpath('//*[@id="rates.inputs.weight"]'));
    await parcelWeight2.sendKeys('1.5');

    //click calculate
    const calculateButton2 = await webFormSection.findElement(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div/section[1]/div[1]/div[2]/form/button'));
    await calculateButton2.click();

    //chceck element displayed
    const noCourierMsg = await driver.wait(until.elementLocated(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div/section[1]/div[2]/div/div/div[2]/div/div/div/p[1]')), { timeout: 50000 });
    const isDisplayed = await noCourierMsg.isDisplayed();
    expect(isDisplayed).to.equal(true);
    } catch(error){
        console.error(error);
    }
  });

  it('Test 05: Verify after click on “Calculate” button with correct input, will show a link “Schedule a call with our shipping experts”', async function() {
    try{
        await driver.get(url);
        const WebFormSection = await driver.wait(until.elementLocated(By.className('c-rates-calculator-section__inputs')), { timeout: 300000 });
        const mainWindowHandle = await driver.getWindowHandle();
        const windowHandles = await driver.getAllWindowHandles();
        for (const handle of windowHandles) {
            if (handle !== mainWindowHandle) {
              await driver.switchTo().window(handle);
              break;
            }
        }
        await driver.close();
        await driver.switchTo().window(mainWindowHandle);
        
       //shipping From
        const webFormSection = await driver.findElement(By.className('c-rates-calculator-section__inputs'));
        const shippingFrom = await webFormSection.findElement(By.xpath('//*[@id="rates.inputs.origin"]'));
        const shippingFromValue = '54';
        await shippingFrom.findElement(By.css(`option[value="${shippingFromValue}"]`)).click();
        //Shipping From Zip
        const shippingZip = await webFormSection.findElement(By.xpath('//*[@id="rates.inputs.origin-zip-code"]'));
        await shippingZip.sendKeys('10001');
        
        //Shipping To
        const shippingTo = await webFormSection.findElement(By.xpath('//*[@id="rates.inputs.destination"]'));
        const shippingToValue = '14';
        await shippingTo.findElement(By.css(`option[value="${shippingToValue}"]`)).click();
    
        //Parcel weight
        const parcelWeight = await webFormSection.findElement(By.xpath('//*[@id="rates.inputs.weight"]'));
        await parcelWeight.sendKeys('1.5');
    
        //click calculate
        const calculateButton = await webFormSection.findElement(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div/section[1]/div[1]/div[2]/form/button'));
        await calculateButton.click();

         //chceck element displayed
        const shippingExpert = await driver.wait(until.elementLocated(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div/section[1]/div[2]/div/div/div[2]/div/div[4]/p/span')), { timeout: 50000 });
        const isDisplayed = await shippingExpert.isDisplayed();
        expect(isDisplayed).to.equal(true);
    } catch (error){
        console.error(error);
    }
  });


});
