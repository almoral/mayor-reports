import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-search-box',
  templateUrl: 'search-box.component.html',
  styleUrls: ['search-box.component.css']
})
export class SearchBoxComponent {

	@Input() input = " ";	
	@Output() update = new EventEmitter();
  @Input() isActive:boolean = false;

  constructor() {}

  ngOnInit() {

  	this.update.emit(" ");
  }

  checkValue(value:string){

    if(value != ''){
      this.isActive = true;
    } else {
      this.isActive = false;
    }

  }

}
