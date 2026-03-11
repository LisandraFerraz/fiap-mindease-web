import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { StickyNotesComponent } from './sticky-notes.component';
import { StickyNotesService } from './service/sticky-notes.service';
import { ToastService } from '@services/toast-notification/toast-notification.service';
import { IStickyNotesResponse, StickyNotesGroup } from '@models/interfaces-model';

@Component({ selector: 'sidenav', template: '<ng-content></ng-content>' })
class StubSidenavComponent {}

class StickyNotesServiceMock {
  listAllStickyGroups = jest.fn();
  createStickyNotesGroup = jest.fn();
  updateStickyNotesGroup = jest.fn();
  filterKeywordNotesGroup = jest.fn();
  addStickyNote = jest.fn();
  updateStickyNote = jest.fn();
  deleteStickyNote = jest.fn();
  deleteStickyNotesGroup = jest.fn();
}

class ToastServiceMock {
  toastSuccess = jest.fn();
  toastError = jest.fn();
  toastWarning = jest.fn();
}

describe('StickyNotesComponent', () => {
  let component: StickyNotesComponent;
  let fixture: ComponentFixture<StickyNotesComponent>;
  let stickyNotesService: StickyNotesServiceMock;
  let toastService: ToastServiceMock;
  let consoleErrorSpy: jest.SpyInstance;

  const mockGroup1: StickyNotesGroup = {
    id: 'group-1',
    groupName: 'Group 1',
    data: [
      {
        id: 'note-1',
        title: 'Note 1',
        description: 'Description 1',
        color: 'BLUE',
        isFavorite: false,
      },
    ],
  };

  const mockGroup2: StickyNotesGroup = {
    id: 'group-2',
    groupName: 'Group 2',
    data: [],
  };

  const mockResponse: IStickyNotesResponse = {
    stickyNotes: [mockGroup1, mockGroup2],
  };

  beforeEach(async () => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    stickyNotesService = new StickyNotesServiceMock();
    toastService = new ToastServiceMock();

    await TestBed.configureTestingModule({
      imports: [StickyNotesComponent],
      providers: [
        { provide: StickyNotesService, useValue: stickyNotesService },
        { provide: ToastService, useValue: toastService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(StickyNotesComponent, {
        set: {
          imports: [StubSidenavComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(StickyNotesComponent);
    component = fixture.componentInstance;

    stickyNotesService.filterKeywordNotesGroup.mockImplementation(() =>
      of({ stickyNotes: component.activeStickyNoteGroup }),
    );
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load sticky groups on init', () => {
    stickyNotesService.listAllStickyGroups.mockReturnValue(of(mockResponse));

    fixture.detectChanges();

    expect(stickyNotesService.listAllStickyGroups).toHaveBeenCalled();
    expect(component.listaStickyNotesGroup).toEqual(mockResponse.stickyNotes);
    expect(component.activeStickyNoteGroup).toEqual(mockGroup1);
  });

  it('should handle error when loading sticky groups fails', () => {
    stickyNotesService.listAllStickyGroups.mockReturnValue(
      throwError(() => new Error('Load error')),
    );

    fixture.detectChanges();

    expect(toastService.toastError).toHaveBeenCalledWith(
      'Não foi possível recuperar os grupos de post-it.',
    );
  });

  it('should create sticky note group and set as active', () => {
    const newGroup: StickyNotesGroup = {
      id: 'mocked-uuid',
      groupName: 'Novo grupo',
      data: [],
    };
    const responseWithNew: IStickyNotesResponse = {
      stickyNotes: [...mockResponse.stickyNotes, newGroup],
    };

    stickyNotesService.createStickyNotesGroup.mockReturnValue(of(responseWithNew));

    component.createStickyNoteGroup();

    expect(stickyNotesService.createStickyNotesGroup).toHaveBeenCalledWith(
      expect.objectContaining({
        groupName: 'Novo grupo',
        id: 'mocked-uuid',
      }),
    );
    expect(component.listaStickyNotesGroup).toEqual(responseWithNew.stickyNotes);
    expect(component.activeStickyNoteGroup).toEqual(newGroup);
  });

  it('should handle error when creating sticky note group fails', () => {
    stickyNotesService.createStickyNotesGroup.mockReturnValue(
      throwError(() => new Error('Create error')),
    );

    component.createStickyNoteGroup();

    expect(toastService.toastError).toHaveBeenCalledWith('Não foi possível criar o post-it.');
  });

  it('should update sticky note group name', () => {
    component.activeStickyNoteGroup = mockGroup1;
    stickyNotesService.updateStickyNotesGroup.mockReturnValue(of(mockResponse));

    component.updateStickyNoteName('group-1', 'Updated Name');

    expect(stickyNotesService.updateStickyNotesGroup).toHaveBeenCalledWith('group-1', {
      groupName: 'Updated Name',
    });
  });

  it('should not update sticky note group name if name is empty', () => {
    component.activeStickyNoteGroup = mockGroup1;
    component.activeTabTitle = 'Original Title';

    component.updateStickyNoteName('group-1', '');

    expect(stickyNotesService.updateStickyNotesGroup).not.toHaveBeenCalled();
    expect(component.activeStickyNoteGroup.groupName).toBe('Original Title');
  });

  it('should add sticky note to active group', () => {
    component.activeStickyNoteGroup = mockGroup1;
    stickyNotesService.addStickyNote.mockReturnValue(of(mockResponse));

    component.addStickyNote();

    expect(stickyNotesService.addStickyNote).toHaveBeenCalledWith(
      'group-1',
      expect.objectContaining({
        id: 'mocked-uuid',
        title: 'Novo post-it',
        description: 'Sem descrição...',
      }),
    );
  });

  it('should update sticky note', () => {
    component.activeStickyNoteGroup = mockGroup1;
    stickyNotesService.updateStickyNote.mockReturnValue(of(mockResponse));

    const emitterData = { fieldName: 'title', fieldValue: 'Updated Title' };
    component.updateStickyNote(emitterData, 'note-1');

    expect(stickyNotesService.updateStickyNote).toHaveBeenCalledWith(
      'group-1',
      { title: 'Updated Title' },
      'note-1',
    );
  });

  it('should delete sticky note', () => {
    component.activeStickyNoteGroup = mockGroup1;
    stickyNotesService.deleteStickyNote.mockReturnValue(of(mockResponse));

    component.deleteStickyNote('note-1');

    expect(stickyNotesService.deleteStickyNote).toHaveBeenCalledWith('group-1', 'note-1');
  });

  it('should delete sticky notes group and set first group as active', () => {
    component.listaStickyNotesGroup = mockResponse.stickyNotes;
    component.activeStickyNoteGroup = mockGroup2;
    stickyNotesService.deleteStickyNotesGroup.mockReturnValue(of({ stickyNotes: [mockGroup1] }));

    component.deleteStickyNotesGroup();

    expect(stickyNotesService.deleteStickyNotesGroup).toHaveBeenCalledWith('group-2');
    expect(component.activeStickyNoteGroup).toEqual(mockGroup1);
  });

  it('should update changes and maintain active group if it exists', () => {
    component.activeStickyNoteGroup = mockGroup1;

    component.updateChanges(mockResponse.stickyNotes);

    expect(component.listaStickyNotesGroup).toEqual(mockResponse.stickyNotes);
    expect(component.activeStickyNoteGroup).toEqual(mockGroup1);
  });

  it('should update changes and set first group as active if current group not found', () => {
    component.activeStickyNoteGroup = { id: 'non-existent', groupName: 'Gone', data: [] };

    component.updateChanges(mockResponse.stickyNotes);

    expect(component.activeStickyNoteGroup).toEqual(mockGroup1);
  });

  it('should set active group and update title', () => {
    component.setActiveGroup(mockGroup2);

    expect(component.activeStickyNoteGroup).toEqual(mockGroup2);
    expect(component.activeTabTitle).toBe('Group 2');
  });

  it('should set isEditable to true', () => {
    expect(component.isEditable()).toBe(false);

    component.setIsEditable();

    expect(component.isEditable()).toBe(true);
  });

  describe('searchNotesGroup', () => {
    it('should update activeStickyNoteGroup and toggle filtersApplied on success', () => {
      const searchResult = { ...mockGroup1, groupName: 'Filtered Group' };
      component.activeStickyNoteGroup = mockGroup1;
      stickyNotesService.filterKeywordNotesGroup.mockReturnValue(of({ stickyNotes: searchResult }));
      const initialFiltersApplied = component.filtersApplied();

      component.searchNotesGroup();

      expect(stickyNotesService.filterKeywordNotesGroup).toHaveBeenCalledWith(
        component.searchBody,
        mockGroup1.id,
      );
      expect(component.activeStickyNoteGroup).toEqual(searchResult);
      expect(component.filtersApplied()).toBe(!initialFiltersApplied);
    });

    it('should call toastError when search fails', () => {
      component.activeStickyNoteGroup = mockGroup1;
      stickyNotesService.filterKeywordNotesGroup.mockReturnValue(
        throwError(() => new Error('Search error')),
      );

      component.searchNotesGroup();

      expect(toastService.toastError).toHaveBeenCalledWith('Não foi possível pesquisar.');
    });
  });

  describe('updateStickyNote – isFavorite handling', () => {
    it('should proceed with update when favoriting a note below the 6-favorite limit', () => {
      component.listaStickyNotesGroup = [
        {
          id: 'group-1',
          groupName: 'Group 1',
          data: [
            { id: 'n1', title: 'N1', description: '', color: 'BLUE', isFavorite: true },
            { id: 'n2', title: 'N2', description: '', color: 'BLUE', isFavorite: true },
          ],
        },
      ];
      component.activeStickyNoteGroup = component.listaStickyNotesGroup[0];
      stickyNotesService.updateStickyNote.mockReturnValue(of(mockResponse));

      component.updateStickyNote({ fieldName: 'isFavorite', fieldValue: true }, 'new-note');

      expect(stickyNotesService.updateStickyNote).toHaveBeenCalledWith(
        component.activeStickyNoteGroup.id,
        { isFavorite: true },
        'new-note',
      );
      expect(toastService.toastWarning).not.toHaveBeenCalled();
    });

    it('should show toastWarning and not call service when 6 favorites already exist', () => {
      const groupWithSixFavs: IStickyNotesResponse['stickyNotes'][number] = {
        id: 'group-fav',
        groupName: 'Fav Group',
        data: Array.from({ length: 6 }, (_, i) => ({
          id: `fav-${i}`,
          title: `Fav ${i}`,
          description: '',
          color: 'BLUE' as const,
          isFavorite: true,
        })),
      };
      component.listaStickyNotesGroup = [groupWithSixFavs];
      component.activeStickyNoteGroup = groupWithSixFavs;

      component.updateStickyNote({ fieldName: 'isFavorite', fieldValue: true }, 'new-note');

      expect(toastService.toastWarning).toHaveBeenCalledWith(
        'Só é possível favoritar até 6 post-its.',
      );
      expect(stickyNotesService.updateStickyNote).not.toHaveBeenCalled();
    });
  });

  describe('error paths via subscribeObservable', () => {
    beforeEach(() => {
      component.activeStickyNoteGroup = mockGroup1;
    });

    it('should call toastError when updateStickyNote fails', () => {
      stickyNotesService.updateStickyNote.mockReturnValue(throwError(() => new Error('error')));

      component.updateStickyNote({ fieldName: 'title', fieldValue: 'X' }, 'note-1');

      expect(toastService.toastError).toHaveBeenCalledWith('Não foi possível criar o post-it.');
    });

    it('should call toastError when addStickyNote fails', () => {
      stickyNotesService.addStickyNote.mockReturnValue(throwError(() => new Error('error')));

      component.addStickyNote();

      expect(toastService.toastError).toHaveBeenCalledWith('Não foi possível criar o post-it.');
    });

    it('should call toastError when deleteStickyNote fails', () => {
      stickyNotesService.deleteStickyNote.mockReturnValue(throwError(() => new Error('error')));

      component.deleteStickyNote('note-1');

      expect(toastService.toastError).toHaveBeenCalledWith('Não foi possível excluir o post-it.');
    });

    it('should call toastError when deleteStickyNotesGroup fails', () => {
      component.listaStickyNotesGroup = mockResponse.stickyNotes;
      stickyNotesService.deleteStickyNotesGroup.mockReturnValue(
        throwError(() => new Error('error')),
      );

      component.deleteStickyNotesGroup();

      expect(toastService.toastError).toHaveBeenCalledWith('Não foi possível excluir o post-it.');
    });

    it('should call toastError when updateStickyNoteName fails', () => {
      stickyNotesService.updateStickyNotesGroup.mockReturnValue(
        throwError(() => new Error('error')),
      );

      component.updateStickyNoteName('group-1', 'New Name');

      expect(toastService.toastError).toHaveBeenCalledWith(
        'Não foi possível atualizar o nome do grupo.',
      );
    });
  });

  it('should set first group as active when activeStickyNoteGroup is undefined in updateChanges', () => {
    (component as any).activeStickyNoteGroup = undefined;

    component.updateChanges(mockResponse.stickyNotes);

    expect(component.listaStickyNotesGroup).toEqual(mockResponse.stickyNotes);
    expect(component.activeStickyNoteGroup).toEqual(mockGroup1);
  });

  it('should reset searchBody and call searchNotesGroup on resetFilters', () => {
    component.activeStickyNoteGroup = mockGroup1;
    component.searchBody.search = 'some query';
    jest.spyOn(component, 'searchNotesGroup');

    component.resetFilters();

    expect(component.searchBody.search).toBe('');
    expect(component.searchNotesGroup).toHaveBeenCalled();
  });

  it('should reset searchBody on ngOnDestroy', () => {
    component.searchBody.search = 'active query';

    component.ngOnDestroy();

    expect(component.searchBody.search).toBe('');
  });
});
