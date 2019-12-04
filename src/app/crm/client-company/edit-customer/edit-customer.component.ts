import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { PatternsService } from '../../../core/services/patterns.service';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  id = '';
  postJsonData: any = {};
  cusId;
  cus;
  users;
  industries;
  countries;
  loading;
  contact = {
    userId: '',
    description: '',
    status: ''
  };
  contacts = [];
  states;
  cities;
  company;
  selectedPerson = {};
  userId;
  cusInfo: any = {
    companyName: '',
    industry: {},
    country: {},
    owner: {},
    specialisation: {},
    address: {
      city: {},
      state: {},
    },
    social: {},
    deliveryPersonal: {},
    logo: ''
  };
  display: any;
  select: any;
  headers: any;
  options: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  error = null;
  zipError = '';
  isShowPopup;
  message;
  modelPopUp = false;
  isForceDelete = false;
  logger: any = {};
  log;
  statusData: any = {
    delete: ''
  };
  status: any;
  addressPattern;
  twitterPattern;
  facebookPattern;
  linkedInPattern;
  uploaded = false;
  // error;
  // saikumar 22/8/2019 started here

  companypopup;
  contactError: any = '';

  industriesData: any = {
    industryType: ''
  };

  data;
  logo: string;
  //saikumar 22/08/2019 ended here
  // patterns
  companyNamePattern = '^[a-z0-9_-]{8,50}$';
  primaryPhonePattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailIdPattern = '(^[a-zA-Z0-9_.+-]+@[a-zA-Z]+\.[a-zA-Z.]{2,4}$)';
  finNoPattern = '^[0-9]{9}$';
  dunNoPattern = '^[0-9]{9}$';
  userToken: string;
  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  editcustomer = { userId: '', name: '', description: '', status: '' };
  constructor(private eventEmitterService: EventEmitterService, private route: ActivatedRoute, public http: Http,
    private router: Router, public auth: AuthenticationService, public service: UserService, private location: Location, public pattern: PatternsService) {
    this.addressPattern = this.pattern.addressPattern;
    this.twitterPattern = this.pattern.twitterPattern;
    this.facebookPattern = this.pattern.facebbokPattern;
    this.linkedInPattern = this.pattern.linkedInPattern;
    this.userToken = this.currentUser.token;
    this.loading = true;

    this.route.paramMap.subscribe(
      param => {
        this.id = param.get('id');
        this.cusInfo.id = this.id;
        // console.log(this.cusInfo.id);

        this.logger.actionPath = this.router.url;
        this.logger.actionTitle = 'Edit Client Company';
        this.logger.comment = 'Edit client Companies by Id as ' + this.cusInfo.id;
        this.service.adduserLogs(this.logger)
          .subscribe(response => {
            this.log = response.json().data;
            this.eventEmitterService.onRecentActivityRefresh();
          });


      }
    );

    // get Data
    this.getCompanyInfo();
    // get users list
    // http.get('http://service.tedpros.com/user/allDetails', this.options)
    this.service.getUsersList()
      .subscribe(response => {
        this.users = response.json();
        this.loading = false;
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

    this.cusInfo.companyType = 'customer';
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
    this.cusInfo.logo = this.uploader.queue[0]._file.name;
    this.uploader.queue[0].isSuccess = !this.uploader.queue[0].isSuccess;
  }


  // saikumar 22/08/2019 added here

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
    this.contactError = '';
  }
  //saikummar  22/08/2019 ended here

  getCompanyInfo() {
    // this.http.get('http://service.tedpros.com/company/list/?id=' + this.id, this.options)
    this.service.getCustomersList(this.id)
      .subscribe(response => {
        this.loading = false;
        this.cusInfo = response.json().data;
        // console.log(this.cusInfo);
        this.cusInfo.countryId = this.cusInfo.country.id;
        this.contacts = this.cusInfo.deliveryPersonal;
        if (this.cusInfo.logo) {
          this.logo = this.service.getBaseUrl() + '/frontend/clients/' + this.cusInfo.logo;
          console.log(this.logo);
        }
        // console.log(this.contacts);
        if (!this.contacts) {
          this.contacts = [];
        }

        // if (this.contacts) {
        //   this.contacts = this.contacts;
        // } else {
        //   this.contacts = [];
        // }

        this.cusInfo.industryType = this.cusInfo.industry.id;
        // this.cusInfo.countryId = this.cusInfo.country.id;
        this.cusInfo.address.stateId = this.cusInfo.address.state.id;
        this.cusInfo.address.cityId = this.cusInfo.address.city.id;
        this.cusInfo.owner = this.cusInfo.owner.id;
        // this.http.get('http://service.tedpros.com/config/state/?id=' + this.cusInfo.country.id, this.options)
        this.service.getStates(this.cusInfo.country.id)
          .subscribe(resp => {
            this.states = resp.json().data;
            this.loading = false;
          },
            error => {
              console.log(error);
            });

        // this.http.get('http://service.tedpros.com/config/city/?id=' + this.cusInfo.address.state.id, this.options)
        this.service.getCities(this.cusInfo.address.state.id)
          .subscribe(resp => {
            this.cities = resp.json().data;
            this.loading = false;
          },
            error => {
              console.log(error);
            });
      },
        error => {
          console.log(error);
        });
  }

  change(id) {
    this.loading = true;
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

  state(id) {
    this.loading = true;
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

    const zip = this.cusInfo.address.zipCode;
    this.zipError = null;
    // console.log(zip);
    if (zip !== null) {
      this.service.getAddress(zip)
        .subscribe(response => {
          const result = response.json();
          // console.log(result);
          if (result.statusCode.code === '200') {
            // this.cusInfo.countryId=result.data.country.id;
            this.cusInfo.countryId = result.data.country.id;
            this.change(this.cusInfo.countryId);
            this.cusInfo.address.stateId = result.data.state.id;
            this.state(this.cusInfo.address.stateId);
            this.cusInfo.address.cityId = result.data.city.id;
          } else {
            // this.cusInfo.countryId='';
            this.cusInfo.address.zipCode = '';
            // this.cusInfo.address.countryId ='';
            // this.cusInfo.address.stateId = '';
            // this.cusInfo.address.cityId = '';

            this.zipError = 'Please enter a valid zip code';
            // console.log('zipcode not found');
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
        this.cusInfo.industryType = this.data.data;

      });
    } else {
      this.loading = false;
      this.contactError = 'Fill required Fileds';

    }
  }

  // saikumar 30/08/2019 ended here
  ngOnInit() {
    this.getindustries();
  }

  editCus() {
    this.loading = true;
    // console.log(this.cusInfo);

    this.cusInfo.contactId = this.cusInfo.id;
    this.cusInfo.deliveryPersonal = this.contacts;

    // console.log(this.cusInfo);

    // this.http.post('http://service.tedpros.com/company/edit', this.cusInfo, this.options)
    this.service.editCustomers(this.cusInfo)
      .subscribe(response => {
        this.company = response.json();
        // if (this.company.statusCode.code === '200') {
        //   this.loading = false;
        //   this.isShowPopup = true;
        //   this.message = this.company.data;
        //   this.error = null;
        // } else {
        //   this.loading = false;
        //   this.isShowPopup = true;
        //   this.message = this.company.data;
        //   this.error = null;
        // }
        this.loading = false;
        this.isShowPopup = true;
        this.message = this.company.data;
        this.error = null;
      },
        error => {
          console.log(error);
        });
  }

  closePopup() {
    this.isShowPopup = !this.isShowPopup;
    this.error = '';
    this.message = '';
    this.getCompanyInfo();
  }

  updateStatus(actionCode, contact) {
    this.modelPopUp = true;
    this.selectedPerson = contact;
  }

  // added form reset - sharmistha - 10-20-2019 - start
  closeModal(deleteFrm:NgForm) {
    this.modelPopUp = false;
    deleteFrm.resetForm();
  }
  // added form reset - sharmistha - 10-20-2019 - end

  cancel() {
    this.location.back();
  }

  assign() {
    this.status = this.statusData.delete;
    // console.log(this.status);
    const index = this.contacts.indexOf(this.selectedPerson);
    this.contacts[index].status = this.status;
    this.modelPopUp = false;
    this.isForceDelete = true;
  }

  // edit record
  editContact(contact) {
    this.editcustomer.userId = contact.userId;
    this.editcustomer.name = contact.name;
    this.editcustomer.description = contact.description;
    this.editcustomer.status = contact.status;
    const index = this.contacts.indexOf(contact);
    this.display = index;
  }

  // adding new record in the table display
  addContact(addUser: NgForm, userId, name, description, status) {
    let validBoolean = false;
    for (let index = 0; index < this.contacts.length; index++) {
      if (this.contacts[index].userId.trim().toLowerCase() === userId.trim().toLowerCase() &&
        this.contacts[index].description.trim().toLowerCase() === description.trim().toLowerCase()) {
        validBoolean = true;
      }
    }
    if (validBoolean) {
      this.error = 'Duplicate data cannot be added';
    } else {

      this.error = null;
      addUser.resetForm();
      this.contacts.push({ 'userId': userId, 'name': name, 'description': description, 'status': status });
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === userId) {
          // console.log(this.contacts.length);
          this.contacts[this.contacts.length - 1].name = this.users[i].first_name + ' ' + this.users[i].last_name;
        }
      }
    }

  }
  editsingleuser(editUser, i) {
    // console.log(editUser, i);
    this.contacts[i].userId = editUser;
    for (let j = 0; j < this.users.length; j++) {
      if (this.users[j].id === editUser) {
        this.contacts[i].name = this.users[j].first_name;
      }
    }
    // console.log(this.contacts[i]);
  }
  editsingledesc(editdescription, i) {
    this.contacts[i].description = editdescription;
    // console.log(this.contacts[i])
  }

  editsinglestatus(editstatus, i) {
    this.contacts[i].status = editstatus;
  }

  removeContact(contact) {
    const index = this.contacts.indexOf(contact);
    this.contacts.splice(index, 1);
  }
}

// model class used to define a contact
// export class Contact{

//   userId: string;
//   name: string;
//   description: string;

//   constructor(userId,name,description){
//     this.userId = userId;
//     this.name = name;
//     this.description = description;
//   }

// }
