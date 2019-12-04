import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { DatePipe, Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.css']
})
export class QualificationsComponent implements OnInit {
  todayDate;
  currentMonth;
  currentYear;
  monthError;
  indexofCertificate;
  indexofLicense;
  indexofLanguage;
  indexofExperience;
  indexofEducation;
  indexofSkills;
  indexofOtherSkills;
  check2
  check1
  currentexp = true;
  log
  logger: any = {};
  certificatenames = [];
  licensenames = [];
  experienceNames = {
    pastCompany: '',
    pastJobTitle: '',
    fromDate: '',
    toDate: '',
    comment: '',
    responsibility: '',
    skills: '',
    supervisorName: '',
    supervisorPhone: '',
    isCurrent: 0
  };
  educationNames = {
    educationId: '',
    educationname: '',
    institute: '',
    year: '',
    gpaScore: '',
    specialization: '',
    isCurrent: 0
  };
  allSkillNames = {
    skillId: '',
    otherSkill: '',
    name: '',
    experience: '',
    comments: '',
    lastUsed: ''
  };
  editcertificatenames = {
    type: '',
    number: '',
    issued: '',
    expiry: '',
    certificate: '',
    alert: 0,
    licenseId: '',
    licensename: ''
  };
  editLicenseNames = {
    type: '',
    number: '',
    issued: '',
    expiry: '',
    certificate: '',
    alert: 0,
    licenseId: '',
    licensename: ''
  };
  editLanguageNames = {
    languageId: '',
    langname: '',
    fluency: ''
  };
  dateError;
  display;
  index;
  error5;
  error4;
  error3;
  error2;
  error6;
  message;
  isShowPopup;
  error1;
  language;
  editexp = { pastCompany: '', pastJobTitle: '', fromDate: '', toDate: '', responsibility: '', skills: '' };
  last = {
    month: '',
    year: ''
  }
  dateError1;
  emptyData = false;

  // url='http://localhost/tedpros_services/';
  url = 'http://service.tedpros.com/';
  qualifications: any = {};
  lists;
  loading;
  error;
  info;
  educationset;
  skillset;
  languageset;
  licenseset;
  expinfo: any = {};
  displayExp = false;
  displayEdu = false;
  displaySkill = false;
  displayLang = false;
  displayLicense = false;
  displayyear = false;
  showform: boolean = false;
  showcertificate: boolean = false;
  showlicense: boolean = false;
  experienceslist = [];
  educationslist = [];
  skillslist = [];
  languageslist = [];
  licenseslist = [];
  experienceslist1: any = [];
  educationslist1: any = [];
  // skillslist1 = [];
  // languageslist1 = [];
  // licenseslist1 = {};
  qualificationInfo: any = {
    type: "",
  };
  qualificationDraft: any = {
    type: "",
  };
  month;
  months: any = [];
  years: any = [];
  year;
  isCurrent = false;
  alert = false;
  isEduCurrent;
  experience: any = {
    fromDate: '',
    toDate: ''
  };

  skillslist1: any = {
    skill: '',
    experience: '',
    comments: '',
    month: '',
    year: ''
  }

  languageslist1: any = {
    language: '',
    fluency: '',
    langcomments: ''
  }

  licenseslist1: any = {
    certificate: '',
    licenseId: '',
    number: '',
    type: '',
    expiry: '',
    issued: ''
  }
  lists1;
  licenseInfo = [];
  licenseinfo: any = {
    alert: ''
  };
  jobTitlePattern;

  primaryPhonePattern = '^((\\+91-?)|0)?[0-9]{10}$';
  gpaPattern = '^[0]|[0-3]\.(\d?\d?)|[4].[0]$';
  monthName = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // varibles for new skill and license adding through popup - start - sharmistha - 10-03-2019
  skillpopup:boolean =  false;
  newSkill = {
    skillType:''
  }
  skillData:any = {};
  skillError:any;

