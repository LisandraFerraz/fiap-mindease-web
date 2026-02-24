import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InputAddTask } from '@components/input-add-task/input-add-task.component';
import { Sidenav } from '@components/sidenav/sidenav.component';
import { TodoCardComponent } from '@components/todo-card/todo-card.component';
import { ChecklistService } from './checklist.service';
import { Checklist, ChecklistItem, IChecklistResponse } from '@models/interfaces-model';
import { FormsModule } from '@angular/forms';
import { v4 as generateUID } from 'uuid';
import { DatePipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ToastNotification } from '@services/toast-notification.service';
import { ColorSelectorComponent } from './color-selector/color-selector.component';

@Component({
  selector: 'app-checklist.component',
  imports: [
    Sidenav,
    InputAddTask,
    TodoCardComponent,
    ColorSelectorComponent,
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
  checkItemBody = new ChecklistItem();
  todaysDate = new Date();

  checklistActive: Checklist;

  isEditOff = signal(true);

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

  updateChecklistDetails(field: string, event: any) {
    const isFieldName = field === 'name';
    const fieldValue = isFieldName ? (event.target as HTMLInputElement).value : event;

    if (fieldValue) {
      let body = {
        [field]: fieldValue,
      } as Partial<Checklist>;

      this.checklistService.atualizaChecklist(this.checklistActive.id, body).subscribe({
        next: (res: IChecklistResponse) => {
          this.updateChanges(res.checklist);
          if (isFieldName) this.updateEdit();
        },
        error: (error) => {
          console.error(error);
          this.toastNotif.toastError('Não foi possível recuperar as checklists.');
        },
      });
    }
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

  deleteChecklistItem(id: string) {
    this.checklistService.deletaChecklistItem(this.checklistActive.id, id).subscribe({
      next: (res: IChecklistResponse) => {
        this.updateChanges(res.checklist);
      },
      error: (error) => {
        console.error(error);
        this.toastNotif.toastError('Não foi possível apagar a tarefa.');
      },
    });
  }

  atualizaChecklistItem(task: ChecklistItem) {
    const body = {
      ...task,
      completed: !task.completed,
    };
    this.checklistService.atualizaChecklistItem(this.checklistActive.id, body).subscribe({
      next: (res: IChecklistResponse) => {
        this.updateChanges(res.checklist);
      },
      error: (error) => {
        console.error(error);
        this.toastNotif.toastError('Não foi possível apagar a tarefa.');
      },
    });
  }

  addChecklistItem() {
    const body: ChecklistItem = {
      ...this.checkItemBody,
      id: generateUID(),
    };

    this.checklistService.addChecklistItem(this.checklistActive.id, body).subscribe({
      next: (res: IChecklistResponse) => {
        this.updateChanges(res.checklist);

        const findActive = res.checklist.find(
          (cl) => cl.id === this.checklistActive.id,
        ) as Checklist;

        this.setChecklistActive(findActive);

        this.cd.detectChanges();
      },
      error: (error) => {
        console.error(error);
        this.toastNotif.toastError('Não foi possível criar o item.');
      },
    });
  }

  private updateChanges(data: Checklist[]) {
    this.checklistsData = data;

    if (this.checklistActive) {
      const findActive = data.find((cl) => cl.id === this.checklistActive.id) as Checklist;

      findActive ? this.setChecklistActive(findActive) : this.setChecklistActive(data[0]);
    } else {
      this.setChecklistActive(data[0]);
    }

    this.cd.detectChanges();
  }

  setChecklistActive(checklist: Checklist) {
    this.checklistActive = checklist;
    this.cd.detectChanges();
  }

  updateEdit() {
    this.isEditOff.update((off) => !off);
  }

  ngOnDestroy(): void {
    this.checklistBody = new Checklist();
    this.checkItemBody = new ChecklistItem();
  }
}
