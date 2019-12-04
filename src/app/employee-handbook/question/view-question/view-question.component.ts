import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { UserService} from './../../../core/services/user.service';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {
  typeId; 
  document = {
    id:'',
    type:'',
    template:''
  };
  loading:boolean=false;

  constructor(public http: Http,public location : Location ,private sanitizer: DomSanitizer,public service :UserService , public authenticationService:AuthenticationService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.typeId = param.get('id');
      }
    );

    this.viewDocument();
  }

  viewDocument(){
    this.loading = true;
    this.service.getQuestionById(this.typeId)
      .subscribe(res => {
      this.document = res.json().data[0];
      this.loading = false;
      console.log(this.document);
    });
  }

  back(){
    this.location.back();
  }

}

