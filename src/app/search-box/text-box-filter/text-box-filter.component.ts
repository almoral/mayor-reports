import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mdc-text-box-filter',
  templateUrl: './text-box-filter.component.html',
  styleUrls: ['./text-box-filter.component.css']
})
export class TextBoxFilterComponent implements OnInit {

  searchTerm: string;

  @Input() titleFilter: string;
  @Input() placeholderText: string;

  @Output() onFilterByTitle = new EventEmitter;
  @Output() onFilterByPressingEnter = new EventEmitter;

  constructor() {}

  ngOnInit() {

    if (this.titleFilter !== '' && this.searchTerm !== this.titleFilter) {
      this.searchTerm = this.titleFilter;
    }

  }

  filterByTitle(title: string) {
    this.onFilterByTitle.emit(title);
  }

  filterByPressingEnter() {
    this.onFilterByPressingEnter.emit();
  }


}
