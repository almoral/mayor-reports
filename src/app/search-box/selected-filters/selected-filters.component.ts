import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as _ from 'lodash';

export interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'mdc-selected-filters',
  templateUrl: './selected-filters.component.html',
  styleUrls: ['./selected-filters.component.css']
})
export class SelectedFiltersComponent implements OnInit {
  //   @Input() combinedFilters$: Observable<Array<Option>>;
  @Input() selectedFilters$: Observable<Array<Option | string>>;

  @Output() onRemoveFilter = new EventEmitter();
  @Output() onClearFilters = new EventEmitter();

  filterOptions$: Observable<Array<Option | string>>;

  constructor() {}

  ngOnInit() {
    // Check if the selected filters are an array of empty strings
    // this.selectedFilters.map(option => {
    //   if (option !== '') {
    //     this.filterOptions$ = of(this.selectedFilters);
    //   }
    // });

    this.filterOptions$ = this.selectedFilters$;
  }

  matchTags(tagsList: Array<Option>, selectedTags: Array<Option>) {
    return _.transform(
      tagsList,
      (result, option, key) => {
        _.map(selectedTags, selectedTag => {
          if (selectedTag === option.value) {
            result.push(option);
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
