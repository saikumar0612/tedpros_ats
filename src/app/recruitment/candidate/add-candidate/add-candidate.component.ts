import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService, UserService } from '../../../core/services';
import { MailService } from '../../../core/services/mail.service';
import { DatePipe, Location } from '@angular/common';
import { error } from 'util';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {
  currentDate;
  currentDate1;
  todayDate = new Date();
  indexofexperience: any;
  indexofEducation: any;
  indexofSkill: any;
  isShowPopup1;
  consentPopup;
  error = null;
  message;
  single;
  preview;
  candidateId = null;
  monthError = '';
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
    skillType: '',
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
  educationData: any = {
    education: [{}]
  };
  consentData: any = {
    candidateId: '',
    veteran: '',
    disabled: ''
  }
  experienceData: any = {
    experience: [{}]
  };
  personalData: any = {
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
  responseData = {
    statusCode: {
      code: '',
      message: ''
    },
    errorMessages: null,
    data: '',
    candidateId: ''
  };
  zipError = null;
  skillError = '';
  educationError = '';
  passingYearError = '';
  emailError = '';
  experienceError = '';
  dateError = '';
  headers: any;
  options: any;
  month;
  months: any = [];
  years: any = [];
  year;
  imageChangedEvent: any = '';
  croppedImage: any = {};
  image: any;
  // monthName = [
  //   'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  // ];
  log;
  logger: any = {};
  payFrequency;
  emailIdPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  jobTitlePattern;
  doberror;
  checkdate;
  differenceInHours;
  diffInDays;
  age;
  check;
  check1;
  doberror1;
  navigationLocation: any;
  navigationBoolean = false;
  veteran;
  disabled;
  consent;
  skillset;
  skillpopup;
  contactError: any = '';
  industriesData: any = {
    skillType: ''
  };
  cusData: any = {
  };
  data;
  dateError1;
  linkedInPattern;
  showPassingYear: boolean = true;
  resumeUrl;
  resumeData: any;
  deleteData;
  resumePopup;
  resume;
  files: FileList;
  fileName: boolean = false;
  fileData: any = {
    resume: ''
  }
  constructor(private http: Http, private router: Router, public auth: AuthenticationService, public service: UserService, public pattern: PatternsService,
    private blocation: Location, private eventEmitter: EventEmitterService, public mailService: MailService) {
    this.loading = true;
    this.jobTitlePattern = this.pattern.jobTitlePattern;
    this.linkedInPattern = this.pattern.linkedInPattern;

    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'Add Candidate';
    this.logger.comment = 'Add New Candidate';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitter.onRecentActivityRefresh();
      });

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

    // get countries list
    // http.get('http://service.tedpros.com/config/country/', this.options)
    this.service.getCountries()
      .subscribe(response => {
        this.countries = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });
    this.educations = [];
    this.experiences = [];
    this.skills = [];

    // setting default country as united states
    this.personalData.country.id = '231';
    this.getState('231');

    this.experienceData.experience.countryId = '231';
    this.navigationLocation = this.blocation.getState();
    if (this.navigationLocation.navigationId > 1) {
      console.log(this.navigationLocation.navigationId);
      this.navigationBoolean = true;

    } else {
      console.log('navigationId');
      console.log(this.navigationLocation.navigationId);
      this.navigationBoolean = false;
    }
  }

  public uploader: FileUploader = new FileUploader({
    url: this.service.uploadResume(),
    itemAlias: 'resume',
    parametersBeforeFiles: true,
    headers: [{ name: 'Token', value: this.currentUser.token }]
  });

  checkEmail() {
    const email = this.personalData.emailId;
    this.service.checkCandidateEmail(email)
      .subscribe(response => {
        const result = response.json();
        // console.log(result);
        if (result.statusCode.code === '409') {
          this.personalData.emailId = '';
          this.emailError = 'This email is already registered';
        } else {
          this.emailError = '';
          this.getPHPListToken();
          if (localStorage.getItem('phpListToken')) {
            this.mailService.addSubscriber(email)
              .subscribe(resp => {
                console.log('Add email');
                console.log(resp);
              },
                error => {
                  console.log(error);
                });
          }
          // this.mailService.addSubscriber(email);
        }
      },
        error => {
          console.log(error);
        });
  }

  getPHPListToken() {
    this.mailService.genToken('admin', 'Pass12!@')
      .subscribe(resp => {
        console.log('generate token');
        console.log(resp);
      },
        error => {
          console.log(error);
        });
  }

  //saikumar 09/08/2019 started here
  getSkills() {
    this.service.getSkills()
      .subscribe(response => {
        this.skillset = response.json().data;
        this.loading = false;
        console.log(this.skillset);
      },
        error => {
          console.log(error);
        });
  }

  //saikumar 09/09/2019 ended here

  dateOfBirthValidation() {
    this.doberror = "";
    this.doberror1 = "";
    this.checkdate = new Date();
    this.differenceInHours = Date.parse(this.checkdate) - Date.parse(this.personalData.dob);
    this.diffInDays = this.differenceInHours / 1000 / 60 / 60 / 24;
    this.age = this.diffInDays / 365;
    if (this.age < 14) {
      this.doberror = "Candidates Below the Age 14 are not eligible";
    }

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

  dateValidate1() {
    if (this.experienceData.experience.startDate > this.todayDate) {
      this.dateError1 = 'Please select a valid start date'
    } else {
      this.dateError1 = ''
    }
  }

  getAddress() {

    const zip = this.personalData.zipCode;
    this.zipError = null;
    console.log(zip);
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
            console.log('zipcode not found');
          }
        },
          error => {
            console.log(error);
          });
    }

  }

  ngOnInit() {
    this.resumeUrl = this.service.getBaseUrl() + '/frontend/resume/';
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
    this.service.getPayFrequency().subscribe(res => {
      this.payFrequency = res.json().data;
      // console.log(this.payFrequency);
    })
    // changes --suresh- 08-14-2019 end
    this.getResume();
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('candidateId', this.candidateId);
    };

  }

  getFiles(event) {
    this.files = event.target.files;
    if (this.files.length != 0) {
      this.fileName = true;
    }
    else {
      this.fileName = false;
    }
  }

  getResume() {
    this.service.getCandidateResume(this.candidateId).subscribe(res => {
      this.resumeData = res.json().data;
      console.log(this.resumeData);
      if (this.resumeData) {
        this.resume = this.resumeData.document;
      } else {
        this.resume = '';
      }
    });
  }

  deleteResume() {
    console.log("delete data");
    this.service.deleteCandidateResume(this.candidateId).subscribe(res => {
      this.deleteData = res.json();
      if (this.deleteData.statusCode.code === '200') {
        // window.location.reload();
        this.getResume();
      } else {
        this.resumePopup = true;
        this.error = 'Resume cannot be deleted';
      }
    })
  }

  closeResumePopup() {
    this.getResume();
    this.fileData.resume = '';
    this.fileName = false;
  }

  changeCurrent(action) {
    if (action === 'experience') {
      this.isCurrent = !(this.isCurrent);
    }
    if (action === 'education') {
      this.isEduCurrent = !(this.isEduCurrent);
    }
  }

  // addSkill(skillName, name, experience, month, year, comment, skillFrm: NgForm) {
  //   this.skillset.forEach(obj => {
  //     if(obj.id==skillName){
  //       name=obj.name
  //     }

  //   });

  //   let itr = 0;

  //   if (this.indexofSkill != null || this.indexofSkill == 0 || this.indexofSkill != undefined) {
  //     // Skill Edit Function
  //     if (month > this.currentDate && year === this.currentDate1) {
  //       this.monthError = "Please select valid month";
  //     } else {
  //       this.monthError = '';
  //       for (let i = 0; i < this.skills.length; i++) {
  //         // .trim().toLowerCase()
  //         if (skillName === this.skills[i].skillName) {
  //           this.skillError = 'Skill Name already exists';
  //           skillFrm.resetForm();
  //           this.indexofSkill=0;
  //           itr = 0;
  //           break;
  //         } else {
  //           itr++;
  //         }
  //       }
  //       console.log(itr);
  //       console.log("array length:"+ this.skills.length);
  //       if (itr === this.skills.length) {
  //         for (let i = 0; i < this.skillset.length; i++) {
  //           if (this.skillset[i].id === skillName) {
  //             var name;
  //             name = this.skillset[i].name;
  //           }
  //           console.log(name)
  //         }
  //         this.skillError = '';
  //         this.monthError = '';
  //         console.log(this.cusData.skillType); 

  //         const skillRow = {
  //           skillName: skillName,
  //           experience: experience,
  //           lastUsed: month + '/' + year,
  //           comment: comment,
  //           skillId: name
  //         };
  //         this.skills.splice(this.indexofSkill, 1, skillRow);
  //         console.log(this.skills);
  //         skillFrm.resetForm();
  //         this.indexofSkill = null;
  //       }

  //     }

  //   } 
  //   else if (this.indexofSkill == null || this.indexofSkill == undefined) {
  //      // Skill Add Function
  //     if (month > this.currentDate && year === this.currentDate1) {
  //       console.log("month data");
  //       this.monthError = "Please select valid month";
  //       console.log(this.monthError);
  //     } else {
  //       this.monthError = '';
  //       for (let i = 0; i < this.skills.length; i++) {
  //         // .trim().toLowerCase() 
  //         if (skillName=== this.skills[i].skillName) {
  //           this.skillError = 'Skill Name already exists';
  //           skillFrm.resetForm();
  //           break;
  //         } else {
  //           itr++;
  //         }
  //       }
  //       if (itr === this.skills.length) {
  //         this.skillError = '';
  //         if (skillName !== '' || experience !== '') {
  //           for (let i = 0; i < this.skillset.length; i++) {
  //             if (this.skillset[i].id === skillName) {
  //               var name;

  //               name = this.skillset[i].name;
  //             }
  //             console.log(name)
  //           }
  //           console.log(name,"Data")
  //           this.skill.skillName = skillName;
  //           this.skill.experience = experience;
  //           this.skill.lastUsed = month + '/' + year;
  //           this.skill.comment = comment;
  //           const skillRow = {
  //             skillName: skillName,
  //             experience: experience,
  //             lastUsed: month + '/' + year,
  //             comment: comment,
  //             skillId: name
  //           };
  //           if (this.skills.push(skillRow)) {
  //             skillFrm.resetForm();
  //           }
  //           console.log(this.skillRow);
  //         }
  //       }
  //     }

  //   }

  // }
  cancel() {
    this.blocation.back();
  }

  // addEducation(instituteName, qualification, specialization, passingYear, gpaScore, eduForm: NgForm) {
  //   let itr = 0;
  //   if (passingYear > this.currentDate1) {
  //     this.passingYearError = "Year of passing should'nt exceed current year";
  //     console.log("Year of passing should'nt exceed current year");
  //   } else {
  //     this.passingYearError = '';
  //     if (this.indexofEducation != null || this.indexofEducation == 0 || this.indexofEducation != undefined) {
  //       let eduCurrent = 0;
  //       for (let i = 0; i < this.educations.length; i++) {
  //         if (instituteName.trim().toLowerCase() === this.educations[i].instituteName.trim().toLowerCase() &&
  //           qualification.trim().toLowerCase() === this.educations[i].qualification.trim().toLowerCase() &&
  //           passingYear.trim().toLowerCase() === this.educations[i].passingYear.trim().toLowerCase()) {
  //           this.educationError = 'Data already exists';
  //           eduForm.resetForm();
  //           break;
  //         } else if (passingYear === this.educations[i].passingYear) {
  //           this.educationError = 'Cannot have duplicate year of passing';
  //           eduForm.resetForm();
  //           break;
  //         } else {
  //           itr++;
  //         }
  //       }
  //       if (itr === this.educations.length) {
  //         if (this.isEduCurrent) {
  //           eduCurrent = 1;
  //         } else {
  //           eduCurrent = 0;
  //         }
  //         this.education = {
  //           instituteName: instituteName,
  //           qualification: qualification,
  //           specialization: specialization,
  //           passingYear: passingYear,
  //           isCurrent: eduCurrent,
  //           gpaScore: gpaScore
  //         }
  //         this.educations.splice(this.indexofEducation, 1, this.education)
  //         eduForm.resetForm();
  //         this.indexofEducation = null;
  //         console.log(this.indexofEducation);
  //       }


  //     } else if (this.indexofexperience == null || this.indexofEducation == undefined) {

  //       for (let i = 0; i < this.educations.length; i++) {
  //         if (instituteName.trim().toLowerCase() === this.educations[i].instituteName.trim().toLowerCase() &&
  //           qualification.trim().toLowerCase() === this.educations[i].qualification.trim().toLowerCase() &&
  //           passingYear.trim().toLowerCase() === this.educations[i].passingYear.trim().toLowerCase()) {
  //           this.educationError = 'Data already exists';
  //           eduForm.resetForm();
  //           break;
  //         } else if (passingYear === this.educations[i].passingYear) {
  //           this.educationError = 'Cannot have duplicate year of passing';
  //           eduForm.resetForm();
  //           break;
  //         } else {
  //           itr++;
  //         }
  //       }
  //       if (itr === this.educations.length) {
  //         this.educationError = '';
  //         let eduCurrent = 0;
  //         if (this.isEduCurrent) {
  //           eduCurrent = 1;
  //         } else {
  //           eduCurrent = 0;
  //         }
  //         this.education = {
  //           instituteName: instituteName,
  //           qualification: qualification,
  //           specialization: specialization,
  //           passingYear: passingYear,
  //           isCurrent: eduCurrent,
  //           gpaScore: gpaScore

  //         };
  //         this.educations.push(this.education);
  //         console.log(this.educations);
  //         eduForm.resetForm();
  //       }
  //     }
  //   }

  // }
  // responsibilities.value,description.value,techSkills.value

  // addExperiences(employer, jobTitle, description, supervisorName, supervisorPhone, responsibilities, techSkills, expForm: NgForm) {

  //   if (this.indexofexperience != null || this.indexofexperience == 0 || this.indexofexperience != undefined) {
  //     const startDate = new DatePipe('en-US').transform(this.experienceData.experience.startDate, 'yyyy-MM-dd');
  //     const endDate = new DatePipe('en-US').transform(this.experienceData.experience.endDate, 'yyyy-MM-dd');
  //     let expCurrent = 0;
  //     let itr = 0;
  //     for (let i = 0; i < this.experiences.length; i++) {
  //       if (employer.trim().toLowerCase() === this.experiences[i].employer.trim().toLowerCase() &&
  //         startDate === this.experiences[i].startDate) {
  //         this.experienceError = 'Experience already exists';
  //         expForm.resetForm();
  //         break;
  //       } else {
  //         itr++;
  //       }
  //     }
  //     if (itr === this.experiences.length) {
  //       if (this.check) {
  //         expCurrent = 1;
  //       } else {
  //         expCurrent = 0;
  //       }
  //       this.experience = {
  //         employer: employer,
  //         jobTitle: jobTitle,
  //         description: description,
  //         startDate: startDate,
  //         endDate: endDate,
  //         supervisorName: supervisorName,
  //         supervisorPhone: supervisorPhone,
  //         isCurrent: expCurrent,
  //         responsibilities: responsibilities,
  //         techSkills: techSkills
  //       };
  //       this.experiences.splice(this.indexofexperience, 1, this.experience)
  //       expForm.resetForm();
  //       this.indexofexperience = null;
  //       console.log(this.indexofexperience);
  //     }


  //   } else if (this.indexofexperience == null || this.indexofexperience == undefined) {

  //     const startDate = new DatePipe('en-US').transform(this.experienceData.experience.startDate, 'yyyy-MM-dd');
  //     const endDate = new DatePipe('en-US').transform(this.experienceData.experience.endDate, 'yyyy-MM-dd');
  //     let itr = 0;
  //     for (let i = 0; i < this.experiences.length; i++) {
  //       if (employer.trim().toLowerCase() === this.experiences[i].employer.trim().toLowerCase() &&
  //         startDate === this.experiences[i].startDate) {
  //         this.experienceError = 'Experience already exists';
  //         expForm.resetForm();
  //         break;
  //       } else {
  //         itr++;
  //       }
  //     }
  //     if (itr === this.experiences.length) {
  //       this.experienceError = '';
  //       let expCurrent = 0;
  //       if (this.check) {
  //         expCurrent = 1;
  //       } else {
  //         expCurrent = 0;
  //       }
  //       this.experience = {
  //         employer: employer,
  //         jobTitle: jobTitle,
  //         description: description,
  //         startDate: startDate,
  //         endDate: endDate,
  //         supervisorName: supervisorName,
  //         supervisorPhone: supervisorPhone,
  //         isCurrent: expCurrent,
  //         responsibilities: responsibilities,
  //         techSkills: techSkills

  //       };
  //       this.experiences.push(this.experience);
  //       expForm.resetForm();
  //     }
  //     console.log(this.experiences.length);
  //   }


  // }

  addExperiences(employer, jobTitle, description, supervisorName, supervisorPhone, responsibilities, techSkills, expForm: NgForm) {
    let endDate = new DatePipe('en-US').transform(this.experienceData.experience.endDate, 'yyyy-MM-dd');
    let startDate = new DatePipe('en-US').transform(this.experienceData.experience.startDate, 'yyyy-MM-dd');
    if (this.dateError1 || this.dateError) {
      this.experienceError = 'Please select a valid Date range';
    } else {
      let isCurrent = 0;
      if (this.experienceData.experience.check) {
        isCurrent = 1;
        endDate = null;
      }
      else {
        isCurrent = 0;
      }
      if (this.indexofexperience != null || this.indexofexperience == 0 || this.indexofexperience != undefined) {
        let invalid = false;
        for (let index = 0; index < this.experiences.length; index++) {
          if (index != this.indexofexperience) {
            if (this.experiences[index].employer === employer && this.experiences[index].jobTitle === jobTitle && this.experiences[index].startDate === startDate) {
              invalid = true;
            }
          }
        }
        if (invalid) {
          this.experienceError = 'Duplicate experience data cannot be added';
        }
        else {
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
      else if (this.indexofexperience === null || this.indexofexperience == undefined) {
        let invalid = false;
        for (let index = 0; index < this.experiences.length; index++) {
          if (this.experiences[index].employer === employer && this.experiences[index].jobTitle === jobTitle && this.experiences[index].startDate === startDate) {
            invalid = true;
          }
        }
        if (invalid) {
          this.experienceError = 'Duplicate experience data cannot be added';
        }
        else {
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
          if (this.experienceData.experience.check) {
            this.experienceData.experience.check = 0;
          }
        }
      }
    }

  }

  addEducation(instituteName, qualification, specialization, gpaScore, addEducations: NgForm) {
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
          if (index != this.indexofEducation) {
            if (this.educations[index].instituteName === instituteName && this.educations[index].qualification === qualification && this.educations[index].specialization === specialization && this.educations[index].passingYear === passingYear) {
              invalid = true;
            }
          }
        }
        if (invalid) {
          this.educationError = 'Duplicate education data cannot be added';
        }
        else {
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
          this.education = {
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
      else if (this.indexofEducation === null || this.indexofEducation == undefined) {
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
        else {
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
          if (this.educationData.education.isCurrent) {
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
          if (index != this.indexofSkill) {
            if (this.skills[index].skillName === skillName) {
              invalid = true;
            }
            else if (this.skills[index].skillName === skillName && this.skills[index].experience === experience && this.skills[index].month === month && this.skills[index].year === year) {
              invalid = true;
            }
          }
        }

        if (invalid) {
          this.skillError = 'Duplicate skill data cannot be added';
        }
        else {
          this.skillError = "";
          this.skillRow = {
            skillName: skillName,
            experience: experience,
            lastUsed: month + '/' + year,
            comment: comment,
            skillId: name
          };
          this.skills.splice(this.indexofSkill, 1, this.skillRow);
          skillFrm.resetForm();
          this.indexofSkill = null;
        }

      }
      else if (this.indexofSkill == null || this.indexofSkill == undefined) {
        this.monthError = "";
        let invalid = false;
        for (let index = 0; index < this.skills.length; index++) {
          if (this.skills[index].skillName === skillName) {
            invalid = true;
          }
          else if (this.skills[index].skillName === skillName && this.skills[index].experience === experience && this.skills[index].month === month && this.skills[index].year === year) {
            invalid = true;
          }
        }
        if (invalid) {
          this.skillError = 'Duplicate skill data cannot be added';
        }
        else {
          this.skillError = "";
          this.skillRow = {
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

  // editEduaction(education) {
  //   this.educationData.education.instituteName = education.instituteName;
  //   this.educationData.education.qualification = education.qualification;
  //   this.educationData.education.specialization = education.specialization;
  //   this.educationData.education.passingYear = education.passingYear;
  //   this.educationData.education.isCurrent = education.isCurrent;
  //   this.educationData.education.gpaScore = education.gpaScore;
  //   let index = this.educations.indexOf(education);
  //   this.indexofEducation = index;
  // }

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

  // editExperience(experience) {
  //   console.log(experience);
  //   this.experienceData.experience.employer = experience.employer;
  //   this.experienceData.experience.jobTitle = experience.jobTitle;
  //   this.experienceData.experience.startDate = new Date(experience.startDate);
  //   this.experienceData.experience.endDate = new Date(experience.endDate);
  //   this.experienceData.experience.description = experience.description;
  //   this.experienceData.experience.supervisorName = experience.supervisorName;
  //   this.experienceData.experience.supervisorPhone = experience.supervisorPhone;
  //   this.experienceData.experience.responsibilities = experience.responsibilities;
  //   this.experienceData.experience.techSkills = experience.techSkills;
  //   if (experience.isCurrent) {
  //     this.check = true;
  //   }
  //   else {
  //     this.check = false;
  //   }
  //   let index = this.experiences.indexOf(experience);
  //   this.indexofexperience = index;
  // }

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

  // editSkill(skill) {

  //   console.log(skill);


  //   this.skill.skillType = skill.skillName;
  //   this.skill.experience = skill.experience;
  //   this.skill.lastUsed = skill.lastUsed;
  //   this.skill.comment = skill.comment;
  //   const splitted = this.skill.lastUsed.split('/');
  //   console.log(splitted);
  //   this.skill.last.month = splitted[0];
  //   this.skill.last.year = splitted[1];
  //   let index = this.skills.indexOf(skill);
  //   this.indexofSkill = index;


  // }

  // get states list based on country id
  editSkill(skill) {
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
  getState(id) {
    console.log(id);
    // this.http.get('http://service.tedpros.com/config/state/?id=' + id, this.options)
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
    console.log(id);
    // this.http.get('http://service.tedpros.com/config/city/?id=' + id, this.options)
    this.service.getCities(id)
      .subscribe(response => {
        this.cities = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }

  addCandidate() {
    //  changes --suresh-- 08-23-2019 start
    if (this.doberror) {
    } else {
      console.log(this.options, this.personalData);
      this.personalData.dob = new DatePipe('en-US').transform(this.personalData.dob, 'yyyy-MM-dd');
      // this.http.post('http://service.tedpros.com/job/addCandidate', this.personalData, this.options)
      this.service.addCandidate(this.personalData)
        .subscribe(response => {
          console.log(response);
          this.responseData = response.json();
          console.log(this.responseData);
          if (this.responseData.statusCode.code === '200') {
            this.isShowPopup1 = true;
            this.error = null;
            this.message = 'Personal data added successfully';
            this.candidateId = this.responseData.candidateId;
            console.log(this.candidateId);
            console.log(this.message);
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
    this.consentPopup = false;
    this.isShowPopup1 = !this.isShowPopup1;
    this.error = '';
    this.message = '';
  }

  consentClose() {
    this.consentPopup = false;
  }

  addConsentData() {
    if (this.veteran) {
      this.veteran = 1;
      console.log(this.veteran, "Consent1");
    } else {
      this.veteran = 0;
      console.log(this.veteran, "Consent1");
    }

    if (this.disabled) {
      this.disabled = 1;
      console.log(this.disabled, "Consent2");
    } else {
      this.disabled = 0;
      console.log(this.disabled, "Consent2");
    }

    this.consentData.candidateId = this.candidateId;
    this.consentData.veteran = this.veteran;
    this.consentData.disabled = this.disabled;
    console.log(this.consentData);
    this.service.addCandidateConsent(this.consentData).subscribe(res => {
      this.consent = res.json();
      if (this.consent.statusCode.code === '200') {
        this.consentPopup = true;
        this.error = null;
        this.message = this.consent.data;
      } else {
        this.consentPopup = true;
        this.message = null;
        this.error = this.consent.errorMessages;
      }
    })
  }


  addCandidateExperience() {
    this.error = '';
    if (this.experiences.length <= 0) {
      this.error = null;
      this.message = 'No experience added do you wish to continue?';
      this.isShowPopup1 = true;
    } else {
      this.experienceData.experience = this.experiences;
      this.experienceData.candidateId = this.candidateId;
      this.service.addCandidateExperence(this.experienceData)
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
      console.log(this.options, this.educationData);
      this.service.addCandidateEducation(this.educationData)
        .subscribe(response => {
          this.responseData = response.json();
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


  // saikumar 07-09-2019 started here
  addnewskill() {
    this.skillpopup = true;
  }
  closeconsentPopup() {
    this.consentPopup = false;
  }
  closeskillPopup() {
    this.skillpopup = !this.skillpopup;
  }
  //saikumar 07-09-2019 ended here


  // saikumar 07/09/2019 started here



  // saikumar 07/09/2019 started here
  addskills(skillType, addindFrm: NgForm) {
    this.loading = false;
    if (skillType !== "") {
      this.contactError = '';
      this.industriesData.skillType = skillType;
      this.service.postskills(this.industriesData).subscribe(response => {
        this.data = response.json();
        this.skill.skillType = this.data.data;
        if (this.data.statusCode.code === '200') {

          this.closeskillPopup();
          addindFrm.resetForm();
        }
        else if (this.data.statusCode.code === '409') {
          this.contactError = this.data.errorMessages;
        }

        this.getSkills()
        this.cusData.skillType = this.data.data;
      });
    } else {
      this.loading = false;
      this.contactError = 'Fill required Fileds';

    }
  }

  // saikumar 07/09/2019 ended here

  addCandidateSkills() {
    this.error = '';
    if (this.skills.length <= 0) {
      this.error = 'Please specify atleast one skill';
      this.message = null;
      this.isShowPopup1 = true;
    } else {
      this.skillData.skill = this.skills;
      this.skillData.candidateId = this.candidateId;
      console.log(this.options, this.skillData);
      this.service.addCandidateSkills(this.skillData)
        .subscribe(response => {
          this.responseData = response.json();
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
    console.log(this.options, this.summaryData);
    this.summaryData.candidateId = this.candidateId;
    this.service.addCandidateSummary(this.summaryData)
      .subscribe(response => {
        this.responseData = response.json();
        if (this.responseData.statusCode.code === '200') {
          this.showpreview();
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
