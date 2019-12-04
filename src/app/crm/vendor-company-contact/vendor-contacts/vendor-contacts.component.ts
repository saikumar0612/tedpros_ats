import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service'

@Component({
  selector: 'app-vendor-contacts',
  templateUrl: './vendor-contacts.component.html',
  styleUrls: ['./vendor-contacts.component.css']
})
export class VendorContactsComponent implements OnInit {
  filterData;
  getfilterData;
  data;
  loading;
  vendorData: any = {
    contactId: '',
    companyName: '',
    firstName: '',
    emailId: '',
    phoneNo: '',
    cityName: ''
  };
  finalContact;
  customers;
  fullname;
  selectedAll: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions = this.currentUser.permission;
  log;
  logger:any={};
  availableRecords:any;

  constructor(public http: Http, private router: Router, private location: Location, private service:UserService, private eventEmitter:EventEmitterService) {
    this.loading = false;
    // console.log(this.userToken);
    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='Vendor Company Contacts';
    this.logger.comment='View List of Vendor Companies Contacts';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;
      this.eventEmitter.onRecentActivityRefresh();
      
    });
    
    this.service.getVendorConatcts()
      .subscribe(response => {
        this.data = response.json();
        // this.filterData = response.json();
        // console.log(this.filterData)
        this.getfilterData = [];
        const vendorContact = this.data;
        console.log(vendorContact);
        for (let i = 0; i < vendorContact.length; i++) {
          this.vendorData.contactId = vendorContact[i].contactId;
          this.vendorData.companyId = vendorContact[i].companyId;
          if (vendorContact[i].companyName) {
            this.vendorData.companyName = vendorContact[i].companyName;
          } else {
            this.vendorData.companyName = ' ';
          }
          if (vendorContact[i].firstName) {
            this.vendorData.firstName = vendorContact[i].firstName + ' ' + vendorContact[i].lastName;
          } else {
            this.vendorData.firstName = ' ';
          }
          if (vendorContact[i].emailId) {
            this.vendorData.emailId = vendorContact[i].emailId;
          } else {
            this.vendorData.emailId = ' ';
          }
          if (vendorContact[i].phoneNo) {
            this.vendorData.phoneNo = vendorContact[i].phoneNo;
          } else {
            this.vendorData.phoneNo = ' ';
          }
          if (vendorContact[i].cityName) {
            this.vendorData.cityName = vendorContact[i].cityName;
          } else {
            this.vendorData.cityName = ' ';
          }

          this.getfilterData.push(this.vendorData);
          this.vendorData = {
            contactId: '',
            companyName: '',
            firstName: '',
            emailId: '',
            phoneNo: '',
            cityName: ''
          };
        }
        this.filterData = this.getfilterData;
        console.log(this.getfilterData);
        this.availableRecords = this.filterData.length;

      },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
  }

  searchname(term: string) {
    if (!term) {
      this.filterData = this.getfilterData;
    } else {
      this.filterData = this.getfilterData.filter(x =>
        x.firstName.trim().toLowerCase().includes(term.trim().toLowerCase()),
      );
    }
    this.availableRecords = this.filterData.length;
  }

  searchemail(term: string) {
    if (!term) {
      this.filterData = this.getfilterData;
    } else {
      this.filterData = this.getfilterData.filter(y =>
        y.emailId.trim().toLowerCase().includes(term.trim().toLowerCase()),
      );
    }
    this.availableRecords = this.filterData.length;
  }


  searchcom(term: string) {
    if (!term) {
      this.filterData = this.getfilterData;
    } else {
      this.filterData = this.getfilterData.filter(z =>
        z.companyName.trim().toLowerCase().includes(term.trim().toLowerCase()),
      );
    }
    this.availableRecords = this.filterData.length;
  }

  searchphone(term: string) {
    if (!term) {
      this.filterData = this.getfilterData;
    } else {
      this.filterData = this.getfilterData.filter(a =>
        a.phoneNo.trim().toLowerCase().includes(term.trim().toLowerCase()),
      );
    }
    this.availableRecords = this.filterData.length;
  }

  searchcity(term: string) {
    if (!term) {
      this.filterData = this.getfilterData;
    } else {
      this.filterData = this.getfilterData.filter(b =>
        b.cityName.trim().toLowerCase().includes(term.trim().toLowerCase()),
      );
    }
    this.availableRecords = this.filterData.length;
  }

}

