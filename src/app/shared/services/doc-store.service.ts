import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, map, tap, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';

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

    filteredDocumentsSubject = new BehaviorSubject<PDF[]>(null);
    filteredDocuments$ = this.filteredDocumentsSubject.asObservable();

    currentSelectedYearsSubject = new BehaviorSubject([]);
    currentSelectedYears$ = this.currentSelectedYearsSubject.asObservable();

    currentSelectedMonthsSubject = new BehaviorSubject([]);
    currentSelectedMonths$ = this.currentSelectedMonthsSubject.asObservable();

    constructor(private http: HttpClient, private route: ActivatedRoute) {
        this.requestPdfs();
    }

    requestPdfs() {
        this.route.queryParams
            .pipe(
                switchMap((params: Params) => this.http.get(environment.mayorUrl, { params: params })),
                tap((file: any) => this.documentSubject.next(file)),
                tap(() => this.filterDocuments('')),
                take(1)
            )
            .subscribe();
    }

    filterDocuments(searchTerm: string) {
        const documents = this.documentSubject.getValue();

        if (_.isEmpty(searchTerm)) {
            this.filteredDocumentsSubject.next(documents);
        }

        this.filteredDocumentsSubject.next(
            _.filter(documents, (document: PDF) => {
                return new RegExp(searchTerm, 'i').test(document.label);
            })
        );
    }
}
