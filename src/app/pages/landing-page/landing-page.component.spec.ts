import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

import { LandingPageComponent } from './landing-page.component';
import { ModalAuthComponent } from './modal-auth/modal-auth.component';

class MatDialogMock {
  private readonly afterClosedSubject = new Subject<void>();

  open = jest.fn().mockReturnValue({
    afterClosed: () => this.afterClosedSubject.asObservable(),
  } as MatDialogRef<ModalAuthComponent>);

  closeAll = jest.fn();

  emitClose(): void {
    this.afterClosedSubject.next();
  }
}

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let dialog: MatDialogMock;

  beforeEach(async () => {
    dialog = new MatDialogMock();

    await TestBed.configureTestingModule({
      imports: [LandingPageComponent],
      providers: [{ provide: MatDialog, useValue: dialog }],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal on init and set modal state', () => {
    fixture.detectChanges();

    expect(dialog.open).toHaveBeenCalledWith(ModalAuthComponent, { width: '900px' });
    expect(component.isModalOpen()).toBe(true);

    dialog.emitClose();
    expect(component.isModalOpen()).toBe(false);
  });

  it('should close all dialogs on destroy', () => {
    component.ngOnDestroy();
    expect(dialog.closeAll).toHaveBeenCalled();
  });
});
