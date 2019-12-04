import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { last } from '@angular/router/src/utils/collection';
import { DatePipe, Location } from '@angular/common';
import { error } from 'util';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-editcandidate-profile',
  templateUrl: './editcandidate-profile.component.html',
  styleUrls: ['./editcandidate-profile.component.css']
})
export class EditcandidateProfileComponent implements OnInit {
  public navigationMode: string = "free";
  currentDate;
  currentDate1;
  todayDate = new Date();;
  check1;
  check
  indexofexperience:any;
  indexofEducation:any;
  indexofSkill:any;
  isShowPopup1;
  isShowSummery;
  error = null;
  message;
  single;
  preview;
  candidateId = null;

  summary;
  countries;
  states;
  cities;
  loading;
  display = false;
  isCurrent = false;
  isEduCurrent = false;
  skill = {
    skillName: '',
    experience: '',
    lastUsed: '',
    comment: '',
    last: {
      month: '',
      year: ''
    }
  };
  education = {
    instituteName: '',
    qualification: '',
    specialization: '',
    passingYear: '',
    isCurrent: 0,
    gpaScore: ''
  };
  experience = {
    employer: '',
    jobTitle: '',
    description: '',
    startDate: '',
    endDate: '',
    supervisorName: '',
    supervisorPhone: '',
    isCurrent: 0,
    responsibilities: '',
    techSkills: ''
  };
  educations = [];
  experiences = [];
  skillData: any = {
    skill: []
  };
  summaryData: any = {
  };
  updateData:any ={
    status:0

  };
  educationData: any = {
    education: [{}]
  };
  experienceData: any = {
    experience: [{}]
  };
  
  displayfield = false;
  // personalData: any = {
  //   city: { id: '' },
  //   state: { id: '' },
  //   country: { id: '' },
  // };
  skills = [];
  skillRow = {};
  zipPattern = '([0-9]{5})';
  yearPattern = '^[0-9]{4}$';
  primaryPhonePattern = '^((\\+91-?)|0)?[0-9]{10}$';
  gpaPattern = '^[0]|[0-3]\.(\d?\d?)|[4].[0]$';
  responseData;
  zipError = null;
  skillError = '';
  educationError = '';
  emailError = '';
  experienceError = '';
  passingYearError = '';
  dateError = '';
  dateError1 = '';
  headers: any;
  options: any;
  month;
  months: any = [];
  years: any = [];
  year;
  candidatPersonal;
  imageChangedEvent: any = '';
  croppedImage: any = {};
  image: any;
  personalData:any = {
    firstName:'',lastName:'',email:'',phoneNo:'',addressLine1:'',addressLine2:'',city:'',state:'',country:'',zipCode:'', gender:'', dob:''
  };
  data;
  log;
  logger: any = {};
  payFrequency;
  emailIdPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  candidateData:any;
  jobtitlePattern;
  candidateUser = JSON.parse(localStorage.getItem('candidateUserData'));
  doberror;
  checkdate;
  differenceInHours;
  diffInDays;
  age;
  doberror1;
  monthError = '';
  veteran;
  disabled;
  consentData:any = {};
  consent;
  consentPopup = false;
  
   skillset;
  skillpopup = false;
  contactError: any = '';

  cusData: any = {
  };
  industriesData:any={
    skillType:''
  };
  linkedInPattern;
  showPassingYear:boolean =  true;
  resumeData:any;
  deleteData;
  resumePopup;
  resumeUrl;
  resume;
  files : FileList;
  fileName:boolean = false;
  fileData:any = {
    resume:''
  }
  constructor(private http: Http, private router: Router, private blocation: Location, private eventEmitter: EventEmitterService, private vmsservice:VmsCandidateService, public pattern:PatternsService) { 
    this.loading = true;
    this.jobtitlePattern = this.pattern.jobTitlePattern;
    this.linkedInPattern = this.pattern.linkedInPattern;
    for (let i = 1; i <= 12; i++) {
      let mStr = '';
      if (i <= 9) {
        mStr = '0' + i;
      } else {
        mStr = '' + i;
      }
      this.months.push(mStr); 
    }
    // this.months = this.monthName; 
    this.year = new DatePipe('en-US').transform(new Date(), 'yyyy');
    this.skill.last.year = this.year;
    this.skill.last.month = new DatePipe('en-US').transform(new Date(), 'MMMM');
    for (let index = this.year; index >= (this.year - 50); index--) {
      this.years.push(index);
    }
    
    
    this.educations = [];
    this.experiences = [];
    this.skills = [];

    // setting default country as united states
    this.personalData.country = '231';
    this.experienceData.experience.countryId = '231';
  }

