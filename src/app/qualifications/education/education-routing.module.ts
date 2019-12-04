import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEducationComponent } from './add-education/add-education.component';
import { EditEducationComponent } from './edit-education/edit-education.component';
import { EducationComponent } from './education/education.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'education', component: EducationComponent },
      { path: 'add-education', component: AddEducationComponent },
      { path: 'edit-education/:id', component: EditEducationComponent },
      { path: '', redirectTo: 'education', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducationRoutingModule { }
