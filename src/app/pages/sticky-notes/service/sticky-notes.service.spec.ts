import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { endpoints } from '@core/env/endpoints';
import { IStickyNotesResponse, StickyNote, StickyNotesGroup } from '@models/interfaces-model';
import { StickyNotesService } from './sticky-notes.service';

describe('StickyNotesService', () => {
  let service: StickyNotesService;
  let http: HttpTestingController;

  const mockGroup: StickyNotesGroup = {
    id: 'group-1',
    groupName: 'Test Group',
    data: [
      {
        id: 'note-1',
        title: 'Note 1',
        description: 'Description 1',
        color: 'BLUE',
        isFavorite: false,
      },
      {
        id: 'note-2',
        title: 'Note 2',
        description: 'Description 2',
        color: 'YELLOW',
        isFavorite: true,
      },
    ],
  };

  const mockResponse: IStickyNotesResponse = {
    stickyNotes: [mockGroup],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StickyNotesService],
    });

    service = TestBed.inject(StickyNotesService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list all sticky groups', () => {
    service.listAllStickyGroups().subscribe((result) => {
      expect(result).toEqual(mockResponse);
    });

    const req = http.expectOne(endpoints.stickyNotes);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should list specific sticky notes group', () => {
    const groupId = 'group-1';

    service.listStickyNotesGroup(groupId).subscribe((result) => {
      expect(result).toEqual(mockGroup);
    });

    const req = http.expectOne(`${endpoints.stickyNotes}/${groupId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockGroup);
  });

  it('should create sticky notes group', () => {
    const newGroup: StickyNotesGroup = {
      id: 'group-2',
      groupName: 'New Group',
      data: [],
    };

    service.createStickyNotesGroup(newGroup).subscribe((result) => {
      expect(result).toEqual(mockResponse);
    });

    const req = http.expectOne(endpoints.createStickyNotesGroup);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newGroup);
    req.flush(mockResponse);
  });

  it('should update sticky notes group', () => {
    const groupId = 'group-1';
    const updates: Partial<StickyNotesGroup> = {
      groupName: 'Updated Group Name',
    };

    service.updateStickyNotesGroup(groupId, updates).subscribe((result) => {
      expect(result).toEqual(mockResponse);
    });

    const req = http.expectOne(`${endpoints.stickyNotes}/${groupId}/atualiza-sticky-note-group`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updates);
    req.flush(mockResponse);
  });

  it('should add sticky note to group', () => {
    const groupId = 'group-1';
    const newNote: StickyNote = {
      id: 'note-3',
      title: 'New Note',
      description: 'New Description',
      color: 'GREEN',
      isFavorite: false,
    };

    service.addStickyNote(groupId, newNote).subscribe((result) => {
      expect(result).toEqual(mockResponse);
    });

    const req = http.expectOne(`${endpoints.stickyNotes}/${groupId}/novo-sticky-note`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newNote);
    req.flush(mockResponse);
  });

  it('should update sticky note', () => {
    const groupId = 'group-1';
    const noteId = 'note-1';
    const updates: Partial<StickyNote> = {
      title: 'Updated Title',
      isFavorite: true,
    };

    service.updateStickyNote(groupId, updates, noteId).subscribe((result) => {
      expect(result).toEqual(mockResponse);
    });

    const req = http.expectOne(
      `${endpoints.stickyNotes}/${groupId}/atualiza-sticky-note/${noteId}`,
    );
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updates);
    req.flush(mockResponse);
  });

  it('should delete sticky notes group', () => {
    const groupId = 'group-1';

    service.deleteStickyNotesGroup(groupId).subscribe((result) => {
      expect(result).toEqual(mockResponse);
    });

    const req = http.expectOne(`${endpoints.deleteStickyNotesGroup}/${groupId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should delete sticky note', () => {
    const groupId = 'group-1';
    const noteId = 'note-1';

    service.deleteStickyNote(groupId, noteId).subscribe((result) => {
      expect(result).toEqual(mockResponse);
    });

    const req = http.expectOne(`${endpoints.stickyNotes}/${groupId}/deleta-sticky-note/${noteId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});
