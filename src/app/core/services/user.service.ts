import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable} from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService {

    headers: any;
    options: any;
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    userToken: string = this.currentUser ? this.currentUser.token : '';
    url: any;
    restUrl: any;
    superAdminUrl: any;
    jobportalUrl: any;
    super = 'https://tedpros.com/jobportal';
    constructor(private http: Http, private router: Router) {
        this.checkTokenValidity();

        this.headers = new Headers({ 'Token': this.userToken });
        this.options = new RequestOptions({ headers: this.headers });
        this.url = environment.apiUrl;
        this.restUrl = environment.apiUrl; // + '/index.php';
        this.superAdminUrl = environment.superUrl;
        this.jobportalUrl = environment.jobPortalUrl;
    }

    checkTokenValidity() {
        const helper = new JwtHelperService();
        // console.log('JWT Token');
        // console.log(helper.decodeToken(this.userToken));
        const isExpired = helper.isTokenExpired(this.userToken);
        if (isExpired) {
            localStorage.setItem('currentUser', '');
            localStorage.clear();
            localStorage.removeItem('applyJobId');
            localStorage.setItem('Token', 'expired');
            console.log(isExpired);
            this.router.navigate(['authorization/login']).then(() => {
                window.location.reload();
            });
        } else {
            this.getUpdatedToken();
        }
    }

    getUpdatedToken() {
        return this.http.post(this.restUrl + '/config/updateToken', this.options).pipe(map(tokenData => {
            const data = tokenData.json();
            if (data.data) {
                this.currentUser.token = data.data;
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            }
        }));
    }

    // increse plan api

    increasePlan(maildata) {
        this.checkTokenValidity();
        return this.http.post(this.superAdminUrl + '/increaseLicenceRequest', maildata, this.options).pipe(map(data => data));
    }

    checkAccessToken(data) {
        this.checkTokenValidity();
        return this.http.post(this.superAdminUrl + '/checkAccessToken', data, this.options).pipe(map(data => data));

    }
    // users service calls block

    getBaseUrl() {
        this.checkTokenValidity();
        return this.url;
    }

    getAlphaNumPattern() {
        const pattern = '^[a-zA-Z0-9.,&*()_\-\s]+$';
        return pattern;
    }

    addUsers(userdata) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/user/add/', userdata, this.options)
            .pipe(map(data => data));
    }

    editUsers(userdata) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/user/update/', userdata, this.options)
            .pipe(map(data => data));
    }

    getUserInfo(userId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/user/info?id=' + userId, this.options)
            .pipe(map(data => data));
    }
    getUsersInfo(userId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/userInfo?id=' + userId, this.options)
            .pipe(map(data => data));
    }

    getUsers() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/user/all/', this.options)
            .pipe(map(data => data));
    }

    getAllUsers() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/user/allDetails/', this.options)
            .pipe(map(data => data));
    }

    getUsersList() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/user/allUsers/', this.options)
            .pipe(map(data => data));
    }

    getApproversList(companyId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/user/approverList?company=' + companyId, this.options)
            .pipe(map(data => data));
    }

    getUsersType() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/user/type/', this.options)
            .pipe(map(data => data));
    }

    getProject() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/project/view/', this.options).pipe(map(data => data));
    }

    addProject(projData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/project/add/', projData, this.options).pipe(map(data => data));
    }

    getProjectActivity(project) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/project/getProjectActivities?id=' + project, this.options).pipe(map(data => data));
    }

    addAssignProject(assignInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/project/assignProject', assignInfo, this.options).pipe(map(data => data));
    }

    getProjectId(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/project/getproject/?id=' + id, this.options).pipe(map(data => data));
    }

    editProject(cusInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/project/edit/', cusInfo, this.options).pipe(map(data => data));
    }

    getActivityList() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/activity/list/', this.options).pipe(map(data => data));
    }

    addActivity(tobj) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/user/addactivity/', tobj, this.options).pipe(map(data => data));
    }
    // users service calls block end

    // employee service calls block

    getEmployeeType(typeId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/getType/?id=' + typeId, this.options).pipe(map(data => data));
    }

    getEmployeeTypes() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/EmployeeType/', this.options)
            .pipe(map(data => data));
    }

    getRolesList() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/roles/all/', this.options)
            .pipe(map(data => data));
    }
    getRolesCategory() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/activity/getCategory', this.options)
            .pipe(map(data => data));
    }

    // addRolePermission(rolesdata) {
    //     this.checkTokenValidity();
    //     return this.http.post(this.restUrl + '/roles/addRolePermission', rolesdata, this.options)
    //         .pipe(map(data => data));
    // }

    addRoles(roleInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/roles/add', roleInfo, this.options).pipe(map(data => data));
    }
    getRolePermissions(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/roles/getRolePermissions/?id=' + id, this.options)
            .pipe(map(data => data));
    }
    // editRolePermission(roleData) {
    //     this.checkTokenValidity();
    //     return this.http.post(this.restUrl + '/roles/editRolePermission', roleData, this.options)
    //         .pipe(map(data => data));
    // }
    addRole(roleData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/user/addRole', roleData, this.options)
            .pipe(map(data => data));
    }

    updateEmpSalaryId(userId, salaryInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/employeemanagement/updateSalaryComponent?id=' + userId, salaryInfo,
            this.options).pipe(map(data => data));
    }

    addEmpSalaryId(userId, salaryDetails) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/employeemanagement/addSalaryComponent?id=' + userId, salaryDetails,
            this.options).pipe(map(data => data));
    }

    getEmpProfessionalInfoId(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/employeemanagement/professionalInfo?id=' + id, this.options).pipe(map(data => data));
    }

    getJobCategoryTitle() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/categoryTitles', this.options).pipe(map(data => data));
    }

    getJobTitleById(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/gettitleById?id=' + id, this.options).pipe(map(data => data));
    }

    editEmpProfessionalInfoId(userId, filterUdata) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/employeemanagement/editprofessionalInfo?id=' + userId, filterUdata,
            this.options).pipe(map(data => data));
    }

    getEmpSalaryInfoId(userId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/employeemanagement/salaryComponentInfo?id=' + userId, this.options).pipe(map(data => data));
    }

    getPersonalInfoId(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/fullInfo/?id=' + id, this.options).pipe(map(data => data));
    }




    // employee service calls block end


    // address Service calls block
    getCountries() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/country/', this.options)
            .pipe(map(data => data));
    }

    getStates(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/state/?id=' + id, this.options)
            .pipe(map(data => data));
    }

    getCities(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/city/?id=' + id, this.options)
            .pipe(map(data => data));
    }
    getExternalApi(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/getExternalApi?api=' + id, this.options).pipe(map(data => data));
    }

    getData(url, requestData) {
        this.checkTokenValidity();
        return this.http.get(url + requestData, this.options).pipe(map(data => data));
    }
    getPayFrequency() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/employeemanagement/payFrequency/', this.options)
            .pipe(map(data => data));
    }
    getBankingType() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/employeemanagement/bankingType/', this.options)
            .pipe(map(data => data));
    }
    getAddress(zip) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/zipCode?zip=' + zip, this.options)
            .pipe(map(data => data));
    }

    getlocations() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/locations/', this.options).pipe(map(data => data));
    }


    // address Service calls block end

    // jobs service calls block start
    getJobTitle(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/gettitle/?id=' + id, this.options)
            .pipe(map(data => data));
    }

    addJobTitle(jobData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/addtitle', jobData, this.options).pipe(map(data => data));
    }

    editJobTitle(jobInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/edittitle', jobInfo, this.options).pipe(map(data => data));
    }

    getJobTitles() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/title/', this.options)
            .pipe(map(data => data));
    }

    getPayGrades() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/pay/view', this.options)
            .pipe(map(data => data));
    }

    getPatGradesID(job) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/pay/getpay?id=' + job, this.options).pipe(map(data => data));
    }

    addPaygrades(payData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/pay/add', payData, this.options).pipe(map(data => data));
    }

    editPayGrades(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/pay/getpay/?id=' + id, this.options).pipe(map(data => data));
    }

    getPaySalaryId(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/pay/viewSalary?id=' + id, this.options).pipe(map(data => data));
    }

    addPaySalary(salaryInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/pay/addSalary', salaryInfo, this.options).pipe(map(data => data));
    }

    ediPay(payData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/pay/edit', payData, this.options).pipe(map(data => data));
    }



    addJobCategories(catData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/addCategory', catData, this.options).pipe(map(data => data));
    }

    editJobCategories(id) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/editCategory/', id, this.options).pipe(map(data => data));
    }


    getJobCategories() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/category/', this.options)
            .pipe(map(data => data));
    }

    getEmpStatus() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/employee/status/', this.options)
            .pipe(map(data => data));
    }

    getJobCategory(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/getcategory/?id=' + id, this.options)
            .pipe(map(data => data));
    }
    addJobCategory(id) {
        this.checkTokenValidity();

        return this.http.post(this.restUrl + '/job/addCategory', id, this.options)
            .pipe(map(data => data));
    }

    getEducations() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/qualifications/education/', this.options)
            .pipe(map(data => data));
    }

    getSkills() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/qualifications/skills/', this.options)
            .pipe(map(data => data));
    }

    getLanguages() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/qualifications/language/', this.options)
            .pipe(map(data => data));
    }

    getLicenses() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/qualifications/license/', this.options)
            .pipe(map(data => data));
    }
    getJobsList() {
        this.checkTokenValidity();

        return this.http.get(this.restUrl + '/job/jobList', this.options)
            .pipe(map(data => data));
    }
    getjobListByUser(userId) {
        this.checkTokenValidity();

        return this.http.get(this.restUrl + '/job/jobListByUser?userId=' + userId, this.options)
            .pipe(map(data => data));
    }
    addCandidateApply(candidatedata) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/candidateApply', candidatedata, this.options)
            .pipe(map(data => data));
    }
    getjobDetails(jobId) {
        this.checkTokenValidity();

        return this.http.get(this.restUrl + '/job/jobDetails?id=' + jobId, this.options)
            .pipe(map(data => data));
    }
    getEligibleCandidates(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/getEligibleCandidates?id=' + id, this.options)
            .pipe(map(data => data));
    }
    editJob(id) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/editJob', id, this.options)
            .pipe(map(data => data));
    }


    addEmpStatus(statusData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/employee/addStatus', statusData, this.options).pipe(map(data => data));
    }

    editEmpStatusID(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/employee/getstatus/?id=' + id, this.options).pipe(map(data => data));
    }

    editEmpStatus(statusData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/employee/editStatus', statusData, this.options).pipe(map(data => data));
    }


    getEmpStatusId(emp) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/employee/getstatus/?id=' + emp, this.options).pipe(map(data => data));
    }


    addEmployeeType(typeData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/addEmployeeType', typeData, this.options).pipe(map(data => data));
    }


    editEmployeeType(typeId, statusInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/editEmployeeType/?id=' + typeId, statusInfo, this.options).pipe(map(data => data));
    }

    getWorkAuth() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/workauth', this.options).pipe(map(data => data));
    }

    getCompanies() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/company/all/', this.options).pipe(map(data => data));
    }

    addjob(finalData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/addJob', finalData, this.options).pipe(map(data => data));
    }

    getPublishJobData(jobId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/publishJobData?id=' + jobId, this.options).pipe(map(data => data));
    }

    updateJobStatus(jobId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/updateJobStatus?id=' + jobId, this.options).pipe(map(data => data));
    }

    remotePublishJob(jobData) {
        this.checkTokenValidity();
        return this.http.post(this.super + '/job/addJob', jobData).pipe(map(data => data));
    }

    getJobpublish(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/publishJob?id=' + id, this.options).pipe(map(data => data));
    }

    getCandidateList() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/getCandidateList', this.options).pipe(map(data => data));
    }

    addCandidate(personalData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/addCandidate', personalData, this.options).pipe(map(data => data));
    }

    addCandidateExperence(experienceData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/addCandidateExperience', experienceData, this.options).pipe(map(data => data));
    }

    addCandidateEducation(educationData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/addCandidateEducation', educationData, this.options).pipe(map(data => data));
    }

    addCandidateSkills(skillData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/addCandidateSkills', skillData, this.options).pipe(map(data => data));
    }
    // adding suresh --09-06-2019 start
    addCandidateConsent(consentData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/addCandidateConsents', consentData, this.options).pipe(map(data => data));
    }

    editCandidateConsent(consentData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/editCandidateConsent', consentData, this.options).pipe(map(data => data));
    }
    // adding suresh --09-06-2019 end

    addCandidateSummary(summaryData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/addCandidateSummary', summaryData, this.options).pipe(map(data => data));
    }

    getCandidateId(candidateId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/getCandidate?id=' + candidateId, this.options).pipe(map(data => data));
    }

    editCandidate(personalData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/editCandidate', personalData, this.options).pipe(map(data => data));
    }

    editCandidateExperence(experienceData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/editCandidateExperience', experienceData, this.options).pipe(map(data => data));
    }

    editCandidateEducation(educationData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/editCandidateEducation', educationData, this.options).pipe(map(data => data));
    }

    editCandidateSkills(skillData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/editCandidateSkills', skillData, this.options).pipe(map(data => data));
    }

    editCandidateSummary(summaryData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/editCandidateSummary', summaryData, this.options).pipe(map(data => data));
    }

    getEmpSalaryInfo(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/employeemanagement/salaryComponentInfo/?id=' + id, this.options).pipe(map(data => data));
    }

    // jobs service calls block end


    // Company service calls block start

    getCompanyList() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/company/customer/', this.options)
            .pipe(map(data => data));
    }

    getVendorList() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/company/vendor/', this.options)
            .pipe(map(data => data));
    }

    getCompainesByUser(userId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/company/getCompainesByUser?userId=' + userId, this.options)
            .pipe(map(data => data));
    }

    addCompany(cusData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/company/add/', cusData, this.options)
            .pipe(map(data => data));
    }

    editCompany(cusData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/company/add/', cusData, this.options)
            .pipe(map(data => data));
    }

    updateCompnayInfo(compData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/config/updateCompany/', compData, this.options)
            .pipe(map(data => data));
    }

    viewCompnayInfo() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/viewCompany/', this.options)
            .pipe(map(data => data));
    }


    companySettings() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/settings/', this.options)
            .pipe(map(data => data));
    }
    addCompanyPrefix(prefixInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/config/prefix', prefixInfo, this.options)
            .pipe(map(data => data));
    }
    getLocale() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/locale/', this.options)
            .pipe(map(data => data));
    }
    getTimezone() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/timezone', this.options)
            .pipe(map(data => data));
    }

    getCurrency() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/currency', this.options)
            .pipe(map(data => data));
    }

    getCompanyBranches() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/branches/', this.options)
            .pipe(map(data => data));
    }

    getBranch(branchId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/viewBranch?id=' + branchId, this.options)
            .pipe(map(data => data));
    }

    addBranch(branchName) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/config/addbranch', branchName, this.options)
            .pipe(map(data => data));
    }

    updateBranch(branchDetails) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/config/editBranch', branchDetails, this.options)
            .pipe(map(data => data));
    }

    getTerminationRules() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/termination/termination', this.options)
            .pipe(map(data => data));
    }
    getTermination(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/termination/getTermination?id=' + id, this.options)
            .pipe(map(data => data));
    }

    addTerminationReson(terminationData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/termination/addTermination', terminationData, this.options)
            .pipe(map(data => data));
    }
    editTerminationReson(terminationData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/termination/editTermination', terminationData, this.options)
            .pipe(map(data => data));
    }

    getIndustries() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/industry', this.options).pipe(map(data => data));
    }
    // saikumar 21/08/2019 stated here
    postIndustries(cusData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/config/postIndustry', cusData, this.options).pipe(map(data => data));
    }
    // saikumar  21/08/219 ended here

    getCustomersList(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/company/list/?id=' + id, this.options).pipe(map(data => data));
    }

    editCustomers(cusInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/company/edit', cusInfo, this.options).pipe(map(data => data));
    }

    getCompanyContacts(companyId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/contact/companyContact?id=' + companyId, this.options).pipe(map(data => data));
    }

    getCustomerContacts() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/contact/customer/', this.options).pipe(map(data => data));
    }

    addClientContacts(cusData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/contact/add', cusData, this.options).pipe(map(data => data));
    }

    getCompanyContactView(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/contact/view?id=' + id, this.options).pipe(map(data => data));
    }

    editCompanyContacts(contactInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/contact/edit', contactInfo, this.options).pipe(map(data => data));
    }

    getVendorConatcts() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/contact/vendor/', this.options).pipe(map(data => data));
    }

    // Company serive calls block end


    // theame settings
    getColor() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/color/', this.options)
            .pipe(map(data => data));
    }

    addTheameColor(themeData) {
        this.checkTokenValidity();

        return this.http.post(this.restUrl + '/config/updateTheme', themeData, this.options)
            .pipe(map(data => data));
    }


    // theme settings end


    // qualification Module

    getSkillsId(job) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/qualifications/getskills/?id=' + job, this.options).pipe(map(data => data));
    }

    addSkills(skillData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/qualifications/addSkills', skillData, this.options).pipe(map(data => data));
    }

    editSkillsId(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/qualifications/getskills/?id=' + id, this.options).pipe(map(data => data));
    }

    editSkills(skillData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/qualifications/editSkills/', skillData, this.options).pipe(map(data => data));
    }

    getEducation() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/qualifications/education/', this.options).pipe(map(data => data));
    }

    getEducationId(job) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/qualifications/geteducation/?id=' + job, this.options).pipe(map(data => data));
    }

    addEducation(eduData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/qualifications/addEducation/', eduData, this.options).pipe(map(data => data));
    }

    editEducationId(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/qualifications/geteducation/?id=' + id, this.options).pipe(map(data => data));
    }

    editEducation(eduData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/qualifications/editEducation/', eduData, this.options).pipe(map(data => data));
    }


    getLicenceId(lic) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/qualifications/getlicense/?id=' + lic, this.options).pipe(map(data => data));
    }

    addLicence(licData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/qualifications/addLicense/', licData, this.options).pipe(map(data => data));
    }


    editLicence(licData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/qualifications/editLicense/', licData, this.options).pipe(map(data => data));
    }

    getLanguagesId(job) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/qualifications/getlanguage/?id=' + job, this.options).pipe(map(data => data));
    }

    addLanguages(lanData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/qualifications/addLanguage/', lanData, this.options).pipe(map(data => data));
    }


    editLanguage(lanData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/qualifications/editLanguage', lanData, this.options).pipe(map(data => data));
    }

    getMemberships() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/qualifications/membership/', this.options).pipe(map(data => data));
    }

    getMembershipsId(job) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/qualifications/getmembership/?id=' + job, this.options).pipe(map(data => data));
    }

    addmembership(memData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/qualifications/addMembership/', memData, this.options).pipe(map(data => data));
    }

    editMembership(memData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/qualifications/editMembership', memData, this.options).pipe(map(data => data));
    }



    // qualification module end

    // timesheet Service calls block start

    addTimesheet(timesheetData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/timesheet/createTimesheet', timesheetData, this.options).pipe(map(data => data));
    }

    getMyProjects() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/timesheet/getMyProjects', this.options).pipe(map(data => data));
    }

    getTimesheetActivity(projectId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/timesheet/getMyActivities?id=' + projectId, this.options).pipe(map(data => data));
    }

    adddTimesheetStatus(timesheets) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/timesheet/addStatus', timesheets, this.options).pipe(map(data => data));
    }

    getTimesheetByDate(date) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/timesheet/getTimesheetByDate?date=' + date, this.options).pipe(map(data => data));
    }

    editTimesheetStatus(timesheets) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/timesheet/editStatus', timesheets, this.options).pipe(map(data => data));
    }

    getTimesheetById(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/timesheet/getTimesheetById?timesheet=' + id, this.options).pipe(map(data => data));
    }

    submitTimesheet(userTimesheetComments) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/timesheet/submitTimesheet', userTimesheetComments, this.options).pipe(map(data => data));
    }

    getTimesheetList() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/timesheet/getTimesheetList', this.options).pipe(map(data => data));
    }

    editSingleTimesheet(timesheet) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/timesheet/editSingleSheet', timesheet, this.options).pipe(map(data => data));
    }

    getReportingUser() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/timesheet/getReportingUsers', this.options).pipe(map(data => data));
    }

    updateEmpTimesheet(userTimesheetComments) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/timesheet/updateEmpTimesheet', userTimesheetComments, this.options).pipe(map(data => data));
    }

    getTimesheetId(timesheetId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/timesheet/getTimesheet?timesheet=' + timesheetId, this.options).pipe(map(data => data));
    }

    // getTimesheetByApprover

    getTimesheetByApprover(timesheetId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/timesheet/getTimesheetByApprover?timesheet=' + timesheetId,
            this.options).pipe(map(data => data));
    }


    // timesheet Service calls block start end


    // MyInfo service calls block start

    upload() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/upload/i9Info', this.options).pipe(map(data => data));
    }

    uploadW4Info() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/upload/w4Info', this.options).pipe(map(data => data));
    }

    uploadWorkInfo() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/upload/workInfo', this.options).pipe(map(data => data));
    }

    uploadDeleteI9(id) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/upload/deletei9', id, this.options).pipe(map(data => data));
    }

    uploadDeleteW4(docId) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/upload/deletew4', docId, this.options).pipe(map(data => data));
    }

    uploadDeleteWork(id) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/upload/deletework', id, this.options).pipe(map(data => data));
    }

    getPersonalInfo() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/personalInfo', this.options).pipe(map(data => data));
    }

    getPersonalContactInfo() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/contactInfo', this.options).pipe(map(data => data));
    }

    getPersonalDependentInfo() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/dependentInfo', this.options).pipe(map(data => data));
    }

    getPersonalEducationInfo() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/educationInfo', this.options).pipe(map(data => data));
    }

    getPersonalExperenceInfo() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/experienceInfo', this.options).pipe(map(data => data));
    }

    getPersonalSkillsInfo() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/skillInfo', this.options).pipe(map(data => data));
    }

    getPersonalLanguageInfo() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/languageInfo', this.options).pipe(map(data => data));
    }

    getPersonalLicenceInfo() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/licenseInfo', this.options).pipe(map(data => data));
    }

    getProfessionalInfo() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/professionalInfo', this.options).pipe(map(data => data));
    }

    getSalaryInfo() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/salaryInfo', this.options).pipe(map(data => data));
    }

    getEmergencyContactInfo() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/emergencyContactInfo', this.options).pipe(map(data => data));
    }

    editContactInfo(contactInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/personal/editcontactInfo', contactInfo, this.options).pipe(map(data => data));
    }

    addContactInfo(contactDetails) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/personal/addContactInfo', contactDetails, this.options).pipe(map(data => data));
    }

    editEmergencyContactInfo(contactInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/personal/editEmergencyContactInfo', contactInfo, this.options).pipe(map(data => data));
    }

    editDependencyInfo(dependentInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/personal/editDependentInfo', dependentInfo, this.options).pipe(map(data => data));
    }

    getPersonalFullInfo() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/fullInfo', this.options).pipe(map(data => data));
    }

    getPersonalPicture() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/getPicture', this.options).pipe(map(data => data));
    }

    editPersonalInfo(personalInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/personal/editPersonalInfo', personalInfo, this.options).pipe(map(data => data));
    }

    uploadProfilePic(croppedImage) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/personal/profilePic', croppedImage, this.options).pipe(map(data => data));
    }

    editExperenceInfo(experienceInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/personal/editExperienceInfo', experienceInfo, this.options).pipe(map(data => data));
    }

    editEducationInfo(educationInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/personal/editEducationInfo', educationInfo, this.options).pipe(map(data => data));
    }

    editSkillInfo(skillInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/personal/editSkillInfo', skillInfo, this.options).pipe(map(data => data));
    }

    editLanguageInfo(languageInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/personal/editLanguageInfo', languageInfo, this.options).pipe(map(data => data));
    }

    editLicenseInfo(licenseInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/personal/editLicenseInfo', licenseInfo, this.options).pipe(map(data => data));
    }

    getPersonal() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/Info', this.options).pipe(map(data => data));
    }

    addPersonalInfo(qualificationInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/personal/addInfo', qualificationInfo, this.options).pipe(map(data => data));
    }


    // MyInfo service calls block start  end



    // Performance service call block start
    getKpiTypes() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/performance/kpiTypes', this.options).pipe(map(data => data));
    }

    getPerformanceKPI() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/performance/getKpi', this.options).pipe(map(data => data));
    }

    getOrganizationKPI() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/performance/organizationalKpi', this.options).pipe(map(data => data));
    }

    getPerformanceKIPId(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/performance/getKpi?jobid=' + id, this.options).pipe(map(data => data));
    }

    addPerformanceIndicator(kpiData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/performance/addPerformanceIndicator', kpiData, this.options).pipe(map(data => data));
    }

    getPerformanceIndicatorById(kpiId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/performance/performanceIndicatorById?id=' + kpiId, this.options).pipe(map(data => data));
    }

    getOrganizationalKpiById(kpiId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/performance/organizationalKpiById?id=' + kpiId, this.options).pipe(map(data => data));
    }

    editPerformanceIndicatorId(kpiId, kpiData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/performance/editPerformanceIndicator?id=' + kpiId, kpiData,
            this.options).pipe(map(data => data));
    }

    editOrganizationalKpi(kpiId, kpiData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/performance/editOrganizationalKpi?id=' + kpiId, kpiData,
            this.options).pipe(map(data => data));
    }

    getTraackerLogs(trackerId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/performance/trackerLogs?id=' + trackerId, this.options).pipe(map(data => data));
    }

    addTrackerLogs(logData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/performance/addTrackerLogs', logData, this.options).pipe(map(data => data));
    }

    getLogById(trackerId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/performance/logById?id=' + trackerId, this.options).pipe(map(data => data));
    }

    editTrackerLogsId(trackerId, logData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/performance/editTrackerLogs?id=' + trackerId, logData, this.options).pipe(map(data => data));
    }

    getReviewersTrackers() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/performance/reviewersTrackers', this.options).pipe(map(data => data));
    }

    getEmpTracker() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/performance/employeeTrackers', this.options).pipe(map(data => data));
    }

    getPerformanceTracker() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/performance/performanceTracker', this.options).pipe(map(data => data));
    }

    getPerformanceTrackerById(trackerId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/performance/performanceTrackerById?id=' + trackerId, this.options).pipe(map(data => data));
    }

    addPerformanceTracker(trackerData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/performance/addperformanceTracker', trackerData, this.options).pipe(map(data => data));
    }

    editPerformanceTrackerId(trackerId, trackerData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/performance/editPerformanceTracker?id=' + trackerId, trackerData,
            this.options).pipe(map(data => data));
    }

    addReviews(trackerData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/performance/addReviews', trackerData, this.options).pipe(map(data => data));
    }

    getReviewId(reviewId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/performance/getReview?id=' + reviewId, this.options).pipe(map(data => data));
    }

    editReviewId(reviewId, trackerData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/performance/editReviews?id=' + reviewId, trackerData, this.options).pipe(map(data => data));
    }

    getTheme() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/getTheme').pipe(map(data => data));
    }

    getCommentId(reviewId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/performance/getComment?id=' + reviewId, this.options).pipe(map(data => data));
    }

    addEvaluation(kpiComments) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/performance/addEvaluation', kpiComments, this.options).pipe(map(data => data));
    }

    performanceApprove(kpiType) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/performance/approve', kpiType, this.options).pipe(map(data => data));
    }

    getReviews() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/performance/reviews', this.options).pipe(map(data => data));
    }



    // Performance service call block end

    // File uploder service call block start
    getUploadI9() {
        this.checkTokenValidity();
        return this.restUrl + '/upload/uploadI9/';
    }

    getUploadFederalW4() {
        this.checkTokenValidity();
        return this.restUrl + '/upload/uploadFederalW4/';
    }

    getUploadStateW4() {
        this.checkTokenValidity();
        return this.restUrl + '/upload/uploadStateW4/';
    }

    getUploadWork() {
        this.checkTokenValidity();
        return this.restUrl + '/upload/uploadWork/';
    }

    updatei9Doc(id, i9Data) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/upload/updatei9Doc?id=' + id, i9Data, this.options)
            .pipe(map(data => data));
    }

    updateWorkDoc(id, workData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/upload/updateWorkDoc?id=' + id, workData, this.options)
            .pipe(map(data => data));
    }

    updatefw4Doc(id, fw4Data) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/upload/updatefw4Doc?id=' + id, fw4Data, this.options)
            .pipe(map(data => data));
    }

    updatesw4Doc(id, sw4Data) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/upload/updatefw4Doc?id=' + id, sw4Data, this.options)
            .pipe(map(data => data));
    }

    getUploadImg() {
        this.checkTokenValidity();
        return this.restUrl + '/upload/uploadImg';
    }

    getUploadProfilePic() {
        this.checkTokenValidity();
        return this.restUrl + '/upload/uploadProfilePic/';
    }

    getEmpdocument() {
        this.checkTokenValidity();
        return this.restUrl + '/upload/document/';
    }

    uploadClients() {
        this.checkTokenValidity();
        return this.restUrl + '/upload/uploadClients/';
    }

    // File uploder service call block end


    checkCandidateEmail(email) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/checkCandidateEmail?email=' + email, this.options)
            .pipe(map(data => data));
    }

    uploadCandidate(candidateData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/candidatePic/', candidateData, this.options)
            .pipe(map(data => data));
    }

    getRelations() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/relation', this.options)
            .pipe(map(data => data));
    }

    adduserLogs(logs) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/logger/add', logs, this.options)
            .pipe(map(data => data));
    }
    getUserlogs() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/logger/list/', this.options)
            .pipe(map(data => data));
    }


    // user alerts and notifications
    addSelection(alerts) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/notification/addSelection', alerts, this.options).pipe(map(data => data));
    }

    getSelection() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/notification/getSelection', this.options).pipe(map(data => data));
    }

    getExpiryDetails() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/notification/getExpiry', this.options).pipe(map(data => data));
    }

    getAlertDetails() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/notification/getAlerts', this.options).pipe(map(data => data));
    }

    getDocumentAlertDetails() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/notification/getDocumentAlerts', this.options).pipe(map(data => data));
    }

    updateAlert(id, value) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/notification/updateAlert?id=' + id, value, this.options).pipe(map(data => data));
    }

    updateAlertData(id, value) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/notification/updateAlertData?id=' + id, value, this.options).pipe(map(data => data));
    }

    updateDetails(id, value) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/notification/updateDetails?recordId=' + id, value, this.options).pipe(map(data => data));
    }

    changeRead(id, value) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/notification/updateIsRead?recordId=' + id, value, this.options).pipe(map(data => data));
    }

    changeDocReadValue(id, value) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/notification/updateDocIsRead?recordId=' + id, value, this.options).pipe(map(data => data));
    }

    checkContact(contactInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/contact/checkContact', contactInfo, this.options).pipe(map(data => data));
    }
    approverLogin(userInfo) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/user/approverLogin', userInfo, this.options).pipe(map(data => data));
    }
    sendJobApplyLink(emailData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/sendJobApplyLink', emailData, this.options).pipe(map(data => data));
    }

    // Leave Module Api's

    addLeaveType(leaveData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/leave/addLeaveType', leaveData, this.options).pipe(map(data => data));
    }
    getLeaveType() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/leaveTypes', this.options).pipe(map(data => data));
    }

    // start Function to get entitled leaves to a user
    /*
        Added By: Pavan Kumar
        Added on: 2019-06-21
    */
    userAssignedLeaves(userId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/userAssignedLeaves?userId=' + userId, this.options)
            .pipe(map(data => data));
    }
    // end Function to get entitled leaves to a user

    getLeaveTypeById(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/leaveTypesById?id=' + id, this.options).pipe(map(data => data));
    }

    editLeaveType(id, leaveData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/leave/editLeaveType?id=' + id, leaveData, this.options).pipe(map(data => data));
    }

    getWorkDay() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/workday', this.options).pipe(map(data => data));
    }

    getWorkWeek() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/workweek', this.options).pipe(map(data => data));
    }

    editWorkWeek(week) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/leave/addWorkWeek', week, this.options).pipe(map(data => data));
    }

    addLeavePeriod(leaveData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/leave/leavePeriod', leaveData, this.options).pipe(map(data => data));
    }

    getLeavePeriod() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/leavePeriods', this.options).pipe(map(data => data));
    }



    addholiday(holidayData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/leave/addHoliday', holidayData, this.options).pipe(map(data => data));
    }

    editHoliday(id, holidayData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/leave/editHoliday?id=' + id, holidayData, this.options).pipe(map(data => data));
    }

    getHolidaysList() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/holidaysList', this.options).pipe(map(data => data));
    }

    getHolidayById(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/getholidayById?id=' + id, this.options).pipe(map(data => data));
    }

    addEntitlements(userData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/leave/addEntitlements', userData, this.options).pipe(map(data => data));
    }

    editEntitlements(userData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/leave/editEntitlements', userData, this.options).pipe(map(data => data));
    }

    getEntitlements() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/getEntitlements', this.options).pipe(map(data => data));
    }

    getEntitlementById(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/getEntitlementById?id=' + id, this.options).pipe(map(data => data));
    }

    addUserLeave(userData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/leave/addUserLeaves', userData, this.options).pipe(map(data => data));
    }

    editUserLeaves(userData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/leave/editUserLeaves', userData, this.options).pipe(map(data => data));
    }

    getUserLeavesList() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/getUserLeave', this.options).pipe(map(data => data));
    }

    getUserLeaveListById(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/getUserLeaveById?id=' + id, this.options).pipe(map(data => data));
    }

    AddAssignLeave(assignData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/leave/addAssignLeave', assignData, this.options).pipe(map(data => data));
    }

    getAssignLeaves() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/getAssignLeaves', this.options).pipe(map(data => data));
    }

    addapplyLeave(applyData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/leave/addUserApplyLeave', applyData, this.options).pipe(map(data => data));
    }


    getApplyLeaveList() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/getUserLeavesList', this.options).pipe(map(data => data));
    }


    getAdminleaveList() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/getleaveLists', this.options).pipe(map(data => data));
    }

    getMyLeaveLists() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/getMyLeaveLists', this.options).pipe(map(data => data));
    }

    getMyLeaveBalance() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/user/myLeaveBalance', this.options).pipe(map(data => data));
    }


    getMyEntitlements() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/getMyEntitlement', this.options).pipe(map(data => data));
    }
    getReports() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/getreports', this.options).pipe(map(data => data));
    }

    getMyReports() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/getMyReportsList', this.options).pipe(map(data => data));
    }

    getLeaveDays() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/getdays', this.options).pipe(map(data => data));
    }

    getLeaveListById(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/getLeaveListsById?id=' + id, this.options).pipe(map(data => data));
    }

    updatesEmpLeaves(updateData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/leave/updatesEmpLeaves', updateData, this.options).pipe(map(data => data));
    }

    generateReports(searchData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/leave/generateReports', searchData, this.options).pipe(map(data => data));
    }


    // services for terms & conditions

    getTermsConditions() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/termination/termsConditions', this.options).pipe(map(data => data));
    }

    editTermsConditions(content) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/termination/editTermsConditions', content, this.options).pipe(map(data => data));
    }

    addTermsConditions(content) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/termination/addTermsConditions', content, this.options).pipe(map(data => data));
    }

    getReportingProjects() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/timesheet/getReportingProjects', this.options).pipe(map(data => data));
    }

    getLeaveDaysTimings() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/getDayTimings', this.options).pipe(map(data => data));
    }

    // services for work shifts
    getWorkShifts() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/shift', this.options).pipe(map(data => data));
    }

    getWorkShiftDetails(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/getshift?id=' + id, this.options).pipe(map(data => data));
    }

    editWorkShift(content) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/editShifts', content, this.options).pipe(map(data => data));
    }

    addWorkShift(content) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/addShifts', content, this.options).pipe(map(data => data));
    }

    getShiftName(shiftName) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/checkName?name=' + shiftName, this.options).pipe(map(data => data));
    }

    getDiff(content) {
        return this.http.post(this.restUrl + '/job/timeDiff', content).pipe(map(data => data));
    }

    //service to update recruiter
    updateRecruiter(jobFilterData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/updateRecruiter', jobFilterData, this.options).pipe(map(data => data));
    }

    //user salary component
    addUserSalary(userId, salaryDetails) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/employeemanagement/addUserSalary?id=' + userId, salaryDetails,
            this.options).pipe(map(data => data));
    }

    getUserSalary(userId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/employeemanagement/getUserSalary?id=' + userId,
            this.options).pipe(map(data => data));
    }

    getOfficeDocumentType() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/config/getOfficeDocumentType',
            this.options).pipe(map(data => data));
    }

    // office-document api for get dropdown data
    getOfficeDocument() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/immigration/getoffice_document', this.options).pipe(map(data => data));
    }

    // office-document api for upload
    fileDetail() {
        this.checkTokenValidity();
        return this.restUrl + '/upload/fileDetail/';
    }

    // api for get office-list  
    getOfficeList() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/immigration/officelist', this.options).pipe(map(data => data));
    }

    deleteOfficeList(id) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/immigration/deleteoffice', id, this.options).pipe(map(data => data));
    }


    getUserReports() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/employeemanagement/getUserReports', this.options).pipe(map(data => data));
    }

    getOrgChart() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/immigration/categories', this.options).pipe(map(data => data));
    }

    addShortList(data) {
        this.checkTokenValidity();
        return this.http.post(this.super + '/user/addShortList', data).pipe(map(data => data));
    }

    sendEmail(data) {
        this.checkTokenValidity();
        // suresh changes 08-01-2019 start
        return this.http.post(this.restUrl + '/job/sendEmail', data, this.options).pipe(map(data => data));
        // suresh changes 08-01-2019 end
    }

    // get user salary details for salary trends - sharmistha - 08-08-2019 - start
    getUserSalaryDetails(userId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/employeemanagement/getUserSalaryDetails?id=' + userId, this.options).pipe(map(data => data));
    }

    sendUserSalary(data) {
        this.checkTokenValidity();
        return this.http.post(this.super + '/config/sendUserSalary', data).pipe(map(data => data));
    }
    // get user salary details for salary trends - sharmistha - 08-08-2019 - end

    // start modification done by BASIT022 on 08-08-19
    // bulk emailing 
    sendBulkEmails(data) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/personal/sendBulkEmail', data, this.options).pipe(map(data => data));
    }
    //start modification done by BASIT022 on 08-08-19

    // suresh start adding logo changes api on 08-09-2019
    getlogo() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/upload/getlogo', this.options).pipe(map(data => data));
    }

    getfav() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/upload/getfav', this.options).pipe(map(data => data));
    }

    addLogo(newsdata) {
        return this.http.post(this.restUrl + '/upload/add', newsdata)
            .pipe(map(data => data));
    }


    addFavicon(favdata) {
        return this.http.post(this.restUrl + '/upload/fav', favdata)
            .pipe(map(data => data));
    }

    // suresh end adding logo changes api on 08-09-2019

    // user roles api change - sharmistha - 08-19-2019 - start
    addRolePermission(rolesdata) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/roles/addUserRolePermission', rolesdata, this.options)
            .pipe(map(data => data));
    }

    getUserRolePermissions(roleId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/roles/getRolePermissionsById?id=' + roleId, this.options)
            .pipe(map(data => data));
    }

    editRolePermission(data, roleId) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/roles/editUserRolePermission?id=' + roleId, data, this.options)
            .pipe(map(data => data));
    }
    // user roles api change - sharmistha - 08-19-2019 - end

    // user immigration api - sharmistha - 08-19-2019 - start
    getUserDocuments(userId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/immigration/getAllDocuments?id=' + userId, this.options)
            .pipe(map(data => data));
    }

    getUserTimesheet(userId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/immigration/getUserTimesheets?id=' + userId, this.options)
            .pipe(map(data => data));
    }

    getUserPerformanceReviews(userId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/immigration/getUserPerformanceReviews?id=' + userId, this.options)
            .pipe(map(data => data));
    }

    geti9(userId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/immigration/i9Info?id=' + userId, this.options)
            .pipe(map(data => data));
    }
    // user immigration api - sharmistha - 08-19-2019 - end

    //modification done by sharmistha on 09-19-2019 - start
    addOfferLetter(data) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/Employeemanagement/addOfferLetter', data, this.options)
            .pipe(map(data => data));

    }
    updateOfferLetter(data) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/Employeemanagement/editOfferLetter', data, this.options)
            .pipe(map(data => data));

    }
    getOfferLetters() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/Employeemanagement/OfferLetters', this.options)
            .pipe(map(data => data));
    }
    getOfferLettersById(userId, typeId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/Employeemanagement/OfferLetterById/?id=' + userId + '&typeid=' + typeId, this.options)
            .pipe(map(data => data));
    }

    viewOfferLetterById(userId, typeId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/Employeemanagement/viewOfferLetterById/?id=' + userId + '&typeid=' + typeId, this.options)
            .pipe(map(data => data));
    }

    addDigitalKey(data) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/Employeemanagement/addDigitalkey', data, this.options)
            .pipe(map(data => data));
    }
    getDigitalKey() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/Employeemanagement/getDigitalkeyOfUser', this.options)
            .pipe(map(data => data));
    }

    getDigitalKeyById(userId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/Employeemanagement/getDigitalkeyByUserId/?id=' + userId, this.options)
            .pipe(map(data => data));
    }
    //modification done by sharmistha on 09-19-2019 - end

    // Added apis for transfer of accounts by BASIT003 on 29-08-2019
    transfer(transferData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/user/transfer', transferData, this.options)
            .pipe(map(data => data));
    }

    // saikumar 07/09/2019 stated here
    postskills(cusData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/addskill', cusData, this.options).pipe(map(data => data));
    }
    // saikumar 07/09/219 ended here

    //added api for getting offer details of the users - sharmistha - 09-23-2019 - start
    getOfferDetails() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/Employeemanagement/getOfferDetails', this.options).pipe(map(data => data));
    }

    addUserDigitalKey(data) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/Employeemanagement/addUserDigitalkey', data, this.options)
            .pipe(map(data => data));
    }

    getOfferLetterTemplates() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/docusign/getOfferLetterTemplates', this.options).pipe(map(data => data));
    }

    getOfferLetterById(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/docusign/getOfferLetterById?id=' + id, this.options).pipe(map(data => data));
    }

    addOfferLetterTemplate(data) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/docusign/addOfferLetterTemplate', data, this.options)
            .pipe(map(data => data));
    }

    addOfferLetterType(data) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/docusign/addOfferLetterType', data, this.options)
            .pipe(map(data => data));
    }

    getUserOfferLetters(userId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/docusign/userOfferLetters?id=' + userId, this.options)
            .pipe(map(data => data));
    }

    deleteUserOfferLetter(userId, typeId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/Employeemanagement/deleteUserOfferLetter?id=' + userId + '&typeid=' + typeId, this.options).pipe(map(data => data));
    }

    updateStatus(typeId) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/Employeemanagement/updateStatus', typeId, this.options)
            .pipe(map(data => data));
    }

    getName(userId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/Employeemanagement/getName?userId=' + userId, this.options)
            .pipe(map(data => data));
    }

    getOfferLettersList() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/Employeemanagement/getOfferLettersList', this.options)
            .pipe(map(data => data));
    }
    // added api for getting offer details of the users - sharmistha - 09-23-2019 - end

    // added api for adding branch detail of a customer and vendor by BASIT003 on 09-12-2019
    addClientBranch(cusData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/company/addBranch/', cusData, this.options)
            .pipe(map(data => data));
    }

    editClientBranch(cusData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/company/editBranch/', cusData, this.options)
            .pipe(map(data => data));
    }

    getClientBranch(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/company/getBranch/?id=' + id, this.options)
            .pipe(map(data => data));
    }

    getHqClients() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/company/hqCustomer', this.options)
            .pipe(map(data => data));
    }
    getHqVendors() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/company/hqVendor', this.options)
            .pipe(map(data => data));
    }

    // add other skill and license in PIM module
    addOtherSkill(data) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/qualifications/addOtherSkill', data, this.options)
            .pipe(map(data => data));
    }

    addOtherLicense(data) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/qualifications/addOtherLicense', data, this.options)
            .pipe(map(data => data));
    }

    getAccrualRuleList() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/accrualList', this.options)
            .pipe(map(data => data));
    }

    addAccrualRule(accrualData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/leave/addLeaveAccrual', accrualData, this.options)
            .pipe(map(data => data));
    }

    editAccrualRule(accrualData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/leave/editLeaveAccrual', accrualData, this.options)
            .pipe(map(data => data));
    }

    getAccrualRule(accrualId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/accrual?accrualId=' + accrualId, this.options)
            .pipe(map(data => data));
    }

    getJobLog(jobId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/getJobLog?jobCode=' + jobId, this.options)
            .pipe(map(data => data));
    }


    //modification done By BASIT023 start

    addCandidateExpectedPay(expectedPay) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/Candidate/addPay', expectedPay, this.options)
            .pipe(map(data => data));
    }

    addCandidateSummaryinfo(summary) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/Candidate/addSummary', summary, this.options)
            .pipe(map(data => data));
    }

    getCandidateExpectedPay(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/Candidate/getExpectedPay?id=' + id, this.options)
            .pipe(map(data => data));
    }


    getcommunicationMsg(data) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/Candidate/communicationMsg', data, this.options)
            .pipe(map(data => data));
    }

    //modification done By BASIT023 end

    // code added by Geeta
    addCalendarEvents(eventData) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/addCalendarEvents', eventData, this.options)
            .pipe(map(data => data));
    }

    getCalendarEvents() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/getCalendarEvents', this.options)
            .pipe(map(data => data));
    }

    getReportingLeaveList() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/leave/getReportingLeaves', this.options).pipe(map(data => data));
    }

    // prerequisites apis - sharmistha - 10-15-2019 - start
    getPrerequisiteDocs() {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/Prerequisites/getPrerequisiteDocs', this.options).pipe(map(data => data));
    }

    getPrerequisiteDocById(id) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/prerequisites/getPrerequisiteDocById?id=' + id, this.options).pipe(map(data => data));
    }

    addPrerequisiteDoc(data) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/prerequisites/addPrerequisiteDoc', data, this.options).pipe(map(data => data));
    }

    editPrerequisiteDoc(data) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/prerequisites/editPrerequisiteDoc', data, this.options).pipe(map(data => data));
    }

    candidatePrerequisiteDoc(canId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/prerequisites/candidatePrerequisiteDoc?id=' + canId, this.options).pipe(map(data => data));
    }
    // prerequisites apis - sharmistha - 10-15-2019 - end

    // send candidtea resume to client - BASIT023 -18-10-19 **** start
    sendCandidateResumeToclient(data) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/pdfexample/generateResume', data, this.options)
            .pipe(map(data => data));

    }
    // send candidtea resume to client - BASIT023 -18-10-19  End **** 
   
    //added by Geeta - 10-22-2019 - start
    addPortalCalendarEvent(data){
        this.checkTokenValidity();
        return this.http.post(this.super + '/job/addCalendarEvent', data).pipe(map(data => data));

    }
    //added by Geeta - 10-22-2019 - end

    //added by Sharmistha to update company logo on jobportal - 10-23-2019 - start
    assignPreDocument(data){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/assignCanPreDocument', data, this.options).pipe(map(data => data));
    }
    //added by Sharmistha to update company logo on jobportal - 10-23-2019 - end

    
    // added suresh 10-28-2019 start
    uploadResume() {
        this.checkTokenValidity();
        return this.restUrl + '/upload/uploadCanResumes';
    }

    getCandidateResume(id){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/getCandidateResume?id='+id, this.options).pipe(map(data => data));
    }

    deleteCandidateResume(data){
        console.log(data);
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/deleteCandidateResume',  data, this.options).pipe(map(data => data));
    }

    // added suresh 10-28-2019 end

    //added by Sharmistha to upload employee resume - 10-29-2019 - start
    postEmpResume(){
        this.checkTokenValidity();
        return this.restUrl + '/upload/empResume/';
    }

    getEmpResume(){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/empResumeInfo',this.options).pipe(map(data => data));
    }

    deleteResume(){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/personal/deleteResume', this.options).pipe(map(data => data));
    }
    //added by Sharmistha to upload employee resume - 10-29-2019 - end

    // added suresh 10-28-2019 start  sales person companies   

    companiesBySales(){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/company/companiesBySales', this.options).pipe(map(data => data));
    }

    // added suresh 10-28-2019 end

    // company logo update in the tedpros jobportal -sharmistha - 11-04-2019 - start
    updateCompanyLogo(data){
        this.checkTokenValidity();
        return this.http.post(this.jobportalUrl + '/config/updateClientLogo', data, this.options).pipe(map(data => data));
    }
    // company logo update in the tedpros jobportal -sharmistha - 11-04-2019 - end

    // get assigned documents of the candidate - sharmistha - 11-04-2019 - start
    getAssignedDocuments(jobId, canId){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/getAssignedDocuments?jobId='+jobId+'&canId='+canId, this.options).pipe(map(data => data));
    }
    // get assigned documents of the candidate - sharmistha - 11-04-2019 - end



    // added apis for adding candidate/consultant to php list by BASIT003
    // get campaigns list function
    getCampaigns(){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/phplist/getCampaigns', this.options).pipe(map(data => data));
    }

    //add subscriber to campaign function
    addSubscriber(maildata) {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/phplist/addSubscriber', maildata, this.options).pipe(map(data => data));
    }

    //get candidate/consultant subscribed campaigns list
    getSubscribedCampaigns(candidateMail) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/phplist/getSubscribedCampaigns?email=' + candidateMail, this.options).pipe(map(data => data));
    }

    cancelInterview(slotId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/cancelInterview?interviewId='+slotId, this.options).pipe(map(data => data));
   
    }

    
    getInterviewDetails(slotId) {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/getInterviewDetails?interviewId='+slotId, this.options).pipe(map(data => data));
   
    }
    
    editCalendarEvents(event)
    {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/editCalendarEvents', event, this.options).pipe(map(data => data));
   
    }

    // added apis for adding candidate/consultant to php list by BASIT003
    // get campaigns list function
    getEmployeeReport(searchCriteria){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/project/getEmployeeReport', searchCriteria, this.options).pipe(map(data => data));
    }
    checkjobapplystatus(condation)
    {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/checkjobapplystatus', condation, this.options).pipe(map(data => data));
   
    }


    updateTree(fromID, toID): Observable<any> {
        console.log(fromID+" - "+toID);

        const data={userId:fromID,reporting_to:toID};
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/immigration/updateReportingTo', data,this.options).pipe(map(data => data));
    }

    // uploading candidate documents added by suresh -- 11-28-2019 start

    uploadCanDoc() {
        this.checkTokenValidity();
        return this.restUrl + '/upload/uploadCanDoc';
    }

    getCandidateDocuments(id){
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/getCandidateDocumentsById?id='+id, this.options).pipe(map(data => data));
    }

    deleteCandidateDocument(data){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/vms/deleteCandidateDocument', data, this.options).pipe(map(data => data));
    }

    // uploading candidate documents added by suresh -- 11-28-2019 start
    getQuestionById(data)
    {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/getQuestion?id=' + data, this.options).pipe(map(data => data));
   
    }    



    getQuestion()
    {
        this.checkTokenValidity();
        return this.http.get(this.restUrl + '/job/getQuestions', this.options).pipe(map(data => data));
   
    }    


    editQuestion(question)
    {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/editQuesiton', question, this.options).pipe(map(data => data));
   
    }

    sendresume(sendresumeinfo)
    {
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/pdfexample/sendresume', sendresumeinfo, this.options).pipe(map(data => data));
   
    }

    updateNotificationStatus(data){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/updateNotificationStatus', data, this.options).pipe(map(data => data));
    }


    // added api for assigning candidate to hr after shorlisting of candidate by BASIT 003
    assignCandidateToHr(hrInfo){
        this.checkTokenValidity();
        return this.http.post(this.restUrl + '/job/assignCandidateToHr', hrInfo, this.options).pipe(map(data => data));
    }

}
