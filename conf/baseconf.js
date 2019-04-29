const path = require('path');
const basePath = path.resolve(__dirname, '../Download');
const fs = require('fs');

exports.config = {
    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    suites: {
        testSuite:[
            '../features/sampleTest.feature'
        ]
    },
    cucumberOpts: {
        require: ['../step_definitions/*.js'],
        strict: true,
        format: ['json:.tmp/results.json'],
        dryRun: false,
        compiler: [],
        plugin: ["progress"]
    },
    plugins: [{
        package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
        options: {
            automaticallyGenerateReport: true,
            removeExistingJsonReportFile: true,
            removeOriginalJsonReportFile: true,
            reportPath: '../reports',
            reportName: 'e2e_test_suite Results',
            pageTitle: 'e2e_test_suite Results',
            displayDuration: true,
            disableLog: true
        }
    }],
    params: {
        baseUrl:'https://www.google.com',
        browserName: 'chrome',
    },
    onPrepare: function () {

        const mkdirp = require('mkdirp');
        const reportsPath = "./Reports/";
        mkdirp(reportsPath, function (err) {
            if (err) {
                console.error(err);
            } else {
            }
        });
        //browser.driver.manage().window().setPosition(0, 0);
        browser.driver.manage().window().maximize();
        //browser.driver.manage().window().setSize(1920, 1080);
        browser.waitForAngularEnabled(false);

        chai = require('chai');
        chaiAsPromised = require('chai-as-promised');
        chai.use(chaiAsPromised);
        expect = chai.expect;
        cucumber = require('cucumber');


        browser.getProcessedConfig().then(data => {
            browser.params.browserName = data.capabilities.browserName;
        });
    },
    onComplete: function () {

    }

};