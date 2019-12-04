import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSkillsComponent } from './add-skills/add-skills.component';
import { EditSkillComponent } from './edit-skill/edit-skill.component';
import { SkillsComponent } from './skills/skills.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'skills', component: SkillsComponent },
      { path: 'add-skill', component: AddSkillsComponent },
      { path: 'edit-skill/:id', component: EditSkillComponent },
      { path: '', redirectTo: 'skills', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillsRoutingModule { }
