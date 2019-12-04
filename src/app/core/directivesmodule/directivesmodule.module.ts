import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleCaseDirective } from '../directives/TitleCaseDirective'


@NgModule({
  declarations: [
    TitleCaseDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TitleCaseDirective
  ]
})
export class DirectivesmoduleModule { }
