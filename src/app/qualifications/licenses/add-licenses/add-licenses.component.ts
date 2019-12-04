import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-licenses',
  templateUrl: './add-licenses.component.html',
  styleUrls: ['./add-licenses.component.css']
})
export class AddLicensesComponent implements OnInit {
  licData: any = {};
  lic;
  isSuccess = false;
  isFailure = false;
  // sharmistha - 08-01-2019 - start
  currentUser ={
    token:'',
    email:'',
    id: '',
    flag: '',
    empType: {
        id:'',
        employeeType: ''
    },
    userType: {
        id: '',
        name: '',
        typeName: ''
    },
    first_name: '',
    last_name: '',
    middle_name: '',
    isAdmin: false,
    Adminrole: false,
    permission: {},
    submenuPermission: { },
    fieldPermission: {}
  };
  // sharmistha - 08-01-2019 - end

  constructor(private http: Http, private router: Router, public service: UserService, public location:Location) {
  }

  addLicense(addLicFrm:NgForm) {
    this.service.addLicence(this.licData)
      .subscribe(response => {
        this.lic = response.json();
        if (this.lic.statusCode.code === '200') {
          addLicFrm.resetForm()
          this.isSuccess = true;
        } else {
          this.isFailure = true;
        }
      },
        error => {
          console.log(error);
        }
      );
  }
  cancel() {
    // this.router.navigate(['licenses']);
    // sharmistha - 08-01-2019 - start
    this.location.back();
    // sharmistha - 08-01-2019 - end
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

  ngOnInit() {
    // sharmistha - 08-01-2019 - start
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // sharmistha - 08-01-2019 - end
  }

}
