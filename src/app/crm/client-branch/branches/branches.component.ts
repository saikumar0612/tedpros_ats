import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { DataTableModule } from 'angular-6-datatable';
import { AuthenticationService, UserService } from '../../../core/services';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {
  filterData = [];
  getfilterData = [];
  data;
  log;
  customers;
  customer = {
    companyId: '',
    companyName: '',
    cityName: '',
    billingContact: '',
    phoneNumber: '',
    owner: {
      id: '',
      name: ''
    }
  };
  contactCustomer;
  customerData: any = {};
  selectedAll: any;
  logger: any = {};
  availableRecords = 0;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions = this.currentUser.permission;


  headers: any;
  options: any;
  url: any;

  constructor(private eventEmitterService: EventEmitterService, private route: ActivatedRoute, public http: Http, public service: UserService, private router: Router, public auth: AuthenticationService,
    private blocation: Location) {
    this.customers = [];
    // this.service.getCompanyList()
    // this.http.get(this.url + '/company/customer/', this.options)

    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'Client Branch';
    this.logger.comment = 'View List of client branch';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitterService.onRecentActivityRefresh();

      });

    this.service.getCompanyList()
      .subscribe(response => {
        this.data = response.json().data;

        this.getfilterData = [];
        const customerLst = this.data;
        // console.log(customerLst);
        for (let i = 0; i < customerLst.length; i++) {
          this.customer.companyId = customerLst[i].companyId;
          this.customer.companyName = customerLst[i].companyName;
          if (customerLst[i].city && customerLst[i].city.name !== null) {
            this.customer.cityName = customerLst[i].city.name;
          } else {
            this.customer.cityName = ' ';
          }
          if (customerLst[i].billingContact) {
            this.customer.billingContact = customerLst[i].billingContact;
          } else {
            this.customer.billingContact = ' ';
          }
          if (customerLst[i].phoneNumber) {
            this.customer.phoneNumber = customerLst[i].phoneNumber;
          } else {
            this.customer.phoneNumber = ' ';
          }
          if (customerLst[i].owner && customerLst[i].owner.name !== null) {
            this.customer.owner.id = customerLst[i].owner.id;
            this.customer.owner.name = customerLst[i].owner.name;
          } else {
            this.customer.owner.id = '';
            this.customer.owner.name = ' ';
          }
          this.customers.push(this.customer);
          this.customer = {
            companyId: '',
            companyName: '',
            cityName: '',
            billingContact: '',
            phoneNumber: '',
            owner: {
              id: '',
              name: ''
            }
          };

        }
        // console.log(this.customers);
        this.filterData = this.customers;
        this.availableRecords = this.filterData.length;
      },
        error => {
          console.log(error);
        }
      );
    // console.log(this.getfilterData);

  }

  selectAll() {
    for (let i = 0; i < this.filterData.length; i++) {
      this.filterData[i].selected = this.selectedAll;
    }
  }
  checkIfAllSelected() {
    this.selectedAll = this.filterData.every(function (item: any) {
      return item.selected === true;
    });
  }

  ngOnInit() {
  }

  cancel() {
    this.blocation.back();
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.customers;
    } else {

      if (key === 'company') {
        this.filterData = this.customers.filter(x =>
          x.companyName.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'owner') {
        this.filterData = this.customers.filter(x =>
          x.owner.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'contact') {
        this.filterData = this.customers.filter(x =>
          x.billingContact.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'phone') {
        this.filterData = this.customers.filter(x =>
          x.phoneNumber.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'city') {
        this.filterData = this.customers.filter(x =>
          x.cityName.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

}
