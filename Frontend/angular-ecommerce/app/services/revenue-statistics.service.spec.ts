import { TestBed } from '@angular/core/testing';

import { RevenueStatisticsService } from './revenue-statistics.service';

describe('RevenueStatisticsService', () => {
  let service: RevenueStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevenueStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
