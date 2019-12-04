import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateforgetComponent } from './candidateforget/candidateforget.component';
import { CandidateresetpassComponent } from './candidateresetpass/candidateresetpass.component';
import { CandidateActivateComponent } from './candidate-activate/candidate-activate.component';
import { CandidateLoginRegisterComponent } from './candidate-login-register/candidate-login-register.component';
import { CareersComponent } from './careers/careers.component';
import { JobdetailComponent } from './jobdetail/jobdetail.component';

 
const routes: Routes = [
    { path: 'candidateactivate/:token' , component: CandidateActivateComponent },
    { path: 'candidateforget', component: CandidateforgetComponent },
    { path: 'candidatereset/:token', component: CandidateresetpassComponent },
    { path: 'candidate-login-register', component:CandidateLoginRegisterComponent},
    { path: 'careers', component:CareersComponent},
    { path: 'jobdetail/:id', component:JobdetailComponent},
    { path: '', redirectTo: 'candidatelogin', pathMatch: 'full' }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateAuthrizationRoutingModule { }
