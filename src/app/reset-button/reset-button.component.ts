import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-reset-button',
  templateUrl: 'reset-button.component.html',
  styleUrls: ['reset-button.component.css']
})
export class ResetButtonComponent {

	@Input() term:string;
	@Input() selectedYear:any;
	@Input() selectedMonth:any;

	@Output() reset = new EventEmitter();
	@Output() isActive:boolean = false;


}
