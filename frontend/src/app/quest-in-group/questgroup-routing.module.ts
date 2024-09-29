import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from '../items/items.component';
import { IttestslistComponent } from '../ittestslist/ittestslist.component';
import { QuestInGroupComponent } from './quest-in-group.component';
import { IttestsComponent } from '../ittests/ittests.component';

const routes: Routes = [
  {
    path: '',
    component: QuestInGroupComponent
  },
  {
    path: ':id',
    component: IttestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestgroupRoutingModule {

 }