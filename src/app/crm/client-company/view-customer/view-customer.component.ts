import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  comInfo: any = {
    country: {
      name: ''
    },
    owner: {
      name: ''
    },
    address: {
      addressLine1: '',
      addressLine2: ''
    },
    logo: '',
    branch: [],
    branchCount: 0
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
  logo = '';
  branch = [];
  branchCount = 0;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;


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
        console.log(this.comInfo);
        // console.log(this.comInfo.companyName);
        this.persons = this.comInfo.deliveryPersonal;
        this.state = this.comInfo.address.state.name;
        this.city = this.comInfo.address.city.name;
        this.industry = this.comInfo.industry.name;
        this.branchCount = this.comInfo.branchCount;
        if (this.branchCount) {
          this.branch = this.comInfo.branch;
          console.log(this.branch);
        }
        if (this.comInfo.logo) {
          this.logo = this.service.getBaseUrl() + '/frontend/clients/' + this.comInfo.logo;
          console.log(this.logo);
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
    this.userPermissions = this.currentUser.permission;
  }

  cancel() {
    this.blocation.back();
  }

}
