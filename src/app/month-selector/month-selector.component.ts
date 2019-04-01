import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mdc-month-selector',
  templateUrl: 'month-selector.component.html',
  styleUrls: ['month-selector.component.css']
})
export class MonthSelectorComponent {
  @Input() months: any;
  @Output() selectMonth = new EventEmitter();

  constructor() {}
}
