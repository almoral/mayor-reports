import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, filter, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
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
    private router: Router,
    private dataStoreService: DataStoreService,
    private location: Location
  ) {
    this.requestPdfs();
  }

  requestPdfs() {
    this.route.queryParams
      .pipe(
        switchMap((params: Params) => {
          // If there's a target folder defined in the component then pass that value a a query parameter.
          if (environment.targetFolder) {
            console.log('this route: ', this.route.snapshot.url);

            const urlTree = this.router.createUrlTree([], {
              relativeTo: this.route,
              queryParams: {
                folder: environment.targetFolder
              },
              queryParamsHandling: 'merge',
              skipLocationChange: true
            });

            this.router.navigateByUrl(urlTree);
            this.router.events
              .pipe(
                filter(event => event instanceof NavigationEnd),
                take(1)
              )
              .subscribe(() => this.location.replaceState(this.router.url));
          }
          return this.http.get(environment.mayorUrl, { params: params });
        })
      )
      .subscribe((file: any) => {
        this.documentSubject.next(file);
        this.dataStoreService.documentsSubject.next(file);
        this.dataStoreService.filteredDocumentsSubject.next(
          this.documentSubject.getValue()
        );
      });
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
