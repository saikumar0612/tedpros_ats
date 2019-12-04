import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { PatternsService } from '../../../core/services/patterns.service';
import { FormsModule, NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css']
})
export class EditVendorComponent implements OnInit {
  log;
  logger: any = {};

  id = '';
  cusId;
  cus;
  users;
  industries;
  countries;
  loading;
  contacts;
  states;
  cities;
  company;
  cusInfo: any = {
    industry: {},
    country: { name: '' },
    owner: {},
    specialisation: {},
    address: {
      city: { name: '' },
      state: { name: '' },
    },
    social: {},
    vendorPersonal: {},
    logo: ''
  };
  //pattren Validation
  companyNamePattern = '^[a-z0-9_-]{8,50}$';
  primaryPhonePattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailIdPattern = '(^[a-zA-Z0-9_.+-]+@[a-zA-Z]+\.[a-zA-Z.]{2,4}$)';
  finNoPattern = '^[0-9]{9}$';
  dunNoPattern = '^[0-9]{9}$';
  logo = '';
  isShowPopup;
  message;
  error;
  zipError = '';
  addressPattern;
  twitterPattern;
  facebookPattern;
  linkedInPattern;
  display: any;
  headers: any;
  options: any;
  // saikumar 22/8/2019 started here 

  companypopup;
  contactError: any = '';

  industriesData: any = {
    industryType: ''
  };

