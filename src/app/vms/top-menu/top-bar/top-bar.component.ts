import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';
// import { UserService } from '../../../core/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var io: any;
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  file1_input;
  file2_input;
  themeData = {
    themeColor: '',
    siteLogo: '',
    siteFav: ''
  }; 
  userData:any = {};
  candidateUser = JSON.parse(localStorage.getItem('candidateUserData'));
  candidateData: any;
  socket: any;
  notifications=[];
  notificationLength=0;
  notificationData={
    id:''
  };
  notResult:any={};
  newNotification=[];
  url:any;
  constructor(private authenticationService:AuthenticationService, private service:VmsCandidateService, private router: Router) { 
    
  }

  ngOnInit() { 
    this.candidateData = this.candidateUser.data.email;
    const result = JSON.parse(localStorage.getItem('settings'));
    this.themeData = result.data;
    this.file1_input = this.authenticationService.getBaseUrl() +'/frontend/logos/'+ this.themeData.siteLogo;
    this.file2_input = this.authenticationService.getBaseUrl() +'/frontend/logos/'+ this.themeData.siteFav;

    this.service.getCandidatePersonal(this.candidateData).subscribe(res=>{
      this.userData = res.json().data;
    });

    this.socket = io('http://162.254.209.129:4201');
    // this.socket = io('http://localhost:8081');
    const webSocket = this.socket;

    //candidate notification limit 10
    webSocket.on(`candidatenotifications`, (data) => {
      console.log(data);
      // this.notifications = data;
      // if(this.notifications){
      //   this.notificationLength = this.notifications.length;
      // }
      this.notifications = data;     
      this.notificationLength = 0;
      this.newNotification = [];
      this.notifications.forEach(obj => {
        if(obj.status === 1){
          obj.isNewFlag = true;
          this.newNotification.push(obj);
          if(this.newNotification){
            this.notificationLength = this.newNotification.length;
          }
        }
        else{
          obj.isNewFlag = false;
        }
      });
    });

    setInterval(() => {
      webSocket.emit('candidatenotifications', {user_id: this.candidateUser.data.id});
    }, 5000);

    // candidate notification unlimited
    webSocket.on(`candidatenotificationslist`, (data) => {
      console.log(data);
    });

    setInterval(() => {
      webSocket.emit('candidatenotificationslist', {user_id: this.candidateUser.data.id});
    }, 5000);
  };

  logout(){
    this.authenticationService.candidatelogout();
  }

  // code to update status of notification once clicked - sharmistha - 12-01-2019
  notificationClicked(id, actionUrl){
    // code to update status - start
    this.notificationData.id = id;
    this.service.updateNotificationStatus(this.notificationData)
      .subscribe(response => {
        this.notResult = response.json();
        // console.log(this.notResult);
        if (this.notResult.statusCode.code === "200") {
          this.url = actionUrl;
          this.router.navigateByUrl(this.url);
        }
      });
    // code to update status - end    
  }
  // code to update status of notification once clicked - sharmistha - 12-01-2019

}
