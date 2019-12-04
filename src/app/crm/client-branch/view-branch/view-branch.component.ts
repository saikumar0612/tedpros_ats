import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-view-branch',
  templateUrl: './view-branch.component.html',
  styleUrls: ['./view-branch.component.css']
})
export class ViewBranchComponent implements OnInit {
  comInfo: any = {
    country: {
      name: ""
    },
    owner: {
      name: ""
    },
    address: {
      addressLine1: "",
      addressLine2: ""
    }
  };
  persons;
  state;
  city;
  industry;
  loading;
  contactInfo: any = {};
  headers: any;
  options: any;
  id;
  logger: any = {};
  log;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  parent = {
    companyId: '',
    companyName: '',
    companyType: '',
    logo: '',
    industry: {
      id: '',
      name: ''
    },
    primaryPhone: '',
    country: {
      id: '',
      name: ''
    },
    emailId: '',
    owner: {
      id: '',
      name: ''
    },
    status: '',
    finNo: '',
    dunNo: '',
    billingContact: '',
    phoneNumber: '',
    description: '',
    specialisation: {
      certification: '',
      awards: '',
      rating: '',
      specialisation: ''
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
      zipCode: '',
      secondaryPhone: '',
      webSite: ''
    },
    social: {
      facebook: '',
      twitter: '',
      google: '',
      linkedin: ''
    },
    deliveryPersonal: [
      {
        id: '',
        userId: '',
        name: '',
        description: '',
        status: 0
      }
    ]
  };
  parentLogo = '';
  constructor(private eventEmitterService: EventEmitterService, private route: ActivatedRoute, public http: Http, private router: Router, private blocation: Location,
    private service: UserService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.id = param.get('id');
        this.logger.actionPath = this.router.url;
        this.logger.actionTitle = 'View Client Company';
        this.logger.comment = 'View client Companies by Id as ' + this.id;
        this.service.adduserLogs(this.logger)
          .subscribe(response => {
            this.log = response.json().data;
            this.eventEmitterService.onRecentActivityRefresh();
          })


      }
    );
    // this.http.get('http://service.tedpros.com/company/list/?id='+this.id, this.options)
    this.service.getCustomersList(this.id)
      .subscribe(response => {
        this.comInfo = response.json().data;
        // console.log(this.comInfo);
        // console.log(this.comInfo.companyName);
        this.persons = this.comInfo.deliveryPersonal;
        this.state = this.comInfo.address.state.name;
        this.city = this.comInfo.address.city.name;
        this.industry = this.comInfo.industry.name;

        if (this.comInfo) {
          this.getParent(this.comInfo.hqId);
        }

        // get contacts list based on company id
        // this.http.get('http://service.tedpros.com/contact/companyContact?id='+this.comInfo.companyId, this.options)
        this.service.getCompanyContacts(this.comInfo.companyId)
          .subscribe(response => {
            this.contactInfo = response.json();
            // console.log(this.contactInfo);
          },
            error => {
              console.log(error);
            })
      },
        error => {
          console.log(error);
        }
      )

    // get countries list
    // this.http.get('http://service.tedpros.com/config/country/', this.options)
    // .subscribe(response => {
    //   this.countries = response.json();
    //   this.loading = false;
    //   for(let i=0; i<this.countries.length; i++){
    //     if(this.comInfo.countryId == this.countries[i].id){
    //       this.countryname=this.countries[i].name;
    //       console.log(this.countryname);
    //     }
    //   }
    // },
    // error => {
    //   console.log(error);
    // });
  }

  getParent(id) {
    this.loading = true;
    this.service.getClientBranch(id)
      .subscribe(response => {
        this.parent = response.json().data;
        this.loading = false;
        if (this.parent.logo) {
          this.parentLogo = this.service.getBaseUrl() + '/frontend/clients/' + this.parent.logo;
          console.log(this.parentLogo);
        }
      },
        error => {
          console.log(error);
        });
  }

  cancel() {
    this.blocation.back();
  }

}
