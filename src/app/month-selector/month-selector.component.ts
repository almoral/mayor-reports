import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-month-selector',
  templateUrl: 'month-selector.component.html',
  styleUrls: ['month-selector.component.css']
})
export class MonthSelectorComponent {

	@Input() months = "";
	@Output() selectMonth = new EventEmitter();


  constructor() {}

}
