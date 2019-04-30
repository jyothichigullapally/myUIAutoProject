"use strict";
const EC = protractor.ExpectedConditions;
const testHelperPo = {};
const WAIT_TIME = 15000;
const path = require('path');
const fs = require('fs');
const loremIpsum = require('lorem-ipsum');
const fakeText = loremIpsum({units: 'words', count: 100});
const dragula = require("../common_utils/dragula.js");
const drag = require("../common_utils/drag.js");

testHelperPo.isElementPresent = (element) => browser.wait(EC.visibilityOf(element), WAIT_TIME)
// .then(() => Promise.resolve())
    .catch(err => {
        err.locator = element.locator().toString();
        console.log('inside catch block of testHelperPo.isElementPresent:', err.locator);
        return Promise.reject(err);
    });

testHelperPo.isElementNotPresent = (element) =>
    browser.wait(EC.visibilityOf(element), WAIT_TIME)
        .then(
            // successCallback
            () => {
                const err = new Error('Element is present for isElementNotPresent');
                err.locator = element.locator().toString();
                return Promise.reject(err);
            },
            // errorCallback
            () => Promise.resolve()
        );
testHelperPo.isElementInvisible = (element) =>
    browser.wait(EC.invisibilityOf(element), WAIT_TIME)
        .catch(err => {
            err.locator = element.locator().toString();
            console.log('inside catch block of testHelperPo.isElementInvisible:', err.locator);
            return Promise.reject(err);
        });

testHelperPo.isElementVisible = (element) =>
    browser.wait(element.isPresent(), WAIT_TIME)
        .then(() => browser.wait(element.isDisplayed(), WAIT_TIME))
        .catch((err) => {
            console.log('inside catch block of testHelperPo.isElementVisible:: ');
            return Promise.reject(err);
        });

testHelperPo.elementToBeClickable = (element) =>
    testHelperPo.isElementPresent(element)
        .then(() => element.click())
        .catch((err) => Promise.reject(err));

testHelperPo.getText = (element) =>
    testHelperPo.isElementPresent(element)
        .then(() => element.getText())
        .catch((err) => {
            err.locator = element.locator().toString();
            console.log('testHelperPo.getText catchblock: Element Not Found ', err.locator);
            return Promise.reject(err);
        });

testHelperPo.verifyText = (element, txt) => testHelperPo.getText(element)
    .then((elementTxt) => {
        console.log('testHelperPo.verifyText then block: Actual: ' + elementTxt + ' Expected: ' + txt);
        expect(elementTxt.trim()).to.equal(txt.trim())
    })
    .catch((err) => {
        err.locator = element.locator().toString();
        console.log('testHelperPo.verifyText: catchblock: ', err.locator);
        return Promise.reject(err);
    });

testHelperPo.sendKeys = (element, something) =>
    testHelperPo.isElementPresent(element)
        .then(() => {
            element.clear();
            element.sendKeys(something);
        })
        .catch(() => Promise.reject('Element is not present')
        );

testHelperPo.clear = (element) =>
    testHelperPo.isElementPresent(element)
        .then(() => {
            element.clear();
            element.sendKeys(' ');
            element.sendKeys(protractor.Key.BACK_SPACE);
        })
        .catch((err) => Promise.reject(err)
        );

testHelperPo.enterRandomString = (element, charLength) => testHelperPo.sendKeys(element, fakeText.substring(0, charLength));

testHelperPo.scrollIntoView = (element) =>
    testHelperPo
        .isElementPresent(element)
        .then(() => browser.executeScript("arguments[0].scrollIntoView()", element.getWebElement()));

testHelperPo.dragAndDrop = (element, dropElement) =>
    testHelperPo
        .isElementPresent(element)
        .then(() => element.getAttribute('draggable'))
        .then(
            chk =>
                chk !== null
                    ? browser.executeScript(
                        drag,
                        element.getWebElement(),
                        dropElement.getWebElement()
                    )
                    : browser.executeScript(
                        dragula,
                        element.getWebElement(),
                        dropElement.getWebElement()
                    )
        )
        .then(() =>
            browser
                .actions()
                .mouseMove(dropElement)
                .mouseUp()
                .perform()
        );

testHelperPo.uploadFile = (fileName) => {
    const filePath = path.resolve(__dirname, fileName);
    const inputEle = $('input[type="file"]');
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (rslt) => {
            if (rslt == null) {
                console.log('File exists: ', filePath);
                inputEle.sendKeys(filePath);
                resolve(true);
            } else {
                const msg = rslt.code == 'ENOENT' ? 'File does not exist!!!' : `Some other error: ${rslt.code}`;
                console.error(msg);
                reject(msg);
            }
        });
    });
};
//this function may change bases on the implementation
testHelperPo.checkForRequiredIndicator = (element) =>
    testHelperPo.isElementPresent(element)
        .then(() => expect(element.getAttribute("required")).to.equal(true))
        .catch((err) => Promise.reject(err));
//this function may change bases on the implementation
testHelperPo.chkEnabled = (element) =>
    testHelperPo.isElementPresent(element)
        .then(() => element.isEnabled().then((chk) => expect(chk).to.equal(true)))
        .catch((err) => Promise.reject(err));
// this function may change bases on the implementation
testHelperPo.chkDisabled = (element) =>
    testHelperPo.isElementPresent(element)
        .then(() => element.isEnabled().then((chk) => expect(chk).to.equal(false)))
        .catch((err) => Promise.reject(err));
testHelperPo.getValue = (element) =>
    testHelperPo.isElementPresent(element)
        .then(() => element.getAttribute('value'))
        .catch((err) => {
            err.locator = element.locator().toString();
            console.log('testHelperPo.getValue catchblock: Element Not Found ', err.locator);
            return Promise.reject(err);
        });
testHelperPo.verifyValue = (element, expVal) =>
    testHelperPo.getValue(element)
        .then((actVal) => {
            console.log('testHelperPo.verifyvalue then block: Actual: ' + actVal + ' Expected: ' + expVal);
            expect(actVal).to.equal(expVal)
        });
testHelperPo.verifyValueLength = (element, charLength) =>
    testHelperPo.getValue(element)
        .then((actVal) => {
            console.log(`testHelperPo.verifyValueLength .then block: Actual size: ${actVal.length} Expected:${charLength}`);
            expect(actVal.length).to.equal(charLength);
        });

testHelperPo.createFakeText = length =>
     fakeText.substring(0, length);

testHelperPo.getCurrentDateTime = () => {
    const today = new Date();
    const tDate = `${(today.getMonth() + 1)}-${today.getDate()}-${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;
    return tDate;
};
testHelperPo.getAttribute = (element, attrName) =>
    testHelperPo.isElementPresent(element)
        .then(() => element.getAttribute(attrName))
        .catch((err) => Promise.reject(err));

testHelperPo.getCssValue = (element, cssValue) =>
    testHelperPo.isElementPresent(element)
        .then(() => element.getCssValue(cssValue))
        .catch((err) => Promise.reject(err));

module.exports = testHelperPo;
