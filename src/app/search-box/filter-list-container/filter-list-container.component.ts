import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'mdc-filter-list-container',
    templateUrl: './filter-list-container.component.html',
    styleUrls: [ './filter-list-container.component.css' ]
})
export class FilterListContainerComponent implements OnInit {
    @Input() showFiltersToggle: boolean;
    @Input() options1: Array<Object>;
    @Input() options2: Array<Object>;
    @Input() currentSelectedTypes$: Observable<Array<Object>>;
    @Input() currentSelectedCategories$: Observable<Array<Object>>;

    @Output() onShowFilters = new EventEmitter();
    @Output() yearSelected = new EventEmitter();
    @Output() monthSeleted = new EventEmitter();
    @Output() onClearFilters = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    onTypesSelected($event) {
        this.yearSelected.emit($event);
    }

    onCategoriesSelected($event) {
        this.monthSeleted.emit($event);
    }

    showFilters() {
        this.onShowFilters.emit((this.showFiltersToggle = !this.showFiltersToggle));
    }

    clearFilters() {
        this.onClearFilters.emit();
    }
}
