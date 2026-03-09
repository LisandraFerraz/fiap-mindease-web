import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { endpoints } from '@core/env/endpoints';
import { PomodoroTodo } from '@models/interfaces-model';
import { PomodoroService } from './pomodoro.service';

describe('PomodoroService', () => {
  let service: PomodoroService;
  let http: HttpTestingController;

  const mockTodos: PomodoroTodo[] = [
    { id: '1', description: 'Task 1', completed: false },
    { id: '2', description: 'Task 2', completed: true },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PomodoroService],
    });

    service = TestBed.inject(PomodoroService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list pomodoro tasks', () => {
    service.listPomodoroTasks().subscribe((result) => {
      expect(result).toEqual(mockTodos);
    });

    const req = http.expectOne(endpoints.pomodoro);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should add a pomodoro task', () => {
    const newTask: PomodoroTodo = { id: '3', description: 'New task', completed: false };

    service.addPomodoroTask(newTask).subscribe((result) => {
      expect(result).toEqual([...mockTodos, newTask]);
    });

    const req = http.expectOne(endpoints.addPomodoroTask);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush([...mockTodos, newTask]);
  });

  it('should delete a pomodoro task', () => {
    const idToDelete = '1';

    service.deletePomodoroTask(idToDelete).subscribe((result) => {
      expect(result).toEqual(mockTodos.filter((t) => t.id !== idToDelete));
    });

    const req = http.expectOne(`${endpoints.deletePomodoroTask}/${idToDelete}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockTodos.filter((t) => t.id !== idToDelete));
  });

  it('should update pomodoro task status', () => {
    const updated: PomodoroTodo = { id: '2', description: 'Task 2', completed: false };

    service.updatePomodoroTaskStatus(updated).subscribe((result) => {
      expect(result).toEqual(mockTodos.map((t) => (t.id === updated.id ? updated : t)));
    });

    const req = http.expectOne(endpoints.atualizaPomodoroTask);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updated);
    req.flush(mockTodos.map((t) => (t.id === updated.id ? updated : t)));
  });
});
