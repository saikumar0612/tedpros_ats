import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects;
  projectLists: any = {
    statusCode: {},
    data: {},
  };
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;
  headers: any;
  options: any;
  customers: any;
  customerName: any;
  filterData = [];
  availableRecords = 0;

  constructor(public http: Http, private router: Router, private service: UserService) {
    this.userPermissions = this.currentUser.permission;
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.projectLists;
    } else {
      console.log(term);
      if (key === 'projectId') {
        this.filterData = this.projectLists.filter(x =>
          x.projectId.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'projectName') {
        this.filterData = this.projectLists.filter(x =>
          x.projectName.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'startDate') {
        this.filterData = this.projectLists.filter(x =>
          x.startDate.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'endDate') {
        this.filterData = this.projectLists.filter(x =>
          x.endDate.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

  ngOnInit() {
    this.service.getProject()
      .subscribe(response => {
        if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
          this.router.navigate(['']);
        }
        this.projects = response.json();
        this.projectLists = this.projects.data;
        this.filterData = this.projectLists;
        this.availableRecords = this.filterData.length;
        // console.log(this.projectLists);
        for (let i = 0; i < this.filterData.length; i++) {
          if (this.filterData[i].startDate) {
            this.filterData[i].startDate = '' + new DatePipe('en-US').transform(this.filterData[i].startDate, 'MM/dd/yyyy');
          } else {
            this.filterData[i].startDate = '';
          }
          if (this.filterData[i].endDate) {
            this.filterData[i].endDate = '' + new DatePipe('en-US').transform(this.filterData[i].endDate, 'MM/dd/yyyy');
          } else {
            this.filterData[i].endDate = '';
          }

        }
      },
        error => {
          console.log(error);
        });
  }

}
