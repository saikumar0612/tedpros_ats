import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';
import { PatternsService} from '../../../core/services/patterns.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-candidate-resume-edit',
  templateUrl: './candidate-resume-edit.component.html',
  styleUrls: ['./candidate-resume-edit.component.css']
})
export class CandidateResumeEditComponent implements OnInit {
  public navigationMode: string = "free";
  currentDate;
  currentDate1;
  currentDate2;
  todayDate = new Date();
  passingYearError = '';
  isCurrentStatus:boolean=false;
  isEducationStatus:boolean=false;
  indexofexperience:any;
  indexofEducation:any;
  indexofSkill:any;
  array:any={
    arrayId:''
  };
  isShowSummery;
  isShowPopup1;
  error = null;
  message;
  single;
  preview;
  candidateId;
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
    skill: [{}]
  };
  summaryData: any = {
  };
  educationData: any = {
    education: [{}]
  };
  experienceData: any = {
    experience: [{}]
  };
  personalData: any = {
    id:'',
    firstName:'',lastName:'',
    city: { id: '' },
    state: { id: '' },
    country: { id: '' },
  };
  skills = [];
  skillRow = {};
  zipPattern = '([0-9]{5})';
  yearPattern = '^[0-9]{4}$';
  primaryPhonePattern = '^((\\+91-?)|0)?[0-9]{10}$';
  gpaPattern = '^[0]|[0-3]\.(\d?\d?)|[4].[0]$';
  responseData:any;
  zipError = null;
  skillError = '';
  educationError = '';
  emailError = '';
  experienceError = '';
  dateError = '';
  dateError1 = '';
  headers: any;
  options: any;
  month;
  months: any = [];
  years: any = [];
  year;
  data;
  filterData:any ;
  imageChangedEvent: any = '';
  croppedImage: any = {};
  image: any;
  payFrequency;

  log;
  logger: any = {};
  monthError = '';

  emailIdPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  candidateUser: any;
  candidateEmail:any;
  jobTitlePattern;
  doberror;
  checkdate;
  differenceInHours;
  diffInDays;
  check1;
  age;
  doberror1:any ;
