import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextBoxFilterComponent } from './text-box-filter/text-box-filter.component';
import { SearchContainerComponent } from './search-container/search-container.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { ReactiveFormsModule} from '@angular/forms';
import { FilterListComponent } from './filter-list/filter-list.component';
import { SelectedFiltersComponent } from './selected-filters/selected-filters.component';
import { ShowFiltersComponent } from './show-filters/show-filters.component';
import { FilterListContainerComponent } from './filter-list-container/filter-list-container.component';
import { SearchButtonComponent } from './search-button/search-button.component';


@NgModule({
  declarations: [
    TextBoxFilterComponent,
    SearchContainerComponent,
    CheckboxGroupComponent,
    FilterListComponent,
    SelectedFiltersComponent,
    ShowFiltersComponent,
    FilterListContainerComponent,
    SearchButtonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchContainerComponent
  ]
})
export class SearchBoxModule { }
