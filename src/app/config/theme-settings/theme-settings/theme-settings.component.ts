import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { Headers, RequestOptions } from '@angular/http';
import { UserService, AuthenticationService } from '../../../core/services';
@Component({
  selector: 'app-theme-settings',
  templateUrl: './theme-settings.component.html',
  styleUrls: ['./theme-settings.component.css']
})
export class ThemeSettingsComponent implements OnInit {
  errorStatus;
  message;
  error
  isShowPopup;
  ThemeForm;
  logoUrl = '';
  faviconUrl = '';

  themeData: any = {};
  colorData: any = {};
  statusCode: {
    code: '',
    message: ''
  }
  loading;
  colors;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  theme = JSON.parse(localStorage.getItem('settings'));
  userToken: any;
  userPermissions: any;
  headers;
  options;
  logodata = {
    client_logo:'',
    client_name:'',
    client_id:''
  }
  file1_input;
  file2_input;
  files : FileList;
  fileName:boolean = false;
  companyData = {
    logo:'',
    favicon:''
  }

  constructor(private http: Http, private router: Router, public service: UserService, private authenticationService: AuthenticationService,) { }

  ngOnInit() {
    this.file1_input = this.authenticationService.getBaseUrl() + '/frontend/logos/' + this.theme.data.siteLogo;
    this.file2_input = this.authenticationService.getBaseUrl() + '/frontend/logos/' + this.theme.data.siteFav;
    this.userToken = this.currentUser.token;
    this.userPermissions = this.currentUser.permission;
    this.loading = true;
    this.service.getColor()
      .subscribe(response => {
        this.colors = response.json().data;
        this.loading = false;
        });
    this.headers = new Headers({ 'Token': this.currentUser.token });
    this.options = new RequestOptions({ headers: this.headers });
  }


  //file upload start
  public uploader: FileUploader = new FileUploader({
    url: this.service.getUploadImg(),
    itemAlias: 'siteLogo',
    headers: [{ name: 'Token', value: this.currentUser.token }]
  });
  public uploader1: FileUploader = new FileUploader({
    url: this.service.getUploadImg(),
    itemAlias: 'siteFav',
    headers: [{ name: 'Token', value: this.currentUser.token }]
  });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  // file upload end

  // edit color
  addColor() {
    // console.log(this.themeData);
    this.service.addTheameColor(this.themeData)
      .subscribe(response => {
        const result = response.json();
        this.colorData = response.json().statusCode;
        if (this.colorData.code === '200') {
          this.error = '';
          this.message = result.data;
          this.loading = false;
          this.isShowPopup = true;
        } else if (result.statusCode.code === '401') {
          this.errorStatus = result.errorMessages;
          this.loading = false;
          this.isShowPopup = true;
        }
      });
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }

  // done changes to update company logo on tedpros jobportal - sharmistha - 11-04-2019
  closemodal(){
    this.logodata = {
      client_logo:this.theme.data.siteLogo,
      client_name:this.theme.data.title,
      client_id:this.theme.data.companyId
    }
    // console.log(this.logodata);
    this.service.updateCompanyLogo(this.logodata)
    .subscribe(response => {
      const result = response.json();
      // console.log(result);
      if (result.statusCode.code === '200') {
        window.location.reload();
      }
    })
  }
  // done changes to update company logo on tedpros jobportal - sharmistha - 11-04-2019
  close(){
    window.location.reload();
  }

  // done changes capture file select event - sharmistha - 11-04-2019
  getFiles(event){ 
    this.files = event.target.files; 
    if(this.files.length != 0){
      this.fileName = true;
    }
    else{
      this.fileName = false;
    }
  }
  // done changes capture file select event - sharmistha - 11-04-2019

}
