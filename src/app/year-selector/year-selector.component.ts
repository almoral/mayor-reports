import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'mdc-year-selector',
  templateUrl: 'year-selector.component.html',
  styleUrls: ['year-selector.component.css']
})
export class YearSelectorComponent implements OnInit {
  @Input() years: any;
  @Output() select = new EventEmitter();

  files$: Observable<any>;

  constructor() {}

  onChange(selectedValue: string) {
    //console.log('selected value: ', selectedValue);
    this.select.emit(selectedValue);
  }

  ngOnInit() {}
}
