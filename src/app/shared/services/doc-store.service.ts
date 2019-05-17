import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
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

    constructor(private http: HttpClient, private dataStoreService: DataStoreService) {
        this.requestPdfs();
    }

    requestPdfs() {
        if (environment.targetFolder) {
            const params = new HttpParams().set('folder', environment.targetFolder);

            this.http.get(environment.mayorUrl, { params: params }).subscribe((file: any) => {
                this.documentSubject.next(file);
                this.dataStoreService.documentsSubject.next(file);
                this.dataStoreService.filteredDocumentsSubject.next(this.documentSubject.getValue());
            });
        } else {
            this.http.get(environment.mayorUrl).subscribe((file: any) => {
                this.documentSubject.next(file);
                this.dataStoreService.documentsSubject.next(file);
                this.dataStoreService.filteredDocumentsSubject.next(this.documentSubject.getValue());
            });
        }
    }

    setMonthsSubject(month: string) {
        this.dataStoreService.currentSelectedMonthSubject.next(month);
    }

    setYearsSubject(year: string) {
        this.dataStoreService.currentSelectedYearSubject.next(year);
    }

    setSearchTermSubject(searchTerm: string) {
        this.dataStoreService.searchTermSubject.next(searchTerm);
    }
}
