import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  log
  logger:any={};
  users:any = [];
  usersList = [];
  loading;
  selePermissions:any = [];
  filteredTitle =[];
  list = [];
  filterData;
  availableRecords = 0;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;
  isShowPopup = false;
  rolesUpdateStatus = false;
  selectedUser:any;
  singleUser:any;
  isShowUser:boolean = false;
  isManageRoles:boolean = false;
  roles:any;
  newUsers = [];
  oldUsers = [];

  constructor(private route: ActivatedRoute,private eventEmitterService: EventEmitterService,public http: Http, public service: UserService, private router: Router) {
    this.userPermissions = this.currentUser.permission;
    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='Users Management';
    this.logger.comment='Users Management';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data; 
      this.eventEmitterService.onRecentActivityRefresh();    
    });
  }

  ngOnInit() {
    this.loading = true;
    this.service.getUsersList()
    .subscribe(response => {
      this.usersList = response.json();
      // console.log(this.usersList);
      this.usersList.forEach(ele => {
        if((ele.userType.id === "3" || ele.userType.id === "1") && (ele.userType.id != "2")){
          this.users.push(ele);
        }
      });
      // done changes to show new users first - sharmistha - 11-04-2019 - start
      this.users.forEach(obj => {
        if(obj.isNew === "1"){
          this.newUsers.push(obj);
        }
        else if(obj.isNew === "2"){
          this.oldUsers.push(obj);
        }
        else{
          this.oldUsers.push(obj);
        }

        if(obj.middle_name){
          obj.fullname=(obj.first_name + " " +  obj.middle_name + " " +  obj.last_name );
        }
        else{
          obj.fullname=(obj.first_name + " " +  obj.last_name );
        }
      });
      this.users = this.newUsers.concat(this.oldUsers);
      // done changes to show new users first - sharmistha - 11-04-2019 - end
      this.filterData = this.users;
      this.availableRecords = this.filterData.length;
      this.loading = false;
    });
  }

  addRolestoUserPop(userid){
    this.isShowPopup = true;
    this.selectedUser = userid;
    this.loading = true;
    this.service.getRolesList()
    .subscribe(response => {
      this.roles = response.json().data;
      this.loading = false;
    })
  }

  addRoletoUser(){
    this.loading = true;
    let inputParams = {
      userId: this.selectedUser,
      roles: this.selePermissions
    }
    this.service.addRole(inputParams)
    .subscribe(res=>{
      this.loading = false;
      this.rolesUpdateStatus = true;

    })
  }

  offerLetter(userId){
    this.singleUser = this.users.filter(x => x.id == userId)[0];
    this.isShowPopup = true;
  }

  closePopup(){
    this.isShowPopup = !this.isShowPopup;
  }
  
  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.users;
    } else {

      if (key === 'employeeName') {
        this.filterData = this.users.filter(x =>
          x.fullname.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'userName') {
        this.filterData = this.users.filter(x =>
          x.username.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'jobtitle') {
        this.filteredTitle = this.users.filter(y => y.jobTitle != null);
        this.filterData = this.filteredTitle.filter(x =>
          x.jobTitle.job_title.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

  

}
