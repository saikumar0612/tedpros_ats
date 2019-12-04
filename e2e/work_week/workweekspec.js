
   describe('Code for workweek under config', function() {

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
    it('click on Work week', function () {


        var clickOnHolidays = element(by.linkText('Work week'));
        clickOnHolidays.click();

        browser.sleep(1000);
    });



    it('click on Edit', function () {

        var clickeditbutton = element(by.xpath("//button[contains(@class,'mlr-5')]"));
       clickeditbutton.click();

            browser.sleep(3000);
        
    });



    it('selectmonday', function () {
    var selectmonday = element(by.xpath("//select[@id='selectMonday']"));
    selectmonday.click();
	    //selectmonday.click();
		browser.manage().timeouts().implicitlyWait(1300000);

            //element(by.xpath("//select[@id='selectMonday']//option[text()='"+daymonday+"']")).click();
        element(by.xpath("//select[@name='monday']//option[@value='2']")).click();
    });
	  // console.log(daymonday);
    it('selectTuesday', function () {
	  var selectTuesday =  element(by.xpath("//select[@name='tuesday']"));
	    selectTuesday.click();
		browser.manage().timeouts().implicitlyWait(1300000);
 
	   //element(by.xpath("//select[@name='tuesday']//option[text()='"+daytuesday+"']")).click();
        element(by.xpath("//select[@name='tuesday']//option[@value='2']")).click();
    });

    it('selectwednesday', function () {
	   var selectwed =  element(by.xpath("//select[@name='wednesday']"));
	    selectwed.click();
		browser.manage().timeouts().implicitlyWait(1300000);
        element(by.xpath("//select[@name='wednesday']//option[@value='2']")).click();
	   //element(by.xpath("//select[@name='wednesday']//option[text()='"+daywednesday+"']")).click();
    });

    it('selectthursday', function () {
	    var selectThru =  element(by.xpath("//select[@name='thursday']"));
	    selectThru.click();
		browser.manage().timeouts().implicitlyWait(1300000);
        element(by.xpath("//select[@name='thursday']//option[@value='2']")).click();
	   //element(by.xpath("//select[@name='thursday']//option[text()='"+daythrusday+"']")).click();
    });

    it('selectfriday', function () {
	    var selectFri =  element(by.xpath("//select[@name='friday']"));
	    selectFri.click();
		browser.manage().timeouts().implicitlyWait(1300000);
        element(by.xpath("//select[@name='friday']//option[@value='2']")).click();
	   //element(by.xpath("//select[@name='friday']//option[text()='"+dayfriday+"']")).click();
    });


    it('selectsaturday', function () {
	    var selectSat =  element(by.xpath("//select[@name='saturday']"));
	    selectSat.click();
		browser.manage().timeouts().implicitlyWait(1300000);
        element(by.xpath("//select[@name='saturday']//option[@value='2']")).click();
	   //element(by.xpath("//select[@name='saturday']//option[text()='"+daysat+"']")).click();
    });

    it('selectsunday', function () {
	    var selectSun =  element(by.xpath("//select[@name='sunday']"));
	    selectSun.click();
		browser.manage().timeouts().implicitlyWait(1300000);
    
	   //element(by.xpath("//select[@name='sunday']//option[text()='"+daysun+"']")).click();
    element(by.xpath("//select[@name='sunday']//option[@value='2']")).click();
    });

    it('click on save', function () {
        var clicksave = element(by.xpath("//button[contains(text(),'Save')]"));
        clicksave.click();
    });
   


    it('For Verfing successfull message', function () {
        var popup = element(by.xpath("//p[contains(text(),'WorkWeek Updated Successfully')]")).getText();
        expect(popup.getText()).toEqual(popup);
        browser.sleep(3000);
    });

    it('View work Week', function () {
        var clickpopupmessage = element(by.xpath(" //a[@id='viewworkweek']"));
            //console.log(clickpopupmessage);
            clickpopupmessage.click();
        browser.sleep(3000);

       
		 });

	 });
