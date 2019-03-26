import { Component, Input, OnInit } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import {Search} from '../search.pipe';
import {FixUrl} from '../fix-url.pipe';
import { UniqueValues } from '../unique-values.pipe';
import { DocStoreService } from '../shared/services/doc-store.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  @Input() term: string;

  @Input() selectedYear: string;

  @Input() selectedMonth: string;

  @Input() fileList: any;

  page = 1;


  constructor() { }

  ngOnInit() {

  }

}
