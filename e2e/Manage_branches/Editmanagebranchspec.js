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

          
            global.branchname = inboundWorksheet.getRow(5).getCell(1).toString();
            global.Phone = inboundWorksheet.getRow(4).getCell(2).toString();
            global.Fax = inboundWorksheet.getRow(4).getCell(3).toString();
            global.Address = inboundWorksheet.getRow(4).getCell(4).toString();
            global.Street = inboundWorksheet.getRow(4).getCell(5).toString();
            global.Country = inboundWorksheet.getRow(4).getCell(6).toString();
            global.State = inboundWorksheet.getRow(4).getCell(7).toString();
            global.City = inboundWorksheet.getRow(4).getCell(8).toString();
            global.ZipCode = inboundWorksheet.getRow(4).getCell(9).toString();
            global.Notes = inboundWorksheet.getRow(4).getCell(10).toString();
            global.DefaultLocale = inboundWorksheet.getRow(4).getCell(11).toString();
            global.DefaultTimeZone = inboundWorksheet.getRow(4).getCell(12).toString();
            global.Currency = inboundWorksheet.getRow(4).getCell(13).toString();
            global.Language = inboundWorksheet.getRow(4).getCell(14).toString();
            global.result = inboundWorksheet.getRow(4).getCell(15).toString();
            
             
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
    it('click on Manage Branches', function () {


        var clickOnHolidays = element(by.linkText('Manage Branches'));
        clickOnHolidays.click();

        browser.sleep(1000);
    });

    // it('click on Select Branch', function () {
    //     //element.all(by.css('.nav nav-tabs justify-content-start', 'New')).getText().click();
    //     var Branch = element(by.xpath("//a[@id='ngb-tab-59']")).click();     
    // });

    it('click For editbranch', function () {

            var clickeditbtn = element(by.xpath("//button[@id='editbranch']"));
            clickeditbtn.click();
    });


    it('Edit the branch name', function () {
        var editbranchname = element(by.xpath("//input[@id='branchname']"));
        
            editbranchname.click();
            editbranchname.clear();
            editbranchname.sendKeys(branchname);
    });
            

    it('Edit the phone number', function () {
        var editphn = element(by.xpath("//input[@id='phone']"));
        
            editphn.click();
            editphn.clear();
            editphn.click();
            editphn.sendKeys(Phone);
    });


    it('Edit the fax number', function () {
        var editfax = element(by.xpath("//input[@id='fax']"));
            editfax.click();
            editfax.clear();
            editfax.sendKeys(Fax);
    });


    it('Edit the address', function () {
        var editaddress = element(by.xpath("//input[@id='address']"));
            editaddress.click();
            editaddress.clear();
        editaddress.sendKeys(Address);
    });
    
    it('Enter the street', function () {
        var editstreet = element(by.xpath("//input[@id='street']"));
            editstreet.click();
            editstreet.clear();
            editstreet.sendKeys(Street);
    });

    it('Edit the zipcode', function () {
        var editzipcode = element(by.xpath("//input[@id='zipcode']"));
            editzipcode.click();
            editzipcode.clear();
           editzipcode.sendKeys(ZipCode);
    });

    it('Edit the description', function () {
        var editdescp = element(by.xpath("//textarea[@id='notes']"));
            editdescp.click();
            editdescp.clear();
        editdescp.sendKeys(Notes);
    });
            


    it('Click For Save Changes', function () {
            var cliksavebutton = element(by.buttonText('Save'));
            cliksavebutton.click();
    });




    // it('For successfull message', function () {
    //     var popup = element(by.xpath("//p[contains(text(),'Branch deatils updated')]")).getText();
    //     expect(popup.getText()).toEqual(popup);
    //     browser.sleep(1000);
    // })
          


    it('Click For View Branches', function () {
            var clickpopupmessage = element(by.linkText('View Branches'));
           
            clickpopupmessage.click();


        });

});