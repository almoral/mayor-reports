import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { PDF } from './doc-store.service';
import * as _ from 'lodash';
import { take, map } from 'rxjs/operators';
import { MonthService } from './month.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  filteredDocumentsSubject = new BehaviorSubject<PDF[]>(null);
  filteredDocuments$ = this.filteredDocumentsSubject.asObservable();

  currentSelectedYearSubject = new BehaviorSubject('');
  currentSelectedYear$ = this.currentSelectedYearSubject.asObservable();

  currentSelectedMonthSubject = new BehaviorSubject('');
  currentSelectedMonth$ = this.currentSelectedMonthSubject.asObservable();

  documentsByYearSubject = new BehaviorSubject<PDF[]>([]);
  documentsByMonthSubject = new BehaviorSubject<PDF[]>([]);

  searchTermSubject = new BehaviorSubject('');
  searchTerm$ = this.searchTermSubject.asObservable();

  yearsSubject = new BehaviorSubject([]);
  years$ = this.yearsSubject.asObservable();

  months$ = of(this.monthService.months);

  documentsSubject = new BehaviorSubject<PDF[]>([]);
  documents$ = this.documentsSubject.asObservable();

  constructor(private monthService: MonthService) {
    this.documents$.subscribe(document => this.getYearsFromResults(document));
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
              isDisabled: false,
              isSelected: false
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

  setMonthsSubject(month: string) {
    this.currentSelectedMonthSubject.next(month);
  }

  setYearsSubject(year: string) {
    this.currentSelectedYearSubject.next(year);
  }

  setSearchTermSubject(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);
  }

  filterDocumentsByTitle(documents: PDF[], searchTerm?: string) {
    if (!searchTerm) {
      this.filteredDocumentsSubject.next(documents);
      this.filterDocumentsByMonth(documents, '');
      this.filterDocumentsByYear(documents, '');
    }

    this.filteredDocumentsSubject.next(
      _.filter(documents, (document: PDF) => {
        return new RegExp(searchTerm, 'i').test(document.label);
      })
    );
  }

  filterDocumentsByMonth(documents: PDF[], month?: string) {
    // Determines whether or not the checkbox is checked.
    this.setMonthsSubject(month);

    const filteredDocuments = _.filter(documents, (document: PDF) => {
      return new RegExp(month, 'i').test(document.month);
    });

    // If month is unchecked
    if (!month) {
      // check if there's a selected year
      if (this.documentsByYearSubject.getValue().length > 0) {
        // filter the documents by selected year.
        this.filteredDocumentsSubject.next(
          this.documentsByYearSubject.getValue()
        );

        // Reset the documentsByMonthSubject
        this.documentsByMonthSubject.next([]);

        return;
      }
    }

    // check if there's a selected year
    if (this.documentsByYearSubject.getValue().length > 0) {
      // filter the documentsByYearSubject values by month
      this.filteredDocumentsSubject.next(
        _.filter(this.documentsByYearSubject.getValue(), (document: PDF) => {
          return new RegExp(month, 'i').test(document.month);
        })
      );

      this.documentsByMonthSubject.next(filteredDocuments);

      return;
    }
    this.documentsByMonthSubject.next(filteredDocuments);

    this.filteredDocumentsSubject.next(this.documentsByMonthSubject.getValue());
  }

  filterDocumentsByYear(documents: PDF[], year?: string) {
    this.setYearsSubject(year);

    const filteredDocuments = _.filter(documents, (document: PDF) => {
      return new RegExp(year, 'i').test(document.year);
    });

    if (!year) {
      this.filteredDocumentsSubject.next(documents);

      // check if there's a selected year
      if (this.documentsByMonthSubject.getValue().length > 0) {
        this.filteredDocumentsSubject.next(
          this.documentsByMonthSubject.getValue()
        );

        this.documentsByYearSubject.next([]);

        return;
      }
    }

    // If there documents are filtered by month.
    if (this.documentsByMonthSubject.getValue().length > 0) {
      // filter the documents by selected year.
      this.filteredDocumentsSubject.next(
        _.filter(this.documentsByMonthSubject.getValue(), (document: PDF) => {
          return new RegExp(year, 'i').test(document.year);
        })
      );

      this.documentsByYearSubject.next(filteredDocuments);

      return;
    }

    this.documentsByYearSubject.next(filteredDocuments);

    this.filteredDocumentsSubject.next(this.documentsByYearSubject.getValue());
  }

  resetFilters(documents: Array<PDF>) {
    this.filterDocumentsByMonth(documents, '');
    this.filterDocumentsByYear(documents, '');
    this.filterDocumentsByTitle(documents, '');

    this.currentSelectedMonthSubject.next('');
    this.currentSelectedYearSubject.next('');
  }
}
