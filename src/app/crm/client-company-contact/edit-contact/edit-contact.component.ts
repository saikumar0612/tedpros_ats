import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location, DatePipe } from '@angular/common';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  id = '';
  contactInfo: any = {
    address: {},
    social: {},
    personalInfo: {},
  };
  companies;
  loading;
  error;
  isShowPopup;
  message;
  users;
  countries;
  states;
  cities;
  contact;
  contacts = [];
  headers: any;
  options: any;
  zipError = '';
  log;
  logger: any = {};
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
  // patterns
  companyNamePattern = '^[a-z0-9_-]{8,50}$';
  primaryPhonePattern = '([+]?\d{1,3}[-])?\d{10}';
  emailIdPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  namePattern = '^[a-zA-Z]*$';
  numberPattern = '^[0-9]{5,10}$';


  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public service: UserService,
    private blocation: Location, private eventEmitter: EventEmitterService, public pattern: PatternsService) {
    this.addressPattern = this.pattern.addressPattern;
    this.twitterPattern = this.pattern.twitterPattern;
    this.facebookPattern = this.pattern.facebbokPattern;
    this.linkedInPattern = this.pattern.linkedInPattern;
    this.loading = true;

    this.route.paramMap.subscribe(
      param => {
        this.contactInfo.id = param.get('id');
        console.log(this.contactInfo.id);
      }
    );

    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'Edit Client Company Contact';
    this.logger.comment = 'Edit client Companies Contact by Id as ' + this.contactInfo.id;
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitter.onRecentActivityRefresh();
      });
    // this.http.get('http://service.tedpros.com/contact/view?id=' + this.contactInfo.id, this.options)
    this.service.getCompanyContactView(this.contactInfo.id)
      .subscribe(response => {
        const result = response.json();
        this.contactInfo = result.data;
        this.getcontacts(this.contactInfo.companyId);
        console.log(this.contactInfo);
        this.change(this.contactInfo.address.countryId);
        this.state(this.contactInfo.address.stateId);
      },
        error => {
          console.log(error);
        });
    // http.get('http://service.tedpros.com/company/customer/', this.options)
    this.service.getCompanyList()
      .subscribe(response => {
        this.companies = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });

    this.service.getUsersList()
      .subscribe(response => {
        this.users = response.json();
        this.loading = false;
      },
        error => {
          console.log(error);
        });

    // get countries list
    this.service.getCountries()
      .subscribe(response => {
        this.countries = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });

    this.contactInfo.companyType = 'customer';
  }

  // get contacts list based on company selected - sharmistha - 08-14-2019
  getcontacts(id) {
    console.log(id);
    this.service.getCompanyContacts(id)
      .subscribe(response => {
        this.contacts = response.json().data;
        console.log(this.contacts);
        this.loading = false;
        if (!this.contacts) {
          const contcatRef = [
            { 'id': 'Self', 'firstName': 'Self' },
            { 'id': 'Third Party', 'firstName': 'Third Party' },
          ];
          this.contacts = contcatRef;
        }
      },
        error => {
          console.log(error);
        }
      );
  }

  // get states list based on country id
  change(id) {
    console.log(id);
    this.service.getStates(id)
      .subscribe(response => {
        this.states = response.json().data;
        this.loading = false;
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
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }

  getAddress() {

    const zip = this.contactInfo.address.zipCode;
    this.zipError = null;
    console.log(zip);
    if (zip !== null) {
      this.service.getAddress(zip)
        .subscribe(response => {
          const result = response.json();
          // console.log(result);
          if (result.statusCode.code === '200') {
            this.contactInfo.address.countryId = result.data.country.id;
            this.change(this.contactInfo.address.countryId);
            this.contactInfo.address.stateId = result.data.state.id;
            this.state(this.contactInfo.address.stateId);
            this.contactInfo.address.cityId = result.data.city.id;
          } else {
            this.contactInfo.address.zipCode = '';
            this.zipError = 'Please enter a valid zip code';
            console.log('zipcode not found');
          }
        },
          error => {
            console.log(error);
          });
    }

  }


  // saikumar 23/08/2019 started here
  dateValidate() {
    this.dateError = "";
    this.today = new Date();
    this.differenceInHours = Date.parse(this.today) - Date.parse(this.contactInfo.personalInfo.doBirth);
    this.diffInDays = this.differenceInHours / 1000 / 60 / 60 / 24;
    this.age = this.diffInDays / 365;
    if (this.age < 14) {
      this.dateError = "Candidates Below the Age 14 are not eligible";
      console.log(this.dateError);
    }
  }

  dateValidate1() {

    this.dateError1 = "";
    this.today = this.contactInfo.personalInfo.doBirth;
    console.log(this.today);
    console.log(this.contactInfo.personalInfo.anniversary);
    this.differenceInHours = Date.parse(this.contactInfo.personalInfo.anniversary) - Date.parse(this.today);
    console.log(this.differenceInHours);
    this.diffInDays = this.differenceInHours / 1000 / 60 / 60 / 24;
    console.log(this.diffInDays);
    this.age = this.diffInDays / 365;

    console.log(this.age);
    if (this.age < 14) {
      this.dateError1 = "Min Age Difference 14 yr from Date Of Birth";
      console.log(this.dateError);
    }

  }
  //  saikumar 23/08/2019 ended here 

  ngOnInit() {

  }

  checkContact() {
    if (this.contactInfo.isApprover) {
      const reqInfo = {
        firstName: this.contactInfo.firstName,
        lastName: this.contactInfo.lastName,
        email: this.contactInfo.emailId,
        contactType: 'customer'
      };
      console.log(reqInfo);
      this.service.approverLogin(reqInfo)
        .subscribe(approverLogin => {
          console.log(approverLogin.json());
          const res = approverLogin.json();
          if (res.statusCode.code === '200') {
            this.contactInfo.userId = res.userId;
            console.log(this.contactInfo.userId);
            this.editCom();
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
      this.editCom();
    }
  }

  editCom() {
    this.loading = true;
    this.contactInfo.companyType = 'customer';
    this.contactInfo.personalInfo.doBirth = new DatePipe('en-US').transform(this.contactInfo.personalInfo.doBirth, 'yyyy-MM-dd');
    this.contactInfo.personalInfo.anniversary = new DatePipe('en-US').transform(this.contactInfo.personalInfo.anniversary, 'yyyy-MM-dd');
    console.log(this.options, this.contactInfo);
    // this.contactInfo.contactId = this.contactInfo.contactId;
    this.service.editCompanyContacts(this.contactInfo)
      .subscribe(response => {
        const resp = response.json();
        this.contact = resp.data;
        console.log(this.contact);
        if (this.contact === 'success') {
          this.loading = false;

          // this.router.navigate(['company-contacts']);
          this.isShowPopup = true;
          this.message = 'Client company Contact Updated Successfully';
          this.error = null;
        } else {
          this.loading = false;
          this.message = null;
          this.error = 'Somthing WentWrong';

          console.log(resp);
        }
      },
        error => {
          console.log(error);
        });
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }
  // cancel() {
  //   this.router.navigate(['company-contacts']);
  // }

  cancel() {
    this.blocation.back();
  }


  refresh() {
    this.route.paramMap.subscribe(
      param => {
        this.id = param.get('id');
        // console.log(this.contactInfo.id);
      }
    );
    // this.http.get('http://service.tedpros.com/contact/view?id=' + this.id, this.options)
    this.service.getCompanyContactView(this.id)
      .subscribe(response => {
        this.contactInfo.id = this.id;
        const result = response.json();
        this.contactInfo = result.data;
        this.getcontacts(this.contactInfo.companyId);
        console.log(this.contactInfo);
        this.change(this.contactInfo.address.countryId);
        this.state(this.contactInfo.address.stateId);
        this.isShowPopup = !this.isShowPopup;
      },
        error => {
          console.log(error);
        });
  }

}