skillset;
  skillpopup;
  contactError: any = '';

  cusData: any = {
  };
  industriesData:any={
    skillType:''
  };
  consentData:any = {};
  consentPopup;
  consent;
  veteran;
  disabled;
  educheck;
  linkedInPattern;
  uploadData;
  id:any;
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
  };
  uploader: any;
  addressData:any;
  constructor(private http: Http, private router: Router, private route: ActivatedRoute, private eventEmitter: EventEmitterService, private vmsService:VmsCandidateService, public pattern:PatternsService) { 
    
    this.jobTitlePattern = this.pattern.jobTitlePattern;
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
    this.year = new DatePipe('en-US').transform(new Date(), 'yyyy');
    this.skill.last.year = this.year;
    this.skill.last.month = new DatePipe('en-US').transform(new Date(), 'MM');
    for (let index = this.year; index >= (this.year - 50); index--) {
      this.years.push(index);
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


//saikumar 07/08/2019 started here
getSkills(){
  this.vmsService.getSkills()
  .subscribe(response => {
    this.skillset = response.json().data;
  },
  error => {
    console.log(error);
  });
 }

//saikumar 07/09/2019 ended here
 
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
    }else{
      this.dateError1 = '';
    }
  }

  ngOnInit() {
    this.candidateUser = JSON.parse(localStorage.getItem('candidateUserData'));
    this.uploader = new FileUploader({
      url: this.vmsService.uploadResume(),
      itemAlias: 'resume',
      parametersBeforeFiles: true,
      headers: [{ name: 'Token', value: this.candidateUser.token }]
    });
    this.resumeUrl = this.vmsService.getBaseUrl() + '/frontend/resume/';

    this.getSkills();
    this.currentDate = new Date();
    this.currentDate = new DatePipe('en-US').transform(this.currentDate, 'MM');
    this.currentDate1 = new Date();
    this.currentDate2 = new DatePipe('en-US').transform(this.currentDate1, 'yyyy');
// changes --suresh- 08-14-2019 start
    this.vmsService.getPayFrequency().subscribe(res=>{
      this.payFrequency = res.json().data;
      // console.log(this.payFrequency);
    })
// changes --suresh- 08-14-2019 end
   
    this.candidateEmail = this.candidateUser.data;
    this.route.paramMap.subscribe(
      param => {
        this.candidateId = param.get('id');
      }
    );
    this.array.arrayId = "";
 
    this.vmsService.getCandidatePersonal(this.candidateEmail.email)
      .subscribe(response => {
        this.data = response.json();
        this.filterData = this.data.data;
        this.personalData = this.filterData;
        this.personalData.per =  this.personalData.per.id;
        this.personalData.country = this.filterData.country.id;
        this.personalData.state = this.filterData.state.id;
        this.personalData.city = this.filterData.city.id;
        this.image = this.personalData.image.trim();
        this.summary = this.personalData.summary;
        if(this.personalData.consent === null){
          this.consentData.candidateId = this.personalData.id;
          this.consentData.veteran = '0';
          this.consentData.disabled = '0';
        }else{
          this.consentData = this.personalData.consent;
          if(this.consentData.veteran === '1'){
            this.veteran = true;
          }else{
            this.veteran = false;
          }
          if(this.consentData.disabled === '1'){
            this.disabled = true;
          }else{
            this.disabled = false;
          }
        }

        this.id =  this.personalData.id;
        this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
          form.append('candidateId', this.id);      
        };
        this.summaryData.summary = this.summary;
        this.getState(this.personalData.country);
        this.getCity(this.personalData.state);
        if (this.personalData.experience === null) {
          this.experiences = [];
        } else {
          this.experiences = this.personalData.experience;
        }
        if (this.personalData.skills === null) {
          this.skills = [];
        } else {
          this.skills = this.personalData.skills;
        }
        if (this.personalData.education === null) {
          this.educations = [];
        } else {
          this.educations = this.personalData.education;
        }
      },
        error => {
          console.log(error);
        }
      );

    // get countries list
    this.vmsService.getCountries()
    .subscribe(response => {
      this.countries = response.json().data;
      this.loading = false;
    },
    error => {
      console.log(error);
    });

    this.getResume();
  }

  getFiles(event:any){ 
    console.log(event);
    this.files = event.target.files; 
    if(this.files.length != 0){
      this.fileName = true;
    }
    else{
      this.fileName = false;
    }
  }

  getResume(){
    this.vmsService.getCandidateResume(this.candidateEmail.id).subscribe(res=>{
      this.resumeData = res.json().data;
      if(this.resumeData){
        this.resume = this.resumeData.document;
      }else{
        this.resume = '';
      }
    });
  }

  deleteResume(){
    this.vmsService.deleteCandidateResume(this.candidateEmail.id).subscribe(res=>{
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

  closeresumePopup1(){
    this.resumePopup = false;
    this.error = '';
  }

  getAddress() {

    const zip = this.personalData.zipCode;
    this.zipError = null;
    console.log(zip);
    if (zip !== null) {
      this.vmsService.getAddress(zip)
        .subscribe(response => {
          const result = response.json();
          this.addressData = result;
          if ( this.addressData.statusCode.code === '200') {
            this.personalData.country =  this.addressData.data.country.id;
            this.getState(this.personalData.country);
            this.personalData.state =  this.addressData.data.state.id;
            this.getCity(this.personalData.state);
            this.personalData.city=  this.addressData.data.city.id;
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
addskills(skillType, addindFrm:NgForm){
  this.loading = false;
   if (skillType !== "") {
     this.contactError= '';
  this.industriesData.skillType = skillType;
  this.vmsService.postskills(this.industriesData).subscribe(response => {
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

  addEducation(instituteName,qualification, specialization, gpaScore, editEducations: NgForm){
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
          editEducations.resetForm();
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
          editEducations.resetForm();
          if(this.educationData.education.isCurrent){
            this.educationData.education.isCurrent = 0;            
            this.showPassingYear = true;
          }
        }
      }
    }
  }

  addSkill(skillName, experience, month, year, comment, skillFrm: NgForm) {
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
          skillFrm.resetForm();
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
          skillFrm.resetForm();
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


  
  editCanExperience(experience) {
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

  editCanEduaction(education) {
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

  editCanSkill(skill) {
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
    this.vmsService.getStates(id)
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
    this.vmsService.getCities(id)
      .subscribe(response => {
        this.cities = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }

  editCandidate() {
    if(this.doberror){
      
    }else{
      // this.doberror1 ="";
    this.personalData.candidateId = this.personalData.id;
    this.personalData.dob = new DatePipe('en-US').transform(this.personalData.dob, 'yyyy-MM-dd');
    this.vmsService.editCandidate(this.personalData) 
      .subscribe(response => {
        this.responseData = response.json();
        if (this.responseData.statusCode.code === '200') {
          this.isShowPopup1 = true;
          this.error = null;
          this.message = 'personal data updated successfully';
          this.candidateId = this.personalData.id;
          this.experienceData.candidateId = this.candidateId;
          this.educationData.candidateId = this.candidateId;
          this.skillData.candidateId = this.candidateId;
          this.summaryData.candidateId = this.candidateId;
        } else {
          this.error = this.responseData.errorMessages;
          this.message = null;
          this.isShowPopup1 = true;
        }

      },
        error => {
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

  consentClose(){
    this.consentPopup = false;
  }


  editConsentData(){
    if(this.veteran){
      console.log(this.veteran);
      this.veteran = 1;
    }else{
      this.veteran = 0;
    }

    if(this.disabled){
      this.disabled = 1;
    }else{
      this.disabled = 0;
    }
    this.consentData.candidateId = this.candidateId;
    this.consentData.veteran = this.veteran;
    this.consentData.disabled = this.disabled;
    console.log(this.consentData);

    this.vmsService.editCandidateConsent(this.consentData).subscribe(res=>{
      this.consent = res.json();
      if(this.consent.statusCode.code === '200'){
        this.consentPopup = true;
        this.error = null;
        this.message = this.consent.data;
      }else{
        this.consentPopup = true;
        this.error = this.consent.errorMessages;
        this.message = null;
      }
    })
  }

  editCandidateExperience() {
    this.error = '';
    if (this.experiences.length <= 0) {
      this.error = null;
      this.message = 'No experience added do you wish to continue?';
      this.isShowPopup1 = true;
    } else {
      this.experienceData.candidateId = this.candidateId;
      this.experienceData.experience = this.experiences;
      this.vmsService.editCandidateExperence(this.experienceData)
        .subscribe(response => {
          this.responseData = response.json();
          console.log(this.responseData);
          if (this.responseData.statusCode.code === '200') {
            this.isShowPopup1 = true;
            this.error = null;
            this.message = 'Experience data updated successfully';
          } else {
            this.error = 'Please add valid data';
            this.message = null;
            this.isShowPopup1 = true;
          }
          // else if(this.customers.statuscode === 409){
          //   this.display=true;
          // }
        },
          error => {
            console.log(error);
          });
    }
  }

  editCandidateEducation() {
    this.error = '';
    if (this.educations.length <= 0) {
      this.error = 'Please enter atleat one qualification';
      this.message = null;
      this.isShowPopup1 = true;
    } else {
      this.educationData.candidateId = this.candidateId;
      this.educationData.education = this.educations;
      this.vmsService.editCandidateEducation(this.educationData)
        .subscribe(response => {
          this.responseData = response.json();
          console.log(this.responseData);
          if (this.responseData.statusCode.code === '200') {
            this.isShowPopup1 = true;
            this.error = null;
            this.message = 'Education data updated successfully';
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

  editCandidateSkills() { 
    this.error = '';
    if (this.skills.length <= 0) {
      this.message = null;
      this.error = 'Please specify atleast one skill';
      this.isShowPopup1 = true;
    } else {
      this.skillData.candidateId = this.candidateId;
      this.skillData.skill = this.skills;
      this.vmsService.editCandidateSkills(this.skillData)
        .subscribe(response => {
          this.responseData = response.json();
          if (this.responseData.statusCode.code === '200') {
            this.isShowPopup1 = true;
            this.error = null;
            this.message = 'Skills data updated successfully';
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

  editCandidateSummary() {
    this.summaryData.candidateId = this.candidateId;
    this.vmsService.editCandidateSummary(this.summaryData)
      .subscribe(response => {
        this.responseData = response.json();
        if (this.responseData.statusCode.code === '200') {
          this.showpreview();
          
          // this.isShowSummery = true;
          // this.error = null;
          // this.message = 'Summary data updated successfully';
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

  showpreview() {
    this.single = this.candidateId;
    this.preview = true;

  }
  closePreviewPopup() {
    this.preview = !this.preview;
  }

  closeconsentPopup(){
    this.isShowSummery = false;
    this.consentPopup = !this.consentPopup;
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

  // uploadProfilePic
  uploadPic() {
    if (this.image !== '') {
      const candidate = {
        id: this.candidateId,
        image: this.image
      };
      this.vmsService.uploadCandidate(candidate)
        .subscribe(response => {
          const result = response.json();
          this.uploadData = result;
          if (this.uploadData.statusCode.code === '200') {
            this.isShowPopup1 = true;
            this.error = null;
            this.message = this.uploadData.data;
          } else {
            this.isShowPopup1 = true;
            this.error = this.uploadData.errorMessages;
            this.message = null;
          }
        });

    }
  }

}
