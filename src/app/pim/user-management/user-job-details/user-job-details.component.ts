import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { FileUploader } from 'ng2-file-upload';
import { DatePipe, Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-user-job-details',
  templateUrl: './user-job-details.component.html',
  styleUrls: ['./user-job-details.component.css']
})
export class UserJobDetailsComponent implements OnInit {
  log
  logger:any={};
  check: any;
  displayContact = false;
  professionalInfo: any = {
    jobTitle: [],
    selectedTitle:[],
    empStatus: {
      id: '',
      name: ''
    },
    jobCategory: {
      id: '',
      name: ''
    },
    jobLocation: {
      id: '',
      name: ''
    },
    frequency: {
      id: '',
      name: ''
    }
  };
  jobInfo: any = {
    jobTitle: [],
    empStatus: {
      id: '',
      name: ''
    },
    jobCategory: {
      id: '',
      name: ''
    },
    jobLocation: {
      id: '',
      name: ''
    },
    frequency: {
      id: '',
      name: ''
    }
  };
  data;
  empStatus;
  jobCategory;
  categoryTitles;
  catTitles;
  titles;
  selectedJobTitles=[];
  jobTitles;
  jobTitle;
  jobCategories;
  employmentStatus;
  loading;
  userId;
  locations;
  payFrequencies;
  filterUdata: {};
  success = false;
  isFailure = false;
  message;
  result;
  professionalDetails:{
    jobDetails:'',
    userDetails:''
  };
  userName:any;
  headers: any;
  options: any;
  startDate;
  endDate;
  contractStartDate;
  contractEndDate;
  contractError;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userToken: string = this.currentUser.token;
  jobtitlePattern;
  jobTitlesDropdownSettings={};
  jobTitleError:boolean = false;
  seljobTitle:any;
  selectedTitle = [];

