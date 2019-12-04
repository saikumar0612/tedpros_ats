import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import {Router} from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {
  skillId;
  skill;
  data;
  skillInfo:any = {id:'',name:'',description:''};
  skillData:any = {};
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
  
  // url:any = 'http://localhost/tedpros_services/';
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public service:UserService, public location:Location) {
   }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.route.paramMap.subscribe(
      param => {
        this.skillInfo.id = param.get('id');
        // console.log(this.skillInfo.id);
      }
    );
    // this.http.get(this.url+'qualifications/getskills/?id='+this.skillInfo.id,  this.options)
    this.service.editSkillsId(this.skillInfo.id)
    .subscribe(response =>{
      this.data = response.json().data;
      this.skillInfo = this.data;
      // console.log(this.skillInfo);
    },
    error => {
      console.log(error);
    }
  )
  }
  
  cancel(){
    // this.router.navigate(['skills']);
    this.location.back();
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

  editSkill(){
    this.skillData.id = this.skillInfo.id;
    this.skillData.qalName = this.skillInfo.name;
    this.skillData.qalDesc = this.skillInfo.description;
    // this.http.post(this.url+'qualifications/editSkills/', this.skillData,  this.options)
    this.service.editSkills(this.skillData)
    .subscribe(response =>{
      this.skill = response.json();
      // console.log(this.skill);
      // if(this.skill === 'success'){
      //   this.router.navigate(['skills']);
      // }
      if(this.skill.statusCode.code == "200"){
        this.isSuccess = true;
      }
      else{
        // console.log(this.status.errorMessages);
        this.isFailure = true;
      }
    },
    error => {
      console.log(error);
    }
  )}
}
