import { TestBed } from '@angular/core/testing';

import { MonthService } from './month.service';

describe('MonthServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonthService = TestBed.get(MonthService);
    expect(service).toBeTruthy();
  });
});
