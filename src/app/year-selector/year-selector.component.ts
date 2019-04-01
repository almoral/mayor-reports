import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UniqueValues } from '../unique-values.pipe';

@Component({
  moduleId: module.id,
  selector: 'mdc-year-selector',
  templateUrl: 'year-selector.component.html',
  styleUrls: ['year-selector.component.css']
})
export class YearSelectorComponent {
  @Input() files = '';
  @Output() select = new EventEmitter();

  constructor() {}

  onChange(selectedValue: string) {
    //console.log('selected value: ', selectedValue);
    this.select.emit(selectedValue);
  }
}
