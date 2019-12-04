import {
  Component,
  OnInit,
  Input,
  Inject,
  Output,
  OnChanges,
  ViewChild,
  ElementRef,
  ViewRef,
  Renderer2,
  Renderer,
  AfterViewInit
} from "@angular/core";
import { Http } from '@angular/http';
import { UserService } from '../../core/services';
import { EventEmitterService } from '../../core/services/event-emitter.service';
import { RightBarService } from '../../core/services/right-bar.service';
import { InteractionService } from "../../core/services/interaction.service";
import { ChatModel } from "../../core/model/chat.model";
import { BehaviorSubject } from "rxjs";
import { DOCUMENT } from "@angular/common";
declare var io: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit ,AfterViewInit{
  @Input()
  chatModel: ChatModel;

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  logsData: any;
  socket: any;
  headers: any;
  options: any;
  activeUsers = 0;
  userName;
  userdata = {
    userId: "",
    userName: "",
    avatar: "",
    // role: "Admin",
    status: ""
  };
  userslist = [];
  userPermissions: any;
  submenuPermission: any;
  adminRole: any;
  url: any;
  constructor(public http: Http, public service: UserService, public eventEmitterService: EventEmitterService,
        public sideNavService: RightBarService,public interaction: InteractionService, @Inject(DOCUMENT) private document: any) {
        this.userPermissions = this.currentUser.permission;
        this.submenuPermission = this.currentUser.submenuPermission;
        this.adminRole = this.currentUser.Adminrole;
        this.getusersactivity();
  }

  ngOnInit() {
   // this.socket = io('http://142.93.221.56:4201');
    this.socket = io('http://162.254.209.129:4201');

        if (this.eventEmitterService.refreshVar === undefined) {
            this.eventEmitterService.refreshVar = this.eventEmitterService.
              invokeRecentActivityRefresh.subscribe((name: string) => {
                this.getusersactivity();
              });
          }
          this.userName = JSON.parse(localStorage.getItem("currentUser")).id;
          // console.log("ngoninit triggered");
          const webSocket = this.socket;         
    }
    //Getting User Logs start
        getusersactivity() {
          this.service.getUserlogs()
            .subscribe(response => {
              this.logsData = response.json().data.loggs;
            });
        }
    //Getting User Logs end
    
  ngAfterViewInit() {
    const webSocket = this.socket;
    webSocket.on("private-msg-" + this.userName, data => {
      if (
        !document.getElementById(
          `chat-${JSON.parse(localStorage.getItem("currentUser")).id}-${
            data.from
          }`
        )
      ) {
        this.chatwindow({
          userId: data.from,
          userName: data.fromUserName,
          msg: data.message,
          timestamp: data.timestamp
        });
      }
    });
    // this.getActiveUsersListforUser();

    this.userslist.length = 0;
    // const webSocket = this.socket;
    webSocket.emit("active-users-list", { userId: this.currentUser.id });
    webSocket.on("active-users-list", data => {
      data.forEach(obj => {
        // console.log(this.userslist.some((item) => item.user_id == obj.user_id));
        if (!this.userslist.some((item) => item.user_id == obj.user_id)) {
          // this.userslist.push(obj);
          // console.log(obj);
          this.userdata.userId = obj.user_id;
          this.userdata.userName = obj.user_name;
          if (obj.avatar) {
            this.userdata.avatar = obj.avatar;
          } else {
            this.userdata.avatar = "assets/images/avatar.png";
          }
          this.userdata.status = "1";
          this.userslist.push(this.userdata);
          this.userdata = {
            userId: "",
            userName: "",
            avatar: "",
            status: ""
          };
    
          // console.log( obj.id)
      }
      else
      {
      
      }
     

      });

     

      // console.log(this.userslist);
    });

    // setInterval(() => { this.getActiveUsersListforUser(); }, 4000);
  }
  getActiveUsersListforUser() {
    this.userslist = [];
    // this.userslist.length = 0;
    const webSocket = this.socket;
    webSocket.emit("active-users-list", { userId: this.currentUser.id });
    webSocket.on("active-users-list", data => {

       // console.log(data);
       this.activeUsers = data.count;
       this.userslist=[];
        
       data.forEach(obj => {
         // console.log(obj);
         // const user=this.userslist.map(x=>x).filter(x=>x.userId===obj.user_id);
         // if(user)
         // {
 
         // }
         // else{
 
                 this.userdata.userId = obj.user_id;
                 this.userdata.userName = obj.user_name;
                 if (obj.avatar) {
                   this.userdata.avatar = obj.avatar;
                 } else {
                   this.userdata.avatar = "assets/images/avatar.png";
                 }
 
                 this.userdata.status = "1";
 
                 this.userslist.push(this.userdata);
 
                 this.userdata = {
                   userId: "",
                   userName: "",
                   avatar: "",
                   status: ""
                 };
 
         // }
         // console.log(user);
       });



      // data.forEach(obj => {
      //   // console.log(this.userslist.some((item) => item.user_id == obj.user_id));
      //   // if (!this.userslist.some((item) => item.user_id == obj.user_id)) {
      //     // this.userslist.push(obj);
      //     // console.log(obj);
      //     this.userdata.userId = obj.user_id;
      //     this.userdata.userName = obj.user_name;
      //     if (obj.avatar) {
      //       this.userdata.avatar = obj.avatar;
      //     } else {
      //       this.userdata.avatar = "assets/images/avatar.png";
      //     }
      //     this.userdata.status = "1";
      //     this.userslist.push(this.userdata);
      //     this.userdata = {
      //       userId: "",
      //       userName: "",
      //       avatar: "",
      //       status: ""
      //     };
    
      //     // console.log( obj.id)
      
     

      // });

     
    });
    
  }



  chatwindow(userInfo) {
    if (
      !document.getElementById(
        `chat-${JSON.parse(localStorage.getItem("currentUser")).id}-${
          userInfo.userId
        }`
      )
    ) {
      const chatParams = {
        from: JSON.parse(localStorage.getItem("currentUser")).first_name,
        fromId: JSON.parse(localStorage.getItem("currentUser")).id,
        to: userInfo.userName,
        toId: userInfo.userId,
        msg: userInfo.msg || null,
        timestamp: userInfo.timestamp || null
      };
      let chatModel = new ChatModel(chatParams);
      this.interaction.setUserInfo(chatModel);
    }
  }

  getMembersList(searchVal) {
    const webSocket = this.socket;
    // const searchVal = event.target.value;
    if (searchVal !== "") {
      this.userslist = [];
      const searchData={
        user_id: this.currentUser.id,
        search: searchVal
      }
      webSocket.emit("usersList", searchData);
      console.log(searchData);
    } else {
      this.getActiveUsersListforUser();
    }

    webSocket.on("usersList", data => {
      // console.log(data);
      this.activeUsers = data.count;
      this.userslist=[];
       
      data.forEach(obj => {
        // console.log(obj);
        // const user=this.userslist.map(x=>x).filter(x=>x.userId===obj.user_id);
        // if(user)
        // {

        // }
        // else{

                this.userdata.userId = obj.user_id;
                this.userdata.userName = obj.user_name;
                if (obj.avatar) {
                  this.userdata.avatar = obj.avatar;
                } else {
                  this.userdata.avatar = "assets/images/avatar.png";
                }

                this.userdata.status = "1";

                this.userslist.push(this.userdata);

                this.userdata = {
                  userId: "",
                  userName: "",
                  avatar: "",
                  status: ""
                };

        // }
        // console.log(user);
      });
    });
  }


}