import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { combineLatest, Observable, of, from } from 'rxjs';
import { map, filter, tap, switchMap } from 'rxjs/operators';
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

  filterOptions$: Observable<Array<any>>;

  constructor() {}

  ngOnInit() {
    // Combine the combinedfilters with the selectedfilters to pass them to matchTags.

    this.years = this.combinedFilters$
      .pipe(
        // map((filters) => years = filters[0])
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
      )
      .subscribe();

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
    //   .subscribe();

    this.filterOptions$ = this.selectedFilters$.pipe(
      switchMap(selection => {
        let options = [];
        selection.map(option => {
          console.log('option: ', this.months);
          if (this.months[option]) {
            options.push(this.months[option]);
          }

          if (this.years[option]) {
            options.push(this.years[option]);
          }
          console.log('options array: ', options);
        });
        return options;
      })
    );
  }

  matchTags(tagsList, selectedTags) {
    return _.transform(
      tagsList,
      (result, option, key) => {
        _.map(selectedTags, selectedTag => {
          if (selectedTag === option.value) {
            result.push(option);
            return result;
          }
        });
      },
      []
    );
  }

  removeFilter(filter: string) {
    this.onRemoveFilter.emit(filter);
  }

  clearFilters() {
    this.onClearFilters.emit();
  }
}
