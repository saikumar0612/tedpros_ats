import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { EditCandidateComponent } from './edit-candidate/edit-candidate.component';
import { ViewCandidateComponent } from './view-candidate/view-candidate.component';
import { ResumeComponent } from './resume/resume.component';
import { Resume1Component } from './resume1/resume1.component';
import { Resume2Component } from './resume2/resume2.component';
import { LayoutComponent } from "../../shared/layout/layout.component";
import { UploadCandidatedocumentsComponent } from './upload-candidatedocuments/upload-candidatedocuments.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'add-candidate', component: AddCandidateComponent },
      { path: 'view-candidate/:id', component: ViewCandidateComponent },
      { path: 'edit-candidate/:id', component: EditCandidateComponent },
      { path: 'candidate', component: CandidateListComponent },
      { path: 'preview/:id', component: ResumeComponent },
      { path: 'preview-1/:id', component: Resume1Component },
      { path: 'preview-2/:id', component: Resume2Component },
      { path: 'candidate-documents/:id', component: UploadCandidatedocumentsComponent },
      { path: '', redirectTo: 'candidate', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
