import { Component, OnInit } from '@angular/core';
import { DocStoreService, PDF } from '../shared/services/doc-store.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MonthService } from '../shared/services/month.service';
import * as _ from 'lodash';
import { DataStoreService } from '../shared/services/data-store.service';

@Component({
  selector: 'mdc-mayor-pdf-search',
  templateUrl: './mayor-pdf-search.component.html',
  styleUrls: ['./mayor-pdf-search.component.css']
})
export class MayorPdfSearchComponent implements OnInit {
  files$: Observable<object>;
  years$ = this.dataStoreService.years$;

  currentSelectedYear$: Observable<string>;
  currentSelectedMonth$: Observable<string>;

  months$ = of(this.monthService.months);

  constructor(
    private documentService: DocStoreService,
    private ngxService: NgxUiLoaderService,
    private monthService: MonthService,
    private dataStoreService: DataStoreService
  ) {}

  ngOnInit() {
    this.ngxService.start();

    this.currentSelectedYear$ = this.dataStoreService.currentSelectedYear$;
    this.currentSelectedMonth$ = this.dataStoreService.currentSelectedMonth$;

    this.files$ = this.dataStoreService.filteredDocuments$.pipe(
      tap((data: PDF[]) => {
        if (!_.isNil(data) && data.length > 0) {
          this.ngxService.stop();
        }
      })
    );
  }

  setTitleFilter(searchTerm: string) {
    this.dataStoreService.filterDocumentsByTitle(
      this.dataStoreService.documentsSubject.getValue(),
      searchTerm
    );
  }

  filterByMonth(month: string) {
    this.dataStoreService.filterDocumentsByMonth(
      this.dataStoreService.documentsSubject.getValue(),
      month
    );
  }

  filterByYear(year: string) {
    this.dataStoreService.filterDocumentsByYear(
      this.dataStoreService.documentsSubject.getValue(),
      year
    );
  }

  getDocuments(term: string): Array<PDF> {
    let documents = [];

    if (!term) {
      documents = this.dataStoreService.documentsSubject.getValue().slice();
    } else {
      documents = this.dataStoreService.filteredDocumentsSubject
        .getValue()
        .slice();
    }

    return documents;
  }
}
