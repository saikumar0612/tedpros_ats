import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-assign-project',
  templateUrl: './assign-project.component.html',
  styleUrls: ['./assign-project.component.css']
})
export class AssignProjectComponent implements OnInit {
  error;
  message;
  isShowPopup;
  info;
  cusId;
  cus;
  projects: any = [];
  users;
  headers: any;
  options: any;
  customer: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  activitieslist: any;
  activityData: any = {};
  activityInfo: any = { project_id: '', name: '', activity_id: '' };
  assignInfo: any = {
    user: [],
    activityId: '',
    projectId: ''
  };
  dropdownSettings = {};

  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public auth: AuthenticationService, private service: UserService) {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'fullname',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }

  ngOnInit() {

    // this.http.get('http://service.tedpros.com/job/gettitle/?id='+this.jobInfo.id)
    // this.http.get('http://service.tedpros.com/project/view/', this.options)
    this.service.getProject()
      .subscribe(response => {
        if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
          this.router.navigate(['/authorization/logout']);
        }
        this.projects = response.json().data;
      },
        error => {
          console.log(error);
        });
    // this.http.get('http://service.tedpros.com/user/allDetails', this.options)
    this.service.getUsersList()
      .subscribe(response => {
        // if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
        //   this.router.navigate(['']);
        // }
        this.users = response.json();
        console.log(this.users);
        this.users.forEach(obj => {
          obj.fullname = (obj.first_name + " " + obj.last_name);
        });
      },
        error => {
          console.log(error);
        });
  }
  activites(project) {
    console.log(project);
    // this.http.get('http://service.tedpros.com/project/getProjectActivities?id=' + project, this.options)
    this.service.getProjectActivity(project)
      .subscribe(response => {
        if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
          this.router.navigate(['/authorization/logout']);
        }
        this.activitieslist = response.json().data;
        console.log(this.activitieslist);
      },
        error => {
          console.log(error);
        });
  }

  assignProject(assignProjectFrm:NgForm) {
    console.log(this.assignInfo);
    // this.http.post('http://service.tedpros.com/project/assignProject', this.assignInfo, this.options)
    this.service.addAssignProject(this.assignInfo)
      .subscribe(response => {
        if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
          this.router.navigate(['/authorization/logout']);
        }
        this.info = response.json();
        if (this.info.statusCode.code === '200') {
          //this.router.navigate(['projects']);
          this.message = this.info.data;
          this.isShowPopup = true;
          this.error = null;
          assignProjectFrm.resetForm();
        }
        else {
          // this.userData.roles = [];
          this.message = null;
          this.error = this.info.errorMessages;
          //this.loading = false;
          this.isShowPopup = true;
        }
        console.log(response);
      },
        error => {
          console.log(error);
        }
      );
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }

  cancel() {
    this.auth.cancel('projects');
  }

}
