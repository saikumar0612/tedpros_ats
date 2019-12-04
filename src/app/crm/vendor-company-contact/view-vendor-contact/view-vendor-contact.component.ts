import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service'

@Component({
  selector: 'app-view-vendor-contact',
  templateUrl: './view-vendor-contact.component.html',
  styleUrls: ['./view-vendor-contact.component.css']
})
export class ViewVendorContactComponent implements OnInit {
  contactInfo: any = {};
  loading;
  headers: any;
  options: any;
  id;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userFieldPermissions = this.currentUser.fieldPermission;
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
    this.logger.actionTitle='View Vendor Company Contact';
    this.logger.comment='View Vendor Company Contacts by Id as '+this.id;
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;
      this.eventEmitter.onRecentActivityRefresh(); 
    })
    // this.http.get('http://service.tedpros.com/contact/view?id=' + this.id, this.options)
    this.service.getCompanyContactView(this.id)
      .subscribe(response => {
        this.contactInfo = response.json().data;
        console.log(this.contactInfo);
        console.log(this.contactInfo.companyName);
      },
        error => {
          console.log(error);
        }
      )
  }

  cancel() {
    this.blocation.back(); 
  }

}
