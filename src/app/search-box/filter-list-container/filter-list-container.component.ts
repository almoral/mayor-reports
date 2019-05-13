import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'mdc-filter-list-container',
    templateUrl: './filter-list-container.component.html',
    styleUrls: [ './filter-list-container.component.css' ]
})
export class FilterListContainerComponent implements OnInit {
    @Input() showFiltersToggle: boolean;
    @Input() years$: Observable<Array<Object>>;
    @Input() months$: Observable<Array<Object>>;
    @Input() currentSelectedMonth$: Observable<Array<Object>>;
    @Input() currentSelectedYear$: Observable<Array<Object>>;

    @Output() onShowFilters = new EventEmitter();
    @Output() yearSelected = new EventEmitter();
    @Output() monthSelected = new EventEmitter();
    @Output() onClearFilters = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    // These are the year options
    onYearSelected($event) {
        this.yearSelected.emit($event);
    }

    // These are the month options.
    onMonthSelected($event) {
        this.monthSelected.emit($event);
    }

    showFilters() {
        this.onShowFilters.emit((this.showFiltersToggle = !this.showFiltersToggle));
    }

    clearFilters() {
        this.onClearFilters.emit();
    }
}