  public uploader: FileUploader = new FileUploader({
    url: this.vmsservice.uploadResume(),
    itemAlias: 'resume',
    parametersBeforeFiles: true,
    headers: [{ name: 'Token', value: this.candidateUser.token }]
  });


  //saikumar 07/08/2019 started here
 getSkills(){
  this.vmsservice.getSkills()
  .subscribe(response => {
    this.skillset = response.json().data;
    this.loading = false;
    // console.log(this.skillset);
  },
  error => {
    console.log(error);
  });
 }

//saikumar 07/09/2019 ended here
  checkEmail() {
    const email = this.candidateData.email;
    this.vmsservice.checkEmail(email)
      .subscribe(response => {
        const result = response.json();
        if (result.statusCode.code === '409') {
          this.personalData.emailId = '';
          this.emailError = 'This email is already registered';
        } else {
          this.emailError = '';
        }
      },
        error => {
          console.log(error);
        });
  }

  dateValidate() {
    const today = new Date();
    if (this.experienceData.experience.startDate >= this.experienceData.experience.endDate) {
      this.dateError = 'Please select a valid end date';
      this.experienceData.experience.endDate = this.experienceData.experience.startDate;
    } else if (this.experienceData.experience.startDate > today && this.experienceData.experience.endDate > today) {
      this.dateError = 'Please select a valid date range';
      this.experienceData.experience.endDate = today;
      this.experienceData.experience.startDate = today;
    } else if (this.experienceData.experience.endDate > today && this.experienceData.experience.startDate < today) {
      this.dateError = 'Please select a valid date range';
      this.experienceData.experience.endDate = today;
    } else {
      this.dateError = '';
    }

  }

  dateValidate1(){
    if(this.experienceData.experience.startDate > this.todayDate){
      this.dateError1 = 'Please select a valid start date';
    }else if(this.experienceData.experience.startDate < this.experienceData.experience.endDate){
      this.dateError1 = 'Please select a valid date';
    }
    
    else{
      this.dateError1 = ''
    }
  }

  dateOfBirthValidation(){
    this.doberror="";
    this.checkdate= new Date();
    this.differenceInHours = Date.parse(this.checkdate) - Date.parse(this.personalData.dob);
    this.diffInDays = this.differenceInHours / 1000 / 60 / 60 / 24;
    this.age=this.diffInDays/365;
    if(this.age<14){
      this.doberror="Candidates Below the Age 14 are not eligible";
    }
   
  } 

  getAddress() {

    const zip = this.personalData.zipCode;
    this.zipError = null;
    console.log(zip);
    if (zip !== null) {
      this.vmsservice.getAddress(zip)
        .subscribe(response => {
          const result = response.json();
          if (result.statusCode.code === '200') {
            this.personalData.country = result.data.country.id;
            this.getState(this.personalData.country);
            this.personalData.state = result.data.state.id;
            this.getCity(this.personalData.state);
            this.personalData.city = result.data.city.id;
          } else {
            this.personalData.zipCode = '';
            this.zipError = 'Please enter a valid zip code';
            console.log('zipcode not found');
          }
        },
          error => {
            console.log(error);
          });
    }

  } 
 
