import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IttestslistComponent } from './ittestslist.component';
import { IttestsComponent } from '../ittests/ittests.component';
import { QuestInGroupComponent } from '../quest-in-group/quest-in-group.component';


const routes: Routes = [
  {
    path: '',
    component: IttestslistComponent
  },
  {
    path: ':id',
    component: QuestInGroupComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IttestslistRoutingModule { }