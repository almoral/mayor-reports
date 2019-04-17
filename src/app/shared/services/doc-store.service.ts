import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, tap, take } from 'rxjs/operators';
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

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private dataStoreService: DataStoreService
  ) {
    this.requestPdfs();
  }

  requestPdfs() {
    this.route.queryParams
      .pipe(
        switchMap((params: Params) =>
          this.http.get(environment.mayorUrl, { params: params })
        ),
        tap((file: any) => this.documentSubject.next(file)),
        tap(() => {
          this.dataStoreService.filteredDocumentsSubject.next(
            this.documentSubject.getValue()
          );
        }),
        take(1)
      )
      .subscribe();
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
