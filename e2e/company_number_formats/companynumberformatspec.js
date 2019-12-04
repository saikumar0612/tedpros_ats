var Excel = require('H:/Jasmine/node_modules/exceljs');
        // create object for workbook
            var inboundWorkbook = new Excel.Workbook();
            inboundWorkbook.xlsx.readFile("H:/Jasmine/ConfigModule/company_number_formats/configmodule.xlsx").then(function () {
            var inboundWorksheet = inboundWorkbook.getWorksheet(1);
            browser.waitForAngularEnabled(false);

            var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount

            for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {
                var cellValue = inboundWorksheet.getRow(i).getCell(i).toString();

            }

            global.BASolutionsEmployeePrefix = inboundWorksheet.getRow(2).getCell(1).toString();
            global.ClientCompanyPrefix = inboundWorksheet.getRow(2).getCell(2).toString();
            global.VendorCompanyPrefix = inboundWorksheet.getRow(2).getCell(3).toString();
            global.ClientEmployeePrefix = inboundWorksheet.getRow(2).getCell(4).toString();
            global.VendorEmployeePrefix = inboundWorksheet.getRow(2).getCell(5).toString();
            global.InvoicePrefix = inboundWorksheet.getRow(2).getCell(6).toString();
           
            global.BASolutionsEmployeeNumber = inboundWorksheet.getRow(2).getCell(7).toString();
            global.ClientCompanyNumber = inboundWorksheet.getRow(2).getCell(8).toString();
            global.VendorCompanyNumber = inboundWorksheet.getRow(2).getCell(9).toString();
            global.ClientEmployeeNumber = inboundWorksheet.getRow(2).getCell(10).toString();
            global.VendorEmployeeNumber = inboundWorksheet.getRow(2).getCell(11).toString();
            global.InvoiceNumber = inboundWorksheet.getRow(2).getCell(12).toString();
           
           

           

     
         
    
        });

   describe('Code for company number formate  under config', function() {

    browser.ignoreSynchronization = true; // for non-angular websites
    it('open the browser', function () {
    browser.get(browser.params.url);
    browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(30000);


    });
      
     
    it('Enter the username', function () {
        var username = element(by.name('userName'));
        username.sendKeys(browser.params.user_name);
       
    });

    it('Enter the password', function () {
        var userpassword = element(by.name('password'));
        userpassword.sendKeys(browser.params.user_password);
       

    });

    it('click on login button', function () {
        var loginBtn = element(by.id('login'));
        loginBtn.click();
        browser.manage().timeouts().implicitlyWait(300000);

    });

    browser.sleep(2000);

    it('Mouse hover CRM icon', function () {

        var ele = element(by.xpath('//app-top-menu//div[1]/ul/li[2]/a'));
        browser.actions().mouseMove(ele).perform();

        browser.manage().timeouts().setScriptTimeout(60000);


    });
    it('click on company Number Formats', function () {


        var clickOnCompanyNumberFormats= element(by.linkText('Company Number Formats'));
        clickOnCompanyNumberFormats.click();

        browser.sleep(1000);
    });

    it('Enter the UserEmployeePrefix', function () {
        var UserEmployeePrefix = element(by.xpath("//input[@id='userprefix']"));
        UserEmployeePrefix.click();
        browser.sleep(1000);
        UserEmployeePrefix.clear();
        browser.sleep(1000);
        UserEmployeePrefix.sendKeys(BASolutionsEmployeePrefix);
        browser.sleep(1000);
    });


    it('Enter the UserEmployeeNumber', function () {
        var UserEmployeeNumber = element(by.xpath("//input[@id='usernumber']"));
        UserEmployeeNumber.click();
        browser.sleep(1000);
        UserEmployeeNumber.clear();
        browser.sleep(1000);
        UserEmployeeNumber.sendKeys(BASolutionsEmployeeNumber);
        browser.sleep(1000);
    });

    it('Enter the Client Company Prefix', function () {
        var enterClientCompanyPrefix = element(by.xpath("//input[@id='companyprefix']"));
        enterClientCompanyPrefix.click();
        browser.sleep(1000);
        enterClientCompanyPrefix.clear();
        browser.sleep(1000);
        enterClientCompanyPrefix.sendKeys(ClientCompanyPrefix);
        browser.sleep(1000);
    });

    it('Enter the Client Company Number', function () {
        var enterCompanyNumber = element(by.xpath("//input[@id='companyprefixNumber']"));
        enterCompanyNumber.click();
        browser.sleep(1000);
        enterCompanyNumber.clear();
        browser.sleep(1000);
        enterCompanyNumber.sendKeys(ClientCompanyNumber);
        browser.sleep(1000);
    });
    
    it('Enter the Vendor Company Prefix', function () {
        var vendorcompanyfix = element(by.xpath("//input[@id='vendorcompanyprefix']"));
        vendorcompanyfix.click();
        browser.sleep(1000);
        vendorcompanyfix.clear();
        browser.sleep(1000);
        vendorcompanyfix.sendKeys(VendorCompanyPrefix);
        browser.sleep(1000);
    });
            

    it('Enter the Vendor Company Number', function () {
        var vendorcompanyNumb = element(by.xpath("//input[@id='vendorcompanyprefixNumber']"));
        vendorcompanyNumb.click();
        browser.sleep(1000);
        vendorcompanyNumb.clear();
        browser.sleep(1000);
        vendorcompanyNumb.sendKeys(VendorCompanyNumber);
        browser.sleep(1000);
    });

    it('Enter the Client Employee Prefix', function () {
        var ClientEmployeePre = element(by.xpath("//input[@id='userPrefix']"));
        ClientEmployeePre.click();
        browser.sleep(1000);
        ClientEmployeePre.clear();
        browser.sleep(1000);
        ClientEmployeePre.sendKeys(ClientEmployeePrefix);
        browser.sleep(1000);
    });


    it('Enter the Client Employee Number', function () {
        var ClientEmployeeNu = element(by.xpath("//input[@id='userPrefixNumber']"));
        ClientEmployeeNu.click();
        browser.sleep(1000);
        ClientEmployeeNu.clear();
        browser.sleep(1000);
        ClientEmployeeNu.sendKeys(ClientEmployeeNumber);
        browser.sleep(1000);
    });

    it('Enter the Vendor Employee Prefix', function () {
        var vendorEmployee = element(by.xpath("//input[@id='vendorEmployee']"));
        vendorEmployee.click();
        browser.sleep(1000);
        vendorEmployee.clear();
        browser.sleep(1000);
        vendorEmployee.sendKeys(VendorEmployeePrefix);
        browser.sleep(1000);
    });

    it('Enter the Vendor Employee Number', function () {
        var VendorEmpl = element(by.xpath("//input[@id='vendorEmployeeNumber']"));
        VendorEmpl.click();
        browser.sleep(1000);
        VendorEmpl.clear();
        browser.sleep(1000);
        VendorEmpl.sendKeys(VendorEmployeeNumber);
        browser.sleep(1000);
    });



    it('Enter the Invoice Prefix', function () {
        var InvoicePre = element(by.xpath("//input[@id='invoicePrefix']"));
        InvoicePre.click();
        browser.sleep(1000);
        InvoicePre.clear();
        browser.sleep(1000);
        InvoicePre.sendKeys(InvoicePrefix);
        browser.sleep(1000);
    });

    it('Enter the Vendor Invoice Number', function () {
        var InvoiceNum = element(by.xpath("//input[@id='invoicePrefixNumber']"));
        InvoiceNum.click();
        browser.sleep(1000);
        InvoiceNum.clear();
        browser.sleep(1000);
        InvoiceNum.sendKeys(InvoiceNumber);
        browser.sleep(1000);
    });

    it('click on submit', function () {

            var cliksubmitbutton = element(by.buttonText('Submit'));
            cliksubmitbutton.click();
        browser.sleep(1000);
    });
        

    it('click For Close Popup', function () {
        var clickclose = element(by.xpath("//button[@id='closePopup']"));
            //console.log(clickpopupmessage);
            clickclose.click();
       

        });

});

