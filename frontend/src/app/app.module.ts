import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculatorModule } from './calculator/calculator.module';
import { MyNavigation } from './navigation/navigation.component';
import { EmptyComponent } from './empty/empty.component';
import { ObjectlistModule } from './objectlist/objectlist.module';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { ModalComponent } from './modal/modal.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { FocusDirective } from './focus.directive';
import { IttestsComponent } from './ittests/ittests.component';
import { IttestslistComponent } from './ittestslist/ittestslist.component';
import { IttestslistModule } from './ittestslist/ittestslist.module';
import { QuestInGroupComponent } from './quest-in-group/quest-in-group.component';
import { QuestInGroupModule } from './quest-in-group/quest-in-group.module';



@NgModule({
  declarations: [
    AppComponent,
    MyNavigation,
    EmptyComponent,
    ErrorComponent,
    IttestslistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalculatorModule,
    ObjectlistModule,
    HttpClientModule,
    IttestslistModule,
    QuestInGroupModule,
    QuestInGroupModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
