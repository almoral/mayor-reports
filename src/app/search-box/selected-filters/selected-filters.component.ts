import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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


  @Input() combinedFilters$: Observable<Array<Option>>;
  @Input() selectedFilters$: Observable<Array<Option>>;


  @Output() onRemoveFilter = new EventEmitter;
  @Output() onClearFilters = new EventEmitter;

  filterOptions$: Observable<Array<Option>>;


  constructor() {}

  ngOnInit() {

    this.filterOptions$ = combineLatest(this.combinedFilters$, this.selectedFilters$)
      .pipe(
        map(([tagsList, selectedTags]) =>
          this.matchTags(tagsList, selectedTags))
      );
  }


  matchTags(tagsList: Array<Option>, selectedTags: Array<Option>) {

    return _.transform(tagsList, (result, option, key) => {
      _.map(selectedTags, (selectedTag) => {
        if (selectedTag === option.value) {
          result.push(option);
          }
      });
    }, []);
  }

  removeFilter(filter: string) {
    this.onRemoveFilter.emit(filter);
  }

  clearFilters() {
    this.onClearFilters.emit();
  }
}
