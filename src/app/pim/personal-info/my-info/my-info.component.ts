import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService, UserService } from '../../../core/services';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  src="http://www.africau.edu/images/default/sample.pdf";
  log
  logger:any={};

  personalInfo;
  contactInfo;
  dependentInfo;
  educationInfo;
  experienceInfo;
  skillInfo;
  licenseInfo;
  languageInfo;
  professionalInfo;
  offerLetter:any;
  headers:any;
  options:any;
  i9details=[];
  document=[];
  documentLink;
  doc=[];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userFlag: string = this.currentUser.flag;
  userToken: string = this.currentUser.token;
  files : FileList;
  fileName:boolean = false;
  resumeInfo:any ={};
  resumeUrl:any;
  resumeDeleteInfo:any;

  constructor(private route: ActivatedRoute, public http: Http, private service:UserService,private eventEmitterService: EventEmitterService,private authenticationService: AuthenticationService,private router: Router) { 
    this.headers = new Headers({ 'Token': this.userToken });
    this.options = new RequestOptions({ headers: this.headers });
    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='View My-info';
    this.logger.comment='View My-info';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;
      this.eventEmitterService.onRecentActivityRefresh(); 
    });

    this.resumeUrl = this.service.getBaseUrl() + '/frontend/employee_resume/';
  }

  getResume(){
    this.service.getEmpResume()
    .subscribe(response =>{
      this.resumeInfo= response.json().data;
      // console.log(this.resumeInfo);
      // console.log(this.uploader)
    },
    error => {
      console.log(error);
    })
  }

  ngOnInit() {

    //resume info
    this.getResume();
      
    //personal info
    this.service.getPersonalInfo()
    .subscribe(response =>{
      this.personalInfo= response.json().data;
    },
    error => {
      console.log(error);
    })

    //contact info
    this.service.getPersonalContactInfo()
    .subscribe(response =>{
      this.contactInfo= response.json().data;
    },
    error => {
      console.log(error);
    })

    //dependent info
    this.service.getPersonalDependentInfo()
    .subscribe(response =>{
      this.dependentInfo= response.json().data;
    },
    error => {
      console.log(error);
    })

    //education info
    this.service.getPersonalEducationInfo()
    .subscribe(response =>{
      this.educationInfo= response.json().data;
    },
    error => {
      console.log(error);
    })

    //experience info
    this.service.getPersonalExperenceInfo()
    .subscribe(response =>{
      this.experienceInfo= response.json().data;
    },
    error => {
      console.log(error);
    })

    //skill info
    this.service.getPersonalSkillsInfo()
    .subscribe(response =>{
      this.skillInfo= response.json().data;
    },
    error => {
      console.log(error);
    })

    //language info
    this.service.getPersonalLanguageInfo()
    .subscribe(response =>{
      this.languageInfo= response.json().data;
    },
    error => {
      console.log(error);
    })

    //license info
    this.service.getPersonalLicenceInfo()
    .subscribe(response =>{
      this.licenseInfo= response.json().data;
    },
    error => {
      console.log(error);
    })

    //professional info
    this.service.getProfessionalInfo()
    .subscribe(response =>{
      this.professionalInfo= response.json().data;
    },
    error => {
      console.log(error);
    })

    //offer letter info
    this.service.getOfferDetails()
    .subscribe(res => {
    this.offerLetter = res.json().data;
    },
    error => {
      console.log(error);
    })
  }

  public uploader: FileUploader = new FileUploader({
    url: this.service.postEmpResume(),
    itemAlias: 'document',
    parametersBeforeFiles: true,
    headers: [{ name: 'Token', value: this.userToken }]
  });

  getFiles(event){ 
    this.files = event.target.files; 
    if(this.files.length != 0){
      this.fileName = true;
    }
    else{
      this.fileName = false;
    }
    // this.fileName = true;
    // console.log(this.files)
  }

  move(){
    window.location.reload();
  }

  deleteResume(){
    this.service.deleteResume()
    .subscribe(res => {
    this.resumeDeleteInfo = res.json().data;
    // console.log(this.resumeDeleteInfo);
    this.getResume();
    },
    error => {
      console.log(error);
    })
  }

}
