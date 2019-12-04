import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService, UserService } from '../../../core/services';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.css']
})
export class AddJobsComponent implements OnInit {
  @ViewChild('myckeditor', { static: true }) ckeditor: any;
  compdata: any = {
  };
  cusData: any = {
  };
  contData: any = {
    address: {},
    social: {},
    personalInfo: {},
  };
  companySelected = {
    id: ''
  };
  jobData: any = {
    company: { id: '' },
    contact: { id: '' },
    job: { id: '' },
    city: { id: '' },
    state: { id: '' },
    country: { id: '' },
    recruiter: { userId: '' },
    recruiters: [],
    workAuthorisation: [],
    skill: [],
    recEmploymentType:'',
    questionnaire: ''
  };
  skill = {
    skillName: '',
    experience: '',
    name: ''
  };
  skillData = [];
  message = '';
  error;
  customers;
  billRate;
  perHour;
  jobTitles;
  users;
  recError = '';
  companies;
  countries;
  states;
  cities;
  loading = false;
  display = false;
  industries;
  authorizations;
  companyId;
  jobTitle;
  btnactive = true;
  maxDate = new Date();
  isShowPopup = false;
  recuiters = [];
  filteredusers = [];
  // declared the variable as array - sharmistha - 09-16-2019 -  start
  workauth = [];
  // declared the variable as array - sharmistha - 09-16-2019 -  end
  payFrequencies: any;
  zipError = '';
  datePosted: any;
  targetDate: any;
  companypopup;
  customers1;
  contactpopup;
  companyName1;
  dropdownSettings = {};
  workauthSettings = {};
  selAuth = [];
  skillBool = ' ';
  dateError = ' ';
  companypopupError = '';
  contactpopupError = '';
  workautherror;
  publishRate = true;
  recSel = [];
  filteredAuth = [];
  data: any = {};
  skillset;
  skillpopup;
  contactError: any = '';
  industriesData: any = {
    skillType: ''
  };

  // patterns
  companyNamePattern = '^([a-zA-Z0-9.&]+\s)*[a-zA-Z0-9.&]{8,50}+$';
  primaryPhonePattern = '^?:(+91-)?[0-9]{10}$';
  emailIdPattern = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$';
  finNoPattern = '^[0-9]{9}$';
  dunNoPattern = '^[0-9]{9}$';
  namePattern = '^[a-zA-Z]*$';
  numberPattern = '^[0-9]{6,10}$';
  log;
  logger: any = {};
  headers: any;
  options: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  contacts = [];
  jobtitlePattern;
  userList = {
    userId: '',
    first_name: '',
    last_name: '',
    status: '',
    role: ''
  };

