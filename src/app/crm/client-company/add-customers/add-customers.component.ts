import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PatternsService } from '../../../core/services/patterns.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.css']
})
export class AddCustomersComponent implements OnInit {
  isShowPopup;
  message;
  cusData: any = {
    specialisation: {},
    address: {},
    social: {},
    deliveryPersonal: [{}],
    logo: ''
  };
  jobs;
  customers;
  users;
  countries;
  states;
  cities;
  loading;
  display = false;
  industries;
  userId: string;
  name: string;
  description: string;
  error = null;
  zipError = '';
  addContactError;
  companypopup;
  log;
  logger: any = {};
  addressPattern;
  twitterPattern;
  facebookPattern;
  linkedInPattern;
  companyNamePattern;
  contactNumber;
  data;

  // patterns
  primaryPhonePattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailIdPattern = '(^[a-zA-Z0-9_.+-]+@[a-zA-Z]+\.[a-zA-Z.]{2,4}$)';
  finNoPattern = '^[0-9]{9}$';
  dunNoPattern = '^[0-9]{9}$';

  industriesData: any = {
    industryType: ''
  };
  uploaded = false;
  contactError: any = '';
  headers: any;
  options: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  contacts: Array<Contact>;
  userToken: string;
  // file upload start
  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  constructor(private eventEmitterService: EventEmitterService, private route: ActivatedRoute, private http: Http, private router: Router, public auth: AuthenticationService, public service: UserService, private blocation: Location, public pattern: PatternsService) {

    this.addressPattern = this.pattern.addressPattern;
    this.twitterPattern = this.pattern.twitterPattern;
    this.facebookPattern = this.pattern.facebbokPattern;
    this.linkedInPattern = this.pattern.linkedInPattern;
    this.companyNamePattern = this.pattern.companyNamePattern;
    this.userToken = this.currentUser.token;

    this.loading = true;
    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'Add Client Company';
    this.logger.comment = 'Add new Client Company ';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitterService.onRecentActivityRefresh();
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

    // setting default country as united states
    this.cusData.countryId = '231';
    this.change('231');

    this.cusData.companyType = 'customer';
    this.contacts = [];
    this.uploader = new FileUploader({
      url: this.service.uploadClients(),
      itemAlias: 'client_logo',
      // headers: this.options
      queueLimit: 1,
      headers: [{ name: 'Token', value: this.userToken }]
    });
  }
  close() {
    console.log(this.uploader);
    this.uploaded = this.uploader.queue[0].isSuccess;
    this.cusData.logo = this.uploader.queue[0]._file.name;
    this.uploader.queue[0].isSuccess = !this.uploader.queue[0].isSuccess;
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
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

  addcomp() {
    this.companypopup = true;
  }
  closecompPopup() {
    this.companypopup = !this.companypopup;
  }
  // get states list based on country id
  change(id) {
    //console.log(id);
    //  this.http.get('http://service.tedpros.com/config/state/?id='+id, this.options)
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
    //console.log(id);
    //  this.http.get('http://service.tedpros.com/config/city/?id='+id, this.options)
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
            this.change(this.cusData.address.countryId);
            this.cusData.address.stateId = result.data.state.id;
            this.state(this.cusData.address.stateId);
            this.cusData.address.cityId = result.data.city.id;
          } else {
            this.cusData.address.zipCode = '';
            this.zipError = 'Please enter a valid zip code';
            //console.log('zipcode not found');
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

  addCom(addComFrm: NgForm) {
    this.loading = true;
    //console.log(this.options, this.cusData);
    this.cusData.deliveryPersonal = this.contacts;
    //console.log(this.cusData);

    this.service.addCompany(this.cusData)
      .subscribe(response => {

        const resp = response.json();

        this.customers = resp.data;

        if (this.customers != null && resp.statusCode.code === '200') {
          addComFrm.resetForm();
          this.loading = false;
          this.message = "Client added successfully";
          this.isShowPopup = true;
          this.error = null;
          const index = this.contacts.length;
          this.contacts.splice(0, index);
        }
        else {
          this.loading = false;
          this.message = null;
          this.isShowPopup = true;
          this.error = resp.errorMessages;
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
    // console.log('useris' + userid);

    // console.log(this.contacts);
  }
  ngOnInit() {
    this.getindustries();

  }

  cancel() {
    this.blocation.back();
  }

  fillCountry() {
    this.cusData.countryId = '231';
  }

  formReset(addComFrm: NgForm) {
    addComFrm.resetForm();
    this.fillCountry();
  }

  // adding new record in the table display
  addContact(addUser: NgForm, userId, name, description) {
    if (userId !== '' && description !== '') {



      let validBoolean = false;
      for (let index = 0; index < this.contacts.length; index++) {
        if (this.contacts[index].userId.trim().toLowerCase() === userId.trim().toLowerCase() && this.contacts[index].description.trim().toLowerCase() === description.trim().toLowerCase()) {
          validBoolean = true;

        }
      }
      if (validBoolean) {
        this.addContactError = 'Duplicate data cannot be added';
      } else {
        this.addContactError = null;
        addUser.resetForm();
        const contact = new Contact(userId, name, description);
        this.contacts.push(contact);
        //console.log(this.contacts);
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === userId) {
            //console.log(this.contacts.length);
            // console.log(this.users[i].first_name);
            this.contacts[this.contacts.length - 1].name = this.users[i].first_name + ' ' + this.users[i].last_name;
            //console.log(this.contacts[this.contacts.length - 1].name);
          }
        }
      }
    }
    else {
      if (userId === '') {
        this.addContactError = 'Select any user ';
      }
      else {
        this.addContactError = 'Write a description';
      }

    }
  }

  removeContact(contact) {
    const index = this.contacts.indexOf(contact);
    this.contacts.splice(index, 1);
  }


}
// model class used to define a contact
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
