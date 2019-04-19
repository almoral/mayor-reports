import { Component, OnInit } from '@angular/core';
import { DocStoreService, PDF } from '../shared/services/doc-store.service';
import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MonthService } from '../shared/services/month.service';
import * as _ from 'lodash';
import { DataStoreService } from '../shared/services/data-store.service';
import { Option } from '../shared/interfaces/interfaces';

@Component({
    selector: 'mdc-mayor-pdf-search',
    templateUrl: './mayor-pdf-search.component.html',
    styleUrls: [ './mayor-pdf-search.component.css' ]
})
export class MayorPdfSearchComponent implements OnInit {
    files$: Observable<object>;
    yearsSubject = new BehaviorSubject<object[]>([]);
    years$ = this.yearsSubject.asObservable();

    currentSelectedYear$: Observable<string>;
    currentSelectedMonth$: Observable<string>;

    monthsSubject = new BehaviorSubject<Option[]>([]);
    months$ = this.monthsSubject.asObservable();

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
                    this.getYearsFromResults(this.documentService.documentSubject.getValue());
                    this.getMonthsFromService();
                    this.dataStoreService.documents = data;
                }
            })
        );
    }

    getYearsFromResults(data: object[]) {
        of(data)
            .pipe(
                map((files) => {
                    const years = _.compact(_.uniq(_.map(files, 'year')));
                    const arrayYears = [];
                    years.map((year) => {
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

    getMonthsFromService() {
        const months = this.monthService.months;
        const arrayMonths = [];
        months.map((month) => {
            arrayMonths.push({
                label: month.label,
                value: month.value,
                isDisabled: false,
                isSelected: false
            });
        });

        if (arrayMonths.length > 0) {
            this.monthsSubject.next(arrayMonths);
        }
    }

    setTitleFilter(searchTerm: string) {
        this.dataStoreService.filterDocumentsByTitle(this.documentService.documentSubject.getValue(), searchTerm);
    }

    // filterDocuments(month?: string, year?: string) {
    //     if (month && year) {
    //         this.dataStoreService.filterDocuments(this.documentService.documentSubject.getValue(), month, year);
    //     } else {
    //         this.filterByMonth(month);
    //         this.filterByYear(year);
    //     }
    // }

    filterByMonth(month: string) {
        this.dataStoreService.filterDocumentsByMonth(this.documentService.documentSubject.getValue(), month);
    }

    filterByYear(year: string) {
        this.dataStoreService.filterDocumentsByYear(this.documentService.documentSubject.getValue(), year);
    }

    getDocuments(term: string): Array<PDF> {
        let documents = [];

        if (!term) {
            documents = this.documentService.documentSubject.getValue().slice();
        } else {
            documents = this.dataStoreService.filteredDocumentsSubject.getValue().slice();
        }

        return documents;
    }
}
