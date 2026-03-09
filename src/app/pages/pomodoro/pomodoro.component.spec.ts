import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { of, throwError } from 'rxjs';

import { PomodoroTodo } from '@models/interfaces-model';
import { PomodoroService } from './service/pomodoro.service';
import { PomodoroComponent } from './pomodoro.component';
import { ToastService } from '@services/toast-notification/toast-notification.service';

@Component({ selector: 'sidenav', template: '<ng-content></ng-content>' })
class StubSidenavComponent {}

class PomodoroServiceMock {
  listPomodoroTasks = jest.fn();
  addPomodoroTask = jest.fn();
  deletePomodoroTask = jest.fn();
  updatePomodoroTaskStatus = jest.fn();
}

class ToastMock {
  toastError = jest.fn();
}

describe('PomodoroComponent', () => {
  let component: PomodoroComponent;
  let fixture: ComponentFixture<PomodoroComponent>;
  let pomodoroService: PomodoroServiceMock;
  let toast: ToastMock;
  let consoleErrorSpy: jest.SpyInstance;

  const mockTodos: PomodoroTodo[] = [
    { id: '1', description: 'Task 1', completed: false },
    { id: '2', description: 'Task 2', completed: true },
  ];

  beforeEach(async () => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    pomodoroService = new PomodoroServiceMock();
    toast = new ToastMock();

    await TestBed.configureTestingModule({
      imports: [PomodoroComponent],
      providers: [
        { provide: PomodoroService, useValue: pomodoroService },
        { provide: ToastService, useValue: toast },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(PomodoroComponent, {
        set: {
          imports: [CommonModule, MatIconModule, StubSidenavComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PomodoroComponent);
    component = fixture.componentInstance;

    jest.spyOn(component as any, 'updateChanges').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    const updateSpy = jest.spyOn(component as any, 'updateChanges');
    pomodoroService.listPomodoroTasks.mockReturnValue(of(mockTodos));

    component.ngOnInit();

    expect(pomodoroService.listPomodoroTasks).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalledWith(mockTodos);
    expect(toast.toastError).not.toHaveBeenCalled();
  });

  it('should show toast error when list tasks fails', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    pomodoroService.listPomodoroTasks.mockReturnValue(throwError(() => new Error('fail')));

    component.ngOnInit();

    expect(toast.toastError).toHaveBeenCalledWith('Erro ao criar task.');
    consoleErrorSpy.mockRestore();
  });

  it('should add a task and reset the input body', () => {
    const updateSpy = jest.spyOn(component as any, 'updateChanges');
    const body: PomodoroTodo = { id: '', description: 'New task', completed: false };
    component.pomoItemBody = { ...body };

    const result = [...mockTodos, { ...body, id: 'mocked-uuid' }];
    pomodoroService.addPomodoroTask.mockReturnValue(of(result));

    component.addTask();

    expect(pomodoroService.addPomodoroTask).toHaveBeenCalledWith({ ...body, id: 'mocked-uuid' });
    expect(component.pomoItemBody.id).toBe('');
    expect(updateSpy).toHaveBeenCalledWith(result);
  });

  it('should update a todo and update list', () => {
    const updateSpy = jest.spyOn(component as any, 'updateChanges');
    const todo = { id: '1', description: 'Task 1', completed: false };
    const updated = { ...todo, completed: true };

    const result = [updated, mockTodos[1]];
    pomodoroService.updatePomodoroTaskStatus.mockReturnValue(of(result));

    component.updateTodo(todo);

    expect(pomodoroService.updatePomodoroTaskStatus).toHaveBeenCalledWith(updated);
    expect(updateSpy).toHaveBeenCalledWith(result);
  });
});
