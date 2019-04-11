import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Option } from '../../shared/interfaces/interfaces';
import { Compiler_compileModuleSync__POST_R3__ } from '@angular/core/src/linker/compiler';

@Component({
  selector: 'mdc-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {
  @Input() heading: string;
  @Input() options: Array<Option>;
  @Input() currentSelectedOptions: Array<Option>;

  @Output() optionsSelected = new EventEmitter();

  currentDisabledOptionsSubject = new BehaviorSubject<Array<Option>>([
    {
      value: '',
      label: '',
      isDisabled: false
    }
  ]);
  currentDisabledOptions$ = this.currentDisabledOptionsSubject.asObservable();

  constructor() {}

  ngOnInit() {}

  filterOptions(selectedOption: string): Array<Option> {
    _.map(this.options, option => {
      if (option.value.indexOf(selectedOption) === -1) {
        option.isDisabled = true;
      } else {
        option.isDisabled = false;
      }

      if (selectedOption === '') {
        option.isDisabled = false;
      }
    });

    return this.options.filter(
      opt => opt['value'].indexOf(selectedOption) === -1
    );
  }

  onOptionsSelected(option: string) {
    this.currentDisabledOptionsSubject.next(this.filterOptions(option));

    this.optionsSelected.emit(option);
  }
}
