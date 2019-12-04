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
  selector: 'app-edit-prerequisite-doc',
  templateUrl: './edit-prerequisite-doc.component.html',
  styleUrls: ['./edit-prerequisite-doc.component.css']
})
export class EditPrerequisiteDocComponent implements OnInit {

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
    this.getPrerequisiteDocById();

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
                '{{Recruiter_First_Name}}',"Recruiter First Name"
              );
              this.add(
                '{{Recruiter_Last_Name}}',"Recruiter Last Name"
              );
              this.add(
                '{{Recruiter_Middle_Name}}',"Recruiter Middle Name"
              );
              this.add(
                '{{Candidate_First_Name}}',"Candidate First Name"
              );
              this.add(
                '{{Candidate_Last_Name}}',"Candidate Last Name"
              );
              this.add(
                '{{Company_Name}}',"Company Name"
              );
              this.add(
                '{{Client_Name}}',"Client Name"
              );
              this.add(
                '{{Job_Title}}',"Job Title"
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

  getPrerequisiteDocById(){
    this.loading = true;
    this.service.getPrerequisiteDocById(this.typeId)
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

  editPrerequisiteDoc(){    
    this.loading = true;
    this.service.editPrerequisiteDoc(this.data)
    .subscribe(response => {
      this.templateData = response.json();
      this.loading = false;
      if(response.json().statusCode.code === "200"){
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
