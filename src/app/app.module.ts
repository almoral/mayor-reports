import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './search-box';
import { ResetButtonComponent } from './reset-button';
import { AppComponent } from './app.component';
import {MonthSelectorComponent} from './month-selector';
import {YearSelectorComponent} from './year-selector';


@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    ResetButtonComponent,
    MonthSelectorComponent,
    YearSelectorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
