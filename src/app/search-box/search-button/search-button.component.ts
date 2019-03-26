import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SearchContainerComponent } from '../search-container/search-container.component';

@Component({
  selector: 'mdc-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.css']
})
export class SearchButtonComponent implements OnInit {

  @Input() searchTerm: string;
  @Input() liveFilter: boolean;

  @Output() onUpdate = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  update() {
    this.onUpdate.emit();
  }

}