  ngOnInit() {
   
    this.candidateData = this.candidateUser.data;
    console.log(this.candidateData);
    this.resumeUrl = this.vmsservice.getBaseUrl() + '/frontend/resume/';

    this.personalData.status = "Available";
    this.getSkills();
    this.currentDate = new Date();
    this.currentDate = new DatePipe('en-US').transform(this.currentDate, 'MM'); 
    console.log(this.currentDate);
    this.currentDate1 = new Date();
    this.currentDate1 = new DatePipe('en-US').transform(this.currentDate1, 'yyyy');
    console.log(this.currentDate1);

     this.skill.last.month = this.currentDate;
// changes --suresh- 08-14-2019 start
   // get payfrequency
   this.vmsservice.getPayFrequency().subscribe(res=>{
    this.payFrequency = res.json().data;
    // console.log(this.payFrequency);
  })
// changes --suresh- 08-14-2019 end

    // get countries list
    this.vmsservice.getCountries()
    .subscribe(response => {
      this.countries = response.json().data;
      this.loading = false;
    },
      error => {
        console.log(error);
      });
    
    this.getState('231');
      
    this.vmsservice.getCandidatePersonal(this.candidateData.email).subscribe(res=>{
      this.candidatPersonal = res.json().data;
    this.personalData.firstName = this.candidateData.firstName;
    this.personalData.lastName = this.candidateData.lastName;
    this.personalData.email = this.candidateData.email;
    this.personalData.phoneNo = this.candidateData.phoneNo;
     
    });

    this.getResume();

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('candidateId', this.candidateData.id);      
    };
    
  } 

  getFiles(event){ 
    this.files = event.target.files; 
    if(this.files.length != 0){
      this.fileName = true;
    }
    else{
      this.fileName = false;
    }
  }

  getResume(){
    this.vmsservice.getCandidateResume(this.candidateData.id).subscribe(res=>{
      this.resumeData = res.json().data;
      console.log(this.resumeData);
      if(this.resumeData){
        this.resume = this.resumeData.document;
      }else{
        this.resume = '';
      }
    });
  }

  deleteResume(){
    this.vmsservice.deleteCandidateResume(this.candidateData.id).subscribe(res=>{
      this.deleteData = res.json();
      if(this.deleteData.statusCode.code === '200'){
        // window.location.reload();
        this.getResume();
      }else{
        this.resumePopup = true;
        this.error = 'Resume cannot be deleted';
      }
    })
  }

  closeResumePopup(){
    this.getResume();
    this.fileData.resume = '';
    this.fileName = false;
  }

  closeresumePopup(){
    this.resumePopup = false;
    this.error = '';
  }

  changeCurrent(action) {
    console.log(this.check);
    if (action === 'experience') {
      // this.check1=false;
      this.isCurrent = !(this.isCurrent);
      console.log(this.check1);
    }
    if (action === 'education') { 
      // this.check=true;
      this.isEduCurrent = !(this.isEduCurrent);
      this.displayfield = true;
    }else{
      this.displayfield = false;
    }
  }

  addConsentData(){
    if(this.veteran){
      this.veteran = 1;
      console.log(this.veteran,"Consent1");
    }else{
      this.veteran = 0;
      console.log(this.veteran,"Consent1");
    }

    if(this.disabled){
      this.disabled = 1;
      console.log(this.disabled,"Consent2");
    }else{
      this.disabled = 0;
      console.log(this.disabled,"Consent2");
    }

    this.consentData.candidateId = this.candidateId;
    this.consentData.veteran = this.veteran;
    this.consentData.disabled = this.disabled;
    console.log(this.consentData);
    this.vmsservice.addCandidateConsent(this.consentData).subscribe(res=>{
      console.log(res);
      this.consent = res.json();
      if (this.consent.statusCode.code === '200') {
        this.consentPopup = true;
        this.error = null;
        this.message = this.consent.data;
      }else{
        this.consentPopup = true;
        this.message = null;
        this.error = this.consent.errorMessages;
      }
    })
  }
 
  
  cancel() {
    this.blocation.back();
  }
  closeconsentPopup(){
    this.consentPopup = !this.consentPopup;
  }

 

