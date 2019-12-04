import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from "../../shared/layout/layout.component";
import { PrerequisitesComponent } from './prerequisites/prerequisites.component';
import { AddPrerequisiteDocComponent } from './add-prerequisite-doc/add-prerequisite-doc.component';
import { EditPrerequisiteDocComponent } from './edit-prerequisite-doc/edit-prerequisite-doc.component';
import { ViewPrerequisiteDocComponent } from './view-prerequisite-doc/view-prerequisite-doc.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'prequisite-list', component:PrerequisitesComponent  },
      { path: 'add-prerequisite-doc', component: AddPrerequisiteDocComponent },
      { path: 'edit-prerequisite-doc/:id', component: EditPrerequisiteDocComponent },
      { path: 'view-prerequisite-doc/:id', component: ViewPrerequisiteDocComponent },
      { path: '', redirectTo: 'prequisite-list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrerequisiteRoutingModule { }
