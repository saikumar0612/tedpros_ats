import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-view-contacts',
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.css']
})
export class ViewContactsComponent implements OnInit {
  contactInfo: any = {};
  loading;
  headers: any;
  options: any;
  id;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userFieldPermissions = this.currentUser.fieldPermission;
  countries;
  states;
  cities;
  log;
  logger:any={};

  constructor(private route: ActivatedRoute, public http: Http, private router: Router, private blocation:Location, private service:UserService, private eventEmitter:EventEmitterService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.id = param.get('id');
        console.log(this.id);
      }
    );

    this.logger.actionPath=this.router.url;
        this.logger.actionTitle='View Client Company Contact';
        this.logger.comment='View client Company Contacts by Id as '+this.id;
        this.service.adduserLogs(this.logger)
        .subscribe(response=>{
          this.log = response.json().data;
          this.eventEmitter.onRecentActivityRefresh(); 
        })
    // this.http.get('http://service.tedpros.com/contact/view?id=' + this.id, this.options)
    this.service.getCompanyContactView(this.id)
      .subscribe(response => {
        const result = response.json();
        this.contactInfo = result.data;
        console.log(this.contactInfo);
        console.log(this.contactInfo.companyName);
      },
        error => {
          console.log(error);
        });
    // this.http.get('http://service.tedpros.com/config/country/', this.options)
    this.service.getCountries()
      .subscribe(response => {
        this.countries = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }

  cancel() {
    this.blocation.back();
  }
  // get states list based on country id
  getState(id) {
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
  getCity(id) {
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

}