addExperiences(employer, jobTitle, description, supervisorName, supervisorPhone, responsibilities, techSkills, expForm: NgForm) {
  let endDate = new DatePipe('en-US').transform(this.experienceData.experience.endDate, 'yyyy-MM-dd');
  let startDate = new DatePipe('en-US').transform(this.experienceData.experience.startDate, 'yyyy-MM-dd');
  if(this.dateError1 || this.dateError){
    this.experienceError = 'Please select a valid Date range';
  }else{
    let isCurrent = 0;
  if(this.experienceData.experience.check){
    isCurrent = 1;
    endDate = null;
  }
  else{
    isCurrent = 0;
  }
  if(this.indexofexperience != null || this.indexofexperience == 0 || this.indexofexperience != undefined){
    let invalid = false;
    for (let index = 0; index < this.experiences.length; index++) {
      if(index != this.indexofexperience){
        if (this.experiences[index].employer === employer && this.experiences[index].jobTitle === jobTitle && this.experiences[index].startDate === startDate) {
          invalid = true;
        }
      }
    }
    if (invalid) {
      this.experienceError = 'Duplicate experience data cannot be added';
    }
    else{
      this.experienceError = "";
      this.experience = {
        employer: employer,
        jobTitle: jobTitle,
        description: description,
        startDate: startDate,
        endDate: endDate,
        supervisorName: supervisorName,
        supervisorPhone: supervisorPhone,
        isCurrent: isCurrent,
        responsibilities: responsibilities,
        techSkills: techSkills
      }
      this.experiences.splice(this.indexofexperience, 1, this.experience)
      this.experience = {
        employer: "",
        jobTitle: "",
        description: "",
        startDate: "",
        endDate: "",
        supervisorName: "",
        supervisorPhone: "",
        isCurrent: 0,
        responsibilities: "",
        techSkills: ""
      }
      expForm.resetForm();
      this.indexofexperience = null;
      this.experienceData.experience.check = 0;
      this.experienceData.experience.endDate = "";
    }
  }
  else if(this.indexofexperience === null || this.indexofexperience == undefined){
      let invalid = false;
      for (let index = 0; index < this.experiences.length; index++) {
        if (this.experiences[index].employer === employer && this.experiences[index].jobTitle === jobTitle && this.experiences[index].startDate === startDate) {
          invalid = true;
        }
      }
      if (invalid) {
        this.experienceError = 'Duplicate experience data cannot be added';
      }
      else{
        this.experienceError = "";
        this.experience = {
          employer: employer,
          jobTitle: jobTitle,
          description: description,
          startDate: startDate,
          endDate: endDate,
          supervisorName: supervisorName,
          supervisorPhone: supervisorPhone,
          isCurrent: isCurrent,
          responsibilities: responsibilities,
          techSkills: techSkills
        }
        this.experiences.push(this.experience)
        expForm.resetForm();
        if(this.experienceData.experience.check){
          this.experienceData.experience.check = 0;
        }
      }
  }
  }
  
}

addEducation(instituteName,qualification, specialization, gpaScore, addEducations: NgForm){
  let passingYear = this.educationData.education.passingYear;
  if (passingYear > this.currentDate1) {
    this.passingYearError = "Year of passing should'nt exceed current year";
  } else {
    let eduCurrent = 0;
    if (this.educationData.education.isCurrent) {
      eduCurrent = 1;
      passingYear = null;
    } else {
      eduCurrent = 0;
    }
    if (this.indexofEducation != null || this.indexofEducation == 0 || this.indexofEducation != undefined) {
      this.passingYearError = "";
      let invalid = false;
      for (let index = 0; index < this.educations.length; index++) {
        if(index != this.indexofEducation){
          if (this.educations[index].instituteName === instituteName && this.educations[index].qualification === qualification && this.educations[index].specialization === specialization && this.educations[index].passingYear === passingYear) {
            invalid = true;
          }
        }          
      }
      if (invalid) {
        this.educationError = 'Duplicate education data cannot be added';
      }
      else{
        this.educationError = "";
        this.education = {
          instituteName: instituteName,
          qualification: qualification,
          specialization: specialization,
          passingYear: passingYear,
          isCurrent: eduCurrent,
          gpaScore: gpaScore
        }
        this.educations.splice(this.indexofEducation, 1, this.education)
        this.education={
          instituteName: '',
          qualification: '',
          specialization: '',
          passingYear: '',
          isCurrent: 0,
          gpaScore: ''
        }
        addEducations.resetForm();
        this.indexofEducation = null;
        this.educationData.education.isCurrent = 0;            
        this.showPassingYear = true;
        this.educationData.education.passingYear = "";
      }
    }
    else if(this.indexofEducation === null || this.indexofEducation == undefined) {
      this.passingYearError = "";
      let invalid = false;
      for (let index = 0; index < this.educations.length; index++) {
        if (this.educations[index].instituteName === instituteName && this.educations[index].qualification === qualification && this.educations[index].specialization === specialization && this.educations[index].passingYear === passingYear) {
          invalid = true;
        }  
      }
      if (invalid) {
        this.educationError = 'Duplicate education data cannot be added';
      }
      else{
        this.educationError = "";
        this.education = {
          instituteName: instituteName,
          qualification: qualification,
          specialization: specialization,
          passingYear: passingYear,
          isCurrent: eduCurrent,
          gpaScore: gpaScore
        }
        this.educations.push(this.education)
        addEducations.resetForm();
        if(this.educationData.education.isCurrent){
          this.educationData.education.isCurrent = 0;            
          this.showPassingYear = true;
        }
      }
    }
  }
}

