import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { EmptyComponent } from './empty/empty.component';
import { ObjectlistComponent } from './objectlist/objectlist.component';
import { ItemsComponent } from './items/items.component';
import { IttestsComponent } from './ittests/ittests.component';
import { IttestslistComponent } from './ittestslist/ittestslist.component';

const routes: Routes = [
  {
    path: 'calculator',
    component: CalculatorComponent
  },
  // {
  //   path: 'ittests',
  //   component: IttestslistComponent
  // },
  {
    path: 'ittests',
    loadChildren: () => import('./ittestslist/ittestslist.module').then(m => m.IttestslistModule)
  },
  {
    path: 'ittests/:id',
    loadChildren: () => import('./quest-in-group/quest-in-group.module').then(m => m.QuestInGroupModule)
  },
  {
    path: '',
    redirectTo: 'calculator',
    pathMatch: 'full'
  },
  {
    path: 'object-list',
    loadChildren: () => import('./objectlist/objectlist.module').then(m => m.ObjectlistModule)
  },
  {
    path: '**',
    component: EmptyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
