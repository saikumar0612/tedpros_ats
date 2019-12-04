import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { NgForOf } from '@angular/common';
import { Location , DatePipe} from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-add-vendor-contact',
  templateUrl: './add-vendor-contact.component.html',
  styleUrls: ['./add-vendor-contact.component.css']
})
export class AddVendorContactComponent implements OnInit {
  getfilterData=[];
  cusData: any = {
    address: {},
    social: {},
    personalInfo: {},
  };
  customers;
  companies;
  users;
  countries;
  states;
  cities;
  loading;
  zipError = '';
  isShowPopup;
  message;
  error;
  contacts: any = [];
  compdata = {
    companyName: '',
    primaryPhone: '',
    emailId: '',
    companyType: '',
    countryId: ''
  };
  companypopup = false;
  contactError = '';
  // patterns
  companyNamePattern;
  primaryPhonePattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailIdPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  namePattern = '^[a-zA-Z]*$';
  numberPattern = '^[0-9]{5,10}$';
  contPhError = '';
  contEmError = '';
  checker = false;
  addressPattern;
  twitterPattern;
  facebookPattern;
  linkedInPattern;
  dateError1;
  dateError;
  today;
  differenceInHours;
  diffInDays;
  age;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  log;
  logger: any = {};
  constructor(private http: Http, private router: Router, public auth: AuthenticationService,
    public service: UserService, private blocation: Location, private eventEmitter: EventEmitterService, public pattern: PatternsService) {
    this.addressPattern = this.pattern.addressPattern;
    this.twitterPattern = this.pattern.twitterPattern;
    this.facebookPattern = this.pattern.facebbokPattern;
    this.linkedInPattern = this.pattern.linkedInPattern;
    this.companyNamePattern = this.pattern.companyNamePattern;
    this.loading = true;

    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'Add Vendor Company Contact';
    this.logger.comment = 'Add new Vendor Company Contact';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitter.onRecentActivityRefresh();
      });

    // get users list
    // http.get('http://service.tedpros.com/user/all', this.options)
    this.service.getUsers()
      .subscribe(response => {
        this.users = response.json();
      },
        error => {
          console.log(error);
        });

    // get countries list
    // http.get('http://service.tedpros.com/config/country/', this.options)
    this.service.getCountries()
      .subscribe(response => {
        this.countries = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });

    this.cusData.companyType = 'vendor';

    this.cusData.address.countryId = '231';
    this.cusData.countryId = '231';
    this.change('231');
  }


  // get companies list
  getCompanies() {

    // get companies list
    // this.http.get('http://service.tedpros.com/company/vendor/', this.options)
    this.service.getVendorList()
      .subscribe(response => {
        const vendorList = response.json();
        this.companies = vendorList.data;
        this.companies.forEach(obj => {
          if(obj.status==1){
            this.getfilterData.push(obj);
          }
        })
        console.log(this.getfilterData)
        if (vendorList.statusCode.code === '200') {
          this.loading = false;
        } else {
          this.router.navigate(['/authorization/logout']);
        }
      },
      error => {
        // console.log(error);
      });

  }

  addcomp() {
    this.companypopup = true;
  }
  closecompPopup() {
    this.companypopup = false;
  }

  addcompany(emailId, countryid, primaryphone, companyname) {
    // console.log(emailId, countryid, primaryphone, companyname);
    if (emailId !== "" && countryid !== "" && primaryphone !== "" && companyname !== "") {
      this.compdata.companyName = companyname;
      this.compdata.primaryPhone = primaryphone;
      this.compdata.emailId = emailId;
      this.compdata.companyType = 'vendor';
      this.compdata.countryId = countryid;

      // console.log(this.compdata);
      this.service.addCompany(this.compdata)
        .subscribe(response => {
          // console.log(response);
          const resp = response.json();
          if (resp.statusCode.code === '200') {
            this.getCompanies();
            this.contactError = '';
            this.cusData.companyId = resp.data.id;
            this.getcontacts(resp.data.id);
            this.companypopup = false;
          } else {
            this.contactError = resp.errorMessages;
          }
        },
          error => {
            console.log(error);
          });
    }
    else {
      this.loading = false;
      this.contactError = 'Fill required Fileds';
    }



  }

  // get states list based on country id
  change(id) {
    // console.log(id);
    // this.http.get('http://service.tedpros.com/config/state/?id=' + id, this.options)
    this.service.getStates(id)
      .subscribe(response => {
        this.states = response.json().data;
        if (response.json().statusCode.code === '200') {
          this.loading = false;
        }
        else if (response.json().statusCode.code === '403') {
          this.router.navigate(['/authorization/logout']);
        }
      },
        error => {
          console.log(error);
        });
  }


  // get cities list based on state id
  state(id) {
    console.log(id);
    // this.http.get('http://service.tedpros.com/config/city/?id=' + id, this.options)
    this.service.getCities(id)
      .subscribe(response => {
        this.cities = response.json().data;
        if (response.json().statusCode.code === '200') {
          this.loading = false;
        }
        else if (response.json().statusCode.code === '403') {
          this.router.navigate(['/authorization/logout']);
        }
      },
        error => {
          console.log(error);
        });
  }

  // get contacts list based on company selected
  getcontacts(id) {
    // console.log(id);
    // this.http.get('http://service.tedpros.com/contact/companyContact?id=' + id, this.options)
    this.service.getCompanyContacts(id)
      .subscribe(response => {
        const contactList = response.json();
        this.contacts = contactList.data;
        // console.log(this.contacts);
        if (contactList.statusCode.code === '403') {
          this.router.navigate(['/authorization/logout']);          
        }
        else {
          this.loading = false;
          if (!this.contacts) {
            const contcatRef = [
              { 'id': 'Self', 'firstName': 'Self' },
              { 'id': 'Third Party', 'firstName': 'Third Party' },
            ];
            this.contacts = contcatRef;
          }
        }
      },
        error => {
          //  console.log(error);
        }
      );
  }

  getAddress() {

    const zip = this.cusData.address.zipCode;
    this.zipError = null;
    console.log(zip);
    if (zip !== null) {
      this.service.getAddress(zip)
        .subscribe(response => {
          const result = response.json();
          // console.log(result);
          if (result.statusCode.code === '200') {
            this.cusData.address.countryId = result.data.country.id;
            this.change(this.cusData.address.countryId);
            this.cusData.address.stateId = result.data.state.id;
            this.state(this.cusData.address.stateId);
            this.cusData.address.cityId = result.data.city.id;
          }
          else if (result.statusCode.code === '403') {
            this.router.navigate(['/authorization/logout']);
          }
          else {
            this.cusData.address.zipCode = '';
            this.zipError = 'Please enter a valid zip code';
            console.log('zipcode not found');
          }
        },
          error => {
            console.log(error);
          });
    }

  }
  checkContact(addComFrm: NgForm) {
    if (this.cusData.emailId === '' && this.cusData.phoneNo === '') {
      this.contPhError = 'Phone number cannot be blank';
      this.contEmError = 'Email cannot be blank';
      this.checker = false;
      console.log(this.checker);
    } else if (this.cusData.emailId === '' && this.cusData.phoneNo !== '') {
      this.contPhError = null;
      this.contEmError = 'Email cannot be blank';
      this.checker = false;
      console.log(this.checker);
    } else if (this.cusData.emailId !== '' && this.cusData.phoneNo === '') {
      this.contPhError = 'Phone number cannot be blank';
      this.contEmError = null;
      this.checker = false;
      console.log(this.checker);
    } else {
      this.contPhError = null;
      this.contEmError = null;
      const cusCtData = {
        phoneNo: this.cusData.phoneNo,
        emailId: this.cusData.emailId
      };
      this.service.checkContact(cusCtData)
        .subscribe(response => {

          const resp = response.json();
          if (resp.statusCode.code === '409') {
            if (resp.errorMessages === 'Email cannot be duplicate') {
              this.contPhError = null;
              this.contEmError = 'Email cannot be duplicate';
            } else if (resp.errorMessages === 'Phone number cannot be duplicate') {
              this.contPhError = 'Phone number cannot be duplicate';
              this.contEmError = null;
            } else if (resp.errorMessages === 'Phone number and Email cannot be duplicate') {
              this.contPhError = 'Phone number cannot be duplicate';
              this.contEmError = 'Email cannot be duplicate';
            }
            this.checker = false;
            console.log(this.checker);
          } else {
            this.contPhError = null;
            this.contEmError = null;
            this.checker = true;
            if (this.cusData.isApprover) {
              const reqInfo = {
                firstName: this.cusData.firstName,
                lastName: this.cusData.lastName,
                email: this.cusData.emailId,
                contactType: this.cusData.companyType
              };
              this.service.approverLogin(reqInfo)
                .subscribe(approverLogin => {
                  console.log(approverLogin.json());
                  const res = approverLogin.json();
                  if (res.statusCode.code === '200') {
                    this.cusData.userId = res.userId;
                    console.log(this.cusData.userId);
                    this.addCom(addComFrm);
                  } else {
                    this.error = res.errorMessages;
                    this.loading = false;
                    this.isShowPopup = true;
                    this.message = null;
                  }
                }, error => {
                  console.log(error);
                }
                );
            } else {
              this.addCom(addComFrm);
            }
          }
        },
          error => {
            console.log(error);
          });
    }
  }

  addCom(addComFrm: NgForm) {
    if (this.checker) {
      this.loading = true;
      this.cusData.personalInfo.doBirth = new DatePipe('en-US').transform(this.cusData.personalInfo.doBirth, 'yyyy-MM-dd');
      this.cusData.personalInfo.anniversary = new DatePipe('en-US').transform(this.cusData.personalInfo.anniversary , 'yyyy-MM-dd');
      console.log(this.cusData);
      this.service.addClientContacts(this.cusData)
        .subscribe(response => {
          console.log(response);
          const result = response.json();
          this.customers = result.data;
          console.log(this.customers);
          if (result.statusCode.code === '200') {
            addComFrm.resetForm();
            this.loading = false;
            this.isShowPopup = true;
            this.message = 'Vendor client Contact Added Successfully';
            this.error = null;
            // this.router.navigate(['vendors-contacts']);
          } else if (result.statusCode.code === '403') {
            this.router.navigate(['/authorization/logout']);
          } else {
            this.loading = false;
            this.isShowPopup = true;
            this.message = null;
            this.error = result.errorMessages;
          }
        },
          error => {
            console.log(error);
          });
    }
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }

  ngOnInit() {

    this.getCompanies();
  }
  
  

  //  saikumar 23/08/2019 started here
 
  

  dateValidate(){
    this.dateError="";
    this.today= new Date();
    this.differenceInHours = Date.parse(this.today) - Date.parse(this.cusData.personalInfo.doBirth);
    this.diffInDays = this.differenceInHours / 1000 / 60 / 60 / 24;
    this.age=this.diffInDays/365;
    if(this.age<14){
      this.dateError="Candidates Below the Age 14 are not eligible";
      console.log(this.dateError);
    }
  }


  dateValidate1(){
    this.dateError1="";
    this.today= this.cusData.personalInfo.doBirth;
    console.log(this.today);
    console.log(this.cusData.personalInfo.anniversary);
    this.differenceInHours =  Date.parse(this.cusData.personalInfo.anniversary) -Date.parse(this.today) ;
    console.log( this.differenceInHours);
    this.diffInDays = this.differenceInHours / 1000 / 60 / 60 / 24;
    console.log( this.diffInDays);
    this.age=this.diffInDays/365;

    console.log( this.age);
    if(this.age<14){
      this.dateError1="Min Age Difference 14 yr from Date Of Birth";
      console.log(this.dateError);
    }
  }


  // saikumar 23/08/2019 ended here

  cancel() {
    this.blocation.back();
  }

}