addSkill(skillName, experience, month, year, comment, addSkills: NgForm) {
  if (month > this.currentDate && year === this.currentDate1) {
    this.monthError = "Please select valid month & year";
  } else {
    if (this.indexofSkill != null || this.indexofSkill == 0 || this.indexofSkill != undefined) {
      this.monthError = "";
      let invalid = false;
      for (let index = 0; index < this.skills.length; index++) {
        if(index != this.indexofSkill){
          if(this.skills[index].skillName === skillName){
            invalid = true;
          }
          else if (this.skills[index].skillName === skillName && this.skills[index].experience === experience && this.skills[index].month === month && this.skills[index].year === year ) {
            invalid = true;
          }
        }          
      }

      if (invalid) {
        this.skillError = 'Duplicate skill data cannot be added';
      }
      else{
        this.skillError = "";
        this.skillRow ={
          skillName: skillName,
          experience: experience,
          lastUsed: month + '/' + year,
          comment: comment,
          skillId: name
        };
        this.skills.splice(this.indexofSkill,1,this.skillRow);
        addSkills.resetForm();
        this.indexofSkill =null;
      }

    }
    else if(this.indexofSkill == null || this.indexofSkill == undefined){
      this.monthError = "";
      let invalid = false;
      for (let index = 0; index < this.skills.length; index++) {
        if(this.skills[index].skillName === skillName){
          invalid = true;
        }
        else if (this.skills[index].skillName === skillName && this.skills[index].experience === experience && this.skills[index].month === month && this.skills[index].year === year ) {
          invalid = true;
        }
      }
      if (invalid) {
        this.skillError = 'Duplicate skill data cannot be added';
      }
      else{
        this.skillError = "";
        this.skillRow ={
          skillName: skillName,
          experience: experience,
          lastUsed: month + '/' + year,
          comment: comment,
          skillId: name
        };
        this.skills.push(this.skillRow);
        addSkills.resetForm();
      }
    }
  }
}
  removeEducation(education) {
    const index = this.educations.indexOf(education);
    this.educations.splice(index, 1);
  }

  removeExperience(experience) {
    const index = this.experiences.indexOf(experience);
    this.experiences.splice(index, 1);
  }

  removeSkill(skill) {
    const index = this.skills.indexOf(skill);
    this.skills.splice(index, 1);
  }


   
// saikumar 07-09-2019 started here
addnewskill() {
  this.skillpopup = true;
}

closeskillPopup(addindFrm:NgForm) {
  this.skillpopup = !this.skillpopup;
  addindFrm.resetForm();
  this.contactError = '';
}
//saikumar 07-09-2019 ended here


