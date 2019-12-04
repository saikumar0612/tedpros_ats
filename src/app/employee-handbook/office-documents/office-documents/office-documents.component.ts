import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { FileUploader } from 'ng2-file-upload';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'app-office-documents',
  templateUrl: './office-documents.component.html',
  styleUrls: ['./office-documents.component.css']
})
export class OfficeDocumentsComponent implements OnInit {
  documents;
	url: any;
	i9details: any;
	i9Info: any;
	data = [];
	officalDoc = {
		type: {
			id: ''
		},
		title: '',
		doc_type_id: ''
	};
	i9Data: any = {
		comment: '',
		expiryDate: '',
		i9year: '',
		alert: ''
	};
	federaldata;
	length;
	length1;
	length2;
	length3;
	workAuthURL = '';
	i9URL = '';
	dateError;
	dateError1;
	start;
	display: any;
	fw4Info: any;
	alert: any;
	currentUser = JSON.parse(localStorage.getItem('currentUser'));
	userToken: any;
	userPermissions: any;
	headers:any;
	options:any;
	constructor(public http: Http, public service: UserService, private router: Router) {
		this.userToken = this.currentUser.token;
		this.userPermissions = this.currentUser.permission;
		this.i9URL = this.service.getBaseUrl() + '/frontend/officedocuments/';
		//calling functions on load
		this.geti9Docs();
		this.headers = new Headers({ 'Token': this.currentUser.token });
    	this.options = new RequestOptions({ headers: this.headers });
	}
	//get i9 documents list
	geti9Docs() {
		this.service.upload().subscribe(response => {
			this.i9details = response.json().data;
			if (this.i9details) {
				this.length = this.i9details.length;
			}
			// console.log(this.i9details);
		}, error => {
			console.log(error);
		});
	}
	// office document upload start
	public uploader: FileUploader = new FileUploader({
		url: this.service.fileDetail(),
		itemAlias: 'officDoc',
		headers: [{
			name: 'Token',
			value: this.currentUser.token
		}]
	});
	// adddoc(){
	//   this.service.fileDetail()
	// }
	ngOnInit() {
		// office documents
		this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
			form.append('comment', this.officalDoc.title);
			form.append('doc_type_id', this.officalDoc.doc_type_id)
		};
		this.service.getOfficeDocument().subscribe(response => {
			this.documents = response.json().data;
			// console.log(this.documents);
		});
	};
}


