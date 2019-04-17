import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import * as _ from 'lodash';
import { Option } from '../selected-filters/selected-filters.component';

@Component({
  selector: 'mdc-checkbox-group',
  templateUrl: 'checkbox-group.component.html',
  styleUrls: ['checkbox-group.component.css']
})
export class CheckboxGroupComponent implements OnInit {
  @Input()
  options: Array<Option>;

  @Input()
  currentSelectedOptions: Array<string>;

  @Output()
  optionsSelected = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  selectOption(event: any) {
    if (this.currentSelectedOptions.indexOf(event.target.value) !== -1) {
      _.remove(
        this.currentSelectedOptions,
        selectedOption => selectedOption === event.target.value
      );
      this.optionsSelected.emit(this.currentSelectedOptions);
    } else {
      //   this.currentSelectedOptions.push(event.target.value);
      this.currentSelectedOptions = event.target.value;
      //   this.optionsSelected.emit(this.currentSelectedOptions);
      this.optionsSelected.emit(event.target.value);
    }
  }
}
