import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import {Router} from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-pay-grade',
  templateUrl: './edit-pay-grade.component.html',
  styleUrls: ['./edit-pay-grade.component.css']
})
export class EditPayGradeComponent implements OnInit {
  payId;
  pay;
  data;
  payInfo:any = {id:'',name:''};
  salaryInfo:any = {};
  salaryDetails:any = {
    currency:{
      id:'',
      name:''
    },
    maxSalary:'',
    minSalary:''
  };
  payData:any = {};
  isSuccess = false;
  isFailure = false;
  isSuccess1 = false;
  isFailure1 = false;
  display:boolean=false;
  // sharmistha - 08-02-2019 - start
  currencyMastList = [];  
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
  // sharmistha - 08-02-2019 - end
  constructor(private blocation: Location,private route: ActivatedRoute, public http: Http, private router: Router, public service:UserService) {

  }

  ngOnInit() {
    // sharmistha - 08-02-2019 - start
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // sharmistha - 08-02-2019 - end
    this.route.paramMap.subscribe(
      param => {
        this.payInfo.id = param.get('id');
       
      }
    );
 
    this.service.editPayGrades(this.payInfo.id)
      .subscribe(response =>{
        this.data= response.json().data;
        this.payInfo =this.data;      
      },
      error => {
        console.log(error);
      }
    )
   
    this.service.getPaySalaryId(this.payInfo.id)
      .subscribe(response =>{
        this.salaryDetails = response.json().data;    
        console.log(this.salaryDetails);   
      },
      error => {
        console.log(error);
      }
    )

    // currencyMastList
    this.service.getCurrency()
    .subscribe(response => {
      this.currencyMastList = response.json().data;
    });
  }

  add(){
    this.display=true;
  }

  

  closePopup() {
    this.isFailure = !this.isFailure;
    // this.isSuccess = !this.isSuccess
  }
  closePopup1() {
    this.isFailure1 = !this.isFailure1;
    // this.isSuccess1 = !this.isSuccess1;
  }
  closePopup2() {
    this.isSuccess = !this.isSuccess;
    // this.isFailure1 = !this.isFailure1;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }
  closemsg(){
    this.isSuccess1 = !this.isSuccess1;
  }
  closemsg1(){
    this.isFailure1 = !this.isFailure1;
  }

  back(){
    this.blocation.back();
  }

  cancel() {
    this.blocation.back();
  }

  // added currency - sharmistha - 08-02-2019 - start
  addSalary(){       
    this.salaryInfo = {
      'paygrade': this.payInfo.id,
      'maxSalary': this.salaryDetails.maxSalary,
      'minSalary': this.salaryDetails.minSalary,
      'currency': this.salaryDetails.currency.id
    }
    this.service.addPaySalary(this.salaryInfo)
    .subscribe(response =>{
      this.pay = response.json();
      console.log(this.salaryInfo);
      if(this.pay.statusCode.code == "200"){
        this.isSuccess1 = true;
      }else{
        this.isFailure1 = true;
      }
    },
    error => {
      console.log(error);
    }
  )
  }
  // added currency - sharmistha - 08-02-2019 - end

  editPay(){
    this.payData.id = this.payInfo.id;
    this.payData.payName = this.payInfo.name;
    this.service.ediPay(this.payData)
    .subscribe(response =>{
      this.pay = response.json();
      if(this.pay.statusCode.code == "200"){
        this.isSuccess = true;
      }
      else{
        this.isFailure = true;
      }
    },
    error => {
      console.log(error);
    }
  )
  }

}
