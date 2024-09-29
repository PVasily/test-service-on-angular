import { NgModule } from "@angular/core";
import { CalculatorComponent } from "./calculator.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    imports: [FormsModule, BrowserModule],
    exports: [CalculatorComponent],
    declarations: [CalculatorComponent],
    providers: []
})

export class CalculatorModule {}