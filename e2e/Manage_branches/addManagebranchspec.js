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

          
            global.branchname = inboundWorksheet.getRow(4).getCell(1).toString();
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



        //code to click on Add new Branches
        it('click on add branch button', function () {
            var clickaddnewbranch = element(by.id('addbranch'));
            browser.actions().mouseMove(clickaddnewbranch).click().perform();
            browser.sleep(5000);

           
        });


        it('Enter the branch name', function () {
            // code for add branches fields
            var addbranchname = element(by.xpath("//input[@id='branchname']"));
            addbranchname.sendKeys(branchname);

          
        });



            it('Enter the phone number', function () {
                var enterphn = element(by.xpath("//input[@id='phone']"));
                enterphn.sendKeys(Phone);
                browser.sleep(1000);
               
            });

            it('Enter the fax number', function () {
                var enterfax = element(by.xpath("//input[@id='fax']"));
                enterfax.sendKeys(Fax).click();
                browser.sleep(1000);

           
            });

            it('Enter the address', function () {
                var enteraddress = element(by.xpath("//input[@id='address']"));
                enteraddress.sendKeys(Address);
                browser.sleep(1000);

            });

            it('Enter the street', function () {
                var enterstreet = element(by.xpath("//input[@id='street']"));
                enterstreet.sendKeys(Street);
                browser.sleep(1000);

               
            });

            it('select the country', function () {
                var countr = element(by.xpath("//select[@id='country']"));
                countr.click();
                element(by.xpath("//select[@id='country']//option[contains(text(),'" + Country + "')]")).click();
                // element(by.xpath("//select[@id='country']//option[contains(text(),'United States')]"));
                browser.sleep(2000);

               
            });

            it('select the states', function () {
                var states = element(by.xpath("//select[@id='state']"));
                states.click();
                element(by.xpath("//select[@id='state']//option[contains(text(),'" + State +"')]")).click();
                // element(by.xpath("//select[@id='state']//option[contains(text(),'Alabama')]")).click();
                browser.sleep(2000);

             
            });


            it('select the cities', function () {
                var citys = element(by.xpath("//select[@id='city']"));
                citys.click();
                element(by.xpath("//select[@id='city']//option[contains(text(),'" + City +"')]")).click();
                // element(by.xpath("//select[@id='city']//option[contains(text(),'Alabaster')]")).click();
                browser.sleep(2000);

               
            });


            it('Enter the zipcode', function () {
                var enterzipcode = element(by.xpath("//input[@id='zipcode']"));
                enterzipcode.sendKeys(ZipCode);
                //browser.actions().mouseMove(enterzipcode).click().perform();
                browser.sleep(2000);

               
            });

            it('Enter the description', function () {
                var enterdescription = element(by.xpath("//textarea[@id='notes']"));
                
                enterdescription.sendKeys(Notes);

                browser.sleep(2000);

               
            });

    it('select the Default Locale ', function () {
        var defaultLocale = element(by.xpath("//select[@id='defaultLocale']"));
        defaultLocale.click();
       
        element(by.xpath("//select[@id='defaultLocale']//option[contains(text(),'af, Afrikaans')]")).click();
        browser.sleep(2000);
    });

    it('select the Default TimeZone', function () {
        var TimeZone = element(by.xpath("//select[@id='defTimeZone']"));
        TimeZone.click();

        element(by.xpath("//select[@id='defTimeZone']//option[contains(text(),'Africa/Abidjan')]")).click();
        browser.sleep(2000);
    });

    it('select the currencyLocale', function () {
        var currencyLocale = element(by.xpath("//select[@id='currencyLocale']"));
        currencyLocale.click();

        element(by.xpath("//select[@id='currencyLocale']//option[contains(text(),'Dollars - America')]")).click();
        browser.sleep(2000);
    });

    it('select the language', function () {
        var language = element(by.xpath("//select[@id='language']"));
        language.click();

        element(by.xpath("//select[@id='language']//option[contains(text(),'Emilian')]")).click();
        browser.sleep(2000);
    });

    


        it('code to click on save button', function () {
            var cliksavebutton = element(by.buttonText('Save'));
            cliksavebutton.click();

            browser.sleep(2000);
          
        });

        it('verify pop up message and click view all', function () {
            var popup = element(by.xpath("//p[@class='bg-success']")).getText();
            expect(popup.getText()).toEqual(popup);

            var clickpopupmessage = element(by.xpath("//a[@id='Branches']"));
            console.log(clickpopupmessage);
            clickpopupmessage.click();

            browser.sleep(2000);
            
        });



    });
