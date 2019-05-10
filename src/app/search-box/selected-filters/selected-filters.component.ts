import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import * as _ from 'lodash';

export interface FilterOption {
  value: string;
  label: string;
}

@Component({
  selector: 'mdc-selected-filters',
  templateUrl: './selected-filters.component.html',
  styleUrls: ['./selected-filters.component.css']
})
export class SelectedFiltersComponent implements OnInit {
  @Input() combinedFilters$: Observable<Array<FilterOption>>;
  @Input() selectedFilters$: Observable<Array<string>>;

  @Output() onRemoveFilter = new EventEmitter();
  @Output() onClearFilters = new EventEmitter();

  years = null;
  months = null;
  displayItem = false;

  filterOptions$: Observable<Array<any>>;

  constructor() {}

  ngOnInit() {
    // Creating a map for the list of years. I'm using the value to create the keys.
    this.years = this.combinedFilters$.pipe(
      map(filters => {
        return _.reduce(
          filters[1],
          (acc, filter) => {
            acc[filter.value] = filter;
            return acc;
          },
          {}
        );
      })
    );

    // Creating a map for the list of months. I'm using the value to create the keys.
    this.months = this.combinedFilters$.pipe(
      map(filters => {
        return _.reduce(
          filters[0],
          (acc, filter) => {
            acc[filter.value] = filter;
            return acc;
          },
          {}
        );
      })
    );

    // Combining the months and years maps to create a new map.
    const monthsAndYearsMap$ = combineLatest(this.months, this.years).pipe(
      filter(values => !_.isNil(values))
    );

    // Getting the values to display for the chips from the new map.
    this.filterOptions$ = this.selectedFilters$.pipe(
      // Displaying the chips section only if there is something to display.
      tap(selection => {
        for (let i = 0; i < 1; i++) {
          if (selection[i].length > 0 || selection[i + 1].length > 0) {
            this.displayItem = true;
          } else {
            this.displayItem = false;
          }
        }
      }),
      // Using switchmap to get the value from selectedFilters$ and pass it to  monthsAndYearsMap$.
      switchMap(selection => {
        return monthsAndYearsMap$.pipe(
          map(([months, years]) => {
            const options = [];
            options.push(years[selection[0]], months[selection[1]]);
            return options;
          })
        );
      })
    );
  }

  removeFilter(filter: string) {
    this.onRemoveFilter.emit(filter);
  }

  clearFilters() {
    this.onClearFilters.emit();
  }
}
