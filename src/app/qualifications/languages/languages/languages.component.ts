import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { ModalService } from '../../../core/services';
import { DataTableModule } from 'angular-6-datatable';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {
  data;
  filterData;
  LanData:any = {};
  langInfo:any={};
  headers:any;
  options:any;
  isShowPopup = false;
  isFailure = false;
  availableRecords:any;
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

  constructor(public http:Http, private modalService: ModalService, public service:UserService) {
    this.service.getLanguages()
    .subscribe(response =>{
      this.data = response.json().data;
      this.filterData = this.data;
      this.availableRecords = this.filterData.length;
    },
    error => {
      console.log(error);
    }
  )
  }

  ngOnInit() {
    // sharmistha - 08-01-2019 - start
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userPermissions = this.currentUser.permission;
    // sharmistha - 08-01-2019 - end
  }

  showJobDetails(lanId){
    try{
      this.service.getLanguagesId(lanId)
    .subscribe(response =>{
      this.langInfo = response.json().data;
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
      this.filterData = this.data;
    } else {

      if (key === 'name') {
        this.filterData = this.data.filter(x =>
          x.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

}
