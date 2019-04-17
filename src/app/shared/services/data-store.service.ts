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
    return this.filterDocumentsByTitle(
      this.filterDocumentsByMonth(
        this.filterDocumentsByYear(documents, years),
        months
      ),
      searchTerm
    );
  }

  filterDocumentsByTitle(documents: PDF[], searchTerm?: string) {
    if (_.isEmpty(searchTerm)) {
      this.filteredDocumentsSubject.next(documents);
    }

    this.filteredDocumentsSubject.next(
      _.filter(documents, (document: PDF) => {
        return new RegExp(searchTerm, 'i').test(document.label);
      })
    );

    return this.filteredDocumentsSubject.getValue();
  }

  filterDocumentsByMonth(documents: PDF[], month?: string) {
    if (!month) {
      this.filteredDocumentsSubject.next(documents);
    }

    // filter by intersecting months.
    this.filteredDocumentsSubject.next(
      _.filter(documents, (document: PDF) => {
        return new RegExp(month, 'i').test(document.label);
      })
    );

    return this.filteredDocumentsSubject.getValue();
  }

  filterDocumentsByYear(documents: PDF[], year?: string) {
    if (!year) {
      this.filteredDocumentsSubject.next(documents);
    }

    // filter by intersecting years.
    this.filteredDocumentsSubject.next(
      _.filter(documents, (document: PDF) => {
        return new RegExp(year, 'i').test(document.label);
      })
    );

    return this.filteredDocumentsSubject.getValue();
  }

  //   filterDocuments(searchTerm: string) {
  //     const documents = this.documentSubject.getValue();

  //     if (_.isEmpty(searchTerm)) {
  //       this.filteredDocumentsSubject.next(documents);
  //     }

  //     this.filteredDocumentsSubject.next(
  //       _.filter(documents, (document: PDF) => {
  //         return new RegExp(searchTerm, 'i').test(document.label);
  //       })
  //     );
  //   }
}
