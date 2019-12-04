import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { ModalService } from '../../../core/services';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  educations=[];
  filterData=[];
  eduData:any = {};
  eduInfo:any={};
  headers:any;
  availableRecords = 0;
  options:any;
  isShowPopup = false;
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
  userPermissions : any;

  constructor(public http:Http, private modalService: ModalService, public service:UserService) {
    this.service.getEducation()
    .subscribe(response =>{
      this.educations = response.json().data;
      this.filterData = this.educations;
      this.availableRecords = this.filterData.length;
    },
    error => {
      console.log(error);
    }
  )
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userPermissions = this.currentUser.permission;
  }

  showJobDetails(eduId){
    try{
      this.service.getEducationId(eduId)
    .subscribe(response =>{
      this.eduInfo = response.json().data;
    },
    error => {
      console.log(error);
    }
    )
    }
    catch(error){
      console.log(error);
    }
    this.isShowPopup = true;
  }

  closePopup(){
    this.isShowPopup = !this.isShowPopup;
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.educations;
    } else {

      if (key === 'name') {
        this.filterData = this.educations.filter(x =>
          x.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

}
