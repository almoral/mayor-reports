import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, map, tap, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';
import { DataStoreService } from './data-store.service';

export interface PDF {
    showMessage: boolean;
    filePath: string;
    fileSize: string;
    label: string;
    errorMessage: string;
    month: string;
    monthLabel: string;
    year: string;
}

@Injectable()
export class DocStoreService {
    documentSubject: BehaviorSubject<PDF[]> = new BehaviorSubject([
        {
            showMessage: false,
            filePath: '',
            fileSize: '',
            label: '',
            errorMessage: '',
            month: '',
            monthLabel: '',
            year: ''
        }
    ]);

    public documents$: Observable<PDF[]> = this.documentSubject.asObservable();

    constructor(private http: HttpClient, private route: ActivatedRoute, private dataStoreService: DataStoreService) {
        this.requestPdfs();
    }

    requestPdfs() {
        this.route.queryParams
            .pipe(
                switchMap((params: Params) => this.http.get(environment.mayorUrl, { params: params })),
                tap((file: any) => this.documentSubject.next(file)),
                tap(() =>
                    this.dataStoreService.filteredDocumentsSubject.next(
                        this.dataStoreService.filterDocumentsByTitle(this.documentSubject.getValue(), '')
                    )
                ),
                take(1)
            )
            .subscribe();
    }

    setMonthsSubject(months: string[]) {
        this.dataStoreService.currentSelectedMonthsSubject.next(months);
    }

    setYearsSubject(years: string[]) {
        this.dataStoreService.currentSelectedYearsSubject.next(years);
    }

    setSearchTermSubject(searchTerm: string) {
        this.dataStoreService.searchTermSubject.next(searchTerm);
    }

    filterPDFs() {
        const documents = this.dataStoreService.filterDocuments(
            this.documentSubject.getValue(),
            this.dataStoreService.searchTermSubject.getValue(),
            this.dataStoreService.currentSelectedMonthsSubject.getValue(),
            this.dataStoreService.currentSelectedYearsSubject.getValue()
        );

        this.dataStoreService.filteredDocumentsSubject.next(documents);
    }
}
