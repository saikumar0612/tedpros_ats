import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { PatternsService } from '../../../core/services/patterns.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent implements OnInit {
  message;
  isShowPopup;

  cusData: any = {
    specialisation: {},
    address: {},
    social: {},
    vendorPersonal: [{}],
    logo: ''
  };
  customers;
  users;
  countries;
  states;
  cities;
  loading;
  display: boolean = false;
  industries;
  zipError = '';

  error = null;
  contacts: any = {};
  addressPattern;
  twitterPattern;
  facebookPattern;
  linkedInPattern;
  companyNamePattern;
  // patterns
  primaryPhonePattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailIdPattern = '(^[a-zA-Z0-9_.+-]+@[a-zA-Z]+\.[a-zA-Z.]{2,4}$)';
  finNoPattern = '^[0-9]{9}$';
  dunNoPattern = '^[0-9]{9}$';
  log;
  logger: any = {};

  headers: any;
  options: any;
  industriesData: any = {
    industryType: ''
  };
  companypopup;
  data;
  contactError: any = '';
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userToken: string;
  uploaded = false;
  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  // contacts: Array<Contact>;
  constructor(private http: Http, private router: Router, public auth: AuthenticationService, public service: UserService, private blocation: Location, private eventEmitter: EventEmitterService, public pattern: PatternsService) {
    this.addressPattern = this.pattern.addressPattern;
    this.twitterPattern = this.pattern.twitterPattern;
    this.facebookPattern = this.pattern.facebbokPattern;
    this.linkedInPattern = this.pattern.linkedInPattern;
    this.companyNamePattern = this.pattern.companyNamePattern;
    this.userToken = this.currentUser.token;

    this.loading = true;
    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'Add Vendor Company';
    this.logger.comment = 'Add new Vendor Company ';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitter.onRecentActivityRefresh();
      });

    this.service.getUsersList()
      .subscribe(response => {
        this.users = response.json();
        this.loading = false;
      },
        error => {
          console.log(error);
        });


    this.service.getCountries()
      .subscribe(response => {
        this.countries = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });






    this.cusData.countryId = '231';
    this.change('231');
    this.uploader = new FileUploader({
      url: this.service.uploadClients(),
      itemAlias: 'client_logo',
      // headers: this.options
      headers: [{ name: 'Token', value: this.userToken }]
    });
  }

  close() {
    console.log(this.uploader);
    this.uploaded = this.uploader.queue[0].isSuccess;
    this.cusData.logo = this.uploader.queue[0]._file.name;
    this.uploader.queue[0].isSuccess = !this.uploader.queue[0].isSuccess;
  }

  // get states list based on country id
  change(id) {
    console.log(id);
    // this.http.get('http://service.tedpros.com/config/state/?id=' + id, this.options)
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

    const zip = this.cusData.address.zipCode;
    this.zipError = null;
    console.log(zip);
    if (zip !== null) {
      this.service.getAddress(zip)
        .subscribe(response => {
          const result = response.json();
          // console.log(result);
          if (result.statusCode.code === '200') {
            this.cusData.countryId = result.data.country.id;
            this.cusData.address.countryId = result.data.country.id;
            console.log(this.cusData.address.countryId);
            this.change(this.cusData.address.countryId);
            this.cusData.address.stateId = result.data.state.id;
            this.state(this.cusData.address.stateId);
            this.cusData.address.cityId = result.data.city.id;
          } else {
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

  // saikumar 30/08/2019 started here
  addindustry(industryType, addindFrm: NgForm) {
    this.loading = false;
    if (industryType !== "") {
      this.contactError = '';
      this.industriesData.industryType = industryType;
      this.service.postIndustries(this.industriesData).subscribe(response => {
        console.log(response);
        this.data = response.json();
        console.log(this.data);

        if (this.data.statusCode.code === '200') {
          this.closecompPopup();
          addindFrm.resetForm();
        }
        else if (this.data.statusCode.code === '409') {
          this.contactError = this.data.errorMessages;
          console.log(this.contactError);
        }

        this.getindustries()
        this.cusData.industryType = this.data.data;

      });
    } else {
      this.loading = false;
      this.contactError = 'Fill required Fileds';

    }
  }

  // saikumar 30/08/2019 ended here

  addcomp() {
    this.companypopup = true;
  }

  getindustries() {
    // get industries list
    this.service.getIndustries()
      .subscribe(response => {
        this.industries = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }


  closecompPopup() {
    this.companypopup = !this.companypopup;

  }
  //saikumar 21/08/2019 ended here


  addCom(addComFrm: NgForm) {
    this.loading = true;
    this.cusData.companyType = 'vendor';
    console.log(this.cusData);
    this.cusData.vendorPersonal = this.contacts;
    console.log(this.cusData);
    // this.http.post('http://service.tedpros.com/company/add', this.cusData, this.options)
    this.service.addCompany(this.cusData)
      .subscribe(response => {
        console.log(response);
        const resp = response.json();
        this.customers = resp.data;
        console.log(this.customers);
        if (this.customers != null && resp.statusCode.code === '200') {
          this.loading = false;
          addComFrm.resetForm();

          this.message = resp.data;
          this.isShowPopup = true;

          // this.router.navigate(['vendors']);
        }
        else {

          // this.loading=false;
          // this.userData.roles = [];
          this.error = resp.errorMessages;
          this.loading = false;
          this.isShowPopup = true;
        }

      },
        error => {
          console.log(error);
        });
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
    this.error = '';
    this.message = '';
    this.contactError = '';
  }
  setname(userid) {
    console.log('useris' + userid);

    console.log(this.contacts);
  }
  ngOnInit() {

    this.getindustries();
  }

  cancel() {
    this.blocation.back();
  }


  // adding new record in the table display
  userId: string;
  name: string;
  description: string;
  addContact(userId, name, description) {
    let contact = new Contact(userId, name, description);
    this.contacts.push(contact);
    console.log(this.contacts);
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == userId) {
        console.log(this.contacts.length);
        this.contacts[this.contacts.length - 1].name = this.users[i].first_name;
      }
    }
  }

  removeContact(contact) {
    let index = this.contacts.indexOf(contact);
    this.contacts.splice(index, 1);
  }


}
//model class used to define a contact
export class Contact {

  userId: string;
  name: string;
  description: string;

  constructor(userId, name, description) {
    this.userId = userId;
    this.name = name;
    this.description = description;
  }

}