// saikumar 07/09/2019 started here
// saikumar 07/09/2019 started here
addskill(skillType, addindFrm:NgForm){
  this.loading = false;
   if (skillType !== "") {
     this.contactError= '';
  this.industriesData.skillType = skillType;
  this.vmsservice.postskills(this.industriesData).subscribe(response => {
    console.log(response);
   this.data= response.json();
   console.log(this.data);
   this.skill.skillName = this.data.data;
   if (this.data.statusCode.code === '200') {

    this.closeskillPopup(addindFrm);
    addindFrm.resetForm();
   }
   else if (this.data.statusCode.code === '409') {
    this.contactError = this.data.errorMessages;
    console.log( this.contactError);
   }
   
  this.getSkills()
  this.cusData.skillType=this.data.data;

   console.log(this.cusData.skillType);
  });
}else {
  this.loading = false;
  this.contactError = 'Fill required Fileds';

  }
 }

 // saikumar 07/09/2019 ended here





  editEduaction(education) {
    this.educationData.education.instituteName = education.instituteName;
    this.educationData.education.qualification = education.qualification;
    this.educationData.education.specialization = education.specialization;
    this.educationData.education.passingYear = education.passingYear;
    this.educationData.education.isCurrent = education.isCurrent;
    this.educationData.education.gpaScore = education.gpaScore;
    if (education.isCurrent) {
      this.educationData.education.isCurrent = true;
      this.showPassingYear = false;
    }
    else {
      this.educationData.education.isCurrent = false;
      this.showPassingYear = true;
    }
    let index = this.educations.indexOf(education);
    this.indexofEducation = index;
  }

  editExperience(experience) {
    console.log(experience);
    this.experienceData.experience.employer = experience.employer;
    this.experienceData.experience.jobTitle = experience.jobTitle;
    this.experienceData.experience.description = experience.description;
    this.experienceData.experience.startDate = experience.startDate;
    this.experienceData.experience.endDate = experience.endDate;
    this.experienceData.experience.supervisorName = experience.supervisorName;
    this.experienceData.experience.supervisorPhone = experience.supervisorPhone;
    this.experienceData.experience.responsibilities = experience.responsibilities;
    this.experienceData.experience.techSkills = experience.techSkills;
    if (experience.isCurrent) {
      this.experienceData.experience.check = true;
    }
    else {
      this.experienceData.experience.check = false;
    }
    let index = this.experiences.indexOf(experience);
    this.indexofexperience = index;
    console.log(this.experienceData.experience);
  }


  editSkill(skill) {
    this.skill.skillName = skill.skillName;
    this.skill.experience = skill.experience;
    this.skill.lastUsed = skill.lastUsed;
    this.skill.comment = skill.comment;
    const splitted = this.skill.lastUsed.split('/');
    this.skill.last.month = splitted[0];
    this.skill.last.year = splitted[1];
    let index = this.skills.indexOf(skill);
    this.indexofSkill = index;
  }

  // get states list based on country id
  getState(id) {
    console.log(id);
    this.vmsservice.getStates(id)
      .subscribe(response => {
        this.states = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }

  // get cities list based on state id
  getCity(id) {
    console.log(id);
    this.vmsservice.getCities(id)
      .subscribe(response => {
        this.cities = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }

  addCandidate() {
    if(this.doberror ){
      this.doberror="Candidates Below the Age 14 are not eligible";
    }else{
    this.personalData.dob = new DatePipe('en-US').transform(this.personalData.dob, 'yyyy-MM-dd');
    this.vmsservice.editCandidate(this.personalData)
      .subscribe(response => {
        this.responseData = response.json();
        if (this.responseData.statusCode.code === '200') {
          this.isShowPopup1 = true;
          this.error = null;
          this.message = 'Personal data added successfully';
          this.candidateId = this.candidatPersonal.id;
          this.experienceData.candidateId = this.candidateId;
          this.educationData.candidateId = this.candidateId;
          this.skillData.candidateId = this.candidateId;
          this.summaryData.candidateId = this.candidateId;
        } else {
          this.error = this.responseData.errorMessages;
          this.message = null;
          this.isShowPopup1 = true;
        }

        // else if(this.customers.statuscode === 409){
        //   this.display=true;
        // }
      },
        error => {
          // this.error = 'Data not submited';
          // this.message = null;
          // this.isShowPopup1 = true;
          console.log(error);
        });
    }
 
  }
  closePopup1() {
    this.consentPopup = false;
    this.isShowPopup1 = false;
    this.error = '';
    this.message = '';
  }
  closePopup4(){
    this.isShowSummery = !this.isShowSummery;
    this.error = '';
    this.message = '';
  }



  addCandidateExperience() {
    this.error = '';
    if (this.experiences.length <= 0) {
      this.error = null;
      this.message = 'No experience added do you wish to continue?';
      this.isShowPopup1 = true;
    } else {
      this.experienceData.experience = this.experiences;
      this.experienceData.candidateId = this.candidatPersonal.id;
      this.vmsservice.addCandidateExperence(this.experienceData)
        .subscribe(response => {
          this.responseData = response.json();
          if (this.responseData.statusCode.code === '200') {
            this.isShowPopup1 = true;
            this.error = null;
            this.message = 'Experience data added successfully';
          } else {
            this.error = 'Please add valid data';
            this.message = null;
            this.isShowPopup1 = true;
          }
        },
          error => {
            console.log(error);
          });
    }

  }

  addCandidateEducation() {
    this.error = '';
    if (this.educations.length <= 0) {
      this.error = 'Please enter atleat one qualification';
      this.message = null;
      this.isShowPopup1 = true;
    } else {
      this.educationData.education = this.educations;
      this.educationData.candidateId = this.candidateId;
      this.vmsservice.addCandidateEducation(this.educationData)
        .subscribe(res => {
          this.responseData = res.json();
          if (this.responseData.statusCode.code === '200') {
            this.isShowPopup1 = true;
            this.error = null;
            this.message = 'Education data added successfully';
          }
          else {
            this.error = 'Please add valid data';
            this.message = null;
            this.isShowPopup1 = true;
          }
        },
          error => {
            console.log(error);
          });
    }
  }

  addCandidateSkills() {
    this.error = '';
    if (this.skills.length <= 0) {
      this.error = 'Please specify atleast one skill';
      this.message = null;
      this.isShowPopup1 = true;
    } else {
      this.skillData.skill = this.skills;
      this.skillData.candidateId = this.candidateId;
      this.vmsservice.addCandidateSkills(this.skillData)
        .subscribe(data => {
          this.responseData = data.json();
          if (this.responseData.statusCode.code === '200') {
            this.isShowPopup1 = true;
            this.error = null;
            this.message = 'Skills data added successfully';
          } else {
            this.error = 'Please add valid data';
            this.message = null;
            this.isShowPopup1 = true;
          }
        },
          error => {
            console.log(error);
          });
    }

  }
 
  addCandidateSummary() { 
    this.summaryData.candidateId = this.candidateId;
    this.vmsservice.addCandidateSummary(this.summaryData)
      .subscribe(response => { 
        this.responseData = response.json();
        if (this.responseData.statusCode.code === '200') {
          this.updateData.startDate = 1;
          this.showpreview();
          // this.showpreview();
          // this.isShowSummery = true;
          // this.message = "Summary added successfully";
        } else {
          this.error = 'Please add valid data';
          this.message = null;
          this.isShowSummery = true;
        }
      
      },
        error => {
          console.log(error);
        });
  }

  showpreview() {
    this.single = this.candidateId;
    this.preview = true;
  }
  closePopup() {
    this.preview = !this.preview;
  }

  consentClose(){
    this.consentPopup = false;
  }



  // crop image
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  // image crop
  imageCropped(event: ImageCroppedEvent) {
    this.image = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  editInfo() {
    this.display = true;
  }

  back() {
    this.display = false;
  }
  closePreviewPopup(){
    this.preview = !this.preview;
  }

  // uploadProfilePic
  uploadPic() {
    if (this.image !== '') {
      const candidate = {
        id: this.candidateId,
        image: this.image
      };
      this.vmsservice.uploadCandidate(candidate)
        .subscribe(response => {
          const result = response.json();
          if (result.statusCode.code === '200') {
            this.isShowPopup1 = true;
            this.error = null;
            this.message = result.data;
          } else {
            this.isShowPopup1 = true;
            this.error = result.errorMessages;
            this.message = null;
          }
        });

    }
  }
}
