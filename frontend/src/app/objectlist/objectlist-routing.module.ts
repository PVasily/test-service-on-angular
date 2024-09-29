import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectlistComponent } from './objectlist.component';
import { ItemsComponent } from '../items/items.component';

const routes: Routes = [
  {
    path: '',
    component: ObjectlistComponent
  },
  {
    path: ':id',
    component: ItemsComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectlistRoutingModule { }