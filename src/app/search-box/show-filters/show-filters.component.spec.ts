import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFiltersLargeScreenComponent } from './show-filters-large-screen.component';

describe('ShowFiltersLargeScreenComponent', () => {
  let component: ShowFiltersLargeScreenComponent;
  let fixture: ComponentFixture<ShowFiltersLargeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFiltersLargeScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFiltersLargeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