  licensepopup:boolean =  false;
  newLicense = {
    licenseType:''
  }
  licenseData:any = {};
  licenseError:any;
  // varibles for new skill adding through popup - end - sharmistha - 10-03-2019

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public auth: AuthenticationService, public service: UserService, private eventEmitterService: EventEmitterService, pattern: PatternsService) {
    this.jobTitlePattern = pattern.jobTitlePattern;
    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'View Qualifications Info';
    this.logger.comment = 'View Qualifications Info';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        // this.timerComponent.getusersactivity();
        // firstComponentFunction(){    
        this.eventEmitterService.onRecentActivityRefresh();
        // }  
      });

    this.qualificationInfo.type = "save";
    this.qualificationDraft.type = "draft";
    // this.months = this.monthName;
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
    this.last.year = this.year;
    this.last.month = new DatePipe('en-US').transform(new Date(), 'MMMM');

    for (let index = this.year; index >= (this.year - 50); index--) {
      this.years.push(index);
      //console.log(this.years);
    }
  }

  //on change alert toggle
  // checkAlert() {
  //   this.licenseslist1.alert = !(this.licenseslist1.alert);
  // }

  // get skills list
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

  // get licenses list
  getLicense(){
    this.service.getLicenses()
    .subscribe(response => {
      this.licenseset = response.json().data;
      this.loading = false;
    },
    error => {
      console.log(error);
    });
  }
  

  ngOnInit() {
    this.todayDate = new Date;
    this.currentMonth = new DatePipe('en-US').transform(this.todayDate, 'MM');
    this.currentYear = new DatePipe('en-US').transform(this.todayDate, 'yyyy');
    this.skillslist1.month = this.currentMonth;
    this.skillslist1.year = this.currentYear;

    this.displayyear = false;

    // get user experience info
    // this.http.get(this.url + '/personal/Info', this.options)
    this.service.getPersonal()
      .subscribe(response => {
        this.qualifications = response.json().data;

        //experience list
        if (this.qualifications.experienceDetails) {
          this.experienceslist = this.qualifications.experienceDetails;
        } else {
          this.experienceslist = [];
        }

        //education list
        if (this.qualifications.educationDetails) {
          this.educationslist = this.qualifications.educationDetails;
        } else {
          this.educationslist = [];
        }

        //skill list
        if (this.qualifications.skillDetails) {
          this.skillslist = this.qualifications.skillDetails;
        } else {
          this.skillslist = [];
        }

        //language list
        if (this.qualifications.languageDetails) {
          this.languageslist = this.qualifications.languageDetails;
        } else {
          this.languageslist = [];
        }
        //console.log(this.languageslist)

        //licenses list
        if (this.qualifications.licenseDetails) {
          this.licenseslist = this.qualifications.licenseDetails;

          this.licenseslist.forEach((list) => {
            if (list.licenseId === "0" || list.licenseId === "") {
              list.name = list.certificate;
              this.certificatenames.push(list);

            }
            else if (list.licenseId != "0" || list.licenseId != "") {
              list.name = list.licensename;
              this.licensenames.push(list);
            }
          })

        } else {
          this.licenseslist = [];
        }
      },
        error => {
          console.log(error);
        });

    // get educations list
    this.service.getEducations()
      .subscribe(response => {
        this.educationset = response.json().data;
        this.loading = false;
        // console.log(this.educationset);
      },
        error => {
          console.log(error);
        });

    // get language info
    this.service.getLanguages()
      .subscribe(response => {
        this.languageset = response.json().data;
        this.loading = false;
        // console.log(this.employmentStatus);
      },
        error => {
          console.log(error);
        });

    // get skills list
    this.getSkills();

    // get license info
    this.getLicense();

    this.experienceslist = [];
    this.educationslist = [];
    this.skillslist = [];
    this.languageslist = [];
    this.licenseslist = [];
  }

  // save qualification info
  save() {
    this.qualificationInfo.experienceDetails = this.experienceslist;
    this.qualificationInfo.educationDetails = this.educationslist;
    // this.qualificationInfo.skillDetails = this.skillslist;
    this.qualificationInfo.skillDetails = this.skillslist;
    this.qualificationInfo.languageDetails = this.languageslist;
    this.qualificationInfo.licenseDetails = this.licensenames.concat(this.certificatenames);

    // this.http.post(this.url + '/personal/addInfo', this.qualificationInfo, this.options)
    this.service.addPersonalInfo(this.qualificationInfo)
      .subscribe(response => {
        this.info = response.json();
        if (this.info.statusCode.code === '200') {
          this.message = this.info.data;
          this.isShowPopup = true;
        }
        else {
          this.error1 = this.info.errorMessages;
          this.loading = false;
          this.isShowPopup = true;
        }
        this.eventEmitterService.onUserAlertRefresh();
      },
        error => {
          console.log(error);
        });
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }

  // draft qualification info
  draft() {
    this.qualificationDraft.experienceDetails = this.experienceslist;
    this.qualificationDraft.educationDetails = this.educationslist;
    // this.qualificationDraft.skillDetails = this.skillslist;
    this.qualificationInfo.skillDetails = this.skillslist;
    this.qualificationDraft.languageDetails = this.languageslist;
    // this.qualificationDraft.licenlicensesetseDetails = this.licenseslist;
    this.qualificationInfo.licenseDetails = this.licensenames.concat(this.certificatenames);
    // console.log(this.qualificationDraft);
    // this.http.post(this.url + '/personal/addInfo', this.qualificationDraft, this.options)
    this.service.addPersonalInfo(this.qualificationDraft)
      .subscribe(response => {
        this.info = response.json();
        // console.log(this.contactInfo.data);
        if (this.info.statusCode.code === '200') {
          this.router.navigate(['myInfo']);
        }
        this.eventEmitterService.onUserAlertRefresh();
      },
        error => {
          console.log(error);
        });
  }

  onNavigate(location) {
    this.router.navigate([location]);
  }

  cancel() {
    this.router.navigate(['myInfo']);
  }
  editWork() {
    this.displayExp = true;
  }
  backWork() {
    this.displayExp = false;
  }
  editEdu() {
    this.displayEdu = true;
  }
  backEdu() {
    this.displayEdu = false;
  }
  editSkill() {
    this.displaySkill = true;
  }
  backSkill() {
    this.displaySkill = false;
  }
  editLang() {
    this.displayLang = true;
  }
  backLang() {
    this.displayLang = false;
  }
  editLicense() {
    this.displayLicense = true;
  }
  backLicense() {
    this.displayLicense = false;
  }

  //interchange between certificate name nad license name field
  onchange(id) {
    //console.log(id);
    if (id != "") {
      this.showform = true;
      if (id === "Certification") {
        this.showcertificate = true;
        this.showlicense = false;
      }
      else if (id === "License") {
        this.showlicense = true;
        this.showcertificate = false;
      }
    }
  }

  //action based on toggle value for iscurrent option in experience and education
  changeCurrent(action) {
    if (action === 'experience') {
      this.isCurrent = !(this.isCurrent);
    }
    if (action === 'education') {
      this.isEduCurrent = !(this.isEduCurrent);
    }
  }

  //on changing the selection for alerts
  onselect(id) {
    console.log(id);
    // this.http.post('http://service.tedpros.com/personal/updateAlert?id='+id, value, this.options)
    // this.service.addPersonalInfo(this.qualificationInfo)
    // .subscribe(response => {
    //   this.info = response.json();
    //   if (this.info.statusCode.code === '200') {
    //     this.message = this.info.data;
    //       this.isShowPopup = true;
    //   }
    //   else {
    //     this.error1 = this.info.errorMessages;
    //     this.loading = false;
    //     this.isShowPopup = true;
    //   }
    // },
    // error => {
    //   console.log(error);
    // });
  }

  //experience add and remove start
  // adding new experience record in the table display
  insertExperience(addWork: NgForm, pastCompany, pastJobTitle, comment, responsibility, skills, supervisorName, supervisorPhone) {
    if (this.indexofExperience != null || this.indexofExperience == 0 || this.indexofExperience != undefined) {
      const startDate = new DatePipe('en-US').transform(this.experience.fromDate, 'yyyy-MM-dd');
      const endDate = new DatePipe('en-US').transform(this.experience.toDate, 'yyyy-MM-dd');
      let validBoolean3 = false;
      console.log(this.experienceslist);
      for (let index = 0; index < this.experienceslist.length; index++) {
        console.log(this.experienceslist[index].pastCompany, pastCompany, this.experienceslist[index].pastJobTitle, pastJobTitle, this.experienceslist[index].responsibility, responsibility,
          this.experienceslist[index].skills, skills)

        if (this.experienceslist[index].pastCompany.trim().toLowerCase() == pastCompany.trim().toLowerCase() && this.experienceslist[index].pastJobTitle.trim().toLowerCase() == pastJobTitle.trim().toLowerCase()) {
          validBoolean3 = true;
        }
      }
      if (validBoolean3) {
        this.error5 = 'Duplicate data cannot be added';
      }
      else {
        this.error5 = "";
        let expCurrent = 0;
        if (this.check1) {
          expCurrent = 1;
        } else {
          expCurrent = 0;
        }

        // this.experienceslist.push({
        //   'pastCompany': pastCompany, 'pastJobTitle': pastJobTitle, 'fromDate': startDate, 'toDate': endDate,
        //   'comment': comment,'responsibility':responsibility,'skills':skills,'supervisorName':supervisorName,'supervisorPhone':supervisorPhone,'isCurrent':expCurrent
        // });
        this.experienceNames = {
          pastCompany: pastCompany,
          pastJobTitle: pastJobTitle,
          fromDate: startDate,
          toDate: endDate,
          comment: comment,
          responsibility: responsibility,
          skills: skills,
          supervisorName: supervisorName,
          supervisorPhone: supervisorPhone,
          isCurrent: expCurrent
        };
        this.experienceslist.splice(this.indexofExperience, 1, this.experienceNames)
        addWork.resetForm();
        this.indexofExperience = null;
        console.log(this.indexofExperience);

        console.log(this.experienceslist);
      }
    } else if (this.indexofExperience == null) {
      const startDate = new DatePipe('en-US').transform(this.experience.fromDate, 'yyyy-MM-dd');
      const endDate = new DatePipe('en-US').transform(this.experience.toDate, 'yyyy-MM-dd');
      let validBoolean3 = false;
      console.log(this.experienceslist)
      for (let index = 0; index < this.experienceslist.length; index++) {
        console.log(this.experienceslist[index].pastCompany, pastCompany, this.experienceslist[index].pastJobTitle, pastJobTitle, this.experienceslist[index].responsibility, responsibility,
          this.experienceslist[index].skills, skills)

        if (this.experienceslist[index].pastCompany.trim().toLowerCase() == pastCompany.trim().toLowerCase() && this.experienceslist[index].pastJobTitle.trim().toLowerCase() == pastJobTitle.trim().toLowerCase()) {
          validBoolean3 = true;
        }
      }
      if (validBoolean3) {
        this.error5 = 'Duplicate data cannot be added';
      }
      else {
        this.error5 = "";
        let expCurrent = 0;
        if (this.check1) {
          expCurrent = 1;
        } else {
          expCurrent = 0;
        }
        addWork.resetForm();
        this.experienceslist.push({
          'pastCompany': pastCompany, 'pastJobTitle': pastJobTitle, 'fromDate': startDate, 'toDate': endDate,
          'comment': comment, 'responsibility': responsibility, 'skills': skills, 'supervisorName': supervisorName, 'supervisorPhone': supervisorPhone, 'isCurrent': expCurrent
        });
        console.log(this.experienceslist);
      }
    }

  }

  //edit experience 
  editExperience(experienceinfo) {
    // console.log(experienceinfo);
    // const fromDate=new DatePipe('en-US').transform(experienceinfo.fromDate,'yyyy-mm-dd');
    // const toDate=new DatePipe('en-US').transform(experienceinfo.toDate,'yyyy-mm-dd');
    // this.editexp.userId = experienceinfo.pastCompany;
    this.experienceslist1.pastCompany = experienceinfo.pastCompany;
    this.experienceslist1.pastJobTitle = experienceinfo.pastJobTitle;
    this.experienceslist1.supervisorName = experienceinfo.supervisorName;
    this.experienceslist1.supervisorPhone = experienceinfo.supervisorPhone;
    if (experienceinfo.fromDate === null) {
      this.experience.fromDate = '';
    } else {
      this.experience.fromDate = new Date(experienceinfo.fromDate);
    }
    if (experienceinfo.toDate === null) {
      this.experience.toDate = '';
    } else {
      this.experience.toDate = new Date(experienceinfo.toDate);
    }


    // this.experience.toDate =new Date(experienceinfo.toDate);
    this.experienceslist1.responsibility = experienceinfo.responsibility;
    this.experienceslist1.comment = experienceinfo.comment;

    this.experienceslist1.skills = experienceinfo.skills;
    let index = this.experienceslist.indexOf(experienceinfo);
    this.indexofExperience = index;
    // this.experienceslist.splice(index, 1); 
    // let index = this.experienceslist.indexOf(experienceinfo);
    // this.display = index;
  }

  //remove experience from the table
  removeExperience(experienceinfo) {
    const index = this.experienceslist.indexOf(experienceinfo);
    this.experienceslist.splice(index, 1);
  }
  //experience add and remove end



  //education add and remove start  indexofEducation
  // adding new education record in the table display
  insertEducation(addEdu: NgForm, educationId, educationname, institute, year, gpaScore, specialization) {
    console.log(year);
    console.log(this.educationslist1.year);
    if (this.educationslist1.year > this.currentYear) {
      this.monthError = "Year of passing should'nt exceed current year";
    } else {
      this.monthError = '';
      if (this.indexofEducation != null || this.indexofEducation == 0 || this.indexofEducation != undefined) {
        let validBoolean2 = false;
        for (let index = 0; index < this.educationslist.length; index++) {
          if (this.educationslist[index].educationId.trim().toLowerCase() === educationId.trim().toLowerCase() && this.educationslist[index].year === year) {
            validBoolean2 = true;
          }
        }
        if (validBoolean2) {
          this.error4 = 'Duplicate data cannot be added';
        }
        else {
          this.error4 = "";
          let eduCurrent = 0;
          if (this.check2) {
            eduCurrent = 1;
            // this.educationslist1.year="";

          } else {
            eduCurrent = 0;
            year = this.educationslist1.year;
          }
          this.educationNames = {
            educationId: educationId,
            educationname: educationname,
            institute: institute,
            year: year,
            gpaScore: gpaScore,
            specialization: specialization,
            isCurrent: eduCurrent
          };
          // console.log(this.educationslist);
          this.educationslist.splice(this.indexofEducation, 1, this.educationNames)
          addEdu.resetForm();
          this.indexofEducation = null;
          console.log(this.indexofEducation);

          for (let i = 0; i < this.educationset.length; i++) {
            if (this.educationset[i].id === educationId) {
              console.log(this.educationslist.length);
              this.educationNames.educationname = this.educationset[i].name;
            }
          }
        }
      } else if (this.indexofEducation == null) {
        let validBoolean2 = false;
        for (let index = 0; index < this.educationslist.length; index++) {
          if (this.educationslist[index].educationId.trim().toLowerCase() === educationId.trim().toLowerCase() && this.educationslist[index].year === year) {
            validBoolean2 = true;
          }
        }
        if (validBoolean2) {
          this.error4 = 'Duplicate data cannot be added';
        }
        else {
          this.error4 = "";
          let eduCurrent = 0;
          if (this.check2) {
            eduCurrent = 1;
            // this.educationslist1.year="";

          } else {
            eduCurrent = 0;
            year = this.educationslist1.year;
          }
          addEdu.resetForm();
          this.educationslist.push({
            'educationId': educationId, 'educationname': educationname, 'institute': institute, 'year': year,
            'gpaScore': gpaScore, 'specialization': specialization, 'isCurrent': eduCurrent
          });
          // console.log(this.educationslist);
          for (let i = 0; i < this.educationset.length; i++) {
            if (this.educationset[i].id === educationId) {
              console.log(this.educationslist.length);
              this.educationslist[this.educationslist.length - 1].educationname = this.educationset[i].name;
            }
          }
        }
      }
    }


  }

  //edit education
  editEducation(educationinfo) {
    // console.log(educationinfo)
    this.educationslist1.education = educationinfo.educationId;
    this.educationslist1.institute = educationinfo.institute;

    this.educationslist1.specialization = educationinfo.specialization;
    this.educationslist1.year = educationinfo.year;
    this.expinfo.gpaScore = educationinfo.gpaScore;
    let index = this.educationslist.indexOf(educationinfo);
    this.indexofEducation = index;
    // this.educationslist.splice(index, 1);
  }

  //remove education from able
  removeEducation(educationinfo) {
    const index = this.educationslist.indexOf(educationinfo);
    this.educationslist.splice(index, 1);
  }
  // education add and remove end



  // saikumar  24/08/2019 started here
  // adding new skill record in the table display
  insertSkill(addSkill: NgForm, skillId, name, experience, comments, month, year) {
    skillId =  skillId.toString();
    let validBoolean1 = false;
    if (month > this.currentMonth && year === this.currentYear) {
      this.monthError = 'Please select valid month';
    } else {
      this.monthError = '';
      for (let index = 0; index < this.skillslist.length; index++) {
        if (this.skillslist[index].skillId === skillId) {
          validBoolean1 = true;
        }
      }

      // saikumar  24/08/2019 ended here
      if (validBoolean1) {
        this.error3 = 'Duplicate data cannot be added';
      }
      else {
        this.error3 = "";
        // console.log(skillId);
        addSkill.resetForm();
        this.skillslist.push({ 'skillId': skillId, 'name': name, 'experience': experience, 'comments': comments, 'lastUsed': month + '/' + year });


        for (let i = 0; i < this.skillset.length; i++) {
          if (this.skillset[i].id === skillId) {
            this.skillslist[this.skillslist.length - 1].name = this.skillset[i].name;
          }
        }
      }
    }

  }

  //edit primary skills
  editSkills(skillinfo) {
    // console.log(skillinfo);
    this.skillslist1.exp = skillinfo.experience;
    this.skillslist1.comments = skillinfo.comments;
    this.skillslist1.lastUsed = skillinfo.lastUsed;
    const splitted = this.skillslist1.lastUsed.split('/');
    // console.log(splitted);
    this.skillslist1.month = splitted[0];
    this.skillslist1.year = splitted[1];

    let index = this.skillslist.indexOf(skillinfo);
    this.skillslist.splice(index, 1);
  }

  // remove skill record from the table display
  removeSkill(id: string, skillinfo) {
    const index = this.skillslist.indexOf(skillinfo);
    this.skillslist.splice(index, 1);
  }
  // skill add and remove end


  // language add and remove start
  // adding new language record in the table display
  insertLanguage(addLang: NgForm, languageId, langname, fluency) {
    if (this.indexofLanguage != null || this.indexofLanguage == 0 || this.indexofLanguage != undefined) {
      console.log('editLanguage');
      let validBoolean = false;
      for (let index = 0; index < this.languageslist.length; index++) {
        if (this.languageslist[index].languageId === languageId && this.languageslist[index].fluency === fluency) {
          validBoolean = true;
        }
      }
      if (validBoolean) {
        this.error2 = 'Duplicate data cannot be added';
      }
      else {
        this.error2 = "";
        this.editLanguageNames = {
          languageId: languageId,
          langname: langname,
          fluency: fluency
        };

        this.languageslist.splice(this.indexofLanguage, 1, this.editLanguageNames)
        addLang.resetForm();
        this.indexofLanguage = null;
        console.log(this.indexofLanguage);

        for (let i = 0; i < this.languageset.length; i++) {
          if (this.languageset[i].id === languageId) {
            this.editLanguageNames.langname = this.languageset[i].name;
          }
          console.log(this.editLanguageNames.langname);
        }
      }

    } else if (this.indexofLanguage == null) {
      console.log('addData');
      let validBoolean = false;
      for (let index = 0; index < this.languageslist.length; index++) {
        if (this.languageslist[index].languageId === languageId && this.languageslist[index].fluency === fluency) {
          validBoolean = true;
        }
      }
      if (validBoolean) {
        this.error2 = 'Duplicate data cannot be added';
      }
      else {
        this.error2 = "";
        addLang.resetForm();
        this.languageslist.push({ 'languageId': languageId, 'langname': langname, 'fluency': fluency });
        for (let i = 0; i < this.languageset.length; i++) {
          if (this.languageset[i].id === languageId) {
            console.log(this.languageslist.length);
            this.languageslist[this.languageslist.length - 1].langname = this.languageset[i].name;
          }
        }
      }
    }
  }

  //edit language
  editLanguage(languageinfo) {
    // console.log(languageinfo);
    this.languageslist1.language = languageinfo.languageId;
    this.languageslist1.fluency = languageinfo.fluency;
    // this.languageslist1.langcomments = languageinfo.langcomments;

    // console.log(this.languageslist1);
    let index = this.languageslist.indexOf(languageinfo);
    this.indexofLanguage = index;
    // this.languageslist.splice(index, 1);
  }

  //remove language form the table
  removeLanguage(languageinfo) {
    const index = this.languageslist.indexOf(languageinfo);
    this.languageslist.splice(index, 1);
  }
  // language add and remove end


  // license add and remove start
  // adding new license record in the table display
  insertLicense(addLic: NgForm, type, licenseId, licensename, number, certificate) {
    licenseId =  licenseId.toString();
    if (this.indexofLicense != null || this.indexofLicense == 0 || this.indexofLicense != undefined) {
      const issued1 = new DatePipe('en-US').transform(this.licenseslist1.issued, 'yyyy-MM-dd');
      const expiry1 = new DatePipe('en-US').transform(this.licenseslist1.expiry, 'yyyy-MM-dd');

      let validBoolean4 = false;

      if (validBoolean4) {
        this.error6 = 'Duplicate data cannot be added';
      }
      else if (licenseId === "" || licenseId === null || licenseId === undefined) {
        this.emptyData = true;
      }
      else {
        this.error6 = '';
        this.emptyData = false;
        let alertvalue = 0;
        if (this.licenseslist1.alert) {
          alertvalue = 1;
        } else {
          alertvalue = 0;
        }
        // this.licensenames.push({'type':type, 'licenseId': licenseId, 'licensename': licensename, 'number': number, 'issued': issued1, 'expiry': expiry1, 'certificate':certificate, 'alert': alertvalue });

        this.editLicenseNames = {
          type: type,
          number: number,
          issued: issued1,
          expiry: expiry1,
          certificate: certificate,
          alert: alertvalue,
          licenseId: licenseId,
          licensename: licensename
        };

        this.licensenames.splice(this.indexofLicense, 1, this.editLicenseNames)
        addLic.resetForm();
        this.indexofLicense = null;
        for (let i = 0; i < this.licenseset.length; i++) {
          if (this.licenseset[i].id === licenseId) {
            console.log(this.licensenames.length);
            this.editLicenseNames.licensename = this.licenseset[i].name;
          }
        }
      }
    } else if (this.indexofLicense == null) {
      const issued1 = new DatePipe('en-US').transform(this.licenseslist1.issued, 'yyyy-MM-dd');
      const expiry1 = new DatePipe('en-US').transform(this.licenseslist1.expiry, 'yyyy-MM-dd');

      let validBoolean4 = false;

      for (let index = 0; index < this.licensenames.length; index++) {
        if (this.licensenames[index].type === type && this.licensenames[index].licenseId === licenseId && this.licensenames[index].number === number) {
          validBoolean4 = true;
        }
      }

      if (validBoolean4) {
        this.error6 = 'Duplicate data cannot be added';
      }
      else if (licenseId === "" || licenseId === null || licenseId === undefined) {
        this.emptyData = true;
      }
      else {
        this.error6 = '';
        this.emptyData = false;
        let alertvalue = 0;
        if (this.licenseslist1.alert) {
          alertvalue = 1;
        } else {
          alertvalue = 0;
        }
        addLic.resetForm();
        this.licensenames.push({ 'type': type, 'licenseId': licenseId, 'licensename': licensename, 'number': number, 'issued': issued1, 'expiry': expiry1, 'certificate': certificate, 'alert': alertvalue });
        console.log(this.licensenames);
        for (let i = 0; i < this.licenseset.length; i++) {
          if (this.licenseset[i].id === licenseId) {
            // console.log(this.licensenames.length);
            this.licensenames[this.licensenames.length - 1].licensename = this.licenseset[i].name;
          }
        }
      }
    }

  }



  insertCertificate(addLic: NgForm, type, certificate, number, licenseId) {
    if (this.dateError1) {
      this.dateError1 = 'Please select a valid expiry date';
    } else {
      console.log('edit Data');
      if (this.indexofCertificate != null || this.indexofCertificate == 0 || this.indexofCertificate != undefined) {
        const issued1 = new DatePipe('en-US').transform(this.licenseslist1.issued, 'yyyy-MM-dd');
        const expiry1 = new DatePipe('en-US').transform(this.licenseslist1.expiry, 'yyyy-MM-dd');

        let validBoolean5 = false;

        for (let index = 0; index < this.certificatenames.length; index++) {
          if (this.certificatenames[index].type === type && this.certificatenames[index].certificate === certificate && this.certificatenames[index].number === number) {
            validBoolean5 = true;
          }
        }

        if (validBoolean5) {
          this.error6 = 'Duplicate data cannot be added';
        }
        else if (certificate === "" || certificate === null || certificate === undefined) {
          this.emptyData = true;
        }
        else {
          this.error6 = '';
          this.emptyData = false;
          let alertvalue = 0;
          if (this.licenseslist1.alert) {
            alertvalue = 1;
          } else {
            alertvalue = 0;
          }
          this.editcertificatenames = {
            type: type,
            number: number,
            issued: issued1,
            expiry: expiry1,
            certificate: certificate,
            alert: alertvalue,
            licenseId: '',
            licensename: '',
          };

          this.certificatenames.splice(this.indexofCertificate, 1, this.editcertificatenames)
          addLic.resetForm();
          this.indexofCertificate = null;
          console.log(this.indexofCertificate);

          for (let i = 0; i < this.licenseset.length; i++) {
            if (this.licenseset[i].id === licenseId) {
              //console.log(this.licensenames.length);
              this.licensenames[this.licensenames.length - 1].licensename = this.licenseset[i].name;
            }
          }
        }



      }
      else if (this.indexofCertificate == null) {
        const issued1 = new DatePipe('en-US').transform(this.licenseslist1.issued, 'yyyy-MM-dd');
        const expiry1 = new DatePipe('en-US').transform(this.licenseslist1.expiry, 'yyyy-MM-dd');

        let validBoolean5 = false;

        for (let index = 0; index < this.certificatenames.length; index++) {
          if (this.certificatenames[index].type === type && this.certificatenames[index].certificate === certificate && this.certificatenames[index].number === number) {
            validBoolean5 = true;
          }
        }

        if (validBoolean5) {
          this.error6 = 'Duplicate data cannot be added';
        }
        else if (certificate === "" || certificate === null || certificate === undefined) {
          this.emptyData = true;
        }
        else {
          this.error6 = '';
          this.emptyData = false;
          let alertvalue = 0;
          if (this.licenseslist1.alert) {
            alertvalue = 1;
          } else {
            alertvalue = 0;
          }
          addLic.resetForm();
          this.certificatenames.push({ 'type': type, 'certificate': certificate, 'number': number, 'issued': issued1, 'expiry': expiry1, 'licenseId': "", 'licensename': "", 'alert': alertvalue });

          for (let i = 0; i < this.licenseset.length; i++) {
            if (this.licenseset[i].id === licenseId) {
              //console.log(this.licensenames.length);
              this.licensenames[this.licensenames.length - 1].licensename = this.licenseset[i].name;
            }
          }
        }
      }
    }


  }

  // this.licenseslist.push({ 'type':type, 'certificate':certificate, 'number': number, 'issued': issued1, 'expiry': expiry1 });
  // console.log(this.licenseslist);

  //edit licenses
  editLicenses(licenseinfo) {
    // console.log(licenseinfo);
    if (licenseinfo.type == "Certification") {
      this.showform = true;
      this.showcertificate = true;
      this.showlicense = false;
    }
    else if (licenseinfo.type == "License") {
      this.showform = true;
      this.showlicense = true;
      this.showcertificate = false;
    }
    this.licenseslist1.license = licenseinfo.licenseId;
    this.licenseslist1.number = licenseinfo.number;
    this.licenseslist1.type = licenseinfo.type;
    this.licenseslist1.expiry = new Date(licenseinfo.expiry);
    this.licenseslist1.issued = new Date(licenseinfo.issued);
    this.licenseslist1.alert = licenseinfo.alert;

    //console.log(this.licenseslist1);
    let index = this.licensenames.indexOf(licenseinfo);
    this.indexofLicense = index;
    // this.licensenames.splice(index, 1);
  }

  //edit certificate
  editCertificates(certificateinfo) {
    // console.log(certificateinfo);
    if (certificateinfo.type == "Certification") {
      this.showform = true;
      this.showcertificate = true;
      this.showlicense = false;
    }
    else if (certificateinfo.type == "License") {
      this.showform = true;
      this.showlicense = true;
      this.showcertificate = false;
    }
    this.licenseslist1.cerName = certificateinfo.certificate;
    this.licenseslist1.number = certificateinfo.number;
    this.licenseslist1.type = certificateinfo.type;
    this.licenseslist1.expiry = new Date(certificateinfo.expiry);
    this.licenseslist1.issued = new Date(certificateinfo.issued);
    this.licenseslist1.alert = certificateinfo.alert;

    //console.log(this.licenseslist1);
    let index = this.certificatenames.indexOf(certificateinfo);
    this.indexofCertificate = index;
    // this.certificatenames.splice(index, 1);
  }

  //remove license from the table
  removeLicense(licenseinfo) {
    //console.log(licenseinfo)
    const index = this.licensenames.indexOf(licenseinfo);
    this.licensenames.splice(index, 1);
  }

  //remove certificate
  removeCertificates(certificateinfo) {
    const index = this.certificatenames.indexOf(certificateinfo);
    this.certificatenames.splice(index, 1);
  }
  // license add and remove end


  //validate start and end date in experience
  dateValidate() {
    // console.log(fromdate,todate)
    const today = new Date();
    if (this.experience.fromDate >= this.experience.toDate) {
      this.dateError = 'Please select a valid start date';
      this.experience.toDate = this.experience.fromDate;
    } else if (this.experience.fromDate > today && this.experience.toDate > today) {
      this.dateError = 'Please select a valid date range';
      this.experience.toDate = today;
      this.experience.fromDate = today;
    } else if (this.experience.toDate > today && this.experience.fromDate < today) {
      this.dateError = 'Please select a valid date range';
      this.experience.toDate = today;
    } else {
      this.dateError = '';
    }
  }

  //changed the date format - sharmistha - 08-07-2019 - start
  dateValidate1() {
    if (new Date(this.licenseslist1.issued) >= new Date(this.licenseslist1.expiry)) {
      this.dateError1 = 'Please select a valid expiry date';
    }
    else {
      this.dateError1 = "";
    }
  }
  //changed the date format - sharmistha - 08-07-2019 - end


  // functionality for adding new skill and license through popup - sharmistha - 10-03-2019 - start
  addnewskill() {
    this.skillpopup = true;
  }

  closeskillPopup() {
    this.skillpopup = !this.skillpopup;
  }

  addskill(skillType, addindFrm: NgForm) {
    this.loading = false;
    if (skillType !== "") {
      this.newSkill.skillType = skillType;
      this.service.addOtherSkill(this.newSkill).subscribe(response => {
        this.skillData = response.json();
        if (this.skillData.statusCode.code === '200') {

          this.closeskillPopup();
          addindFrm.resetForm();
        }
        else if (this.skillData.statusCode.code === '409') {
          this.skillError = this.skillData.errorMessages;
        }

        this.getSkills()
       
        this.skillslist1.skill = this.skillData.data;
      });
    } else {
      this.loading = false;
      this.skillError = 'Skill is required';
    }
  }


  addnewLicense() {
    this.licensepopup = true;
  }

  closeLicensePopup() {
    this.licensepopup = !this.licensepopup;
  }

  addLicense(LicenseType, addindFrm: NgForm) {
    this.loading = false;
    if (LicenseType !== "") {
      this.newLicense.licenseType = LicenseType;
      this.service.addOtherLicense(this.newLicense).subscribe(response => {
        this.licenseData = response.json();

        if (this.licenseData.statusCode.code === '200') {

          this.closeLicensePopup();
          addindFrm.resetForm();
        }
        else if (this.licenseData.statusCode.code === '409') {
          this.licenseError = this.licenseData.errorMessages;
        }
        this.getLicense()
        this.licenseslist1.license = this.licenseData.data;
      });
    } else {
      this.loading = false;
      this.licenseError = 'License is required';
    }
  }
  // functionality for adding new skill through popup - sharmistha - 10-03-2019 - end
}
