var Excel = require('F:/node_modules/exceljs');
describe('Code for reset functionality for Add branches under Manage Branches ', function () {
    browser.ignoreSynchronization = true; // for non-angular websites
    it('Excel File Operations', function () {
        browser.get("http://localhost:4200/");
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);
        // create object for workbook
        var inboundWorkbook = new Excel.Workbook();
        inboundWorkbook.xlsx.readFile("F:/Jasmine/Book1.xlsx").then(function () {
            var inboundWorksheet = inboundWorkbook.getWorksheet(1);
            browser.waitForAngularEnabled(false);

            // browser.get(inboundWorksheet.getCell('A2').value);

            //element(by.name('q')).sendKeys(inboundWorksheet.getCell('A2').value);
            //element(by.name('q')).submit();

            var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount
            //console.log("total nuumber of rows : "+totalRowsIncludingEmptyRows)
            // loop till end of row
            for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {
                var cellValue = inboundWorksheet.getRow(i).getCell(i).toString();
                //console.log("Column B value from the row '"+i+"' : "+ cellValue)

                //var username = inboundWorksheet.getRow(2).getCell(1).toString();
                //console.log(username)

            }
            var loginName = inboundWorksheet.getRow(2).getCell(1).toString();
            var loginpassword = inboundWorksheet.getRow(2).getCell(2).toString();
            var branchname = inboundWorksheet.getRow(2).getCell(9).toString();
            var phone = inboundWorksheet.getRow(2).getCell(10).toString();
            var fax = inboundWorksheet.getRow(2).getCell(11).toString();
            var address = inboundWorksheet.getRow(2).getCell(12).toString();
            var street = inboundWorksheet.getRow(2).getCell(13).toString();
            var zip = inboundWorksheet.getRow(2).getCell(14).toString();
            var notes = inboundWorksheet.getRow(2).getCell(15).toString();
            var default_locale = inboundWorksheet.getRow(2).getCell(16).toString();
            var default_timezone = inboundWorksheet.getRow(2).getCell(17).toString();
            var select_currency = inboundWorksheet.getRow(2).getCell(18).toString();
            var language = inboundWorksheet.getRow(2).getCell(19).toString();

            var defbranchname = inboundWorksheet.getRow(3).getCell(9).toString();
            var defphone = inboundWorksheet.getRow(3).getCell(10).toString();
            var deffax = inboundWorksheet.getRow(3).getCell(11).toString();
            var defaddress = inboundWorksheet.getRow(3).getCell(12).toString();
            var defstreet = inboundWorksheet.getRow(3).getCell(13).toString();
            var defzip = inboundWorksheet.getRow(3).getCell(14).toString();
            var defnotes = inboundWorksheet.getRow(3).getCell(15).toString();
            var dedefault_locale = inboundWorksheet.getRow(3).getCell(16).toString();
            var dedefault_timezone = inboundWorksheet.getRow(3).getCell(17).toString();
            var deselect_currency = inboundWorksheet.getRow(3).getCell(18).toString();
            var delanguage = inboundWorksheet.getRow(3).getCell(19).toString();

            //console.log(username);
            var username = element(by.name('userName'));
            username.sendKeys(loginName);
            //console.log(loginpassword);
            var userpassword = element(by.name('password'));
            userpassword.sendKeys(loginpassword);


            var loginBtn = element(by.id('login'));
            loginBtn.click();
            browser.manage().timeouts().implicitlyWait(300000);

            var ele = element(by.xpath('//div/ul/li[2]/a/div/i'));
            browser.actions().mouseMove(ele).perform();
            browser.manage().timeouts().setScriptTimeout(160000);


            var clickManagebranch = element(by.linkText('Manage Branches'));
            browser.actions().mouseMove(clickManagebranch).click().perform();

            //code to click on Add new Branches
            var clickaddnewbranch = element(by.id('addbranch'));
            browser.actions().mouseMove(clickaddnewbranch).click().perform();
            browser.sleep(5000);
            //code for add branches fields
            var addbranchname = element(by.id('branchname'));
            addbranchname.sendKeys(branchname);


            if (!expect(addbranchname.getAttribute('value')).toEqual(defbranchname))
            {
                console.log("values are  reset to default values:", defbranchname);
            }
            else
            {
                console.log("values are reset to default values:", defbranchname);
            }


            browser.sleep(2000);

            var enterphn = element(by.id('phone'));
            enterphn.sendKeys(phone);


            if (!expect(enterphn.getAttribute('value')).toEqual(defphone))
            {
                console.log("values are  reset to default values:", defphone);
            }
            else
            {
                console.log("values are reset to default values:", defphone);
            }
            browser.sleep(2000);
            var enterfax = element(by.name('fax'));
            enterfax.sendKeys(fax).click();


            if (!expect(enterfax.getAttribute('value')).toEqual(deffax))
            {
                console.log("values are  reset to default values:", deffax);
            }
            else
            {
                console.log("values are reset to default values:", deffax);
            }


            browser.sleep(2000);
            var enteraddress = element(by.name('address'));
            enteraddress.sendKeys(address);


            if (!expect(enteraddress.getAttribute('value')).toEqual(defaddress))
            {
                console.log("values are  reset to default values:", defaddress);
            }
            else
            {
                console.log("values are reset to default values:", defaddress);
            }

            browser.sleep(2000);
            var enterstreet = element(by.name('street'));
            enterstreet.sendKeys(street);


            if (!expect(enterstreet.getAttribute('value')).toEqual(defstreet))
            {
                console.log("values are  reset to default values:", defstreet);
            }
            else
            {
                console.log("values are reset to default values:", defstreet);
            }

            browser.sleep(2000);
            var enterzipcode = element(by.name('zipcode'));
            enterzipcode.sendKeys(zip);
            browser.actions().mouseMove(enterzipcode).click().perform();


            if (!expect(enterzipcode.getAttribute('value')).toEqual(defzip))
            {
                console.log("values are  reset to default values:", defzip);
            }
            else
            {
                console.log("values are reset to default values:", defzip);
            }

            browser.sleep(2000);

            var enterdescription = element(by.name('notes'));
            enterdescription.sendKeys(notes);


            if (!expect(enterdescription.getAttribute('value')).toEqual(defnotes))
            {
                console.log("values are  reset to default values:", defnotes);
            }
            else
            {
                console.log("values are reset to default values:", defnotes);
            }
            browser.sleep(2000);


            //code for Locale settings
            //option[contains(text(),'sq_AL, Albanian (Albania)')]
            var selectdefaultlocale = element(by.xpath("//select[@name='defaultLocale']"));
            var value1 = element(by.xpath("//option[contains(text(),'" + default_locale + "')]")).click();

            if (!expect(value1.getText()).toEqual(dedefault_locale))
            {
                console.log("values are  reset to default values:", dedefault_locale);
            }
            else
            {
                console.log("values are reset to default values:", dedefault_locale);
            }

            browser.sleep(2000);

            var selectdeafulttimezone = element(by.xpath("//select[@name='defTimeZone']"));
            var value2 = element(by.xpath("//option[contains(text(),'" + default_timezone + "')]")).click();

            if (!expect(value2.getText()).toEqual(dedefault_timezone))
            {
                console.log("values are  reset to default values:", dedefault_timezone);
            }
            else
            {
                console.log("values are reset to default values:", dedefault_timezone);
            }


            browser.sleep(2000);

            var selectcurrency = element(by.xpath("//select[@name='currencyLocale']"));
            var value3 = element(by.xpath("//option[contains(text(),'" + select_currency + "')]")).click();

            if (!expect(value3.getText()).toEqual(deselect_currency))
            {
                console.log("values are  reset to default values:", deselect_currency);
            }
            else
            {
                console.log("values are reset to default values:", deselect_currency);
            }

            browser.sleep(2000);


            var selectlanguage = element(by.xpath("//select[@name='language']"));
            var value4 = element(by.xpath("//option[contains(text(),'" + language + "')]")).click();

            if (!expect(value4.getText()).toEqual(delanguage))
            {
                console.log("values are  reset to default values:", delanguage);
            }
            else
            {
                console.log("values are reset to default values:", delanguage);
            }


            browser.sleep(2000);

            var clickreset = element(by.buttonText('Reset'));
            clickreset.click();

            var clickcancel = element(by.buttonText('Cancel'));
            clickcancel.click();


        });

    });
});