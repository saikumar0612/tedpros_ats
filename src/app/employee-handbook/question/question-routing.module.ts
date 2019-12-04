import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from "../../shared/layout/layout.component";
import { QuestionComponent } from './question/question.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { ViewQuestionComponent } from './view-question/view-question.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'questions', component:QuestionComponent  },
      { path: 'add-question', component: AddQuestionComponent },
      { path: 'edit-question/:id', component: EditQuestionComponent },
      { path: 'view-question/:id', component: ViewQuestionComponent },
      { path: '', redirectTo: 'questions', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
