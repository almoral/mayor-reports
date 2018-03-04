import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayorPdfSearchComponent } from './mayor-pdf-search.component';

describe('MayorPdfSearchComponent', () => {
  let component: MayorPdfSearchComponent;
  let fixture: ComponentFixture<MayorPdfSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayorPdfSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayorPdfSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
