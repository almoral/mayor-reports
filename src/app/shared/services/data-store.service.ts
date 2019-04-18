import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PDF } from './doc-store.service';
import * as _ from 'lodash';

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

  searchTermSubject = new BehaviorSubject('');
  searchTerm$ = this.searchTermSubject.asObservable();

  documents: Array<PDF>;

  constructor() {}

  setMonthsSubject(month: string) {
    this.currentSelectedMonthSubject.next(month);
  }

  setYearsSubject(year: string) {
    this.currentSelectedYearSubject.next(year);
  }

  setSearchTermSubject(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);
  }

  filterDocuments(
    documents: PDF[],
    searchTerm?: string,
    months?: string,
    years?: string
  ) {
    this.filteredDocumentsSubject.next(
      this.filterDocumentsByTitle(
        this.filterDocumentsByMonth(
          this.filterDocumentsByYear(documents, years),
          months
        ),
        searchTerm
      )
    );
  }

  filterDocumentsByTitle(documents: PDF[], searchTerm?: string) {
    if (!searchTerm) {
      this.filteredDocumentsSubject.next(documents);
      return this.filteredDocumentsSubject.getValue();
    }

    this.filteredDocumentsSubject.next(
      _.filter(documents, (document: PDF) => {
        return new RegExp(searchTerm, 'i').test(document.label);
      })
    );
  }

  filterDocumentsByMonth(documents: PDF[], month?: string) {
    if (!month) {
      this.filteredDocumentsSubject.next(documents);
      return this.filteredDocumentsSubject.getValue();
    }

    this.filteredDocumentsSubject.next(
      _.filter(documents, (document: PDF) => {
        return new RegExp(month, 'i').test(document.month);
      })
    );
  }

  filterDocumentsByYear(documents: PDF[], year?: string) {
    if (!year) {
      this.filteredDocumentsSubject.next(documents);
      return this.filteredDocumentsSubject.getValue();
    }

    this.filteredDocumentsSubject.next(
      _.filter(documents, (document: PDF) => {
        return new RegExp(year, 'i').test(document.year);
      })
    );
  }

  resetFilters(documents: Array<PDF>) {
    this.filterDocumentsByMonth(documents, '');
    this.filterDocumentsByYear(documents, '');
    this.filterDocumentsByTitle(documents, '');

    this.currentSelectedMonthSubject.next('');
    this.currentSelectedYearSubject.next('');
  }
}
