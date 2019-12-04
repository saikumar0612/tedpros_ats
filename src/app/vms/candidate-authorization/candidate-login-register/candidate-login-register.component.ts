import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../core/services';
import { NgForm } from '@angular/forms';
import { MailService } from '../../../core/services/mail.service';

@Component({
  selector: 'app-candidate-login-register',
  templateUrl: './candidate-login-register.component.html',
  styleUrls: ['./candidate-login-register.component.css']
})
export class CandidateLoginRegisterComponent implements OnInit {
  // adding --suresh-- 08-21-2019 start 
  user: any = {};
  userFlag;
  loading = false;
  error;
  url;
  file1_input;
  themeForm;
  logoUrl;
  currentUser;
  themeData: {
    siteLogo: '',
  };
  data;

  candidateData: any = {}
  registredData;
  isFailure = false;
  isSuccess = false;
  zipError = '';
  emailError = '';
  registerData: any = {};
  isFailure1 = false;
  companyName;
  jobList;
  jobPopup = false;
  name;
  constructor(private router: Router, private authenticationService: AuthenticationService, public mailService: MailService) { }

  ngOnInit() {
    this.authenticationService.getTheme()
      .subscribe(response => {
        const result = JSON.parse(localStorage.getItem('settings'));
        this.name = result.data.title;
        this.companyName = result.data.title;
        this.logoUrl = this.authenticationService.getBaseUrl() + '/frontend/logos/' + result.data.siteLogo;
        this.themeData = this.logoUrl;
        this.file1_input = this.themeData;
      });

    // getting job list data

    //  adding suresh 09-12-2019 start

    this.authenticationService.getJobListData().subscribe(res => {
      this.jobList = res.json().data;
    })
    //  adding suresh 09-12-2019 end
  }

  readMore() {
    this.jobPopup = true;
  }
  closeError() {
    this.jobPopup = false;
    this.isFailure1 = false;
    this.isFailure = false;
  }


  checkMail() {
    const email = this.candidateData.email;
    this.authenticationService.checkRegisterEmail(email)
      .subscribe(response => {
        const result = response.json();
        if (result.statusCode.code === '409') {
          this.candidateData.email = '';
          this.emailError = 'This email is already registered';
        } else {
          this.emailError = '';
          this.getPHPListToken();
          if (localStorage.getItem('phpListToken')) {
            this.mailService.addSubscriber(email)
              .subscribe(resp => {
                console.log('Add email');
                console.log(resp);
              },
                error => {
                  console.log(error);
                });
          }

        }
      },
        error => {
          console.log(error);
        });
  }

  getPHPListToken() {
    this.mailService.genToken('admin', 'Pass12!@')
      .subscribe(resp => {
        console.log('generate token');
        console.log(resp);
      },
        error => {
          console.log(error);
        });
  }

  userLogin() {
    this.loading = true;
    this.authenticationService.candidatelogin(this.user.userName, this.user.password)
      .pipe(first())
      .subscribe(data => {
        this.loading = false;
        if (data.statusCode.code === '200') {
          this.currentUser = JSON.parse(localStorage.getItem('candidateUserData'));
          if(this.currentUser.data.isNew === '0'){
            this.router.navigate(['/profile/changePassword']);
          }
          else if (this.currentUser.data.flag === '0') {
            this.router.navigate(['/profile/edit-profile']);
          } else {
            this.router.navigate(['/profile/my-profile']);
          }
        }
        else if (data.statusCode.code === '403') {
          this.error = data.errorMessages;
        }
        else if (data.statusCode.code === '422') {
          this.error = data.errorMessages;
        }
        else if (data.statusCode.code === '405') {
          this.error = data.errorMessages;
        }

      },
        error => {
          this.error = error.errorMessages;
          this.loading = false;
        });
  }

  register(registerFrm: NgForm) {
    this.registerData.firstName = this.candidateData.firstName;
    this.registerData.lastName = this.candidateData.lastName;
    this.registerData.password = this.candidateData.password;
    this.registerData.emailId = this.candidateData.email;
    this.registerData.phoneNo = this.candidateData.number;
    this.registerData.companyName = this.companyName;

    this.authenticationService.addRegister(this.candidateData).subscribe(res => {
      this.registredData = res.json();
      this.authenticationService.candidateRegister(this.registerData).subscribe(res => {
        this.data = res.json();
      })
      // changes suresh  09-03-2019 start
      if (this.registredData.statusCode.code === '200') {
        this.isSuccess = true;
        registerFrm.resetForm();

      } else {
        this.isFailure = true;
      }
    })
  };

  closePopup() {
    this.isSuccess = !this.isSuccess;
  };
  closePopup1() {
    this.isFailure = !this.isFailure;
  }
}

// adding --suresh-- 08-21-2019 end
