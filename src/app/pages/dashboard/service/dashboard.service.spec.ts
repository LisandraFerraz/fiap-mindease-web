import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { endpoints } from '@core/env/endpoints';
import { IDashboardRes } from '@models/dashboard-model';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService],
    });

    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the dashboard endpoint and return data', (done) => {
    const mockResponse: IDashboardRes = {
      graphData: [],
      kanbanToExpire: [],
      favoriteStickyNotes: [],
    };

    service.listPomodoroTasks().subscribe((res) => {
      expect(res).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(endpoints.dashboard);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
