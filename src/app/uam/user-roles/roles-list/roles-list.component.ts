import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services';
@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {
  filterData: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userToken: any;
  userPermissions: any;
  roles = [];
  loading = false;
  availableRecords = 0;
  constructor(public http: Http, public service: UserService) { }
  ngOnInit() {
    this.userPermissions = this.currentUser.permission;
    this.userToken = this.currentUser.token;
    this.loading = true;
    this.service.getRolesList()
      .subscribe(response => {
        this.roles = response.json().data;
        this.filterData = this.roles;
        this.availableRecords = this.filterData.length;
        this.loading = false;
      });
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.roles;
    } else {

      if (key === 'role_name') {
        this.filterData = this.roles.filter(x =>
          x.role_name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'description') {
        this.filterData = this.roles.filter(x =>
          x.description.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }
}
