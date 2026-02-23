import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InputAddTask } from '@components/input-add-task/input-add-task.component';
import { MEInputTextComponent } from '@components/input-text/input-text.component';
import { Sidenav } from '@components/sidenav/sidenav.component';
import { TodoCardComponent } from '@components/todo-card/todo-card.component';
import { ChecklistService } from './checklist.service';
import { Checklist, IChecklistResponse } from '@models/interfaces-model';
import { FormsModule } from '@angular/forms';
import { v4 as generateUID } from 'uuid';
import { DatePipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ToastNotification } from '@services/toast-notification.service';

@Component({
  selector: 'app-checklist.component',
  imports: [
    Sidenav,
    MEInputTextComponent,
    InputAddTask,
    TodoCardComponent,
    FormsModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter(), DatePipe],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.scss',
})
export class ChecklistComponent implements OnInit {
  private readonly checklistService = inject(ChecklistService);
  private cd = inject(ChangeDetectorRef);
  private readonly datePipe = inject(DatePipe);
  private readonly toastNotif = inject(ToastNotification);

  checklistsData: Checklist[] = [];

  checklistBody = new Checklist();

  todaysDate = new Date();

  ngOnInit(): void {
    this.listChecklists();
  }

  listChecklists() {
    this.checklistService.listChecklists().subscribe({
      next: (res: IChecklistResponse) => {
        this.updateChanges(res.checklist);
      },
      error: (error) => {
        console.error(error);
        this.toastNotif.toastError('Não foi possível recuperar as checklists.');
      },
    });
  }

  createChecklist() {
    this.checklistBody = {
      id: generateUID(),
      color: 'BLUE',
      name: 'Nova lista to-do',
      data: [],
    };
    this.checklistService.createChecklist(this.checklistBody).subscribe({
      next: (res) => {
        this.updateChanges(res.checklist);
      },
      error: (error) => {
        console.error(error);
        this.toastNotif.toastError('Não foi possível criar a checklist.');
      },
    });
  }

  deleteChecklist(checkId: string) {
    this.checklistService.deletaChecklist(checkId).subscribe({
      next: (res: IChecklistResponse) => {
        this.updateChanges(res.checklist);
      },
      error: (error) => {
        console.error(error);
        this.toastNotif.toastError('Não foi possível apagar a tarefa.');
      },
    });
  }

  private updateChanges(data: Checklist[]) {
    this.checklistsData = data;
    this.cd.detectChanges();
  }
}
