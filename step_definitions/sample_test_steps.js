const {Given, When, Then} = require('cucumber');
const EC = protractor.ExpectedConditions;
const WAIT_TIME = 15000;
const {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(90 * 1000);


Given(/^user launches the application url under test$/, () =>
    browser.driver.get(browser.params.baseUrl)
        .then(() => console.log(
            `Launched the application under test:  ${browser.params.baseUrl}
            Testing in Browser:  ${browser.params.browserName}`
            )
        )
    );

Then(/^verify the page loaded$/, () => {
    console.log('*******verify the page loaded******');
    return testHelperPO.isElementPresent(element(by.css("input.gLFyf.gsfi123")));
});
