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
  selector: 'app-add-offer-letter-template',
  templateUrl: './add-offer-letter-template.component.html',
  styleUrls: ['./add-offer-letter-template.component.css']
})
export class AddOfferLetterTemplateComponent implements OnInit {

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
    this.route.params.subscribe(res=>{
      this.typeId = res.id;
    });
    this.getOfferLetterById();

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

  getOfferLetterById(){
    this.loading = true;
    this.service.getOfferLetterById(this.typeId)
    .subscribe(res => {
      this.result = res.json();
      if(this.result.statusCode.code === "200"){
        this.loading = false;
        if(this.result.data){
          // console.log(this.result);
          this.data = this.result.data;
        }
      }
      else{
        this.error = this.result.errorMessages;
      }
    })
  }

  addTemplate(){    
    this.loading = true;
    this.service.addOfferLetterTemplate(this.data)
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

  close(){
    this.successPopup = false;
    this.errorPopup = false;
  }

  cancel(){
    this.location.back();
  }

}
