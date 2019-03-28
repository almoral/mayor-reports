import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcPaginationComponent } from './mdc-pagination.component';

describe('MdcPaginationComponent', () => {
  let component: MdcPaginationComponent;
  let fixture: ComponentFixture<MdcPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdcPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
