import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm }   from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.css']
})
export class AddLanguageComponent implements OnInit {
  lan;
  loading;
  lanData:any={};
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
  
  constructor(private http: Http, private router: Router, public service:UserService, public location:Location) { 
  }

  addLan(addMemFrm:NgForm){
    this.loading=true;
    this.service.addLanguages(this.lanData)
    .subscribe(response =>{
      this.lan = response.json();
      console.log(this.lan);
      if(this.lan.statusCode.code == "200"){
        this.loading=false;
        addMemFrm.resetForm();
        this.isSuccess = true;
      }
      else{
        this.loading=false;
        this.isFailure = true;

      }
    },
    error => {
      console.log(error);
    }
  )
  }
  cancel(){
    // this.router.navigate(['languages']);
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
