import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { KanbanService } from './kanban.service';
import { endpoints } from '@core/env/endpoints';
import { IKanbanColumn, IKanbanTodo, kanbanStatus } from '@models/interfaces-model';

describe('KanbanService', () => {
  let service: KanbanService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KanbanService],
    });

    service = TestBed.inject(KanbanService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch kanban items', (done) => {
    const mockResponse: IKanbanColumn[] = [
      { id: '1', title: 'ToDo', status: kanbanStatus.ANDAMENTO, items: [] },
    ];

    service.getKanbanItems().subscribe((res) => {
      expect(res).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(endpoints.kanban);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should add a new kanban item', (done) => {
    const body: IKanbanTodo = {
      id: '1',
      title: 'ToDo',
      status: kanbanStatus.BACKLOG,
      items: [],
    } as any;
    const mockResponse: IKanbanColumn[] = [
      { id: '1', title: 'ToDo', status: kanbanStatus.ANDAMENTO, items: [] },
    ];

    service.addNewKanbanItem(body).subscribe((res) => {
      expect(res).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(endpoints.addKanbanTask);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    req.flush(mockResponse);
  });

  it('should update a kanban item', (done) => {
    const body: IKanbanTodo = {
      id: '1',
      title: 'ToDo',
      status: kanbanStatus.BACKLOG,
      items: [],
    } as any;
    const mockResponse: IKanbanColumn[] = [
      { id: '1', title: 'ToDo', status: kanbanStatus.ANDAMENTO, items: [] },
    ];

    service.updateKanbanItem(body).subscribe((res) => {
      expect(res).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(endpoints.atualizaKanbanTask);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(body);
    req.flush(mockResponse);
  });

  it('should delete a kanban item', (done) => {
    const mockResponse: IKanbanColumn[] = [];

    service.deleteKanbanItem('123').subscribe((res) => {
      expect(res).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(`${endpoints.deleteKanbanTask}/123`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});
