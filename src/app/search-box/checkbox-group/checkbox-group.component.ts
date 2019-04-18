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
    // If the selected option is in the selectedOptions array, then remove it from the array and reset the documents.
    if (this.currentSelectedOptions.indexOf(event.target.value) !== -1) {
      _.remove(
        this.currentSelectedOptions,
        selectedOption => selectedOption === event.target.value
      );
      // Emitting an empty string so the files reset to their original state.
      this.optionsSelected.emit('');
    } else {
      this.optionsSelected.emit(event.target.value);
    }
  }
}
