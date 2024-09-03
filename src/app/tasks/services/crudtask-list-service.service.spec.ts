import { TestBed } from '@angular/core/testing';

import { CRUDTaskListServiceService } from './crudtask-list-service.service';

describe('CRUDTaskListServiceService', () => {
  let service: CRUDTaskListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CRUDTaskListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
