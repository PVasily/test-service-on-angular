import { NgModule } from '@angular/core';
import { ObjectlistComponent } from './objectlist.component';
import { ItemsComponent } from '../items/items.component';
import { CommonModule } from '@angular/common';
import { ObjectlistRoutingModule } from './objectlist-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filterItems.pipe';
import { ModalComponent } from '../modal/modal.component';
import { CreateItemComponent } from '../create-item/create-item.component';
import { FocusDirective } from '../focus.directive';


@NgModule({
    exports: [
      ObjectlistComponent, 
      ItemsComponent, 
      CreateItemComponent],
    declarations: [
      ObjectlistComponent, 
      ItemsComponent, 
      FilterPipe, 
      ModalComponent, 
      CreateItemComponent,
      FocusDirective
    ],
    providers: [],
    imports: [CommonModule, ObjectlistRoutingModule, FormsModule, ReactiveFormsModule]
})
export class ObjectlistModule { }
