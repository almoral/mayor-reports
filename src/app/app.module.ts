import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ResetButtonComponent } from './reset-button';
import { AppComponent } from './app.component';
import {MonthSelectorComponent} from './month-selector';
import {YearSelectorComponent} from './year-selector';
import { MayorPdfSearchComponent } from './mayor-pdf-search/mayor-pdf-search.component';
import { FileListComponent } from './file-list/file-list.component';
import {Search} from './search.pipe';
import {FixUrl} from './fix-url.pipe';
import { DocStoreService } from './shared/services/doc-store.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UniqueValues } from './unique-values.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchBoxModule} from './search-box/search-box.module';



@NgModule({
  declarations: [
    AppComponent,
    ResetButtonComponent,
    MonthSelectorComponent,
    YearSelectorComponent,
    MayorPdfSearchComponent,
    FileListComponent,
    Search,
    FixUrl,
    UniqueValues
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    SearchBoxModule
  ],
  providers: [
    DocStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
