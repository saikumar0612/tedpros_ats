
var jasmineReporters = require('jasmine-reporters');
var htmlReporter = require('protractor-html-reporter-2');
var fs = require('fs-extra');
var path = require('path');

//console.log(path);
//var Excel = require('exceljs');


exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',

    //capabilities: {
    //    'browserName': 'chrome',
    //    'shardTestFiles': true,
    //    'maxInstances': 2
    //},


   // specs: ['F:/Jasmine/CRM/vendorcompany/Addanothervendorspec.js'],
    
    //suites:
    //{
    //    smoke: ['F:/Jasmine/CRM/ClientCompany/clientcompanyspec.js', 'F:/Jasmine/CRM/ClientCompany/Addanotherclientspec.js', 'F:/Jasmine/CRM/ClientCompany/editclientcompanyspec.js', 'F:/Jasmine/CRM/ClientCompany/clientcompanysearchspec.js', 'F:/Jasmine/CRM/ClientCompany/Clientresetspec.js',
    //        'F:/Jasmine/CRM/Clientcompanycontact/addanotherclientcompnycntspec.js', 'F:/Jasmine/CRM/Clientcompanycontact/addclientcompanycontspec.js', 'F:/Jasmine/CRM/Clientcompanycontact/clientcmnycontresetspec.js', 'F:/Jasmine/CRM/Clientcompanycontact/clientcmnycontsearchspec.js', 'F:/Jasmine/CRM/Clientcompanycontact/editclientcmnycontspec.js',
    //        'F:/Jasmine/CRM/vendorcompany/Addanothervendorspec.js', 'F:/Jasmine/CRM/vendorcompany/addvendorspec.js', 'F:/Jasmine/CRM/vendorcompany/Editvendorcompanyspec.js', 'F:/Jasmine/CRM/vendorcompany/vendorcompanysearchspec.js', 'F:/Jasmine/CRM/vendorcompany/vendorResetspec.js',
    //        'F:/Jasmine/CRM/vendorcompanycontact/Addanothervendorcmnyspec.js', 'F:/Jasmine/CRM/vendorcompanycontact/addvendorcmnycontactspec.js', 'F:/Jasmine/CRM/vendorcompanycontact/editvendorcomnycontspec.js', 'F:/Jasmine/CRM/vendorcompanycontact/vendorcmnycontresetspec.js','F:/Jasmine/CRM/vendorcompanycontact/vendorcmnycontsearchspec.js'],
       
    //},

    suites:
    {
        // smoke: ['H:/Jasmine/CRM/vendorcompany/Addanothervendorspec.js','H:/Jasmine/CRM/vendorcompany/vendorcompanysearchspec.js', 'H:/Jasmine/CRM/vendorcompany/vendorResetspec.js', 'H:/Jasmine/CRM/vendorcompanycontact/vendorcmnycontresetspec.js', 'H:/Jasmine/CRM/vendorcompanycontact/vendorcmnycontsearchspec.js',
        //     'H:/Jasmine/CRM/Clientcompanycontact/clientcmnycontresetspec.js', 'H:/Jasmine/CRM/Clientcompanycontact/clientcmnycontsearchspec.js', 'H:/Jasmine/CRM/ClientCompany/clientcompanysearchspec.js', 'H:/Jasmine/CRM/ClientCompany/Clientresetspec.js'],
        smoke: ['H:/Jasmine/ConfigModule/company_number_formats/companynumberformatspec.js'],
    },

    framework: 'jasmine2',
    params:
    {
        url: "http://162.254.209.129:4204",
      

       
        user_name: "admin",
        user_password: "Pass12!@"
    },


    onPrepare: function () {
        // Default window size
        browser.driver.manage().window().maximize();
        // Default implicit wait
        browser.manage().timeouts().implicitlyWait(60000);
        // Angular sync for non angular apps
        browser.ignoreSynchronization = true;

        fs.emptyDir('./reports/xml/', function (err) {
            // console.log(err);
        });

        fs.emptyDir('./reports/screenshots/', function (err) {
            //console.log(err);
        });

        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './reports/xml/',
            filePrefix: 'xmlresults'
        }));




        jasmine.getEnv().addReporter({
            specDone: function (result) {
                //if (result.status == 'failed') {
                browser.getCapabilities().then(function (caps) {
                    var browserName = caps.get('browserName');

                    browser.takeScreenshot().then(function (png) {
                        var stream = fs.createWriteStream('./reports/screenshots/' + browserName + '-' + result.fullName + '.png');
                        stream.write(new Buffer(png, 'base64'));
                        stream.end();
                    });
                });
                //}
            }
        });
    },

    onComplete: function () {
        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();

        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            platform = caps.get('platform');

            testConfig = {
                reportTitle: 'config',
                // console.log('dir ', path.join(__dirname, '../../'));
                //outputPath: 'F:/Jasmine/CRM/vendorcompany/reports',
                outputPath: './reports',
                outputFilename: 'ProtractorTestReport',
                screenshotPath: './reports/screenshots',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: false,
                testPlatform: platform
            };
            new htmlReporter().from('./reports/xml/xmlresults.xml', testConfig);
        });
    },

    allScriptsTimeout: 120000,
    getPageTimeout: 120000,
    maxSessions: 1,

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        onComplete: null,
        // If true, display spec names.
        isVerbose: false,
        // If true, print colors to the terminal.
        showColors: true,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 350000
    }
};

