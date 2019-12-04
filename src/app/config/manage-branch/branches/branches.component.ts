import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';


@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {
  branches;
  loading = true;
  branch: any = {
    isClientLocation:false,
    registeredAddress: {
      state: {
        id: '',
        name:''
      },
      country: {
        id: '',
        name:''
      },
      city: {
        id: '',
        name:''
      },
      address:"",
      street:"",
      zipcode:""
    },
    localeSettings: {
      locale: { id: '', name:'' },
      timeZone: { id: '', name:'' },
      currency: { id: '', name:'' },
      language: { id: '', name:'' }
    },
    fiscalYear: {
      start: { id: '1' },
      end: { id: '12' }
    },
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
  countriesMaster: any;
  isActiveTab: any = 0;
  satesMaster: any;
  localeMasterList: any;
  timeZonesMasterList: any;
  currencyMastList: any;
  cityMaster: any;
  languageMaster: any;
  allBranches=[];
  zipError = '';
  isShowPopup = false;
  
  refState: any;
  isNewbranch = false;
  error = '';
  message = '';
  popup = false;
  result={
    statusCode: {
      code: '',
      message: ""
  },
  errorMessages: null,
  data: [
    ]
  };
  currentUser ={
    token:'',
    email:'',
    id: '',
    flag: '',
    empType: {
        id:'',
        employeeType: ''
    },
    userType: {
        id: '',
        name: '',
        typeName: ''
    },
    first_name: '',
    last_name: '',
    middle_name: '',
    isAdmin:false,
    Adminrole: false,
    permission: {},
    submenuPermission: { },
    fieldPermission: {}
  };
  userPermissions:any;
  constructor(private http: Http, private router: Router, public service: UserService) {
  }

  // states
  getStates(countryId) {
    this.loading = true;
    this.service. getStates(countryId) 
    .subscribe(res => {
      this.satesMaster = res.json().data;
      this.loading = false;
    });
  }

  // cities
  getCitys(stateId) {
    this.loading = true;
    this.service.getCities(stateId)
    .subscribe(res => {
      this.cityMaster = res.json().data;
      this.loading = false;
    });
  }

  getAddress(zipcode) {
    this.zipError = null;
    // console.log(zipcode);
    if (zipcode !== null) {
      this.service.getAddress(zipcode)
        .subscribe(response => {
          const result = response.json();
          // console.log(result);
          if (result.statusCode.code === '200') {
            this.branch.registeredAddress.country.id = result.data.country.id;
            this.getStates(this.branch.registeredAddress.country.id);
            this.branch.registeredAddress.state.id = result.data.state.id;
            this.getCitys(this.branch.registeredAddress.state.id);
            this.branch.registeredAddress.city.id = result.data.city.id;
          } else {
            this.branch.registeredAddress.zipcode = '';
            this.zipError = 'Please enter a valid zip code';
          }
        },
          error => {
            console.log(error);
          });
    }
  }

  ngOnInit() {
    this.loading=true;

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userPermissions = this.currentUser.permission;
    // Get countrys list
    this.service.getCountries()
      .subscribe(response => {
        this.countriesMaster = response.json().data;
        this.loading = false;
      });

    // get locale list
    this.service.getLocale()
      .subscribe(response => {
        this.localeMasterList = response.json().data;
        this.loading = false;
      });


    // Time Zones master list
   this.service.getTimezone()
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
    this.service.getCompanyBranches()
    .subscribe(res => {
      this.result = res.json();
      if (res.json().statusCode.code === '403' || res.json().statusCode.code === '401') {
        this.router.navigate(['/authorization/logout']);
      } else if (this.result.statusCode.code === '200') {
        this.error = '';
        this.allBranches = res.json().data;
        // console.log(this.allBranches);
      } else {
        this.error = this.result.errorMessages;
        this.message = '';
      }
      this.loading = false;
    });
  }

}
