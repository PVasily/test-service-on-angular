import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IttestsComponent } from '../ittests/ittests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IttestslistRoutingModule } from './ittestslist-routing.module';
import { QuestInGroupComponent } from '../quest-in-group/quest-in-group.component';



@NgModule({
  declarations: [QuestInGroupComponent],
  exports: [QuestInGroupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IttestslistRoutingModule
  ]
})
export class IttestslistModule { }
