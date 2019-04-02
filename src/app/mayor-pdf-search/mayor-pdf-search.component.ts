import { Component, OnInit } from '@angular/core';
import { DocStoreService } from '../shared/services/doc-store.service';
import { Observable, of, from } from 'rxjs';
import { tap, distinctUntilChanged, map, filter, reduce } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MonthService } from '../shared/services/month.service';
import * as _ from 'lodash';

@Component({
  selector: 'mdc-mayor-pdf-search',
  templateUrl: './mayor-pdf-search.component.html',
  styleUrls: ['./mayor-pdf-search.component.css']
})
export class MayorPdfSearchComponent implements OnInit {
  files$: Observable<object>;
  years$: Observable<string[]>;

  months = this.monthService.months;

  constructor(
    private documentService: DocStoreService,
    private ngxService: NgxUiLoaderService,
    private monthService: MonthService
  ) {}

  ngOnInit() {
    this.ngxService.start();

    this.files$ = this.documentService.filteredDocuments$.pipe(
      tap((data: object[]) => {
        if (!_.isNil(data) && data.length > 0) {
          this.ngxService.stop();
          this.years$ = this.getYearsFromResults(data);
        }
      })
    );
  }

  getYearsFromResults(data: object[]): Observable<Array<string>> {
    return of(data).pipe(
      map(files => {
        return _.compact(_.uniq(_.map(files, 'year')));
      })
    );
  }

  setTitleFilter(searchTerm: string) {
    this.documentService.filterDocuments(searchTerm);
  }

  setMonthFilter(month: string) {
    this.documentService.filterDocuments(month);
  }

  setYearFilter(year: string) {
    this.documentService.filterDocuments(year);
  }
}
