import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from './../../../core/services/user.service';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
declare var CKEDITOR: any;

@Component({
  selector: 'app-add-offerletter-type',
  templateUrl: './add-offerletter-type.component.html',
  styleUrls: ['./add-offerletter-type.component.css']
})
export class AddOfferletterTypeComponent implements OnInit {

  typeId:any;
  data = {
    id:'',
    type:'',
    template:''
  }
  result:any;
  templateData:any;
  error;
  successPopup:boolean = false;
  errorPopup:boolean = false;
  successMsg;
  errorMsg;
  config: any;
  loading:boolean = false;

  constructor(public http: Http, private route: ActivatedRoute, public location: Location, private sanitizer: DomSanitizer,public service :UserService , public authenticationService:AuthenticationService, private router: Router) { }

  ngOnInit() {

    this.config = {
      uiColor: '#d9e4fb',
      on: {
        pluginsLoaded: function() {
          const editor = this,
            config = editor.config;

          editor.ui.addRichCombo('my-combo', {
            label: 'Custom Fields',
            title: 'Custom Fields',
            toolbar: 'basicstyles,0',
            panel: {
              css: [CKEDITOR.skin.getPath('editor')].concat(config.contentsCss),
              multiSelect: false,
              attributes: { 
                'aria-label': 'Custom Fields'
              }
            },
            init: function() {
              this.add(
                '{{User_First_Name}}',"User First Name"
              );
              this.add(
                '{{User_Last_Name}}',"User Last Name"
              );
              this.add(
                '{{User_Middle_Name}}',"User Middle Name"
              );
              this.add(
                '{{User_Job_Title}}',"User Job Title"
              );
              this.add(
                '{{User_Job_Department}}',"User Job Department"
              );
              this.add(
                '{{User_Salary}}',"User Salary"
              );
              this.add(
                '{{User_Pay_Frequency}}',"User Pay Frequency"
              );
            },
            onClick: function(value) {
              editor.focus();
              editor.fire('saveSnapshot');
              editor.insertHtml(value);
              editor.fire('saveSnapshot');
            }
          });
        }
      },
      resize_enabled: true,
    };
  }

  addTemplate(){    
    this.loading = true;
    this.service.addOfferLetterType(this.data)
    .subscribe(response => {
      this.templateData = response.json();
      this.loading = false;
      if(this.templateData.statusCode.code === "200"){
        this.successPopup = true;
        this.successMsg = this.templateData.data;
      }
      else{
        this.errorPopup = true;
        this.errorMsg = this.templateData.errorMessages;
      }
    })
  }

  reset(addJobFrm:NgForm){
    addJobFrm.resetForm();
  }

  close(){
    this.successPopup = false;
    this.errorPopup = false;
  }

  cancel(){
    this.location.back();
  }

}
