import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    header: any;
    details: any;
    // super = 'https://tedpros.com/jobportal/user/vmscandidateRegister';
    super = environment.jobPortalUrl + 'user/vmscandidateRegister';
    url = environment.apiUrl + '/user/login';
    url1 = environment.apiUrl + '/user/forget';
    url2 = environment.apiUrl + '/user/reset';
    url3 = environment.apiUrl + '/config/getTheme';
    url4 = environment.apiUrl + '/vms/loginCandidate';
    url5 = environment.apiUrl + '/vms/forgotpassword';
    url6 = environment.apiUrl + '/vms/activationCandidateLogin';
    url7 = environment.apiUrl + '/vms/sendMail';
    url8 = environment.apiUrl + '/user/validateToken';
    constructor(private http: HttpClient, private https: Http, private router: Router) { }

    getTheme() {
        return this.http.get(this.url3)
            .pipe(map(res => {
                localStorage.setItem('settings', JSON.stringify(res));
                return res;
            }));
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.url, { 'id': username, 'password': password })
            .pipe(map(user => {
                // console.log(user);
                // login successful if there's a jwt token in the response
                if (user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

    forget(email: string) {
        // console.log(this.url1);
        return this.http.post<any>(this.url1, { 'id': email })
            .pipe(map(user => {
                return user;
            }));
    }



    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('settings');
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', '');
        localStorage.removeItem('applyJobId');
        localStorage.clear();
        // window.location.reload();
        this.router.navigate(['/authorization/login']).then(() => {
            window.location.reload();
        });
    }

    cancel(pageid: string) {
        this.router.navigate([pageid]);
    }

    reset(username: string, password: string) {
        // console.log(this.url1);
        return this.http.post<any>(this.url2, { 'id': username, 'password': password })
            .pipe(map(user => {
                return user;
            }));
    }
    getBaseUrl() {
        return environment.apiUrl;
    }


    //vms candidate job apply process - suresh - 08-07-2019 - start   

    candidatelogin(username: string, password: string) {
        return this.http.post<any>(this.url4, { 'id': username, 'password': password })
            .pipe(map(candidate => {
                if (candidate.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('candidateUserData', JSON.stringify(candidate));
                }
                return candidate;
            }));
    }

    candidateactivationlogin(username: string, password: string) {
        return this.http.post<any>(this.url6, { 'id': username, 'password': password })
            .pipe(map(candidateData => {
                // console.log(user);
                // login successful if there's a jwt token in the response
                if (candidateData.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('candidateUserData', JSON.stringify(candidateData));
                }
                return candidateData;
            }));
    }

    candidateForgetPassword(emailId) {
        return this.http.post<any>(this.url5, { 'email': emailId })
            .pipe(map(candidateUser => {
                return candidateUser;
            }));
    };


    candidatelogout() {
        // remove user from local storage to log user out
        localStorage.removeItem('candidateUserData');
        localStorage.removeItem('settings');
        localStorage.setItem('candidateUserData', '');
        localStorage.clear();
        this.router.navigate(['/vms/candidate-login-register']).then(() => {
            window.location.reload();
        });

    }
    //vms candidate job apply process - suresh - 08-07-2019 - start

    // adding creating candidate api 08-19-2019 start
    createCandidate(token) {

        this.header = new Headers({ 'Token': token });
        this.details = new RequestOptions({ headers: this.header });
        return this.https.get(environment.apiUrl + '/vms/create', this.details)
            .pipe(map(data => data));
    }
    // adding creating candidate api 08-19-2019 end

    // resend activatioin mail start 
    resendLink(emailId) {

        console.log(emailId);
        return this.http.post<any>(this.url7, { 'email': emailId })
            .pipe(map(candidateUser => {
                return candidateUser;
            }));
    }
    // resend activation mail end

    addRegister(candidateData) {
        return this.https.post(environment.apiUrl + '/vms/candidateReg', candidateData).pipe(map(data => data));
    }

    checkRegisterEmail(email) {

        return this.https.get(environment.apiUrl + '/vms/checkEmail?email=' + email)
            .pipe(map(data => data));
    }

    candidateRegister(data) {
        return this.https.post(this.super, data).pipe(map(data => data));
    }

    getJobListData() {
        return this.https.get(environment.apiUrl + '/vms/getPostedJobs', this.details)
            .pipe(map(data => data));
    }

    // added candidate reset password by suresh 09-26-2019 start
    candidateResetPassword(data) {
        return this.https.post(environment.apiUrl + '/vms/candidateResetPassword', data, this.details)
            .pipe(map(data => data));
    }
    // added candidate reset password by suresh 09-26-2019 end

    //added By Ravi for chat mearged

    isUserLoggedIn() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userToken: string = currentUser ? currentUser.token : '';
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired(userToken);
        return !isExpired;
    }

    getJobDetail(id) {
        return this.https.get(environment.apiUrl + '/vms/jobDetail?id=' + id, this.details)
            .pipe(map(data => data));
    }
    // added by ravi for chat mearge
    validateToken(token) {
        this.header = new Headers({ 'Token': token });
        this.details = new RequestOptions({ headers: this.header });
        console.log(this.details);
        return this.https.get(this.url8 + '?token=' + token).pipe(map(data => data));
    }
    getTimesheetDetails(token) {
        this.header = new Headers({ 'Token': token });
        this.details = new RequestOptions({ headers: this.header });
        console.log(this.details);
        return this.https.get(environment.apiUrl + '/timesheet/getTimesheetDetials?token=' + token).pipe(map(data => data));
    }
}
