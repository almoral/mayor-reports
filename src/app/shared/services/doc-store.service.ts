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

  searchTermSubject = new BehaviorSubject('');
  searchTerm$ = this.searchTermSubject.asObservable();

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.requestPdfs();
  }

  requestPdfs() {
    this.route.queryParams
      .pipe(
        switchMap((params: Params) =>
          this.http.get(environment.mayorUrl, { params: params })
        ),
        tap((file: any) => this.documentSubject.next(file)),
        tap(() =>
          this.filteredDocumentsSubject.next(
            this.filterDocumentsByTitle(this.documentSubject.getValue(), '')
          )
        ),
        take(1)
      )
      .subscribe();
  }

  setMonthsSubject(months: string[]) {
    this.currentSelectedMonthsSubject.next(months);
  }

  setYearsSubject(years: string[]) {
    this.currentSelectedYearsSubject.next(years);
  }

  setSearchTermSubject(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);
  }

  filterPDFs() {
    const documents = this.filterDocuments(
      this.documentSubject.getValue(),
      this.searchTermSubject.getValue(),
      this.currentSelectedMonthsSubject.getValue(),
      this.currentSelectedYearsSubject.getValue()
    );

    this.filteredDocumentsSubject.next(documents);
  }

  filterDocuments(
    documents: PDF[],
    searchTerm?: string,
    months?: string[],
    years?: string[]
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
}
