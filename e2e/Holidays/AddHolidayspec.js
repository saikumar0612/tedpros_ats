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

          
            global.holidayname = inboundWorksheet.getRow(2).getCell(13).toString();
            global.date = inboundWorksheet.getRow(3).getCell(14).toString();
            global.day = inboundWorksheet.getRow(2).getCell(15).toString();
             
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

    it('Enter the Holiday Name', function () {
        var enterholidayname = element(by.xpath("//input[@placeholder='Enter Name']"));
      enterholidayname.sendKeys(holidayname);
        browser.sleep(1000);
    });



    it('Enter the Holiday Date', function () {
     

        var enterdate = element(by.xpath("//input[@id='date']"));
        enterdate.sendKeys(date);
        browser.sleep(1000);

    });



    it('Select the Holiday Full/Half', function () {
	   var selectdays =  element(by.xpath("//select[@name='day']"));
	    selectdays.click();
		
	//   var selectdays = element(by.xpath("//select[@name='day']//option[text()='"+day+"']"));
        var selectdays = element(by.xpath("//select[@name='day']//option[contains(text(),'Full Day')]"));
        selectdays.click();

            browser.sleep(1000);
    });


    it('Click For Checkbox', function () {
      var selectcheckbox = element(by.css("input[type=checkbox]"));
	  browser.actions().mouseMove(selectcheckbox).click().perform();
	  //selectcheckbox.click();
    browser.sleep(1000);

    });

    it('Click For Save', function () {

        var clicksavebutton = element(by.xpath("//button[1]"));
        clicksavebutton.click();
        browser.sleep(1000);
    });


    it('For successfull message', function () {
        var popup = element(by.xpath("//p[contains(text(),'Holiday added Successfully')]")).getText();
        expect(popup.getText()).toEqual(popup);
        browser.sleep(3000);
    });

 

    it('Click For View All Holidays', function () {
        var clickviewall = element(by.xpath("//a[@class='btn btn-success ml-5']"));
      clickviewall.click();
        browser.sleep(3000);
    });
	 

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
        searchdate.sendKeys(date);
    expect(searchdate.getAttribute('value')).toBe(date);
        searchdate.clear();

        browser.sleep(1000);

});


it('Search By Day', function () {
    var searchday = element(by.xpath("//input[@id='FullDay']"));
      
        searchday.click();
        searchday.sendKeys(day);
    expect(searchday.getAttribute('value')).toBe(day);
        searchday.clear();

        browser.sleep(1000);



    });


});