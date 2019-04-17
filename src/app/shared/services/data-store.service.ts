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

    currentSelectedYearsSubject = new BehaviorSubject([]);
    currentSelectedYears$ = this.currentSelectedYearsSubject.asObservable();

    currentSelectedMonthsSubject = new BehaviorSubject([]);
    currentSelectedMonths$ = this.currentSelectedMonthsSubject.asObservable();

    searchTermSubject = new BehaviorSubject('');
    searchTerm$ = this.searchTermSubject.asObservable();

    constructor() {}

    setMonthsSubject(months: string[]) {
        this.currentSelectedMonthsSubject.next(months);
    }

    setYearsSubject(years: string[]) {
        this.currentSelectedYearsSubject.next(years);
    }

    setSearchTermSubject(searchTerm: string) {
        this.searchTermSubject.next(searchTerm);
    }

    filterDocuments(documents: PDF[], searchTerm?: string, months?: string[], years?: string[]) {
        return this.filterDocumentsByTitle(
            this.filterDocumentsByMonth(this.filterDocumentsByYear(documents, years), months),
            searchTerm
        );
    }

    filterDocumentsByTitle(documents: PDF[], searchTerm?: string) {
        if (_.isEmpty(searchTerm)) {
            return documents;
        }

        return _.filter(documents, (document: PDF) => {
            return new RegExp(searchTerm, 'i').test(document.label);
        });
    }

    filterDocumentsByMonth(documents: PDF[], months?: string[]) {
        if (months.length === 0) {
            return documents;
        }

        // filter by intersecting months.
        return _.filter(documents, (document: PDF) => {
            return !_.isEmpty(_.intersection(months, document.label));
        });
    }

    filterDocumentsByYear(documents: PDF[], years?: string[]) {
        if (years.length === 0) {
            return documents;
        }

        // filter by intersecting years.
        return _.filter(documents, (document: PDF) => {
            return !_.isEmpty(_.intersection(years, document.label));
        });
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
