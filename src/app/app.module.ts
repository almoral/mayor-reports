import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ResetButtonComponent } from './reset-button';
import { AppComponent } from './app.component';
import { MayorPdfSearchComponent } from './mayor-pdf-search/mayor-pdf-search.component';
import { FileListComponent } from './file-list/file-list.component';
import { Search } from './search.pipe';
import { FixUrl } from './fix-url.pipe';
import { DocStoreService } from './shared/services/doc-store.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UniqueValues } from './unique-values.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION
} from 'ngx-ui-loader';
import { SearchBoxModule } from './search-box/search-box.module';
import { MdcPaginationComponent } from './mdc-pagination/mdc-pagination.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { MonthService } from './shared/services/month.service';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#baa20a',
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  overlayColor: 'rgba(0, 0, 0, 0.5)'
};

@NgModule({
  declarations: [
    AppComponent,
    ResetButtonComponent,
    MayorPdfSearchComponent,
    FileListComponent,
    Search,
    FixUrl,
    UniqueValues,
    MdcPaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    SearchBoxModule,
    ScrollToModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [DocStoreService, MonthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
