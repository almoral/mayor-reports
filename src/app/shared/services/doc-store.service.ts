import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';


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

  private documentSubject: BehaviorSubject<PDF[]> = new BehaviorSubject([{
    showMessage: false,
    filePath: '',
    fileSize: '',
    label: '',
    errorMessage: '',
    month: '',
    monthLabel: '',
    year: ''
  }]);

  public documents$: Observable<PDF[]> = this.documentSubject.asObservable();


  constructor(private http: HttpClient,
              private route: ActivatedRoute) {

  }

  get pdfs() {
    return this.route.queryParams
      .pipe(
        switchMap((params: Params) => this.http.get(environment.mayorUrl, {params:  params})),
        tap((file: any) => this.documentSubject.next(file))
      );
      // .subscribe((file: any) => this.documentSubject.next(file));
  }


  filterDocuments (searchTerm: string) {

    console.log('search term: ', searchTerm);

    const filteredDocs$ = this.documents$;

    filteredDocs$
      .pipe(
        map((docs) => {
          console.log('test docs: ', docs);
          docs.filter((doc: PDF) => {

            console.log('doc label: ', doc.label);
            if (doc.label) {
              return doc.label.indexOf(searchTerm) > -1;
            }
          });
        }),
        // tap((results) => console.log('results: ', results))
      ).subscribe()
  }

}
