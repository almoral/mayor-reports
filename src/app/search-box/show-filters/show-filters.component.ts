import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'mdc-show-filters',
  templateUrl: './show-filters.component.html',
  styleUrls: ['./show-filters.component.css']
})
export class ShowFiltersComponent implements OnInit {
  constructor() {}

  @Input() showFiltersButton: boolean;
  @Input() showFiltersToggle: boolean;
  @Input() targetSize: string;

  @Output() onShowFilters = new EventEmitter();

  ngOnInit() {}

  showFilters() {
    this.onShowFilters.emit(this.showFiltersToggle = !this.showFiltersToggle);
  }
}
