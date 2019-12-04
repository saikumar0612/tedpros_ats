import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.css']
})
export class ViewVendorComponent implements OnInit {

  //declared the variable as per json response start- sharmistha
  comInfo: any = {
    country: {
      id: '',
      name: ''
    },
    address: {
      addressLine1: '',
      addressLine2: '',
      city: {
        id: '',
        name: ''
      },
      state: {
        id: '',
        name: ''
      },
      secondaryPhone: '',
      webSite: '',
      zipCode: ''
    },
    billingContact: '',
    companyId: '',
    companyName: '',
    companyType: '',
    description: '',
    dunNo: '',
    emailId: '',
    finNo: '',
    industry: {
      id: '',
      name: ''
    },
    owner: {
      id: '',
      name: ''
    },
    phoneNumber: '',
    primaryPhone: '',
    status: '',
    social: {
      facebook: '',
      google: '',
      linkedin: '',
      twitter: ''
    },
    specialisation: {
      awards: '',
      certification: '',
      rating: '',
      specialisation: ""
    },
    vendorPersonal: {
      email: '',
      employeeName: '',
      phone: '',
      status: '',
      type: '',
    }
  };
  //declared the variable as per json response end- sharmistha
  persons;
  state;
  city;
  industry;
  loading;
  contactInfo: any = {};
  headers: any;
  options: any;
  id;
  log;
  logger: any = {};
  currentUser = {
    token: '',
    email: '',
    id: '',
    flag: '',
    empType: {
      id: '',
      employeeType: ''
    },
    userType: {
      id: '',
      name: '',
      typeName: ''
    },
    first_name: '',
    last_name: '',
    middle_name: '',
    isAdmin: false,
    Adminrole: false,
    permission: {},
    submenuPermission: {},
    fieldPermission: {}
  };
  userPermissions: any;
  logo: string;
  // currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private route: ActivatedRoute, public http: Http, private router: Router, private location: Location, private service: UserService, private eventEmitter: EventEmitterService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userPermissions = this.currentUser.permission;
    this.route.paramMap.subscribe(
      param => {
        this.id = param.get('id');
      }
    );
    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'View Vendor Company';
    this.logger.comment = 'View Vendor Companies by Id as ' + this.id;
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitter.onRecentActivityRefresh();
      })

    this.service.getCustomersList(this.id)
      .subscribe(response => {
        this.comInfo = response.json().data;
        this.persons = this.comInfo.deliveryPersonal;
        this.state = this.comInfo.address.state.name;
        this.city = this.comInfo.address.city.name;
        this.industry = this.comInfo.industry.name;
        if (this.comInfo.logo) {
          this.logo = this.service.getBaseUrl() + '/frontend/clients/' + this.comInfo.logo;
          console.log(this.logo);
        }
        // get contacts list based on company id
        this.service.getCompanyContacts(this.comInfo.companyId)
          .subscribe(response => {
            this.contactInfo = response.json().data;
          },
            error => {
              console.log(error);
            })
      },
        error => {
          console.log(error);
        }
      )
  }
  cancel() {
    this.location.back();
  }

}
