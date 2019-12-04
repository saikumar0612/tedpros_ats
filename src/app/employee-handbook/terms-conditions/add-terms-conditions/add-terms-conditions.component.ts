import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../../../core/services';

@Component({
  selector: 'app-add-terms-conditions',
  templateUrl: './add-terms-conditions.component.html',
  styleUrls: ['./add-terms-conditions.component.css']
})
export class AddTermsConditionsComponent implements OnInit {
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild('myckeditor', { static: true }) ckeditor: any;
  data: any = {
    content: '',
    status: ''
  }
  isSuccess = false;
  isFailure = false;
  
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
  userPermissions:any;

  constructor(public http: Http, public service: UserService) {
    this.data.status = '1';
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userPermissions = this.currentUser.permission;
  }

  close(){
    this.isSuccess = false;
  }

  closePopup(){
    this.isFailure = false;    
  }

  addTerms() {
    this.service.addTermsConditions(this.data)
      .subscribe(response => {
        this.data = response.json();
        if (this.data.statusCode.code === '200') {
          this.isSuccess = true;
        }
        else {
          this.isFailure = true;
        }
      },
        error => {
          console.log(error);
        })
  }

}