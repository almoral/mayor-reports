import { Component, OnInit } from '@angular/core';
import { DocStoreService } from '../shared/services/doc-store.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MonthService } from '../shared/services/month.service';

@Component({
  selector: 'mdc-mayor-pdf-search',
  templateUrl: './mayor-pdf-search.component.html',
  styleUrls: ['./mayor-pdf-search.component.css']
})
export class MayorPdfSearchComponent implements OnInit {
  files$: Observable<object>;
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
        if (data && data.length > 0) {
          this.ngxService.stop();
        }
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
