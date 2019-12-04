import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-personal-settings',
  templateUrl: './personal-settings.component.html',
  styleUrls: ['./personal-settings.component.css']
})
export class PersonalSettingsComponent implements OnInit {

  alert={
    license:'',
    certificate:''
  };
  alertData={
    license:'',
    certificate:''
  };
  data;
  isSuccess=false;
  isFailure=false;
  headers: any;
  options: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userToken: string = this.currentUser.token;

  constructor(private http: Http, private router: Router, public service: UserService, private eventEmitterService: EventEmitterService) {
    this.headers = new Headers({ 'Token': this.userToken });
    this.options = new RequestOptions({ headers: this.headers });
  }

  ngOnInit() {
    // get user selection start
    // this.http.get('http://localhost/tedpros_services/notification/getSelection', this.options)
    this.service.getSelection()
    .subscribe(response => {
      this.alert = response.json().data;
      // console.log(this.alert);
      if(this.alert != null){
        this.alertData.license = this.alert.license;
        this.alertData.certificate = this.alert.certificate;
      }
      else{
        this.alertData.license = "";
        this.alertData.certificate = ""
      }
    },
    error => {
      console.log(error);
    })
    //get user selection end
  }

  addAlert() {
    //post user selection start
    console.log(this.alertData);
    this.service.addSelection(this.alertData)
    // this.http.post('http://localhost/tedpros_services/notification/addSelection', this.alert, this.options)
    .subscribe(response => {
      this.data = response.json();      
      if (this.data.statusCode.code == "200") {
        this.isSuccess = true;
      }
      else {
        console.log(this.data.errorMessages);
        this.isFailure = true;
      }
    },
    error => {
      console.log(error);
    })
    //post user selection end
  }

  closePopup() {
    // this.isFailure = !this.isFailure;
  }

  close(route) {
    this.isSuccess = !this.isSuccess;
    this.eventEmitterService.onUserAlertRefresh();
    // window.location.reload();
  }

}