  data;
  //saikumar 22/08/2019 ended here
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userToken: string;
  uploaded = false;
  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  editcustomer = { userId: '', name: '', description: '' };
  constructor(private route: ActivatedRoute, public http: Http, private router: Router,
    public auth: AuthenticationService, public service: UserService, private location: Location, private eventEmitter: EventEmitterService, public pattern: PatternsService) {
    this.addressPattern = this.pattern.addressPattern;
    this.twitterPattern = this.pattern.twitterPattern;
    this.facebookPattern = this.pattern.facebbokPattern;
    this.linkedInPattern = this.pattern.linkedInPattern;
    this.userToken = this.currentUser.token;
    this.loading = true;

    this.route.paramMap.subscribe(
      param => {
        this.cusInfo.id = param.get('id');
        console.log(this.cusInfo.id);
      }
    );

    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'Edit Vendor Company';
    this.logger.comment = 'Edit Vendor Companies by Id as ' + this.cusInfo.id;
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitter.onRecentActivityRefresh();
      })

    // this.http.get('http://service.tedpros.com/company/list/?id=' + this.cusInfo.id, this.options)
    this.service.getCustomersList(this.cusInfo.id)
      .subscribe(response => {
        this.loading = false;
        this.cusInfo = response.json().data;
        console.log(this.cusInfo);
        this.contacts = this.cusInfo.vendorPersonal;
        // console.log(this.contacts);
        this.cusInfo.industryType = this.cusInfo.industry.id;
        this.cusInfo.countryId = this.cusInfo.country.id;
        this.cusInfo.address.stateId = this.cusInfo.address.state.id;
        this.cusInfo.address.cityId = this.cusInfo.address.city.id;
        this.cusInfo.owner = this.cusInfo.owner.id;
        if (this.cusInfo.logo) {
          this.logo = this.service.getBaseUrl() + '/frontend/clients/' + this.cusInfo.logo;
          console.log(this.logo);
        }
        // this.http.get('http://service.tedpros.com/config/state/?id=' + this.cusInfo.country.id, this.options)
        this.service.getStates(this.cusInfo.country.id)
          .subscribe(response => {
            this.states = response.json().data;
            this.loading = false;
          },
            error => {
              console.log(error);
            });

        // this.http.get('http://service.tedpros.com/config/city/?id=' + this.cusInfo.address.state.id, this.options)
        this.service.getCities(this.cusInfo.address.state.id)
          .subscribe(response => {
            this.cities = response.json().data;
            this.loading = false;
          },
            error => {
              console.log(error);
            });


      },
        error => {
          console.log(error);
        });

    // get users list
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

    this.cusInfo.companyType = 'vendor';

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

  getAddress() {

    const zip = this.cusInfo.address.zipCode;
    this.zipError = null;
    console.log(zip);
    if (zip !== null) {
      this.service.getAddress(zip)
        .subscribe(response => {
          const result = response.json();
          // console.log(result);
          if (result.statusCode.code === '200') {
            this.cusInfo.countryId = result.data.country.id;
            this.cusInfo.address.countryId = result.data.country.id;
            this.change(this.cusInfo.address.countryId);
            this.cusInfo.address.stateId = result.data.state.id;
            this.state(this.cusInfo.address.stateId);
            this.cusInfo.address.cityId = result.data.city.id;
          } else {
            this.cusInfo.address.zipCode = '';
            this.zipError = 'Please enter a valid zip code';
            console.log('zipcode not found');
          }
        },
          error => {
            console.log(error);
          });
    }

  }

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
    // console.log(this.options, this.cusInfo);
    this.cusInfo.contactId = this.cusInfo.id;
    this.cusInfo.vendorPersonal = this.contacts;
    // this.http.post('http://service.tedpros.com/company/edit', this.cusInfo, this.options)
    this.service.editCustomers(this.cusInfo)
      .subscribe(response => {
        this.company = response.json();
        console.log(this.company);
        if (this.company.statusCode.code === '200') {
          // this.router.navigate(['vendors']);
          this.loading = false;
          this.isShowPopup = true;
          this.error = null;
          this.message = this.company.data;
        }
        else {
          this.loading = false;
          this.isShowPopup = true;
          this.error = this.company.errorMessages;
          this.message = null;
        }
      },
        error => {
          console.log(error);
        }
      )
  }

  cancel() {
    this.location.back();
  }

  closePopup() {


    this.route.paramMap.subscribe(
      param => {
        this.id = param.get('id');
        // console.log(this.cusInfo.id);
      }
    );

    // this.http.get('http://service.tedpros.com/company/list/?id=' + this.id, this.options)
    this.service.getCustomersList(this.id)
      .subscribe(response => {
        this.cusInfo.id = this.id;
        this.loading = false;
        this.cusInfo = response.json().data;
        console.log(this.cusInfo);
        this.contacts = this.cusInfo.vendorPersonal;
        // console.log(this.contacts);
        this.cusInfo.industryType = this.cusInfo.industry.id;
        this.cusInfo.countryId = this.cusInfo.country.id;
        this.cusInfo.address.stateId = this.cusInfo.address.state.id;
        this.cusInfo.address.cityId = this.cusInfo.address.city.id;
        this.cusInfo.owner = this.cusInfo.owner.id;
        // this.http.get('http://service.tedpros.com/config/state/?id=' + this.cusInfo.country.id, this.options)
        this.service.getStates(this.cusInfo.country.id)
          .subscribe(response => {
            this.states = response.json().data;
            this.loading = false;
          },
            error => {
              console.log(error);
            });

        // this.http.get('http://service.tedpros.com/config/city/?id=' + this.cusInfo.address.state.id, this.options)
        this.service.getCities(this.cusInfo.address.state.id)
          .subscribe(response => {
            this.cities = response.json().data;
            this.loading = false;
          },
            error => {
              console.log(error);
            });
        this.isShowPopup = !this.isShowPopup;

      },
        error => {
          console.log(error);
        });


  }
  //edit record
  editContact(contact) {
    console.log(contact.userId);
    this.editcustomer.userId = contact.userId;
    this.editcustomer.name = contact.name;
    this.editcustomer.description = contact.description;
    let index = this.contacts.indexOf(contact);
    this.display = index;
  }
  // adding new record in the table display

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
  editsingleuser(editUser, i) {
    console.log(editUser, i);
    this.contacts[i].userId = editUser;
    for (let j = 0; j < this.users.length; j++) {
      if (this.users[j].id == editUser) {
        this.contacts[i].name = this.users[j].first_name;
      }
    }
    console.log(this.contacts[i])
  }
  editsingledesc(editdescription, i) {
    this.contacts[i].description = editdescription;
    console.log(this.contacts[i])
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
