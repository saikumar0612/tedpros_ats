import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {
  filterData = [];
  data;
  vendorfilterData = [];
  vendroData: any = {
    companyId: '',
    companyName: '',
    owner: {
      id: '', name: ''
    },
    billingContact: '',
    phoneNumber: '',
    cityName: ''
  };
  customers;
  selectedAll: any;
  getfilterData;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions = this.currentUser.permission;
  headers;
  options;
  log;
  logger: any = {};
  availableRecords: any;

  constructor(public http: Http, private router: Router, public auth: AuthenticationService, private service: UserService, private eventEmiter: EventEmitterService) {
    this.filterData = [];
    this.vendorfilterData = [];

    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'Vendor Company';
    this.logger.comment = 'View List of Vendor Companies';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmiter.onRecentActivityRefresh();

      });
    // http.get('http://service.tedpros.com/company/vendor/', this.options)
    this.service.getHqVendors()
      .subscribe(response => {
        this.data = response.json().data;
        // this.filterData = response.json().data;
        // console.log(this.data);
        this.getfilterData = [];
        const vendor = this.data;
        console.log(vendor);
        for (let i = 0; i < vendor.length; i++) {
          this.vendroData.companyId = vendor[i].companyId;
          if (vendor[i].companyName) {
            this.vendroData.companyName = vendor[i].companyName;
          } else {
            this.vendroData.companyName = ' ';
          }
          if (vendor[i].owner.name) {
            this.vendroData.owner.id = vendor[i].owner.id;
            this.vendroData.owner.name = vendor[i].owner.name;
          } else {
            this.vendroData.owner.id = '';
            this.vendroData.owner.name = ' ';
          }
          if (vendor[i].billingContact) {
            this.vendroData.billingContact = vendor[i].billingContact;
          } else {
            this.vendroData.billingContact = ' ';
          }
          if (vendor[i].phoneNumber) {
            this.vendroData.phoneNumber = vendor[i].phoneNumber;
          } else {
            this.vendroData.phoneNumber = ' ';
          }
          if (vendor[i].city.name) {
            this.vendroData.cityName = vendor[i].city.name;
          } else {
            this.vendroData.cityName = ' ';
          }
          this.filterData.push(this.vendroData);
          this.vendroData = {
            companyId: '',
            companyName: '',
            owner: {
              id: '', name: ''
            },
            billingContact: '',
            phoneNumber: '',
            cityName: ''
          };
          console.log(this.filterData);
        }
        this.vendorfilterData = this.filterData;
        console.log(this.filterData);
        this.availableRecords = this.filterData.length;
      },
        error => {
          console.log(error);
        }
      );
  }

  selectAll() {
    for (let i = 0; i < this.filterData.length; i++) {
      this.filterData[i].selected = this.selectedAll;
    }
  }
  checkIfAllSelected() {
    this.selectedAll = this.filterData.every(function (item: any) {
      return item.selected === true;
    })
  }

  ngOnInit() {
  }

  searchname(term: string) {
    if (!term) {
      this.filterData = this.vendorfilterData;
    } else {
      this.filterData = this.vendorfilterData.filter(x =>
        x.companyName.trim().toLowerCase().includes(term.trim().toLowerCase()),
      );
    }
    this.availableRecords = this.filterData.length;
  }

  searchmanager(term: string) {
    if (!term) {
      this.filterData = this.data;
    } else {
      this.filterData = this.vendorfilterData.filter(y =>
        y.owner.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
      );
    }
    this.availableRecords = this.filterData.length;
  }

  searchcontact(term: string) {
    if (!term) {
      this.filterData = this.vendorfilterData;
    } else {
      this.filterData = this.vendorfilterData.filter(z =>
        z.billingContact.trim().toLowerCase().includes(term.trim().toLowerCase()),
      );
    }
    this.availableRecords = this.filterData.length;
  }

  searchphone(term: string) {
    if (!term) {
      this.filterData = this.vendorfilterData;
    } else {
      this.filterData = this.vendorfilterData.filter(a =>
        a.phoneNumber.trim().toLowerCase().includes(term.trim().toLowerCase()),
      );
    }
    this.availableRecords = this.filterData.length;
  }

  searchcity(term: string) {
    if (!term) {
      this.filterData = this.vendorfilterData;
    } else {
      this.filterData = this.vendorfilterData.filter(b =>
        b.cityName.trim().toLowerCase().includes(term.trim().toLowerCase()),
      );
    }
    this.availableRecords = this.filterData.length;
  }

}
