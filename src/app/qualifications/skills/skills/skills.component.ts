import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service'

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills;
  skillData:any = {};
  skillInfo:any={};
  filterData=[{}];
  availableRecords = 0;
  isShowPopup = false;
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

  constructor(public http:Http,public service:UserService) {
    this.service.getSkills()
    .subscribe(response =>{
      this.skills = response.json().data;
      this.filterData = this.skills;
      this.availableRecords = this.filterData.length;
    },
    error => {
      console.log(error);
    }
  )
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.skills;
    } else {

      if (key === 'name') {
        this.filterData = this.skills.filter(x =>
          x.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } 
      else if (key === 'description') {
        this.filterData = this.skills.filter(x =>
          x.description.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userPermissions = this.currentUser.permission;
  }

  showJobDetails(skillId){
    try{
      this.service.getSkillsId(skillId)
    .subscribe(response =>{
      this.skillInfo = response.json().data;
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

}
