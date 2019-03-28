import { Component, OnInit } from '@angular/core';
import { DocStoreService } from '../shared/services/doc-store.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mdc-mayor-pdf-search',
  templateUrl: './mayor-pdf-search.component.html',
  styleUrls: ['./mayor-pdf-search.component.css']
})
export class MayorPdfSearchComponent implements OnInit {
  files$: Observable<object>;

  constructor(private documentService: DocStoreService) {}

  ngOnInit() {
    this.files$ = this.documentService.filteredDocuments$;
  }

  setTitleFilter(searchTerm: string) {
    this.documentService.filterDocuments(searchTerm);
  }
}
