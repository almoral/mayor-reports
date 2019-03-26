import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBoxFilterComponent } from './text-box-filter.component';

describe('TextBoxFilterComponent', () => {
  let component: TextBoxFilterComponent;
  let fixture: ComponentFixture<TextBoxFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextBoxFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextBoxFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
