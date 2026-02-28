import { Component, inject, OnDestroy, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAuthComponent } from './modal-auth/modal-auth.component';
import { DefaultButtonComponent } from '@components/default-button/default-button.component';

@Component({
  selector: 'app-landing-page',
  imports: [DefaultButtonComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnDestroy {
  readonly dialog = inject(MatDialog);

  isModalOpen = signal(false);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.openModal();
  }

  openModal() {
    this.isModalOpen.update(() => true);
    this.dialog
      .open(ModalAuthComponent, {
        width: '900px',
      })
      .afterClosed()
      .subscribe(() => {
        this.isModalOpen.update(() => false);
      });
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
