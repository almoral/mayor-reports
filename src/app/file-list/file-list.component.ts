import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mdc-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  @Input() term: string;

  @Input() selectedYear: string;

  @Input() selectedMonth: string;

  @Input() fileList: any;

  page = 1;

  constructor() {}

  ngOnInit() {}
}
