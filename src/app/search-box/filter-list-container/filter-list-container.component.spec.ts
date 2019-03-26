import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterListContainerComponent } from './filter-list-container.component';

describe('FilterListContainerComponent', () => {
  let component: FilterListContainerComponent;
  let fixture: ComponentFixture<FilterListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
