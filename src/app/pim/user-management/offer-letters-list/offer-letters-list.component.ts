import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from './../../../core/services/user.service';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-offer-letters-list',
  templateUrl: './offer-letters-list.component.html',
  styleUrls: ['./offer-letters-list.component.css']
})
export class OfferLettersListComponent implements OnInit {

  filterData=[];
  data = {
    content:''
  };
  types = {
    offerLetters:[],
    userId:'',
    firstName:'',
    lastName:''
  };
  availableRecords = 0;
  url;
  deleteId:any;
  userId:any;
  message:any;
  displayDelete:boolean=false;
  displayEdit:boolean=false;
  displayAdd:boolean=false;
  deletePopup:boolean=false;
  isConfirm:boolean=false;
  isSuccess:boolean=false;
  loading:boolean=false;
  deletedata:any = {};

  constructor(public http: Http,public location : Location ,private sanitizer: DomSanitizer,public service :UserService , public authenticationService:AuthenticationService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.userId = param.get('id');
      }
    );
    this.getUserOfferLetters(this.userId);
  }

  getUserOfferLetters(userId){
    this.loading = true;
    this.service.getUserOfferLetters(userId).subscribe(res => {
      this.types = res.json().data;
      this.filterData = this.types.offerLetters;
      this.loading = false;
      if(this.filterData){
        this.availableRecords = this.filterData.length;
      }
      this.filterData.forEach(obj => {
        if((obj.offerLetterTemplate != null)&&(obj.status != null)){
          if(obj.status === "1"){
            obj.displayEdit = true;
            obj.displayDelete = false;
            obj.displayAdd = false;
          }
          else if(obj.status === "2"){
            obj.displayDelete = true;
            obj.displayEdit = false;
            obj.displayAdd = false;
          }
        }
        else if((obj.offerLetterTemplate === null) && (obj.status === null)){
          obj.displayAdd = true;
          obj.displayEdit = false;
          obj.displayDelete = false;
        }
      });
    })
  }

  addOfferLetter(typeId){
    this.router.navigate(['/usersView/add-offerLetter',this.userId,typeId]);
  }

  editOfferLetter(typeId){
    this.router.navigate(['/usersView/edit-offerLetter', this.userId,typeId]);
  }

  viewTemplate(typeId){
    this.router.navigate(['/usersView/view-offerLetter', this.userId,typeId]);
  }

  deleteTemplate(typeId){
    this.deleteId = typeId;
    this.deletePopup = true;
    this.isConfirm = true;
  }

  closePopup(){
    this.deletePopup = false;
    this.getUserOfferLetters(this.userId);
  }

  delete(deleteId, userId){
    this.service.deleteUserOfferLetter(userId,deleteId).subscribe(res => {
      this.deletedata = res.json();
      if(this.deletedata.statusCode.code === "200"){
        this.isConfirm = false;
        this.isSuccess = true;
        this.message = this.deletedata.data;
      }
      else{
        this.isConfirm = false;
        this.isSuccess = true;
        this.message = this.deletedata.errorMessages;
      }
    })
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.types.offerLetters;
    } else {

      if (key === 'name') {
        this.filterData = this.types.offerLetters.filter(x =>
          x.offerLetterName.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

}
