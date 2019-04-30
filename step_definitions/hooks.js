const {Before, After, Status} = cucumber;
const {setDefaultTimeout} = cucumber;

Before(function() {
    setDefaultTimeout(60 * 1000);
});

After(function (scenario) {

    const world = this;
    if (scenario.result.status === Status.FAILED) {

        return browser.takeScreenshot().then(function(screenShot) {
            world.attach(screenShot, 'image/png');
        });
    }
});