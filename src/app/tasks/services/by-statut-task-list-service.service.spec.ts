import { TestBed } from '@angular/core/testing';

import { ByStatutTaskListServiceService } from './by-statut-task-list-service.service';

describe('ByStatutTaskListServiceService', () => {
  let service: ByStatutTaskListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ByStatutTaskListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
