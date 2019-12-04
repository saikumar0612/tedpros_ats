import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  cusId;
  cus;
  cusInfo: any = { projectId: '', projectName: '', projectDesc: '', isApproved: '', startDate: '', endDate: '',customer:{name:''},internalApprover:{firstName:'',lastName:''},externalApprover:{first_name:'',last_name:''} };
  cusData: any = {};
  headers: any;
  options: any;
  customer: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;
  activitieslist = [];
  activityData: any = {};
  activityInfo: any = { project_id: '', name: '', activity_id: '' };

  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public auth: AuthenticationService, private blocation: Location, private service: UserService) {
    this.userPermissions = this.currentUser.permission;
    this.service.getCompanyList()
      .subscribe(response => {
        this.customer = response.json();
        console.log(this.customer);
      },
        error => {
          console.log(error);
        });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.cusInfo.id = param.get('id');
        this.activityInfo.project_id = this.cusInfo.id;
      }
    );
    // this.http.get('http://service.tedpros.com/project/getproject/?id=' + this.cusInfo.id, this.options)
    this.service.getProjectId(this.cusInfo.id)
      .subscribe(response => {
        if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
          this.router.navigate(['']);
        }
        this.cusInfo = response.json().data;
        console.log('view project');
        console.log(this.cusInfo);
      },
        error => {
          console.log(error);
        });
    this.activites(this.cusInfo.id);
  }
  activites(project) {
    // this.http.get('http://service.tedpros.com/project/getProjectActivities?id=' + project, this.options)
    this.service.getProjectActivity(project)
      .subscribe(response => {
        if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
          this.router.navigate(['']);
        }
        if (response.json().data) {
          this.activitieslist = response.json().data;
        } else {
          this.activitieslist = [];
        }
        console.log(this.activitieslist);
      },
        error => {
          console.log(error);
        });
  }
  addActivity(id, name) {
    this.activityData.id = id;
    this.activityData.name = name;
    this.activitieslist.push(this.activityData);
    console.log(this.activitieslist);
  }
  // cancel() {
  //   this.auth.cancel('projects');
  // }
  cancel() {
    this.blocation.back();
  }
  editActivity(jsonAry) {
    const index = this.activitieslist.indexOf(jsonAry);
    this.activityData = this.activitieslist[index];
    this.activitieslist.splice(index, 1);
  }

}
