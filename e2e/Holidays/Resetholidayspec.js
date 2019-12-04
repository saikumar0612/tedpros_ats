var Excel = require('exceljs');



        // create object for workbook
        var inboundWorkbook = new Excel.Workbook();
inboundWorkbook.xlsx.readFile("H:/Jasmine/ConfigModule/company_number_formats/configmodule.xlsx").then(function () {
    var inboundWorksheet = inboundWorkbook.getWorksheet(1);
    browser.waitForAngularEnabled(false);

    var totalRowsIncludingEmptyRows = inboundWorksheet.rowCount
    //console.log("total nuumber of rows : "+totalRowsIncludingEmptyRows)
    // loop till end of row
    for (var i = 1; i <= totalRowsIncludingEmptyRows; i++) {
        var cellValue = inboundWorksheet.getRow(i).getCell(i).toString();
     
    }
   
    global.holidayname = inboundWorksheet.getRow(2).getCell(56).toString();
    global.selectday = inboundWorksheet.getRow(2).getCell(57).toString();
    global.selectdate = inboundWorksheet.getRow(2).getCell(58).toString();

    global.defholidayname = inboundWorksheet.getRow(3).getCell(56).toString();
    global.defselectday = inboundWorksheet.getRow(3).getCell(57).toString();
    global.defselectdate = inboundWorksheet.getRow(3).getCell(58).toString();

});

describe('Code for Reset Holiday under Config  Module', function () {
    browser.ignoreSynchronization = true; // for non-angular websites
    it('Excel File Operations', function () {
        browser.get(browser.params.url);
        // set implicit time to 30 seconds
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(30000);

    });



    it('Enter the username', function () {
        var username = element(by.name('userName'));
        //username.sendKeys(browser.params.user_name);
        username.sendKeys("admin");
    });
    it('Enter the password', function () {
        var userpassword = element(by.name('password'));
        //userpassword.sendKeys(browser.params.user_password);
        userpassword.sendKeys("Pass12!@");

    });

    it('click on login button', function () {
        var loginBtn = element(by.id('login'));
        loginBtn.click();
        browser.manage().timeouts().implicitlyWait(300000);

    });

    browser.sleep(2000);

    it('Mouse hover config icon', function () {

        var ele = element(by.xpath('//app-top-menu//div[1]/ul/li[2]/a'));
        browser.actions().mouseMove(ele).perform();

        browser.manage().timeouts().setScriptTimeout(60000);


    });
    it('click on Holidays', function () {


        var clickOnHolidays = element(by.linkText('Holidays'));
        clickOnHolidays.click();

        browser.sleep(1000);
    });

    it('click For Add Holidays', function () {
        var clickaddbutton = element(by.xpath("//*[@id='addholidays']"));
        clickaddbutton.click();

        browser.manage().timeouts().implicitlyWait(1300000);
    });


    it('For Reset Add Holidays', function () {

        var enterholidaynames = element(by.name('name'));
        enterholidaynames.sendKeys(holidayname);


        if (!expect(enterholidaynames.getAttribute('value')).toEqual(defholidayname))
            {
            console.log("values are  reset to default values", defholidayname);
            }
            else
            {
            console.log("values are reset to default values", defholidayname);
            }

    });

    it('For Reset selectDay', function () {
            var selectdays = element(by.xpath("//select[@name='day']"));
            selectdays.click();
           
        var selectdays = element(by.xpath("//select[@name='day']//option[contains(text(),'" + selectday +"')]"));
        selectdays.click();

        if (!expect(selectdays.getText()).toEqual(defselectday))
            {
            console.log("values are  reset to default values", defselectday);
            }
            else
            {
            console.log("values are reset to default values", defselectday);
            }


    });

    it('Enter the date field value', function () {

        var enterdate = element(by.xpath("//input[@id='date']"));
        enterdate.sendKeys(selectdate);


    });

   

    it('Click For Reset', function () {

            var clickresetbutton = element(by.buttonText('Reset'));
            clickresetbutton.click();
    });

    it('Click For Cancel', function () {
            var clickcancel = element(by.buttonText('Cancel'));
            clickcancel.click();
        browser.sleep(3000);
    });
            //code for search functionality

    it('Search Holiday name', function () {
            var searchname = element(by.id('Searchname'));
            searchname.click();
            searchname.sendKeys(holidayname);
        expect(searchname.getAttribute('value')).toBe(holidayname);
            searchname.clear();

            browser.sleep(1000);
    });

    it('Search By Date', function () {
            var searchdate = element(by.id('SearchDate'));
            searchdate.click();
            searchdate.sendKeys(selectdate);
        expect(searchdate.getAttribute('value')).toBe(selectdate);
            searchdate.clear();

            browser.sleep(1000);

    });


    it('Search By Day', function () {
        var searchday = element(by.xpath("//input[@id='FullDay']"));
         
            searchday.click();
            searchday.sendKeys(selectday);
        expect(searchday.getAttribute('value')).toBe(selectday);
            searchday.clear();

            browser.sleep(1000);



        });


});