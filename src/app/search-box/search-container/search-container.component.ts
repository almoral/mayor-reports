import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { MonthService } from '../../shared/services/month.service';
import { DataStoreService } from '../../shared/services/data-store.service';

@Component({
  selector: 'mdc-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.css']
})
export class SearchContainerComponent implements OnInit, OnDestroy {
  constructor(
    private monthService: MonthService,
    private dataStoreService: DataStoreService
  ) {}

  showFiltersToggle = false;

  // Defining properties here to create reusable filter components.
  // We're using the smart container dumb component approach.

  @Input() years: any;
  @Input() months: any;

  @Input() textBoxPlaceholder: string;
  @Input() titleFilter$: string;
  @Input() liveFilter: boolean;
  @Input() types$ = new BehaviorSubject([]);

  @Input() currentSelectedTypes$ = new BehaviorSubject([]);
  @Input() categories$ = new BehaviorSubject([]);

  @Input() currentSelectedCategories$ = new BehaviorSubject([]);
  @Input() showFiltersButton: boolean;

  @Output() onSetTypesFilter = new EventEmitter();
  @Output() onSetCategoriesFilter = new EventEmitter();
  @Output() onSetTitleFilter = new EventEmitter();

  currentSelectedMonth$ = this.dataStoreService.currentSelectedMonth$;
  currentSelectedYear$ = this.dataStoreService.currentSelectedYear$;

  selectedFilters$: Observable<Array<Object>>;
  combinedFilters$: Observable<Array<Object>>;

  searchTermSubject = new BehaviorSubject('');
  searchTerm$ = this.searchTermSubject.asObservable();

  stopSubject = new Subject();
  stop$ = this.stopSubject.asObservable();

  // Setting the liveFilter value to false will display the search button and trigger a search by pressing enter in the textbox or by clicking on the search button.

  ngOnInit() {
    this.searchTerm$.pipe(takeUntil(this.stop$)).subscribe(term => {
      if (this.liveFilter) {
        this.filterByTitle(term);
      }
    });

    // Combining the different filter types to create a master list of filters to populate the chips.
    this.combinedFilters$ = combineLatest(this.months, this.years).pipe(
      tap(([types, categories]) =>
        console.log('types and categories: ', types, categories)
      )
      //   map(([types, categories]) => [...types, ...categories])
    );

    // Combining the different filter types to create a list of selected filters to populate the chips.
    this.selectedFilters$ = combineLatest(
      this.currentSelectedYear$,
      this.currentSelectedMonth$
    );
  }

  // Handling unsubscribptions from a single place.
  ngOnDestroy() {
    this.stopSubject.next();
  }

  // Calling lodash's difference method on both categories and types because the function ignores values that don't exist in the array it's looking at.
  removeFilter(searchTerm: string) {
    this.currentSelectedTypes$
      .pipe(
        map(types => _.difference(types, [searchTerm])),
        take(1)
      )
      .subscribe(value => {
        this.onSetTypesFilter.emit(value);
      });

    this.currentSelectedCategories$
      .pipe(
        map(categories => _.difference(categories, [searchTerm])),
        take(1)
      )
      .subscribe(value => {
        this.onSetCategoriesFilter.emit(value);
      });
  }

  showFilters(toggleValue: boolean) {
    this.showFiltersToggle = toggleValue;
  }

  setTitleFilter(title: string) {
    this.searchTermSubject.next(title);
  }

  // These are the years options.
  onTypesSelected(option: string) {
    this.onSetTypesFilter.emit(option);
  }

  // These are the month options.
  onCategoriesSelected(options: string[]) {
    this.onSetCategoriesFilter.emit(options);
  }

  //  This method is used by the search button and pressing enter on the textbox when liveFilter is set to false.
  updateTitleFilter() {
    this.onSetTitleFilter.emit(this.searchTermSubject.getValue());
  }

  // This method is used when liveFilter is set to true. It's a realtime filter.
  filterByTitle(title: string) {
    this.onSetTitleFilter.emit(title);
  }

  clearFilters() {
    this.onSetCategoriesFilter.emit([]);
    this.onSetTypesFilter.emit([]);
  }
}
