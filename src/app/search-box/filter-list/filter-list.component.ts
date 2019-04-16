import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mdc-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {
  @Input() heading: string;
  @Input() options: Array<Object>;
  @Input() currentSelectedOptions: Array<Object>;

  @Output() optionsSelected = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onOptionsSelected(option: string) {
    this.optionsSelected.emit(option);
  }
}
