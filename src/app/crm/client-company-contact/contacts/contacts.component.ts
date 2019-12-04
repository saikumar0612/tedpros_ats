import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  filterData;
  data;
  customerData: any = {};
  getfilterData;
  customers;
  fullname;
  selectedAll: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions = this.currentUser.permission;
  log;
  logger: any = {};
  availableRecords = 0;

  constructor(public http: Http, private service: UserService, private eventEmitter: EventEmitterService, public router: Router) {

    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'Client Company Contacts';
    this.logger.comment = 'View List of client Companies Contacts';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitter.onRecentActivityRefresh();
      });
    // http.get('http://service.tedpros.com/contact/customer/', options)
    this.service.getCustomerContacts()
      .subscribe(response => {
        this.data = response.json();
        // this.filterData = this.data;
        // console.log(this.data);
        this.getfilterData = [];
        const customerContact = this.data;
        console.log(customerContact);
        for (let i = 0; i < customerContact.length; i++) {
          // companyId
          this.customerData.companyId = customerContact[i].companyId;
          this.customerData.contactId = customerContact[i].contactId;
          if (customerContact[i].companyName) {
            this.customerData.companyName = customerContact[i].companyName;
          }
          else {
            this.customerData.companyName = ' ';
          }
          if (customerContact[i].firstName) {
            this.customerData.firstName = customerContact[i].firstName + ' ' + customerContact[i].lastName;
          }
          else {
            this.customerData.firstName = ' ';
          }
          if (customerContact[i].emailId) {
            this.customerData.emailId = customerContact[i].emailId;
          }
          else {
            this.customerData.emailId = ' ';
          }
          if (customerContact[i].phoneNo) {
            this.customerData.phoneNo = customerContact[i].phoneNo;
          }
          else {
            this.customerData.phoneNo = ' ';
          }
          if (customerContact[i].cityName) {
            this.customerData.cityName = customerContact[i].cityName;
          }
          else {
            this.customerData.cityName = ' ';
          }
          this.getfilterData.push(this.customerData);
          this.customerData = {
            companyName: '',
            firstName: '',
            emailId: '',
            phoneNo: '',
            cityName: ''
          };
        }
        this.filterData = this.getfilterData;
        this.availableRecords = this.filterData.length;
        // console.log(this.getfilterData);
      },
        error => {
          console.log(error);
        });
    // let fname = {{customer.firstName}};
    // let lname = {{customer.lastName}};
    //   fullname = fname + lname;
    //   console.log(fullname);

  }

  selectAll() {
    for (let i = 0; i < this.filterData.length; i++) {
      this.filterData[i].selected = this.selectedAll;
    }
  }
  checkIfAllSelected() {
    this.selectedAll = this.filterData.every(function (item: any) {
      return item.selected == true;
    })
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
    console.log(term);
    if (!term) {
      this.filterData = this.getfilterData;
    } else {
      console.log(this.data);
      this.filterData = this.getfilterData.filter(b =>

        //  if(b.cityName!==null || b.cityName!=='')
        //  {
        b.cityName.trim().toLowerCase().includes(term.trim().toLowerCase()),
        //  }
      );
    }
    this.availableRecords = this.filterData.length;
  }

}
