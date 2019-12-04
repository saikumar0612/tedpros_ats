import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { DataTableModule } from 'angular-6-datatable';
import { AuthenticationService } from '../../../core/services';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  single;
  preview;
  log;
  logger: any = {};
  filterData = [];
  finalData = [];
  candidateRec = {
    id: '',
    name: '',
    cityName: '',
    stateName: '',
    phone: '',
    emailId: '',
    expectedPay: '',
    skills: ''
  };
  emailData = {
    fname: '',
    lname: '',
    email: '',
    phone: ''
  }
  result;
  data;
  jobs;
  selectedAll: any;
  availableRecords = 0;
  addCandidateLink = false;
  loading = false;
  isShowPopup = false;
  message: any;
  emailError = '';
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;

  constructor(public http: Http, private router: Router, public auth: AuthenticationService, private service: UserService, private eventEmitter: EventEmitterService) {
    this.userPermissions = this.currentUser.permission;
    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'Candidates ';
    this.logger.comment = 'View List of Candidates';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitter.onRecentActivityRefresh();
      });

  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.finalData;
    } else {

      if (key === 'name') {
        this.filterData = this.finalData.filter(x =>
          x.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'cityName') {
        this.filterData = this.finalData.filter(x =>
          x.cityName.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'stateName') {
        this.filterData = this.finalData.filter(x =>
          x.stateName.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'phone') {
        this.filterData = this.finalData.filter(x =>
          x.phone.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'emailId') {
        this.filterData = this.finalData.filter(x =>
          x.emailId.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'skills') {
        this.filterData = this.finalData.filter(x =>
          x.skills.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

  sendEmail() {
    this.addCandidateLink = true;
  }
  // sharmistha changes 08-01-2019 start
  sendLink(editJobForm) {
    this.addCandidateLink = false;
    this.service.sendEmail(this.emailData)
      .subscribe(res => {
        this.result = res.json();
        console.log(this.result);
        if (this.result.statusCode.code == "200") {
          this.closeModel2(editJobForm);
          this.addCandidateLink = false;
          this.isShowPopup = true;
          this.message = this.result.data;
        }
        else {
          this.closeModel2(editJobForm);
          this.addCandidateLink = false;
          this.isShowPopup = true;
          this.message = this.result.errorMessages;
        }
        this.loading = false;
      })
  }
  //  sharmistha changes 08-01-2019 end

  checkMail() {
    const email = this.emailData.email;
    this.auth.checkRegisterEmail(email)
      .subscribe(response => {
        const result = response.json();
        if (result.statusCode.code === '409') {
          this.emailData.email = '';
          this.emailError = 'This email is already registered';
        } else {
          this.emailError = '';
        }
      },
        error => {
          console.log(error);
        });
  }

  close() {
    this.isShowPopup = !this.isShowPopup;
  }

  closeModel2(editJobForm: NgForm) {
    editJobForm.resetForm();
    this.addCandidateLink = !this.addCandidateLink;
  }


  ngOnInit() {

    this.service.getCandidateList()
      .subscribe(response => {
        this.data = response.json();
        const candidateData = this.data.data;
        for (let i = 0; i < candidateData.length; i++) {
          this.candidateRec.id = candidateData[i].id;
          this.candidateRec.name = candidateData[i].firstName + ' ' + candidateData[i].lastName;
          if (candidateData[i].city) {
            this.candidateRec.cityName = candidateData[i].city.name;
          } else {
            this.candidateRec.cityName = ' ';
          }

          if (candidateData[i].state) {
            this.candidateRec.stateName = candidateData[i].state.name;
          } else {
            this.candidateRec.stateName = ' ';
          }
          if (candidateData[i].phoneNo) {
            this.candidateRec.phone = candidateData[i].phoneNo;
          } else {
            this.candidateRec.phone = ' ';
          }
          if (candidateData[i].emailId) {
            this.candidateRec.emailId = candidateData[i].emailId;
          } else {
            this.candidateRec.emailId = ' ';
          }
          if (candidateData[i].expectedPay) {
            this.candidateRec.expectedPay = candidateData[i].expectedPay;
          } else {
            this.candidateRec.expectedPay = ' ';
          }
          if (candidateData[i].skills) {
            let skillList = '';
            candidateData[i].skills.forEach((type) => {
              skillList = type.skillName + ', ' + skillList;
            });
            this.candidateRec.skills = skillList;
          } else {
            this.candidateRec.skills = ' ';
          }
          this.filterData.push(this.candidateRec);
          this.candidateRec = {
            id: '',
            name: '',
            cityName: '',
            stateName: '',
            phone: '',
            emailId: '',
            expectedPay: '',
            skills: ''
          };
        }
        this.finalData = this.filterData;
        this.availableRecords = this.finalData.length;
      },
        error => {
          console.log(error);
        }
      );
  }
  showpreview(typeid) {
    this.single = this.filterData.filter(x => x.id == typeid)[0];
    this.preview = true;
  }

  closePopup() {
    this.preview = !this.preview;
  }

}
