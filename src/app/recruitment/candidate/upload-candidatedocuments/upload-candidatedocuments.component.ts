import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-upload-candidatedocuments',
  templateUrl: './upload-candidatedocuments.component.html',
  styleUrls: ['./upload-candidatedocuments.component.css']
})
export class UploadCandidatedocumentsComponent implements OnInit {
  documentData:any = {
    title:'',
    comment:'',
    fileData:'',
    type:'',
    expiryDate:''
  };
  uploader: any;
  candidateId:any;
  currentUser:any;
  files : FileList;
  fileName:boolean = false;
  documents;
  documentUrl;
  deletedItems:any = {};
  deletedocData:any;
  docErrorMessage:any;
  docMessage:any;
  start;
  dateError;
  expiryDate;
  constructor(private service:UserService, private route: ActivatedRoute,) { }

   // validate expiry date
   dateValidate() {
    this.start = new Date(Date.now());
    
    if (this.documentData.expiryDate < this.start) {
      this.dateError = 'Please select a valid expiry date';
    }
    else {
      this.dateError = "";
    }
  }

  ngOnInit() {
    this.documentUrl = this.service.getBaseUrl() + '/frontend/candidate_docs/';
    console.log(this.documentUrl);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.route.paramMap.subscribe(
      param => {
        this.candidateId = param.get('id');
      }
    );
    this.uploader = new FileUploader({
      url: this.service.uploadCanDoc(),
      itemAlias: 'document',
      parametersBeforeFiles: true,
      headers: [{ name: 'Token', value: this.currentUser.token }]
    });
    // this.documentData.expiryDate = new DatePipe('en-US').transform(this.documentData.expiryDate, 'MM/dd/yyyy');

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('candidateId', this.candidateId); 
      form.append('title', this.documentData.title); 
      form.append('type', this.documentData.type);     
      if (this.documentData.expiryDate) {
        this.expiryDate = new Date(this.documentData.expiryDate);
      }
      else {
        this.expiryDate = "0000-00-00";
      }  
      form.append('comment', this.documentData.comment); 
      form.append('expiryDate', this.expiryDate); 
    };
     // handle response for file upload - start
     this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
     this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
     // handle response for file upload - end
    this.getDocuments();
  }

  // handle response for file upload - start
  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let data = JSON.parse(response); //success server response
    // console.log(data);
    if(data.statusCode.code === "200"){
      this.docErrorMessage = "";
      this.docMessage = "Document uploaded successfully!";
    }
    else{
      this.docMessage = "";
      this.docErrorMessage = data.errorMessages;
    }    
  }

  

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let error = JSON.parse(response); //error server response
    // console.log(error);
    this.docErrorMessage = error;
  }
  // handle response for file upload - end

  getFiles(event:any){ 
    this.files = event.target.files; 
    if(this.files.length != 0){
      this.fileName = true;
    }
    else{
      this.fileName = false;
    }
  }

  close(uploadFrm:NgForm){
    this.documentData.fileData = '';
    uploadFrm.resetForm();
    // this.addDoc = false;
    this.getDocuments();
  }

  getDocuments(){
    this.service.getCandidateDocuments(this.candidateId).subscribe(res=>{
      this.documents = res.json().data;
      console.log(this.documents)
    })
  }

  deleteDoc(id){
    console.log(id)
    this.deletedItems.docId = id;
    this.service.deleteCandidateDocument(this.deletedItems).subscribe(res=>{
      this.deletedocData = res.json();
      if(this.deletedocData.statusCode.code === '200'){
        this.getDocuments();
      }
    });
  }

}
