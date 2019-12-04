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

          
            global.holidayname = inboundWorksheet.getRow(3).getCell(13).toString();
            global.date = inboundWorksheet.getRow(3).getCell(14).toString();
            global.day = inboundWorksheet.getRow(3).getCell(15).toString();
             
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

            browser.sleep(5000);
        });
            //code to click on view icon
    it('click on view Menu List', function () {

        var clickicon = element(by.xpath("//div[1]/table[1]/tbody[1]/tr[2]/td[2]"));
        clickicon.click();

    });

    it('click on viewholiday ', function () {

            var clickviewicon = element(by.xpath("//tr[2]//td[2]//div[1]//ul[1]//li[2]//a[1]//button[1]//i[1]"));
            clickviewicon.click();
    });


    it('click on clickclose ', function () {
            var clickclose = element(by.xpath("//a[@id='closePopup']"));
            clickclose.click();

    });

            //code to click on edit button
    
    it('click on viewmenulist ', function () {
        var clickicons = element(by.xpath("//tr[2]//td[2]"));
            clickicons.click();

    });


    it('click for Editholiday ', function () {
            var clickediticon = element(by.xpath("//tr[2]//td[2]//div[1]//div[1]//ul[1]//li[1]//a[1]//button[1]"));
            clickediticon.click();

    });

    it('click for Editholidayname ', function () {  
        var editholidayname = element(by.xpath("//input[@id='name']"));
            editholidayname.click();
            editholidayname.clear();
            editholidayname.sendKeys(holidayname);

    });



    it('Enter the Holiday Date', function () {


        var enterdate = element(by.xpath("//input[@id='date']"));
        enterdate.clear();
        browser.sleep(1000);
        enterdate.sendKeys(date);
        browser.sleep(1000);
    
    });


    it('Select the Holiday Full/Half', function () {
        var selectdays = element(by.xpath("//select[@id='day']"));
        selectdays.click();

        // var selectdays = element(by.xpath("//select[@name='day']//option[text()='"+day+"']"));
        var selectdays = element(by.xpath("//select[@id='day']//option[contains(text(),'Full Day')]"));
        selectdays.click();

        browser.sleep(1000);
    });


    it('Click For Checkbox', function () {
        var selectcheckbox = element(by.css("input[type=checkbox]"));
        browser.actions().mouseMove(selectcheckbox).click().perform();
        //selectcheckbox.click();
        browser.sleep(1000);

    });


          
    it('click for updateHoliday ', function () {  
        var clicksavebutton = element(by.xpath("//button[1]"));
        clicksavebutton.click();
        browser.sleep(1000);
    });


    it('For successfull message', function () {
        var popup = element(by.xpath("//p[contains(text(),'Holidays updated successfully')]")).getText();
        expect(popup.getText()).toEqual(popup);
        browser.sleep(1000);
    })

            it('click for View All Holidays', function () {  
                var clickviewall = element(by.xpath("//a[@class='btn btn-success ml-5']"));

                
            clickviewall.click();

                browser.sleep(3000);

        });










        
    });
