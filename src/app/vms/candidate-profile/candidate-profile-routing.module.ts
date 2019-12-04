import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { EditcandidateProfileComponent } from './editcandidate-profile/editcandidate-profile.component';
import { DesignComponent } from '../top-menu/design/design.component';
import { SettingsComponent } from './settings/settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path:'', component:DesignComponent, children:[
      { path:'my-profile', component:CandidateProfileComponent },
      { path: 'edit-profile', component:EditcandidateProfileComponent},
      { path: 'account', component:SettingsComponent},
      { path: 'changePassword', component:ChangePasswordComponent},
      { path:'',redirectTo: 'my-profile', pathMatch: 'full' }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateProfileRoutingModule { }
