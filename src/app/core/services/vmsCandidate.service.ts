import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class VmsCandidateService {
    header:any;
    details: any; 
    candidateUser = JSON.parse(localStorage.getItem('candidateUserData'));
    candidateToken:string = this.candidateUser ? this.candidateUser.token: '';
    url: any;
    restUrl: any;
    superAdminUrl: any;
    super = 'http://frontend.tedpros.com';
    constructor(private http: Http, private router: Router) {
        // this.checkTokenValidity();
        this.header = new Headers({ 'Token': this.candidateToken });
        this.details = new RequestOptions({ headers: this.header });
        this.url = environment.apiUrl;
        this.restUrl = environment.apiUrl; // + '/index.php';
        this.superAdminUrl = environment.superUrl;
    }

    checkTokenValidity() {
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired(this.candidateToken);
        if (isExpired) {
            localStorage.setItem('candidateUserData', '');
            localStorage.clear();
            localStorage.setItem('Token', 'expired');
            console.log(isExpired);
            this.router.navigate(['vms/candidatelogin']);
        }
    }
 
    // get candidate data
//  changes in edit resume apis start -- suresh--
    editCandidateExperence(experienceData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/editCandidateExperience', experienceData, this.details).pipe(map(data => data));
    }

    editCandidateEducation(educationData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/editCandidateEducation', educationData, this.details).pipe(map(data => data));
    }

    editCandidateSkills(skillData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/editCandidateSkills', skillData, this.details).pipe(map(data => data));
    }

    editCandidateSummary(summaryData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/editCandidateSummary', summaryData, this.details).pipe(map(data => data));
    }

    uploadCandidate(candidateData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/candidatePic/', candidateData, this.details)
            .pipe(map(data => data));
    }

    getCountries() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/country/', this.details)
            .pipe(map(data => data));
    }

    getAddress(zip) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/zipCode?zip=' + zip, this.details)
            .pipe(map(data => data));
    }

    getStates(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/state/?id=' + id, this.details)
            .pipe(map(data => data));
    }

    getCities(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/city/?id=' + id, this.details)
            .pipe(map(data => data));
    }

    checkEmail(email){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/checkEmail?id=' + email, this.details)
            .pipe(map(data => data));
    }

    addCandidateExperence(experienceData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/addCandidateExperience', experienceData, this.details).pipe(map(data => data));
    }
    addCandidateEducation(educationData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/addCandidateEducation', educationData, this.details).pipe(map(data => data));
    }

    addCandidateSkills(skillData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/addCandidateSkills', skillData, this.details).pipe(map(data => data));
    }

    addCandidateSummary(summaryData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/addCandidateSummary', summaryData, this.details).pipe(map(data => data));
    }

// changes in edit resume apis end -- suresh --
    getCandidatePersonal(id){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/getCandidatePersonal?id='+id , this.details)
            .pipe(map(data => data));
    }

    getcandidateData(id){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/getCandidateData?id='+id , this.details)
            .pipe(map(data => data));
       }

    editCandidate(personalData){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/editCandidate',personalData , this.details)
            .pipe(map(data => data));
    }

    // get candidate full details
    getCandidateDetails(id){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/getCandidateDetails?id='+id , this.details)
            .pipe(map(data => data));
    }

    getJobList(){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/matchingJobs' , this.details)
        .pipe(map(data => data));
    }

    getJobDetails(id){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/jobDetails?id='+id , this.details)
        .pipe(map(data => data));
    }

    jobApply(userdata){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/applyJob',userdata , this.details)
        .pipe(map(data => data));
    }

    updateCandidate(editData){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/updateCandidate',editData , this.details)
        .pipe(map(data => data));
    }

    // adding wishlish APi
    // --suresh 08-02-2019 start --
    addWishList(wishData){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/addWishList',wishData , this.details)
        .pipe(map(data => data));

    }

    getWishList(id){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/getWishList?Id='+id , this.details)
        .pipe(map(data => data));
    }

    deletewish(deleteData){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/deletewish',deleteData , this.details)
        .pipe(map(data => data));
    }

     // adding suresh --09-06-2019 start
     addCandidateConsent(consentData){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/addCandidateConsents', consentData, this.details).pipe(map(data => data));
    }

    editCandidateConsent(consentData){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/editCandidateConsent', consentData, this.details).pipe(map(data => data));
    }
     // adding suresh --09-06-2019 end

    // addRegister(candidateData){
    //     return this.http.post(this.restUrl + '/vms/candidateReg', candidateData).pipe(map(data => data));
    // }
    // checkRegisterEmail(email){
    //     return this.http.get(this.restUrl + '/vms/checkEmail?email=' + email)
    //         .pipe(map(data => data));
    // }

    // --suresh 08-02-2019 end --
    // adding pay frequency api 08-14-2019 start

    getPayFrequency() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/employeemanagement/payFrequency/', this.details)
            .pipe(map(data => data));
    }

    // adding pay frequency api 08-14-2019 start

//   saikumar 05/09/2019 started here
    getSkills() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/skills', this.details)
            .pipe(map(data => data));
    }
    
//   saikumar 05/09/2019 ended here

    // saikumar 07/09/2019 stated here
    postskills(cusData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/addskill', cusData, this.details).pipe(map(data => data));
    }

    // saikumar  07/09/219 ended here


    // added suresh 09-16-2019 start 
    getAppliedJobs(){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/getAppliedJobs', this.details)
            .pipe(map(data => data));
    }
    // added suresh 09-16-2019 end

    // added suresh 09-16-2019 start 
    getShortlistJobs(){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/getshortListData', this.details)
            .pipe(map(data => data));
    }    
    // added suresh 09-16-2019 end

    // added suresh 09-23-2019 start
    getskillTrends(){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/getskillData', this.details)
            .pipe(map(data => data));
    }
    // added suresh 09-23-2019 start 


    addSignature(data) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/addDigitalkey', data, this.details)
            .pipe(map(data => data));
    }

    // getDigitalKeyById(userId) {
    //     this.checkTokenValidity();
    //     return this.http.get(this.restUrl + '/vms/getDigitalkeyByUserId/?id=' + userId, this.details)
    //         .pipe(map(data => data));
    // }

    getDigitalKey() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/getDigitalkeyOfUser', this.details)
            .pipe(map(data => data));
    }

    pdfSave(data){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/pdfexample/sendConsentDoc',data ,this.details)
            .pipe(map(data => data));
    }
    getCalendarEventsCandidate() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/getCalendarEventsCandidate', this.details)
            .pipe(map(data => data));
    }

    // added by sharmistha - start - 10-23-2019
    getAssignedDocument(jobId,docId){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/getAssignedDocument?jobId='+jobId+'&docId='+docId, this.details)
            .pipe(map(data => data));
    }

    getDigitalKeyOfRecruiter(recId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/getDigitalkeyOfRecruiter?id='+recId, this.details)
            .pipe(map(data => data));
    }

    
      // added suresh 10-28-2019 start
      uploadResume() {
        this.checkTokenValidity();
        return this.restUrl + '/upload/uploadCanResumes';
    }

    getBaseUrl() {
        this.checkTokenValidity();
        return this.url;
    }

    getCandidateResume(id){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/getCandidateResume?id='+id, this.details).pipe(map(data => data));
    }

    deleteCandidateResume(data){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/deleteCandidateResume',  data, this.details).pipe(map(data => data));
    }

    // added suresh 10-28-2019 end

    jobstatusCounts(){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/getshortListDataCount', this.details).pipe(map(data => data));
    }

    changeCandidatePassword(data){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/changeCandidatePassword',  data, this.details).pipe(map(data => data));
    }

    getWorkAuth() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/workauth', this.details).pipe(map(data => data));
    }

    candidatesSettings(data){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/candidatesSettings',  data, this.details).pipe(map(data => data));
    }

    addCoverletter(data){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/addCoverletter', data, this.details).pipe(map(data => data));
    }

    getCoverLetters(){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/getCoverLetters', this.details).pipe(map(data => data));
    }

    getCanAccountDetails(){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/getCanAccountDetails', this.details).pipe(map(data => data));
    }

    getCoverLettersById(id){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/getCoverLettersById?id='+id, this.details).pipe(map(data => data));
    }

    deleteCandidateCoverLetter(data){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/deleteCandidateCoverLetter', data, this.details).pipe(map(data => data));
    }

    changeCandidateEmail(data){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/changeCandidateEmail', data, this.details).pipe(map(data => data));
    }

    uploadCanDoc() {
        this.checkTokenValidity();
        return this.restUrl + '/upload/uploadCanDoc';
    }

    getCandidateDocuments(){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/vms/getCandidateDocuments', this.details).pipe(map(data => data));
    }

    deleteCandidateDocument(data){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/deleteCandidateDocument', data, this.details).pipe(map(data => data));
    }

    updateNotificationStatus(data){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/updateNotificationStatus', data, this.details).pipe(map(data => data));
    }


}