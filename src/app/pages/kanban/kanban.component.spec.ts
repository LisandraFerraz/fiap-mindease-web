import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { KanbanComponent } from './kanban.component';
import { KanbanService } from './service/kanban.service';
import { ToastService } from '@services/toast-notification/toast-notification.service';
import { IKanbanColumn, IKanbanTodo, kanbanStatus } from '@models/interfaces-model';

@Component({ selector: 'sidenav', template: '<ng-content></ng-content>' })
class StubSidenavComponent {}

@Component({ selector: 'kanban-card', template: '' })
class StubKanbanCardComponent {}

@Component({ selector: 'modal-kanban-item', template: '' })
class StubModalKanbanItemComponent {}

describe('KanbanComponent', () => {
  let component: KanbanComponent;
  let fixture: ComponentFixture<KanbanComponent>;
  let kanbanService: Partial<jest.Mocked<KanbanService>>;
  let toastService: Partial<jest.Mocked<ToastService>>;

  beforeEach(async () => {
    kanbanService = {
      getKanbanItems: jest.fn(),
      deleteKanbanItem: jest.fn(),
      updateKanbanItem: jest.fn(),
    };

    toastService = {
      toastError: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [KanbanComponent],
      providers: [
        { provide: KanbanService, useValue: kanbanService },
        { provide: ToastService, useValue: toastService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(KanbanComponent, {
        set: {
          template: '<div></div>',
          imports: [],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(KanbanComponent);
    component = fixture.componentInstance;
  });

  it('should create and fetch kanban columns on init', () => {
    const expectedColumns: IKanbanColumn[] = [
      { id: '1', title: 'ToDo', status: kanbanStatus.BACKLOG, items: [] },
      { id: '2', title: 'Done', status: kanbanStatus.CONCLUIDO, items: [] },
    ];

    (kanbanService.getKanbanItems as jest.Mock).mockReturnValue(of(expectedColumns));

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(kanbanService.getKanbanItems).toHaveBeenCalled();
    expect(component.kanbanColumns).toEqual(expectedColumns);
    expect(component.connectedLists).toEqual(['1', '2']);
  });

  it('should handle errors and call toastError', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    (kanbanService.getKanbanItems as jest.Mock).mockReturnValue(
      throwError(() => new Error('fail')),
    );

    fixture.detectChanges();

    expect(toastService.toastError).toHaveBeenCalledWith('Erro ao listar itens do Kanban.');
  });

  it('should delete item using kanbanService', () => {
    (kanbanService.deleteKanbanItem as jest.Mock).mockReturnValue(of([]));
    (kanbanService.getKanbanItems as jest.Mock).mockReturnValue(of([]));

    fixture.detectChanges();
    component.deleteKanbanItem('123');

    expect(kanbanService.deleteKanbanItem).toHaveBeenCalledWith('123');
  });

  it('should update item column using kanbanService', () => {
    const todo: IKanbanTodo = {
      id: '1',
      title: 'x',
      description: '',
      status: '1',
      priority: 1,
    } as any;
    (kanbanService.updateKanbanItem as jest.Mock).mockReturnValue(of([]));
    (kanbanService.getKanbanItems as jest.Mock).mockReturnValue(of([]));

    fixture.detectChanges();
    component.updateColumnItem('2', todo);

    expect(kanbanService.updateKanbanItem).toHaveBeenCalledWith({ ...todo, status: '2' });
  });
});
