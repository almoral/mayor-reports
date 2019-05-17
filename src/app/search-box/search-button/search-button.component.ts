import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DataStoreService } from '../../shared/services/data-store.service';
@Component({
  selector: 'mdc-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.css']
})
export class SearchButtonComponent implements OnInit {
  @Input() searchTerm: string;
  @Input() liveFilter: boolean;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onUpdate = new EventEmitter();

  searchText: string;

  constructor(private dataStoreService: DataStoreService) {}

  ngOnInit() {
    this.dataStoreService.searchTerm$.subscribe(
      term => (this.searchText = term)
    );
  }

  update() {
    this.onUpdate.emit(this.searchText);
  }
}
