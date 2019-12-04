import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services';

@Component({
  selector: 'app-employee-type',
  templateUrl: './employee-type.component.html',
  styleUrls: ['./employee-type.component.css']
})
export class EmployeeTypeComponent implements OnInit {
  emptypes;
  statusData: any = {};
  statusInfo: any = {};
  single;
  filterData;
  loading = false;
  isShowPopup = false;
  isShowDetails = false;
  availableRecords = 0;
  headers: any;
  options: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;
  constructor(public http: Http, public service: UserService) {
  }

  ngOnInit() {
    this.userPermissions = this.currentUser.permission;
    this.loading = true;
    this.service.getEmployeeTypes()
      .subscribe(response => {        
        this.emptypes = response.json().data;
        this.filterData = this.emptypes;
        this.availableRecords = this.filterData.length;       
        this.loading = false;
      },
      error => {
        console.log(error);
      });
  }

  showUserDetails(typeid) {
    this.single = this.emptypes.filter(x => x.id === typeid)[0];
    this.isShowPopup = true;
    this.isShowDetails = true;
  }

  closePopup() {
    this.isShowPopup = !this.isShowPopup;
    this.isShowDetails = false;
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.emptypes;
    } else {

      if (key === 'name') {
        this.filterData = this.emptypes.filter(x =>
          x.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

}
