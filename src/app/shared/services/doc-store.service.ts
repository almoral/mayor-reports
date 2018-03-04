import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';


@Injectable()
export class DocStoreService {

  private documentSubject: BehaviorSubject<object> = new BehaviorSubject([]);
  public documents$: Observable<object> = this.documentSubject.asObservable();


  constructor(private http: HttpClient,
              private route: ActivatedRoute) {

    this.initializeService();
  }

  initializeService() {
    this.route.queryParams
      .pipe(
        switchMap((params: Params) => this.http.get(environment.mayorUrl, {params:  params}))
      )
      .subscribe(file => this.documentSubject.next(file));
  }

}
