import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { ModalService } from '../../../core/services';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.css']
})
export class MembershipsComponent implements OnInit {
  memberships;
  filterData=[];
  MemData:any = {};
  memInfo:any={};
  isShowPopup = false;
  availableRecords = 0;
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
  userPermissions : any;
  // sharmistha - 08-01-2019 - end
  

  constructor(public http:Http, private modalService: ModalService, private service:UserService) {
    this.service.getMemberships()
    .subscribe(response =>{
      this.memberships = response.json().data;
      this.filterData = this.memberships;
      this.availableRecords = this.filterData.length;
    },
    error => {
      console.log(error);
    }
  )
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.memberships;
    } else {

      if (key === 'name') {
        this.filterData = this.memberships.filter(x =>
          x.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
  }


  ngOnInit() {
    // sharmistha - 08-01-2019 - start
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userPermissions = this.currentUser.permission;
    // sharmistha - 08-01-2019 - end
  }

  showJobDetails(memId){
    try{
      this.service.getMembershipsId(memId)
    .subscribe(response =>{
      this.memInfo = response.json().data;
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
