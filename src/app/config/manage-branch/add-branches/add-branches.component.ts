import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import {Location } from '@angular/common';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-add-branches',
  templateUrl: './add-branches.component.html',
  styleUrls: ['./add-branches.component.css']
})
export class AddBranchesComponent implements OnInit {

  isSuccess = false;
  isFailure = false;
  loading = false;
  branch: any;
  addingBranch: any = {
    isClientLocation:false,
    registeredAddress: {
      state: {
        id: ''
      },
      country: {
        id: ''
      },
      city: {
        id: ''
      },
      phone:'',
      fax:''
    },
    localeSettings: {
      locale: { id: '' },
      timeZone: { id: '' },
      currency: { id: '' },
      language: { id: '' }
    },
    fiscalYear: {
      start: { id: '' },
      end: { id: '' }
    },
    name:"",
    notes:"",
    workWeek: {
      sunday:{id:'3',name:''},
      monday:{id:'1',name:''},
      tuesday:{id:'1',name:''},
      wednesday:{id:'1',name:''},
      thursday:{id:'1',name:''},
      friday:{id:'1',name:''},
      saturday:{id:'1',name:''}
    }
  };
  countriesMaster: any;
  isActiveTab: any = 0;
  satesMaster: any;
  localeMasterList: any;
  timeZonesMasterList: any;
  currencyMastList: any;
  cityMaster: any;
  languageMaster: any;
  allBranches: any;
  zipError = '';
  result={
    statusCode:{
      code:'',
      message:''
    },
    errorMessages: '',
    data:{
            country:{id:'',name:''},
            state:{id:'',name:''},
            city:{id:'',name:''}}
  };
  headers: any;
  options: any;
  beanchNamePattern;
  weekData=[];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private http: Http, private router: Router, public service: UserService,public location :Location , private pattern:PatternsService) {
    this.beanchNamePattern = this.pattern.branchNamePattern;
    this.loading = true;

    // Get countrys list

    this.service.getCountries()
      .subscribe(response => {
        this.countriesMaster = response.json().data;
        this.loading = false;
      });

    this.addingBranch.registeredAddress.country.id = '231';
    this.getStates('231');

    // get locale list
    this.service. getLocale()
      .subscribe(response => {
        this.localeMasterList = response.json().data;
        this.loading = false;
      });

    // Time Zones master list
    this.service. getTimezone()
      .subscribe(response => {
        this.timeZonesMasterList = response.json().data;
        this.loading = false;
      });

    // currencyMastList
    this.service.getCurrency()
      .subscribe(response => {
        this.currencyMastList = response.json().data;
        this.loading = false;
      });

    // Languages
    this.service.getLanguages() 
      .subscribe(response => {
        this.languageMaster = response.json().data;
        this.loading = false;
      });


  }

  //get week data
  getWeekData(){
    this.service.getWorkDay().subscribe(res => {
      this.weekData = res.json().data;
    });
  }
  
  // states
  getStates(countryId) {
    this.loading = true;
    this.addingBranch.registeredAddress.zipcode='';
    this.service.getStates(countryId)
      .subscribe(res => {
        this.satesMaster = res.json().data;
        this.loading = false;
      });
  }

  // citys
  getCitys(stateId) {
    this.loading = true;
    this.addingBranch.registeredAddress.zipcode='';
    this.service.getCities(stateId) 
      .subscribe(res => {
        this.cityMaster = res.json().data;
        this.loading = false;
      });
  }

  getAddress() {
    const zip = this.addingBranch.registeredAddress.zipcode;
    this.zipError = null;
    if (zip !== null) {
      this.service.getAddress(zip)
        .subscribe(response => {
          this.result = response.json();
          if (this.result.statusCode.code === '200') {
            this.addingBranch.registeredAddress.country.id = this.result.data.country.id;
            this.getStates(this.addingBranch.registeredAddress.country.id);
            this.addingBranch.registeredAddress.state.id = this.result.data.state.id;
            this.getCitys(this.addingBranch.registeredAddress.state.id);
            this.addingBranch.registeredAddress.city.id = this.result.data.city.id;
          } else {
            this.addingBranch.registeredAddress.zipcode = '';
            this.zipError = 'Please enter a valid zip code';
            // console.log('zipcode not found');
          }
        },
        error => {
          console.log(error);
        });
    }
  }

  cancle(){
    // this.router.navigate(['manage-branch']);
    this.location.back();
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

  addBranch() {
    this.service.addBranch(this.addingBranch)
    .subscribe(response => {
      this.branch = response.json();
      // console.log(this.branch);
      if(this.branch.statusCode.code == "200"){
        this.isSuccess = true;
      }
      else{
        // console.log(this.branch.errorMessages);
        this.isFailure = true;
      }
    },
    error => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.getWeekData();
  }


}
