import { Component, OnInit } from '@angular/core';
import { DocStoreService } from '../shared/services/doc-store.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
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
  yearsSubject = new BehaviorSubject<object[]>([]);
  years$ = this.yearsSubject.asObservable();

  currentSelectedYears$: Observable<string[]>;
  currentSelectedMonths$: Observable<string[]>;

  months = this.monthService.months;

  constructor(
    private documentService: DocStoreService,
    private ngxService: NgxUiLoaderService,
    private monthService: MonthService
  ) {}

  ngOnInit() {
    this.ngxService.start();

    this.currentSelectedYears$ = this.documentService.currentSelectedYears$;
    this.currentSelectedMonths$ = this.documentService.currentSelectedMonths$;

    this.files$ = this.documentService.filteredDocuments$.pipe(
      tap((data: object[]) => {
        // console.log('data: ', data);
        if (!_.isNil(data) && data.length > 0) {
          this.ngxService.stop();
          this.getYearsFromResults(data);
        }
      })
    );

    this.documentService.searchTerm$
      .pipe(take(1))
      .subscribe(searchTerm =>
        this.documentService.filteredDocumentsSubject.next(this.filterEvents())
      );
    this.documentService.currentSelectedMonths$
      .pipe(take(1))
      .subscribe(months =>
        this.documentService.filteredDocumentsSubject.next(this.filterEvents())
      );
    this.documentService.currentSelectedYears$
      .pipe(take(1))
      .subscribe(years =>
        this.documentService.filteredDocumentsSubject.next(this.filterEvents())
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
    this.documentService.setSearchTermSubject(searchTerm);
  }

  setMonthFilter(months: string[]) {
    this.documentService.setMonthsSubject(months);
  }

  setYearFilter(year: string[]) {
    this.documentService.setYearsSubject(year);
  }

  filterEvents() {
    return this.documentService.filterDocuments(
      this.documentService.documentSubject.getValue(),
      this.documentService.searchTermSubject.getValue(),
      this.documentService.currentSelectedMonthsSubject.getValue(),
      this.documentService.currentSelectedYearsSubject.getValue()
    );
  }
}
