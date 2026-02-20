import { Component, OnInit, signal } from '@angular/core';
import { DefaultButtonComponent } from '../../../shared/components/default-button/default-button.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalAuthComponent } from '../../components/modal-auth/modal-auth.component';

@Component({
  selector: 'app-landing-page',
  imports: [DefaultButtonComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(readonly dialog: MatDialog) {}

  isModalOpen = signal(false);

  ngOnInit(): void {
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
}
