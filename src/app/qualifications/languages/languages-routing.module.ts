import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLanguageComponent } from './add-language/add-language.component';
import { EditLanguageComponent } from './edit-language/edit-language.component';
import { LanguagesComponent } from './languages/languages.component';
import { LayoutComponent } from "../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'languages', component: LanguagesComponent },
      { path: 'add-language', component: AddLanguageComponent },
      { path: 'edit-language/:id', component: EditLanguageComponent },
      { path: '', redirectTo: 'languages', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguagesRoutingModule { }
