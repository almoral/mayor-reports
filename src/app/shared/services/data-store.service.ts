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

    documentsByYearSubject = new BehaviorSubject<PDF[]>([]);
    documentsByMonthSubject = new BehaviorSubject<PDF[]>([]);

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
        // Determines whether or not the checkbox is checked.
        this.setMonthsSubject(month);

        // If month is unchecked
        if (!month) {
            // reset the documents.
            // this.filteredDocumentsSubject.next(documents);

            // check if there's a selected year
            if (this.documentsByYearSubject.getValue().length > 0) {
                // filter the documents by selected year.
                this.filteredDocumentsSubject.next(this.documentsByYearSubject.getValue());

                this.documentsByMonthSubject.next([]);

                return;
            }
        }

        // check if there's a selected year
        if (this.documentsByYearSubject.getValue().length > 0) {
            // filter the documents by selected year.
            this.filteredDocumentsSubject.next(
                _.filter(this.documentsByYearSubject.getValue(), (document: PDF) => {
                    return new RegExp(month, 'i').test(document.month);
                })
            );

            this.documentsByMonthSubject.next(
                _.filter(documents, (document: PDF) => {
                    return new RegExp(month, 'i').test(document.month);
                })
            );

            return;
        } else {
            this.documentsByMonthSubject.next(
                _.filter(documents, (document: PDF) => {
                    return new RegExp(month, 'i').test(document.month);
                })
            );

            this.filteredDocumentsSubject.next(
                _.filter(documents, (document: PDF) => {
                    return new RegExp(month, 'i').test(document.month);
                })
            );
        }
    }

    filterDocumentsByYear(documents: PDF[], year?: string) {
        this.setYearsSubject(year);

        if (!year) {
            this.filteredDocumentsSubject.next(documents);

            // check if there's a selected year
            if (this.documentsByMonthSubject.getValue().length > 0) {
                this.filteredDocumentsSubject.next(this.documentsByMonthSubject.getValue());

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

            this.documentsByYearSubject.next(
                _.filter(documents, (document: PDF) => {
                    return new RegExp(year, 'i').test(document.year);
                })
            );

            return;
        } else {
        }

        this.documentsByYearSubject.next(
            _.filter(documents, (document: PDF) => {
                return new RegExp(year, 'i').test(document.year);
            })
        );

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
