/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApplicationStateService } from './application-state.service';

describe('Service: ApplicationState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationStateService]
    });
  });

  it('should ...', inject([ApplicationStateService], (service: ApplicationStateService) => {
    expect(service).toBeTruthy();
  }));
});