  constructor(private http: Http, private router: Router, public auth: AuthenticationService, public service: UserService, public pattern: PatternsService,
    private blocation: Location, private eventEmitter: EventEmitterService) {
    this.jobtitlePattern = this.pattern.jobTitlePattern;
    this.jobData.recruiters = [];
    this.loading = true;

    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'Add Jobpost';
    this.logger.comment = 'Add new Jobpost ';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitter.onRecentActivityRefresh();
      });

    // disabled select all checkbox - sharmistha - 09-16-2019 - start
    this.workauthSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: false
    };
    // disabled select all checkbox - sharmistha - 09-16-2019 - end

    // http.get('http://service.tedpros.com/user/allDetails', this.options)
    this.service.getUsersList()
      .subscribe(response => {
        this.users = response.json();
        // console.log(this.users);
        this.users.forEach((type) => {
          if (type.employeeType.employeeType === 'Recruiter') {
            this.filteredusers.push(type);
          }
        });
        this.recuiters = this.filteredusers;
        // console.log(this.recuiters);
        this.recuiters.forEach(obj => {
          obj.fullname = (obj.first_name + ' ' + obj.last_name);

        });

        this.dropdownSettings = {
          singleSelection: true,
          idField: 'id',
          textField: 'fullname',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          allowSearchFilter: true,
          closeDropDownOnSelection: true
        };
        // console.log(this.recuiters);
        this.loading = false;
      },
        error => {
          console.log(error);
        }
      );

    // get pay frequency list
    // this.http.get('http://service.tedpros.com/employeemanagement/payFrequency', this.options)
    this.service.getPayFrequency()
      .subscribe(response => {
        this.payFrequencies = response.json().data;
        this.loading = false;
        // console.log(this.payFrequencies);
      },
        error => {
          console.log(error);
        });

    // http.get('http://service.tedpros.com/job/title', this.options)
    this.service.getJobTitles()
      .subscribe(response => {
        this.jobTitles = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        }
      );

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

    // set default country as us

    this.jobData.country.id = '231';
    this.change('231');
    this.jobData.datePosted = new Date();
    this.jobData.targetDate = new Date();
    this.datePosted = new Date();
    this.targetDate = new Date();

    // console.log(this.maxDate);
    this.getCompanies();
    if (localStorage.getItem('jobDetails')) {
      this.getJobDetails(localStorage.getItem('jobDetails'));

    }
  }

  // get skills list
  //saikumar 07/08/2019 started here
  getSkills() {
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



  getJobDetails(internalCode) {
    this.service.getjobDetails(internalCode)
      .subscribe(response => {
        this.data = response.json();
        this.jobData = this.data.data;
        console.log(this.jobData);
        console.log(this.jobData.company.id);
        this.getcontacts(this.jobData.company.id, 0);
        if (this.jobData.publishRate === '0') {
          this.publishRate = false;
        }
        console.log(this.jobData.publishRate);
        console.log(this.publishRate);
        // console.log(this.jobData.datePosted);
        if (this.jobData.workAuthorisation) {
          let workAuth;
          workAuth = this.jobData.workAuthorisation;
          workAuth.forEach(auth => {
            let ary = { id: '', name: '' };
            ary.id = auth.id;
            ary.name = auth.name;
            this.selAuth.push(ary);
          });
          let ifSix = 1;
          let ifSeven = 1;
          for (let ind = 0; ind < this.selAuth.length; ind++) {
            if (this.selAuth[ind].id === '6') {
              ifSix = 0;
              break;
            }
          }
          for (let ind = 0; ind < this.selAuth.length; ind++) {
            if (this.selAuth[ind].id === '7') {
              ifSeven = 0;
              break;
            }
          }
          if (ifSix) {
            this.selAuth.push({ id: '6', name: 'GC' });
          }
          if (ifSeven) {
            this.selAuth.push({ id: '7', name: 'US Citizen' });
          }
          this.filteredAuth = this.selAuth;

          // autoselect GC US Citizen
          console.log(this.filteredAuth);

        } else {
          this.filteredAuth = [];
          this.jobData.workAuthorisation = [];
        }
        this.jobData.datePosted = new Date(this.jobData.datePosted);
        this.jobData.targetDate = new Date(this.jobData.targetDate);
        if (this.jobData.skill === null) {
          this.skillData = [];
        } else {
          this.skillData = this.jobData.skill;
        }
        this.jobData.perHour = this.jobData.perHour.id;
        this.getAddress();
        // this.jobData.company.id = '';
        this.jobData.jobCode = '';
        // if (this.jobData.recruiter) {
        //   this.jobData.recruiters = [];
        //   const jobRec = {
        //     id: this.jobData.recruiter.userId,
        //     fullname: this.jobData.recruiter.firstName + ' ' + this.jobData.recruiter.lastName
        //   };
        //   this.jobData.recruiters.push(jobRec);
        // } else {
        //   this.jobData.recruiters = [];
        // }

        this.change(this.jobData.country.id);
        this.state(this.jobData.state.id);

        // console.log(this.jobData);

      },
        error => {
          console.log(error);
        }
      );
  }

  onChange($event: any): void {
  }

  checkPublishBill() {
    this.publishRate = !(this.publishRate);
  }
  reset(addJobFrm: NgForm) {
    addJobFrm.resetForm();
    localStorage.setItem('jobDetails', '');
    this.selAuth = [
      { id: '6', name: 'GC' },
      { id: '7', name: 'US Citizen' }
    ];
    // this.jobData.country.id='';
    // this.jobData.state.id='';
    // this.jobData.city.id='';
    this.jobData.datePosted = new Date();
    this.jobData.targetDate = new Date();

  }

  // saikumar 07-09-2019 started here
  addnewskill() {
    this.skillpopup = true;
  }

  closeskillPopup(addindFrm: NgForm) {
    this.skillpopup = !this.skillpopup;
    addindFrm.resetForm();
    this.contactError = "";
  }
  //saikumar 07-09-2019 ended here

  // sharmistha - 11-18-2019 - start
  resetSkillPopup(addindFrm: NgForm){
    addindFrm.resetForm();
    this.contactError = "";
  }
  // sharmistha - 11-18-2019 - end

  // saikumar 07/09/2019 started here
  addskill(skillType, addindFrm: NgForm) {
    this.loading = false;
    if (skillType !== "") {
      this.contactError = '';
      this.industriesData.skillType = skillType;
      this.service.postskills(this.industriesData).subscribe(response => {
        this.data = response.json();
        console.log(this.data);

        if (this.data.statusCode.code === '200') {
          this.closeskillPopup(addindFrm);
          addindFrm.resetForm();
          this.getSkills()
          this.cusData.skillType = this.data.data;
          console.log(this.cusData.skillType);
        }
        else if (this.data.statusCode.code === '409') {
          this.contactError = this.data.errorMessages;
          console.log(this.contactError);
        }
      });
    } else {
      this.loading = false;
      this.contactError = 'Fill required Fileds';

    }
  }

  // saikumar 07/09/2019 ended here


  getCompanies() {
    // this.http.get('http://service.tedpros.com/company/customer/', this.options)
    this.service.getCompanyList()
      .subscribe(response => {
        this.companies = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        }
      );
  }

  // get contacts list based on company selected
  getcontacts(id, flag) {
    if (flag) {
      this.jobData.contact.id = undefined;
    }
    console.log(id);
    // this.http.get('http://service.tedpros.com/contact/companyContact?id=' + id, this.options)
    this.service.getCompanyContacts(id)
      .subscribe(response => {
        this.contacts = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        }
      );
  }

  getAddress() {

    const zip = this.jobData.zipCode;
    this.zipError = null;
    console.log(zip);
    if (zip !== null) {
      this.service.getAddress(zip)
        .subscribe(response => {
          const result = response.json();
          // console.log(result);
          if (result.statusCode.code === '200') {
            this.jobData.country.id = result.data.country.id;
            this.change(this.jobData.country.id);
            this.jobData.state.id = result.data.state.id;
            this.state(this.jobData.state.id);
            this.jobData.city.id = result.data.city.id;
          } else {
            this.jobData.zipCode = '';
            this.zipError = 'Please enter a valid zip code';
            console.log('zipcode not found');
          }
        },
          error => {
            console.log(error);
          });
    }

  }

  // get states list based on country id
  change(id) {
    // console.log(id);
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
  state(id) {
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
  dateValidate() {
    if (this.jobData.datePosted >= this.jobData.targetDate) {
      this.dateError = 'Please select a valid target date';
      // this.jobData.targetDate = this.jobData.datePosted;
    } else {
      this.dateError = '';
    }

  }

  // addSkill(skillName, experience) {
  //   let itr = 0;
  //   this.skillBool = '';
  //   for (let i = 0; i < this.skillData.length; i++) {
  //     if (this.skillData[i].skillName.trim().toLowerCase() === skillName.trim().toLowerCase()) {
  //       this.skillBool = 'Please specify a new skill';
  //       this.skill.skillName = '';
  //       this.skill.experience = '';
  //       skillName = '';
  //       experience = '';
  //       itr = 0;
  //       break;
  //     } else {
  //       itr++;
  //     }
  //   }
  //   if (skillName.trim().toLowerCase() === '' || experience === '') {
  //     this.skillBool = 'Please specify both skill and experience';
  //     this.skill.skillName = '';
  //     this.skill.experience = '';
  //   } else if ((skillName.trim().toLowerCase() !== '' || experience !== '') && this.skillData.length === itr) {
  //     this.skillBool = '';
  //     const skill = {
  //       skillName: skillName,
  //       experience: experience
  //     };
  //     this.skillData.push(skill);
  //     this.skill.skillName = '';
  //     this.skill.experience = '';
  //     console.log(this.skillData);
  //     this.jobData.skill = this.skillData;
  //   }
  // }


  // adding new record in the table display
  addSkill(addSkills: NgForm, skillNameVal, sName, expVal) {
    console.log(skillNameVal);
    console.log(expVal);
    if (skillNameVal !== '' && expVal !== '') {
      let validBoolean = false;
      for (let index = 0; index < this.skillData.length; index++) {
        if (this.skillData[index].skillName.trim().toLowerCase() === skillNameVal.trim().toLowerCase()) {
          validBoolean = true;
        }
      }
      if (validBoolean) {
        this.skillBool = 'Duplicate skill cannot be added';
      } else {
        // let sName = '';
        for (let i = 0; i < this.skillset.length; i++) {
          if (this.skillset[i].id === skillNameVal) {
            sName = this.skillset[i].name;
          }
          console.log(sName);
        }
        this.skillBool = null;
        addSkills.resetForm();
        this.skill.skillName = '';
        this.skill.experience = '';
        const skill = {
          skillName: skillNameVal,
          experience: expVal,
          name: sName
        };
        console.log(skill);
        this.skillData.push(skill);
        console.log(this.skillData);
      }
    } else {
      if (skillNameVal === '' && expVal !== '') {
        this.skillBool = 'Please specify Skill Name';
      } else if (expVal === '' && skillNameVal !== '') {
        this.skillBool = 'Please specify Experience';
      } else if (skillNameVal === '' && expVal === '') {
        this.skillBool = 'Please enter skill and experience';
      }
    }
  }

  removeErrorText() {
    if (this.skillBool) {
      this.skillBool = null;
    }
  }

  removeSkill(skill) {
    const index = this.skillData.indexOf(skill);
    this.skillData.splice(index, 1);
  }

  addJob(addJobFrm: NgForm) {
    this.loading = true;
    this.jobData.skill = this.skillData;
    this.jobData.workAuthorisation = [];
    console.log(this.jobData.skill.length);
    if (this.jobData.skill.length) {
      this.skillBool = '';
      if (this.selAuth.length > 0) {
        this.error = null;
        this.selAuth.forEach(auth => {
          this.jobData.workAuthorisation.push(auth.id);
        });
      } else {
        this.loading = false;
        this.error = 'Atleast one work authorization must be selected';
        return '';
      }
      this.jobData.datePosted = new DatePipe('en-US').transform(this.jobData.datePosted, 'yyyy-MM-dd');
      this.jobData.targetDate = new DatePipe('en-US').transform(this.jobData.targetDate, 'yyyy-MM-dd');
      // this.jobData.skill = this.skillData;
      if (this.publishRate) {
        this.jobData.publishRate = '1';
      } else {
        this.jobData.publishRate = '0';
      }
      const finalData = this.jobData;
      let jobResult = {
        data: '',
        errorMessages: '',
        statusCode: {
          code: '',
          message: ''
        }
      };
      console.log(finalData);
      this.service.addjob(finalData)
        .subscribe(response => {
          console.log(response);
          jobResult = response.json();
          console.log(jobResult);
          if (jobResult.statusCode.code === '200') {
            this.message = jobResult.data;
            this.isShowPopup = true;
            localStorage.setItem('jobDetails', '');
            addJobFrm.resetForm();
            this.skillData = [];
          } else {
            this.error = this.jobData.errorMessages;
            this.loading = false;
            this.isShowPopup = true;
          }
        },
          error => {
            console.log(error);
          }
        );

    } else {
      this.skillBool = 'Please specify atleast one skill';
    }
    this.loading = false;
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }
  addcomp() {
    this.companypopup = true;
  }
  addcont(value: string) {
    if (value) {
      console.log(value);

      // console.log(this.companies)
      this.contData.companyId = value;
      this.companies.forEach(obj => {
        // console.log(obj);
        // console.log(this.languageslist[index],languageId,this.languageslist[index].fluency,fluency)
        if (obj.companyId === value) {

          this.companyName1 = obj.companyName;
          this.contactpopup = true;

          console.log(this.companyName1);
        }
      });


    }


  }

  addcontact(emailid, lastname, firstname, phnumber, popupContact: NgForm) {
    this.loading = true;
    this.contData.firstName = firstname;
    this.contData.lastName = lastname;
    this.contData.emailId = emailid;
    this.contData.phoneNo = phnumber;
    this.contData.companyType = 'customer';
    this.contData.address.countryId = '231';




    console.log(this.contData);
    // this.http.post('http://service.tedpros.com/contact/add', this.contData, this.options)
    this.service.addClientContacts(this.contData)
      .subscribe(response => {
        console.log(response);
        const resp = response.json();
        console.log(this.customers);
        if (resp.statusCode.code === '200') {
          this.contactpopupError = '';
          this.contactpopup = false;
          this.getcontacts(this.jobData.company.id, 1);
          this.jobData.contact.id = resp.contactId;
          popupContact.resetForm();

        } else {
          this.contactpopupError = resp.errorMessages;
          // contactpopupError = '';
        }
        this.loading = false;
      },
        error => {
          console.log(error);
        }
      );



  }
  closecontPopup() {
    this.contactpopup = !this.contactpopup;
  }

  closecompPopup() {
    this.companypopup = !this.companypopup;
  }

  addcompany(emailId, countryid, primaryphone, companyname, popupCompany: NgForm) {
    this.loading = true;
    console.log(emailId, countryid, primaryphone, companyname);
    this.compdata.companyName = companyname;
    this.compdata.primaryPhone = primaryphone;
    this.compdata.emailId = emailId;
    this.compdata.companyType = 'customer';
    this.compdata.countryId = countryid;

    console.log(this.compdata);
    this.service.addCompany(this.compdata)
      .subscribe(response => {
        console.log(response);
        const resp = response.json();
        if (resp.statusCode.code === '200') {
          this.companypopupError = '';
          this.companypopup = false;
          this.getCompanies();
          this.jobData.company.id = resp.data.id;
          popupCompany.resetForm();

        } else {
          this.companypopupError = resp.errorMessages;
          // contactpopupError = '';
        }
        this.loading = false;


      },
        error => {
          console.log(error);
        });



  }
  ngOnInit() {
    this.getSkills();
    this.selAuth = [
      { id: '6', name: 'GC' },
      { id: '7', name: 'US Citizen' }
    ];
    this.service.getWorkAuth()
      .subscribe(response => {
        this.workauth = response.json().data;
        // console.log(this.workauth);
        this.loading = false;
      },
        error => {
          console.log(error);
        });
        this.viewDocument();
  }

  // on deselect gc or us citizen
  OnItemDeSelect(item: any) {
    this.workautherror = "";
    if (item.id === '6') {
      this.selAuth.push({ id: '6', name: 'GC' });
      this.selAuth = [...this.selAuth];
      this.workautherror = 'GC or US Citizen cannot be deselected';
    } else if (item.id === '7') {
      this.selAuth.push({ id: '7', name: 'US Citizen' });
      this.selAuth = [...this.selAuth];
      this.workautherror = 'GC or US Citizen cannot be deselected';
    }
  }

  // on item select
  onItemSelect(item: any) {
    this.workautherror = '';
  }

  cancel() {
    localStorage.setItem('jobDetails', '');
    this.blocation.back();
  }

  viewDocument(){
    this.loading = true;
    this.service.getPrerequisiteDocById('4')
      .subscribe(res => {
      this.jobData.questionnaire = res.json().data.template;
      this.loading = false;
      console.log(this.jobData.questionnaire);
    });
  }

}
