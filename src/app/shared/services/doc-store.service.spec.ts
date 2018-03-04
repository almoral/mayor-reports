import { TestBed, inject } from '@angular/core/testing';

import { DocStoreService } from './doc-store.service';

describe('DocStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocStoreService]
    });
  });

  it('should be created', inject([DocStoreService], (service: DocStoreService) => {
    expect(service).toBeTruthy();
  }));
});
