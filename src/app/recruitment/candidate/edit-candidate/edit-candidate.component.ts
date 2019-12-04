
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NavigationMode, WizardComponent } from 'angular-archwizard'
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { DatePipe, Location } from '@angular/common';
import { FileUploader } from 'ng2-file-upload';
import { error } from 'util';
import { FormBuilder, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-edit-candidate',
  templateUrl: './edit-candidate.component.html',
  styleUrls: ['./edit-candidate.component.css']
})

export class EditCandidateComponent implements OnInit {
  public navigationMode: string = "free";
  currentDate;
  currentDate1;
  cusData: any = {
  };
  todayDate = new Date();
  passingYearError = '';
  indexofExperience: any;
  indexofEducation: any;
  indexofSkill: any;
  array: any = {
    arrayId: ''
  };
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
    skillType:'',
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
  consentData:any = {
    veteran:'',
    disabled:''
  };
  educationData: any = {
    education: [{}]
  };
  experienceData: any = {
    experience: [{}]
  };
  personalData: any = {
    per:{
      id:'',
      pay_frequency:''
    },
    city: { id: '' },
    state: { id: '' },
    country: { id: '' },
  };
  skills = [];
  skillRow = {};
  zipPattern = '([0-9]{5})';
  yearPattern = '^[0-9]{4}$';
  primaryPhonePattern = '^((\\+91-?)|0)?[0-9]{10}$';
  responseData;
  zipError = null;
  skillError = '';
  educationError = '';
  emailError = '';
  experienceError = '';
  dateError = '';
  monthError = '';
  headers: any;
  consentPopup = false;
  options: any;
  month;
  months: any = [];
  years: any = [];
  year;
  data;
  filterData;
  imageChangedEvent: any = '';
  croppedImage: any = {};
  image: any;
  payFrequency;
  log;
  logger: any = {};
  dateError1
  doberror;
  checkdate;
  differenceInHours;
  diffInDays;
  age;
  doberror1;
  check;
  check1;
  emailIdPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  jobtitlePattern;
  navigationLocation: any;
  navigationBoolean = false;
  veteran;
  disabled;
skillset;
  skillpopup :boolean = false;
  contactError: any = '';
  industriesData:any={
    skillType:''
  };
  consent;
  gpaPattern;
  linkedInPattern;
  showPassingYear:boolean =  true;
  resumeData:any;
  deleteData;
  resumePopup;
  resume;
  resumeUrl='';
  files : FileList;
  fileName:boolean = false;
  fileData:any = {
    resume:''
  };
//   @ViewChild(WizardComponent,{ static: true })
// public wizard: WizardComponent;
  // @ViewChild("wizard",{ static: true }) wizard:any;
  // public wizard:WizardComponent;
  constructor(private http: Http, private router: Router, public auth: AuthenticationService, public service: UserService, private blocation: Location, private route: ActivatedRoute, private eventEmitter: EventEmitterService, private pattern: PatternsService) {
    this.loading = true;
    this.jobtitlePattern = this.pattern.jobTitlePattern;
    this.linkedInPattern = this.pattern.linkedInPattern;
    // this.gpaPattern =this.pattern.gpaSocrePattern;

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


  
  // public wizard:WizardComponent;

  // click(){
  //   // this.wizard.goToNextStep();
  //   // this.wizard.goToStep(desinationIndex);
  //   this.wizard.defaultStepIndex;
  //   // wizard.navigation.goToStep(destinationStepIndex);
  // }
  public uploader: FileUploader = new FileUploader({
    url: this.service.uploadResume(),
    itemAlias: 'resume',
    parametersBeforeFiles: true,
    headers: [{ name: 'Token', value: this.currentUser.token }]
  });

  dateValidate() {
    const today = new Date();
    if (this.experienceData.experience.startDate >= this.experienceData.experience.endDate) {
      this.dateError = 'Please select a valid end date';
      this.experienceData.experience.endDate = this.experienceData.experience.startDate;
    } else if (this.experienceData.experience.startDate > today && this.experienceData.experience.endDate > today) {
      this.dateError = 'Please select a valid end date';
      this.experienceData.experience.endDate = today;
      this.experienceData.experience.startDate = today;
    } else if (this.experienceData.experience.endDate > today && this.experienceData.experience.startDate < today) {
      this.dateError = 'Please select a valid end date';
      this.experienceData.experience.endDate = today;
    } else {
      this.dateError = '';
    }

  }

  dateValidate1(){
    if(this.experienceData.experience.startDate > this.todayDate){
      this.dateError1 = 'Please select a valid start date';
    }else{
      this.dateError1 = ''
    }
  }

  //saikumar 07/08/2019 started here
 getSkills(){
  this.service.getSkills()
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

  //  changes --suresh-- 08-23-2019 start
  dateOfBirthValidation() {
    // this.doberror1 ="";
    this.doberror = "";
    this.checkdate = new Date();
    this.differenceInHours = Date.parse(this.checkdate) - Date.parse(this.personalData.dob);
    this.diffInDays = this.differenceInHours / 1000 / 60 / 60 / 24;
    this.age = this.diffInDays / 365;
    if (this.age < 14) {
      this.doberror = "Candidates Below the Age 14 are not eligible";
    }
  }
  //  changes --suresh-- 08-23-2019 end
  ngOnInit() {
    this.resumeUrl = this.service.getBaseUrl() + '/frontend/resume/';

    this.getSkills();
    this.currentDate = new Date();
    this.currentDate = new DatePipe('en-US').transform(this.currentDate, 'MM');
    this.currentDate1 = new Date();
    this.currentDate1 = new DatePipe('en-US').transform(this.currentDate1, 'yyyy');

    // changes --suresh- 08-14-2019 start
    this.service.getPayFrequency().subscribe(res => {
      this.payFrequency = res.json().data;
      // console.log(this.payFrequency);
    })
    // changes --suresh- 08-14-2019 end
    this.route.paramMap.subscribe(
      param => {
        this.candidateId = param.get('id');
      }
    );
    this.array.arrayId = "";
    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'Edit Candidate';
    this.logger.comment = 'Edit Candidate by Id as' + this.candidateId;
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitter.onRecentActivityRefresh();
      });


    // this.http.get('http://service.tedpros.com/job/getCandidate?id=' + this.candidateId, this.options)
    this.service.getCandidateId(this.candidateId)
      .subscribe(response => {
        this.data = response.json();
        this.filterData = this.data.data;
        this.personalData = this.filterData;
        this.personalData.per = this.filterData.per.id;
        this.image = this.personalData.image.trim();
        this.summary = this.personalData.summary;
        this.summaryData.summary = this.summary;
       
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
        
        this.getState(this.personalData.country.id);
        this.getCity(this.personalData.state.id);
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
    // this.http.get('http://service.tedpros.com/config/country/', this.options)
    this.service.getCountries()
      .subscribe(response => {
        this.countries = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });
    this.navigationLocation = this.blocation.getState();
    if (this.navigationLocation.navigationId > 1) {
      this.navigationBoolean = true;
    } else {
      console.log('navigationId');
      console.log(this.navigationLocation.navigationId);
    }

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('candidateId', this.candidateId);  
    };

    this.getResume();

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
    this.service.getCandidateResume(this.candidateId).subscribe(res=>{
      this.resumeData = res.json().data;
      if(this.resumeData){
        this.resume = this.resumeData.document;
      }else{
        this.resume = '';
      }
    });
  }

  deleteResume(){
    console.log("delete data");
    this.service.deleteCandidateResume(this.candidateId).subscribe(res=>{
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
  closeIsSuccess() {
    window.location.reload();
  }


  cancel() {
    this.blocation.back();
  }

  getAddress() {

    const zip = this.personalData.zipCode;
    this.zipError = null;
    if (zip !== null) {
      this.service.getAddress(zip)
        .subscribe(response => {
          const result = response.json();
          // console.log(result);
          if (result.statusCode.code === '200') {
            this.personalData.country.id = result.data.country.id;
            this.getState(this.personalData.country.id);
            this.personalData.state.id = result.data.state.id;
            this.getCity(this.personalData.state.id);
            this.personalData.city.id = result.data.city.id;
          } else {
            this.personalData.zipCode = '';
            this.zipError = 'Please enter a valid zip code';
          }
        },
          error => {
            console.log(error);
          });
    }

  }

  editConsentData(){
    if(this.veteran){
      this.veteran = 1;
      // console.log(this.veteran,"Consent1");
    }else{
      this.veteran = 0;
      // console.log(this.veteran,"Consent1");
    }

    if(this.disabled){
      this.disabled = 1;
      // console.log(this.disabled,"Consent2");
    }else{
      this.disabled = 0;
      // console.log(this.disabled,"Consent2");
    }
    this.consentData.candidateId = this.candidateId;
    this.consentData.veteran = this.veteran;
    this.consentData.disabled = this.disabled;
    this.service.editCandidateConsent(this.consentData).subscribe(res=>{
      this.consent = res.json();
      if(this.consent.statusCode.code === '200'){
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

  // changeCurrent(action) {
  //   if (action === 'experience') {
  //     this.isCurrent = !(this.isCurrent);
  //   }
  // }

  // sharmistha - 10-15-2019 - start

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
    if(this.indexofExperience != null || this.indexofExperience == 0 || this.indexofExperience != undefined){
      let invalid = false;
      for (let index = 0; index < this.experiences.length; index++) {
        if(index != this.indexofExperience){
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
        this.experiences.splice(this.indexofExperience, 1, this.experience)
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
        this.indexofExperience = null;
        this.experienceData.experience.check = 0;
        this.experienceData.experience.endDate = "";
      }
    }
    else if(this.indexofExperience === null || this.indexofExperience == undefined){
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
    this.indexofExperience = index;
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
    this.skill.skillType = skill.skillName;
    this.skill.experience = skill.experience;
    this.skill.lastUsed = skill.lastUsed;
    this.skill.comment = skill.comment;
    const splitted = this.skill.lastUsed.split('/');
    this.skill.last.month = splitted[0];
    this.skill.last.year = splitted[1];
    let index = this.skills.indexOf(skill);
    this.indexofSkill = index;
  }

  // sharmistha - 10-15-2019 - end

  // get states list based on country id
  getState(id) {
    this.service.getStates(id)
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
    this.service.getCities(id)
      .subscribe(response => {
        this.cities = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }

  editCandidate() {
    //  changes --suresh-- 08-23-2019 start
    if (this.doberror) {

    } else {
      this.personalData.candidateId = this.candidateId;
      this.personalData.dob = new DatePipe('en-US').transform(this.personalData.dob, 'yyyy-MM-dd');
      // console.log(this.options, this.personalData);
      this.service.editCandidate(this.personalData)
        .subscribe(response => {
          // console.log(response);
          this.responseData = response.json();
          // console.log(this.responseData);
          if (this.responseData.statusCode.code === '200') {
            this.isShowPopup1 = true;
            this.error = null;
            this.message = 'personal data updated successfully';
            this.candidateId = this.responseData.candidateId;
            // console.log(this.candidateId);
            // console.log(this.message);
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
    //  changes --suresh-- 08-23-2019 end
  }
  closePopup1() {
    this.isShowPopup1 = false;
    this.consentPopup = false;
    // this.isShowPopup1 = !this.isShowPopup1;
    this.error = '';
    this.message = '';
  }

  consentClose(){
    this.consentPopup = false;
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
      console.log(this.experienceData);
      this.service.editCandidateExperence(this.experienceData)
        .subscribe(response => {
          console.log(response);
          this.responseData = response.json();
          console.log(this.responseData);
          if (this.responseData.statusCode.code === '200') {
            this.isShowPopup1 = true;
            this.error = null;
            this.message = 'Experience data updated successfully';
            console.log(this.candidateId);
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
      console.log(this.options, this.educationData);
      this.service.editCandidateEducation(this.educationData)
        .subscribe(response => {
          console.log(response);
          this.responseData = response.json();
          console.log(this.responseData);
          if (this.responseData.statusCode.code === '200') {
            this.isShowPopup1 = true;
            this.error = null;
            this.message = 'Education data updated successfully';
            console.log(this.candidateId);
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

  editCandidateSkills() {
    this.error = '';
    if (this.skills.length <= 0) {
      this.error = null;
      this.message = 'Please specify atleast one skill';
      this.isShowPopup1 = true;
    } else {
      this.skillData.candidateId = this.candidateId;
      this.skillData.skill = this.skills;
      // console.log(this.options, this.skillData);
      this.service.editCandidateSkills(this.skillData)
        .subscribe(response => {
          // console.log(response);
          this.responseData = response.json();
          // console.log(this.responseData);
          if (this.responseData.statusCode.code === '200') {
            this.isShowPopup1 = true;
            this.error = null;
            this.message = 'Skills data updated successfully';
            // console.log(this.candidateId);
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

  
// saikumar 07-09-2019 started here
addnewskill() {
  this.skillpopup = true;
}

closeskillPopup(addindFrm:NgForm) {
  this.skillpopup = !this.skillpopup;
  this.contactError = '';
  addindFrm.resetForm();
}
//saikumar 07-09-2019 ended here


// saikumar 07/09/2019 started here

  

// saikumar 07/09/2019 started here
addskill(skillType, addindFrm:NgForm){
  this.loading = false;
   if (skillType !== "") {
     this.contactError= '';
  this.industriesData.skillType = skillType;
  this.service.postskills(this.industriesData).subscribe(response => {
    // console.log(response);
   this.data= response.json();
  //  console.log(this.data);
   this.skill.skillType = this.data.data;

   if (this.data.statusCode.code === '200') {

    this.closeskillPopup(addindFrm);
    addindFrm.resetForm();
   }
   else if (this.data.statusCode.code === '409') {
    this.contactError = this.data.errorMessages;
    // console.log( this.contactError);
   }
   
  this.getSkills()
  this.cusData.skillType=this.data.data;

  //  console.log(this.cusData.skillType);
  });
}else {
  this.loading = false;
  this.contactError = 'Fill required Fileds';

  }
 }

 // saikumar 07/09/2019 ended here



  editCandidateSummary() {
    this.summaryData.candidateId = this.candidateId;
    console.log(this.options, this.summaryData);
    this.service.editCandidateSummary(this.summaryData)
      .subscribe(response => {
        console.log(response);
        this.responseData = response.json();
        console.log(this.responseData);
        if (this.responseData.statusCode.code === '200') {
          console.log(this.candidateId);
          this.showpreview();
          // this.router.navigate(['candidate']);
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

  showpreview() {
    this.single = this.candidateId;
    this.preview = true;



  }
  closeconsentPopup(){
    this.consentPopup = false;
  }
  closePopup() {
    this.preview = !this.preview;
  }

  // crop image
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  // image crop
  imageCropped(event: ImageCroppedEvent) {
    this.image = event.base64;
    // console.log(this.croppedImage);
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
      this.service.uploadCandidate(candidate)
        .subscribe(response => {
          const result = response.json();
          if (result.statusCode.code === '200') {
            this.isShowPopup1 = true;
            this.error = null;
            this.message = result.data;
            console.log(this.candidateId);
            console.log(this.message);
          } else {
            this.isShowPopup1 = true;
            this.error = result.errorMessages;
            this.message = null;
          }
        });

    }
  }

}
