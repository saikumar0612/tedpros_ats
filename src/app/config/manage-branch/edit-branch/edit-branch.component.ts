import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Headers } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditBranchComponent implements OnInit {
  loading = false;
  isSuccess = false;
  isFailure = false;
  // branch: any;
  branchInfo:any;
  branch = {
    isClientLocation:false,
    registeredAddress: {
      state: {
        id: '',
      },
      country: {
        id: '',
      },
      city: {
        id: ''
      },
      address:"",
      street:"",
      zipcode:"",
      phone:"",
      fax:""
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
    id:"",
    notes:"",
    workWeek: {
      sunday:{id:'',name:''},
      monday:{id:'',name:''},
      tuesday:{id:'',name:''},
      wednesday:{id:'',name:''},
      thursday:{id:'',name:''},
      friday:{id:'',name:''},
      saturday:{id:'',name:''}
    }
  };
  data:any={};
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
  branchDetails:any={
    isClientLocation:false,
    registeredAddress: {
      state: {
        id: '',
      },
      country: {
        id: '',
      },
      city: {
        id: ''
      },
      address:"",
      street:"",
      zipcode:""
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
    id:"",
    workWeek: {
      sunday:{id:'',name:''},
      monday:{id:'',name:''},
      tuesday:{id:'',name:''},
      wednesday:{id:'',name:''},
      thursday:{id:'',name:''},
      friday:{id:'',name:''},
      saturday:{id:'',name:''}
    }
  };
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
  branchNamePattern;
  weekData=[];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private http: Http, private router: Router, public service: UserService, 
    private route: ActivatedRoute,public location:Location, private pattern:PatternsService) {

    this.loading = true;
    this.branchNamePattern = this.pattern.branchNamePattern;
    // Get countrys list
    this.service.getCountries()
      .subscribe(response => {
        this.countriesMaster = response.json().data;
        this.loading = false;
      });

    this.branch.registeredAddress.country.id = '231';
    this.getStates('231',1);

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
        // console.log(this.currencyMastList);
        this.loading = false;
      });

    // Languages
    this.service.getLanguages() 
      .subscribe(response => {
        this.languageMaster = response.json().data;
        this.loading = false;
      });


  }
  // states
  getStates(countryId,flag) {
    this.loading = true;
    if(flag===0)
    {
      this.branch.registeredAddress.zipcode='';
    }
   
    this.service.getStates(countryId)
      .subscribe(res => {
        this.satesMaster = res.json().data;
        this.loading = false;
      });
  }

  // citys
  getCitys(stateId,flag) {
    this.loading = true;
   
    if(flag===0)
    {
      this.branch.registeredAddress.zipcode='';
    }
    this.service.getCities(stateId) 
      .subscribe(res => {
        this.cityMaster = res.json().data;
        this.loading = false;
      });
  }

  //zip code change
  getzip(flag)
  {
    
    if(flag===0)
    {
      this.branch.registeredAddress.zipcode='';
    }

  }


  getAddress() {

    const zip = this.branch.registeredAddress.zipcode;
    this.zipError = null;
    if (zip !== null) {
      this.service.getAddress(zip)
        .subscribe(response => {
          this.result = response.json();
          if (this.result.statusCode.code === '200') {
            this.branch.registeredAddress.country.id = this.result.data.country.id;
            this.getStates(this.branch.registeredAddress.country.id,1);
            this.branch.registeredAddress.state.id = this.result.data.state.id;
            this.getCitys(this.branch.registeredAddress.state.id,1);
            this.branch.registeredAddress.city.id = this.result.data.city.id;
          } else {
            this.branch.registeredAddress.zipcode = '';
            this.zipError = 'Please enter a valid zip code';
            // console.log('zipcode not found');
          }
        });
    }
  }

  cancle(){
    this.router.navigate(['manage-branch']);
    // this.location.back();
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

  //update branch details
  editBranch() {

    // console.log(this.branchDetails);
    this.service.updateBranch(this.branch)
    .subscribe(response => {
      this.data = response.json();
      if(this.data.statusCode.code == "200"){
        this.isSuccess = true;
      }
      else{
        this.isFailure = true;
      }
    });
  }

  //get week data
  getWeekData(){
    this.service.getWorkDay().subscribe(res => {
      this.weekData = res.json().data;
    });
  }

  ngOnInit() {
    this.getWeekData();
    this.route.paramMap.subscribe(
      param => {
        this.branchInfo = param.get('id');
      }
    );

    //get branch details based on id
    this.service.getBranch(this.branchInfo)
    .subscribe(response => {
      this.branch = response.json().data;
      // console.log(this.branch.workWeek);
      if(this.branch){
        if(this.branch.localeSettings === null){
          this.branch.localeSettings = {
            locale:{id:''},
            timeZone:{id:''},
            language:{id:''},
            currency:{id:''}
          }
        }
        if(this.branch.workWeek === null){
          this.branch.workWeek= {
            sunday:{id:'3',name:''},
            monday:{id:'1',name:''},
            tuesday:{id:'1',name:''},
            wednesday:{id:'1',name:''},
            thursday:{id:'1',name:''},
            friday:{id:'1',name:''},
            saturday:{id:'1',name:''}
          }
        }
      }
      this.getStates(this.branch.registeredAddress.country.id,1);
      this.getCitys(this.branch.registeredAddress.state.id,1);
    })
  }


}
