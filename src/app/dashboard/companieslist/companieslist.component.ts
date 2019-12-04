import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-companieslist',
  templateUrl: './companieslist.component.html',
  styleUrls: ['./companieslist.component.css']
})
export class CompanieslistComponent implements OnInit {
  filterData = [];
  getfilterData = [];
  data;
  customer = {
    companyId: '',
    companyName: '',
    cityName: '',
    billingContact: '',
    phoneNumber: '',
    owner: {
      id: '',
      name: ''
    },
    branch: [],
    jobs:[],
    branchCount: false,
    jobCount: false
  };
  customers = [];
  availableRecords = 0;
  result;
  expand = [];
  expand1 = [];
  loading;
  expandhq:any;
  constructor(public service: UserService) { }

  ngOnInit() {
    this.loading = true;
   this.service.companiesBySales().subscribe(res=>{
     this.result = res.json().data;
     this.loading = false;
     const companiesList = this.result;
    for (let i = 0; i < companiesList.length; i++) {
      this.customer.companyId = companiesList[i].companyId;
      this.customer.companyName = companiesList[i].companyName;
      if (companiesList[i].city && companiesList[i].city.name !== null) {
        this.customer.cityName = companiesList[i].city.name;
      } else {
        this.customer.cityName = ' ';
      }
      if (companiesList[i].billingContact) {
        this.customer.billingContact = companiesList[i].billingContact;
      } else {
        this.customer.billingContact = ' ';
      }
      if (companiesList[i].phoneNumber) {
        this.customer.phoneNumber = companiesList[i].phoneNumber;
      } else {
        this.customer.phoneNumber = ' ';
      }
      if (companiesList[i].owner && companiesList[i].owner.name !== null) {
        this.customer.owner.id = companiesList[i].owner.id;
        this.customer.owner.name = companiesList[i].owner.name;
      } else {
        this.customer.owner.id = '';
        this.customer.owner.name = ' ';
      }
      if (companiesList[i].branchCount) {
        this.customer.branch = companiesList[i].branch;
        this.customer.branchCount = true;
      }
      if (companiesList[i].jobCount) {
        this.customer.jobs = companiesList[i].jobs;
        this.customer.jobCount = true;
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
        },
        branch: [],
        jobs:[],
        branchCount: false,
        jobCount:false
      };

    }
    this.filterData = this.customers;
    console.log(this.filterData);
    this.availableRecords = this.filterData.length;   

   });
  }


  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.customers;
    } else {

      if (key === 'companyName') {
        this.filterData = this.customers.filter(x =>
          x.companyName.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'owner.name') {
        this.filterData = this.customers.filter(x =>
          x.owner.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'billingContact') {
        this.filterData = this.customers.filter(x =>
          x.billingContact.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'phoneNumber') {
        this.filterData = this.customers.filter(x =>
          x.phoneNumber.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'cityName') {
        this.filterData = this.customers.filter(x =>
          x.cityName.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

}