  constructor(private eventEmitterService: EventEmitterService,private route: ActivatedRoute, public http: Http, private router: Router, public auth: AuthenticationService, public pattern:PatternsService,
    public service: UserService, private blocation: Location) {
      this.jobtitlePattern = this.pattern.jobTitlePattern;
    // console.log(this.userToken);
    this.headers = new Headers({ 'Token': this.userToken });
    this.options = new RequestOptions({ headers: this.headers });
     
    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='View User Job Details';
    this.logger.comment='View User Job Details';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;  
      this.eventEmitterService.onRecentActivityRefresh();    
    });

  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.professionalInfo.id = param.get('id');
        this.userId = this.professionalInfo.id;
      }
    );

    //added ng-multiselect dropdown for job title - sharmistha - 08-29-2019 - start 
    this.jobTitlesDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'jobTitle',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      "closeDropDownOnSelection": true
    }
    //added ng-multiselect dropdown for job title - sharmistha - 08-29-2019 - end

    // get professional info
    this.service.getEmpProfessionalInfoId(this.professionalInfo.id)
      .subscribe(response => {
        this.professionalDetails = response.json().data;
        console.log(this.professionalDetails);
        this.professionalInfo = this.professionalDetails.jobDetails;
        console.log(this.professionalInfo);
        this.userName = this.professionalDetails.userDetails;
        if(this.professionalInfo){
          const contracDoc = this.service.getBaseUrl() + '/frontend/contract_docs/' + this.professionalInfo.documents;
          this.professionalInfo.documents = contracDoc;
          // console.log(this.professionalInfo);
          if (this.professionalInfo) {
            this.selectedTitle.push({'id':this.professionalInfo.jobTitle.id, 'jobTitle':this.professionalInfo.jobTitle.name});
            this.service.getJobTitleById(this.professionalInfo.jobCategory.id)
            .subscribe(response => {
              this.selectedJobTitles = response.json().data;
            },
            error => {
              console.log(error);
            });
          }
        }
      },
        error => {
          console.log(error);
        }
      );

    // get pay frequency list
    this.service.getPayFrequency()
      .subscribe(response => {
        this.payFrequencies = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });

    // get job titles list
    this.service.getJobTitles()
      .subscribe(response => {
        this.jobTitles = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });

    // get job categories list
    this.service.getJobCategories()
      .subscribe(response => {
        this.jobCategories = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });

    // get emp status list
    this.service.getEmpStatus()
      .subscribe(response => {
        this.employmentStatus = response.json();
        this.loading = false;
        // console.log(this.employmentStatus);
      },
        error => {
          console.log(error);
        });

    // get job titles
    // this.http.get(this.url+'job/categoryTitles', this.options)
    this.service.getJobCategoryTitle()
      .subscribe(response => {
        this.categoryTitles = response.json().data;
        this.loading = false;
        // console.log(this.categoryTitles);
      });

    // get locations
    // this.http.get(this.url+'config/locations/', this.options)
    this.service.getlocations()
      .subscribe(response => {
        this.locations = response.json().data;
        this.loading = false;
      });

    // work auth documents
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      // form.append('startDate', this.professionalInfo.startDate);
      form.append('userId', this.userId);
    };
  }

  // code change for department selection - sharmistha - 08-29-2019 - start
  onItemSelect(id) {
    this.selectedTitle=[];
    this.catTitles = this.categoryTitles.filter(x=>{
      return x.id == id
    })[0];
    this.selectedJobTitles = [];
    this.catTitles.jobTitle.forEach(obj=>{
      this.selectedJobTitles.push(obj);
      this.selectedJobTitles =  [...this.selectedJobTitles];
    })
  }

  onCategorySelect(id) {
    this.jobInfo.jobTitle="";
    this.catTitles = this.categoryTitles.filter(x=>{
      return x.id == id
    })[0];
    this.selectedJobTitles = [];
    // console.log(this.catTitles);
    if(this.catTitles.jobTitle){
      this.catTitles.jobTitle.forEach(obj=>{
        this.selectedJobTitles.push(obj);
        this.selectedJobTitles =  [...this.selectedJobTitles];
      })
    }
    
  }
  // code change for department selection - sharmistha - 08-29-2019 - end

  public uploader: FileUploader = new FileUploader({
    url: this.service.getEmpdocument(),
    itemAlias: 'document',
    parametersBeforeFiles: true,
    headers: [{ name: 'Token', value: this.userToken }]
  });

  editUser() {
    this.startDate = new DatePipe('en-US').transform(this.professionalInfo.startDate, 'yyyy-MM-dd');
    this.endDate = new DatePipe('en-US').transform(this.professionalInfo.endDate, 'yyyy-MM-dd');
    if(this.startDate > this.endDate){
      this.contractError = "Contract startDate should'nt exceed contract endDate";
      // console.log("Contract startDate should'nt exceed contract endDate");
    }else{
      this.contractError = "";
      this.loading = true;
      //changed the job title variable - sharmistha - 08-29-2019 - start 
      this.seljobTitle = this.selectedTitle[0];
      //changed the job title variable - sharmistha - 08-29-2019 - end
      this.filterUdata = {
        'jobTitle': this.seljobTitle.id,
        //Added technical job title - sharmistha - 08-08-2019 - start 
        'technicalTitle': this.professionalInfo.technicalTitle,
        //Added technical job title - sharmistha - 08-08-2019 - start 
        'jobSpecification': this.professionalInfo.jobSpecification,
        'jobCategory': this.professionalInfo.jobCategory.id,
        'joiningDate': new DatePipe('en-US').transform(this.professionalInfo.joiningDate, 'yyyy-MM-dd'),
        'jobLocation': this.professionalInfo.jobLocation.id,
        'startDate':this.startDate,
        'endDate': this.endDate,
      };
      // console.log(this.filterUdata);
      
  
      this.service.editEmpProfessionalInfoId(this.userId, this.filterUdata)
        .subscribe(response => {
          this.loading = false;
          this.result = response.json();
          if (this.result.statusCode.code === '200') {
            this.success = true;
          } else {
            // console.log(this.userDetails.errorMessages);
            this.isFailure = true;
          }
        });
    }
  
  }

  addUser() {
    this.contractStartDate = new DatePipe('en-US').transform(this.jobInfo.startDate, 'yyyy-MM-dd');
    this.contractEndDate =  new DatePipe('en-US').transform(this.jobInfo.endDate, 'yyyy-MM-dd');
    this.loading = true;
    if(this.jobInfo.jobTitle.id == ""){
      this.jobTitleError = true;
    }else if (this.contractStartDate > this.contractEndDate){
      this.contractError = "Contract startDate should'nt exceed contract endDate";
    }
    else{
     this.contractError = "";
      //changed the job title variable - sharmistha - 08-29-2019 - start 
      this.seljobTitle = this.jobInfo.jobTitle[0];
      //changed the job title variable - sharmistha - 08-29-2019 - end
      this.filterUdata = {
        'jobTitle': this.seljobTitle.id,
        //Added technical job title - sharmistha - 08-08-2019 - start 
        'technicalTitle': this.jobInfo.technicalTitle,
        //Added technical job title - sharmistha - 08-08-2019 - start 
        'jobSpecification': this.jobInfo.jobSpecification,
        'jobCategory': this.jobInfo.jobCategory.id,
        'joiningDate': new Date(this.jobInfo.joiningDate),
        'jobLocation': this.jobInfo.jobLocation.id,
        'startDate':  this.contractStartDate,
	     'endDate': this.contractEndDate,
      };
      // console.log(this.filterUdata);
      this.service.editEmpProfessionalInfoId(this.userId, this.filterUdata)
        .subscribe(res => {
          this.result = res.json();
          if(this.result.statusCode.code === "200"){
            this.loading = false;
            this.success = true;
          }
          else{
            this.isFailure = true;
          }
        });
    }
  }

  cancel() {
    // <!-- changed redirection link for cancel button - sharmistha - start - 08-14-2019 -->
    // this.blocation.back();
    this.displayContact = false;
    // <!-- changed redirection link for cancel button - sharmistha - end - 08-14-2019 -->
  }

  move(){
    this.router.navigate(['usersView']);
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.success = !this.success;
  }

  editContact() {
    this.displayContact = true;
  }

  backContact() {
    this.displayContact = false;
  }

}
