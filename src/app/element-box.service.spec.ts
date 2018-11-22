import { TestBed } from '@angular/core/testing';

import { ElementBoxService } from './element-box.service';

describe('ElementBoxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElementBoxService = TestBed.get(ElementBoxService);
    expect(service).toBeTruthy();
  });
});
