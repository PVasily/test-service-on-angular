import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IttestsComponent } from '../ittests/ittests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestgroupRoutingModule } from './questgroup-routing.module';



@NgModule({
  declarations: [IttestsComponent],
  exports: [IttestsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuestgroupRoutingModule
  ]
})
export class QuestInGroupModule { }