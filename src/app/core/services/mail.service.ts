import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class MailService {
  baseUrl = '';
  headers: any;
  options: any;
  constructor(private http: Http, private router: Router) {
    this.baseUrl = 'http://162.254.209.129/phpListAcc/lists';
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://162.254.209.129:4204');
    this.headers.append('Access-Control-Allow-Credentials', 'true');
    this.options = new RequestOptions({ headers: this.headers });
  }

  genToken(username: string, pwd: string) {

    return this.http.post(this.baseUrl + '/api/v2/sessions', { login_name: username, password: pwd }, this.options)
      .pipe(map(user => {
        const response = user.json();
        localStorage.setItem('phpListToken', response.key);
        return user;
      }));
  }

  addSubscriber(emailId) {

    console.log(localStorage.getItem('phpListToken'));
    const token = localStorage.getItem('phpListToken');
    const encodedData = window.btoa('PHPList:' + token);
    console.log(encodedData);
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://162.254.209.129:4204');
    this.headers.append('Access-Control-Allow-Credentials', 'true');
    this.headers.append('authentication', 'Basic ' + encodedData);
    this.options = new RequestOptions({ headers: this.headers });
    const emailData = {
      email: emailId,
      confirmed: true,
      blacklisted: true,
      html_email: false,
      disabled: true
    };
    return this.http.post(this.baseUrl + '/api/v2/subscribers', emailData, this.options)
      .pipe(map(responese => {
        //   mock responese 
        //   {
        //     "creation_date": "2019-11-04T04:50:06-05:00",
        //     "email": "amar.basolutions@gmail.com",
        //     "confirmed": true,
        //     "blacklisted": true,
        //     "bounce_count": 0,
        //     "unique_id": "fc938ee08aaf96682ce73dd23af028c1",
        //     "html_email": false,
        //     "disabled": true,
        //     "extra_data": "",
        //     "id": 3
        //   }
        return responese;
      }));
  }

  getListInfo(id) {
    const token = localStorage.getItem('phpListToken');
    const encodedData = window.btoa('PHPList:' + token);
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('authentication', 'Basic ' + encodedData);
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.baseUrl + '/api/v2/lists/' + id, this.options)
      .pipe(map(responese => {
        //   mock responese 
        // {
        //   "name": "newsletter",
        //   "description": "Sign up to our newsletter",
        //   "creation_date": "2019-09-19T14:40:12-04:00",
        //   "public": true,
        //   "category": "",
        //   "id": 2
        // }
        return responese;
      }));
  }

  getMembers(id) {
    const token = localStorage.getItem('phpListToken');
    const encodedData = window.btoa('PHPList:' + token);
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('authentication', 'Basic ' + encodedData);
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.baseUrl + '/api/v2/lists/' + id + '/members', this.options)
      .pipe(map(responese => {
        //   mock responese 
        //   [
        //     {
        //         "creation_date": "2019-09-19T14:40:12-04:00",
        //         "email": "no-reply@tedpros.com",
        //         "confirmed": true,
        //         "blacklisted": false,
        //         "bounce_count": 0,
        //         "unique_id": "bde88ffe31bf7cd413f8101450fb0177",
        //         "html_email": true,
        //         "disabled": false,
        //         "id": 1
        //     },
        //     {
        //         "creation_date": "2019-10-07T02:18:34-04:00",
        //         "email": "pavan.basolutions@gmail.com",
        //         "confirmed": true,
        //         "blacklisted": false,
        //         "bounce_count": 0,
        //         "unique_id": "be1ff4ee2c4c64f1d2a93b35bf4ef709",
        //         "html_email": true,
        //         "disabled": false,
        //         "id": 2
        //     }
        // ]
        return responese;
      }));
  }
}
