
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

// import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class SupervalidateService {
    headers: any;
    options: any;
    currentUser = JSON.parse(localStorage.getItem('superUser'));
    userToken: string = this.currentUser.token;
    url: any;
    super = 'http://frontend.tedpros.com';
    constructor(private http: Http, private router: Router) {
        // console.log(this.userToken);
        this.headers = new Headers({ 'Authorization': 'Bearer '+this.userToken });
        this.options = new RequestOptions({ headers: this.headers });
        this.url = environment.superUrl;
    }
    getcustData(email)
    {
      console.log(email);
      return this.http.post(this.url + '/customerinformation/customer', {'email':email}, this.options)
      .pipe(map(data => data));
    }
    getcustplans(email)
    {
      return this.http.post(this.url + '/customerinformation/getcustomerplan', {'email':email}, this.options)
      .pipe(map(data => data));
    }

    getcustInvoice(email)
    {
      return this.http.post(this.url + '/customerinformation/getcustomerpendinginvoice', {'email':email}, this.options)
      .pipe(map(data => data));
    }
 
    getcustInvoicePaid(email)
    {
      return this.http.post(this.url + '/customerinformation/getcustomerpaidinvoice', {'email':email}, this.options)
      .pipe(map(data => data));
    }
    
   

    
  }
