import { Component, OnInit } from '@angular/core';
import { DocStoreService } from '../shared/services/doc-store.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MonthService } from '../shared/services/month.service';
import * as _ from 'lodash';

@Component({
    selector: 'mdc-mayor-pdf-search',
    templateUrl: './mayor-pdf-search.component.html',
    styleUrls: [ './mayor-pdf-search.component.css' ]
})
export class MayorPdfSearchComponent implements OnInit {
    files$: Observable<object>;
    years$ = new BehaviorSubject<object[]>([]);

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

    getYearsFromResults(data: object[]): Observable<Array<object>> {
        return of(data).pipe(
            map((files) => {
                const years = _.compact(_.uniq(_.map(files, 'year')));
                return years.map((year) => {
                    // Returning an object so the checkbox component gets the right shape.
                    return {
                        label: year,
                        value: year
                    };
                });
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
