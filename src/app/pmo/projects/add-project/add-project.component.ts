import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  info;
  message;
  isShowPopup = false;

  customers;
  loading = true;
  projData: any = {};
  public customer: any = [];
  headers: any;
  options: any;
  error = '';
  internalApprovers = [];
  externalApprovers = [];
  companyError = '';
  dateError = '';
  pattern = '';
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  approversAvailable = 0;

  constructor(private blocation: Location, private http: Http, private router: Router,
    public auth: AuthenticationService, private service: UserService) {
    this.pattern = this.service.getAlphaNumPattern();
    this.externalApprovers = [];
    this.service.getCompanyList()
      .subscribe(response => {
        this.customer = response.json().data;
        if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
          this.router.navigate(['/authorization/logout']);
          this.customer = response.json().data;
          console.log(this.customer);
          this.loading = false;
        } else {
          // this.userData.roles = [];
          this.error = this.customer.errorMessages;
          this.loading = false;
          this.isShowPopup = false;
        }
      },
        error => {
          console.log(error);
        });
    this.getInternalApprover();
  }

  ngOnInit() {
    this.projData.isPrimary = "0";
  }

  getInternalApprover() {
    this.service.getUsersList()
      .subscribe(response => {
        this.internalApprovers = response.json();
        // console.log(this.users);
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }

  dateValidate() {
    if (this.projData.endDate < this.projData.startDate) {
      this.dateError = 'Please select a valid end date';
      this.projData.endDate = this.projData.startDate;
    } else {
      this.dateError = '';
    }

  }

  getExternalApprover() {
    if (this.projData.companyId === '') {
      this.externalApprovers = [];
      this.companyError = 'Please select company first';
    } else {
      this.companyError = '';
      this.service.getApproversList(this.projData.companyId)
        .subscribe(response => {
          const result = response.json();
          if (result.statusCode.code === '200') {
            this.externalApprovers = result.data;
            console.log(this.externalApprovers);
            this.approversAvailable = this.externalApprovers.length;
          } else {
            this.externalApprovers = [];
          }
          // console.log(this.users);
          this.loading = false;
        },
          error => {
            console.log(error);
          });
    }
  }

  addPro(addProjectFrm: NgForm) {
    console.log(this.options, this.projData);
    this.loading = true;
    // this.http.post('http://service.tedpros.com/project/add/', this.projData, this.options)
    this.service.addProject(this.projData)
      .subscribe(response => {
        this.info = response.json();
        console.log(response);
        if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
          this.router.navigate(['/authorization/logout']);
        }
        if (this.info.statusCode.code === '200') {
          this.message = this.info.data;
          this.isShowPopup = true;
          addProjectFrm.reset();
          // this.router.navigate(['projects']);
        } else {
          this.error = response.json().errorMessages;
          console.log(this.error);
          this.isShowPopup = true;
        }
        console.log(response);
        this.loading = false;
      },
        error => {
          console.log(error);
        }
      );
  }

  cancel() {
    this.blocation.back();
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
    this.error = '';
  }

}
