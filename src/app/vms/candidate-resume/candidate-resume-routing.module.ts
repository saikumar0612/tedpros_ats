import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateResumeComponent } from './candidate-resume/candidate-resume.component';
import { CandidateResumeEditComponent } from './candidate-resume-edit/candidate-resume-edit.component';

import { DesignComponent } from '../top-menu/design/design.component';
import { PreviewComponent } from './preview/preview.component';
import { Preview1Component } from './preview1/preview1.component';
import { Preview2Component } from './preview2/preview2.component';
import { CandidateCalendarComponent }from './candidate-calendar/candidate-calendar.component'


const routes: Routes = [
  {
    path:'',component:DesignComponent, children:[
      { path: 'view-resume', component:CandidateResumeComponent},
      { path: 'edit-resume', component:CandidateResumeEditComponent},
      { path: 'calendar', component:CandidateCalendarComponent},
      { path: 'preview' , component:PreviewComponent},
      { path: 'preview-1', component:Preview1Component},
      { path: 'preview-2', component:Preview2Component},
      { path:'',redirectTo: 'view-resume', pathMatch: 'full'}
    ]
  }

 
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateResumeRoutingModule { }
 