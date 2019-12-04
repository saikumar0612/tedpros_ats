describe('Code for Company Info under Config  Module', function() {

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

        it('click on company info', function () {


            var clickOnCompanyinfo = element(by.linkText('Company Info'));
            clickOnCompanyinfo.click();

            browser.sleep(1000);

        });

        it('click on  company plans', function () {
	
            var companyplans = element(by.xpath("//a[@id='plans']"));
            companyplans.click();
            browser.sleep(1000);

        });

        it('click on  company invoices', function () {

            var companyinvoices = element(by.xpath("//a[@id='Invoices']"));
            companyinvoices.click();
        });


        it('click on  company invoice download', function () {
            var invoicedownload = element(by.xpath("//a[@id='download']"));
            invoicedownload.click();
            browser.sleep(3000);

      


     });
     

     
    });