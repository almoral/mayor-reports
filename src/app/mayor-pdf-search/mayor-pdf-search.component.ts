import { Component, OnInit } from '@angular/core';
import { DocStoreService, PDF } from '../shared/services/doc-store.service';
import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MonthService } from '../shared/services/month.service';
import * as _ from 'lodash';
import { DataStoreService } from '../shared/services/data-store.service';
import { Option } from '../search-box/selected-filters/selected-filters.component';

@Component({
  selector: 'mdc-mayor-pdf-search',
  templateUrl: './mayor-pdf-search.component.html',
  styleUrls: ['./mayor-pdf-search.component.css']
})
export class MayorPdfSearchComponent implements OnInit {
  files$: Observable<object>;
  yearsSubject = new BehaviorSubject<object[]>([]);
  years$ = this.yearsSubject.asObservable();

  currentSelectedYear$: Observable<string>;
  currentSelectedMonth$: Observable<string>;

  months = this.monthService.months;

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
          this.getYearsFromResults(
            this.documentService.documentSubject.getValue()
          );
          this.dataStoreService.documents = data;
        }
      })
    );
  }

  getYearsFromResults(data: object[]) {
    of(data)
      .pipe(
        map(files => {
          const years = _.compact(_.uniq(_.map(files, 'year')));
          const arrayYears = [];
          years.map(year => {
            // Returning an object so the checkbox component gets the right shape.
            arrayYears.push({
              label: year,
              value: year,
              isDisabled: false
            });
          });
          if (arrayYears.length > 0) {
            this.yearsSubject.next(arrayYears);
          }
        }),
        take(1)
      )
      .subscribe();
  }

  setTitleFilter(searchTerm: string) {
    // this.documentService.setSearchTermSubject(searchTerm);

    this.dataStoreService.filterDocumentsByTitle(
      this.documentService.documentSubject.getValue(),
      searchTerm
    );
  }

  setMonthFilter(month: string) {
    // console.log('month filter: ', month);
    // this.documentService.setMonthsSubject(month);

    console.log(
      'months docs: ',
      this.documentService.documentSubject.getValue()
    );

    this.dataStoreService.filterDocumentsByMonth(
      this.documentService.documentSubject.getValue(),
      month
    );
  }

  setYearFilter(year: string) {
    // console.log('year filter: ', year);
    // this.documentService.setYearsSubject(year);
    this.dataStoreService.filterDocumentsByYear(
      this.documentService.documentSubject.getValue(),
      year
    );
  }
}
