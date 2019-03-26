import { Component, OnInit } from '@angular/core';
import { DocStoreService } from '../shared/services/doc-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mayor-pdf-search',
  templateUrl: './mayor-pdf-search.component.html',
  styleUrls: ['./mayor-pdf-search.component.css']
})
export class MayorPdfSearchComponent implements OnInit {

  files$: Observable<object>;

  constructor(private documentService: DocStoreService) { }

  ngOnInit() {

    this.documentService.pdfs.subscribe();

    this.files$ = this.documentService.documents$;

    // this.documentService.documents$.subscribe( document => {
    //   this.files.push(document);
    //   console.log('returned doc: ', this.files);
    // });

  }

  setTitleFilter(searchTerm: string) {

    this.documentService.filterDocuments(searchTerm);
  }

}
