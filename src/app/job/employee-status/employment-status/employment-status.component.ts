import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service'

@Component({
  selector: 'app-employment-status',
  templateUrl: './employment-status.component.html',
  styleUrls: ['./employment-status.component.css']
})
export class EmploymentStatusComponent implements OnInit {
  empstatus;
  filterData:[{}];
  statusData:any = {};
  statusInfo:any={};
  availableRecords = 0;
  isShowPopup=false;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;
  
  constructor(public http:Http, public service:UserService) {}

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.empstatus;
    } else {
      if (key === 'name') {
        this.filterData = this.empstatus.filter(x =>
          x.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

  ngOnInit() {
    this.userPermissions = this.currentUser.permission;
    this.service.getEmpStatus()
    .subscribe(response =>{
      this.empstatus = response.json().data;
      this.filterData = this.empstatus;
      this.availableRecords = this.filterData.length;
    },
    error => {
      console.log(error);
    }
  )
  }
  showJobDetails(jobId){
    this.service.getEmpStatusId(jobId)
    .subscribe(response =>{
      this.statusInfo = response.json().data;
    },
    error => {
      console.log(error);
    })
    this.isShowPopup = true;
  }

  closePopup(){
    this.isShowPopup = !this.isShowPopup;
  }

}
