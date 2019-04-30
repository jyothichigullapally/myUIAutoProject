const path = require('path');
const basePath = path.resolve(__dirname, '../Download');
const fs = require('fs');
// const HttpClient = require("protractor-http-client").HttpClient;
exports.config = {
    directConnect: true,
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
    // Capabilities to be passed to the webdriver instance.
    multiCapabilities: [
        {
            browserName: 'chrome',
            count: 1,
            shardTestFiles: false,

            maxInstances: 1,
            'chromeOptions': {
                'args': ['--disable-web-security', '--ignore-autocomplete-off-autofill', 'disable-infobars'],
                prefs: {
                    'download': {
                        'prompt_for_download': false,
                        'directory_upgrade': true,
                        'default_directory': basePath
                    }
                }
            }
        }
    ],
    plugins: [{
        package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
        options: {
            automaticallyGenerateReport: true,
            removeExistingJsonReportFile: true,
            removeOriginalJsonReportFile: true,
            reportPath: './reports',
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
        const reportsPath = "./reports/";
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

        testHelperPO = require('../common_utils/testHelperPo.js');

        browser.getProcessedConfig().then(data => {
            browser.params.browserName = data.capabilities.browserName;
        });
    },
    onComplete: function () {

    }

};