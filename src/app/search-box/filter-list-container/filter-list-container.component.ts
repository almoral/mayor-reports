import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'mdc-filter-list-container',
  templateUrl: './filter-list-container.component.html',
  styleUrls: ['./filter-list-container.component.css']
})
export class FilterListContainerComponent implements OnInit {
  @Input() showFiltersToggle: boolean;
  @Input() types$: Observable<Array<Object>>;
  @Input() categories$: Observable<Array<Object>>;
  @Input() currentSelectedTypes$: Observable<Array<Object>>;
  @Input() currentSelectedCategories$: Observable<Array<Object>>;

  @Output() onShowFilters = new EventEmitter();
  @Output() typesSelected = new EventEmitter();
  @Output() categoriesSelected = new EventEmitter();
  @Output() onClearFilters = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  // These are the year options
  onTypesSelected($event) {
    this.typesSelected.emit($event);
  }

  // These are the month options.
  onCategoriesSelected($event) {
    this.categoriesSelected.emit($event);
  }

  showFilters() {
    this.onShowFilters.emit((this.showFiltersToggle = !this.showFiltersToggle));
  }

  clearFilters() {
    this.onClearFilters.emit();
  }
}
