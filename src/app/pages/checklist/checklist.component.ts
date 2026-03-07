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
import { ToastService } from '@services/toast-notification.service';
import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { MEInputTextComponent } from '@components/input-text/input-text.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checklist.component',
  imports: [
    Sidenav,
    InputAddTask,
    TodoCardComponent,
    ColorSelectorComponent,
    FormsModule,
    MatIconModule,
    MEInputTextComponent,
  ],
  providers: [provideNativeDateAdapter(), DatePipe],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.scss',
})
export class ChecklistComponent implements OnInit {
  private readonly checklistService = inject(ChecklistService);
  private cd = inject(ChangeDetectorRef);
  private readonly toast = inject(ToastService);

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
    this.subscribeObservable(
      this.checklistService.listChecklists(),
      'Não foi possível recuperar as checklists.',
    );
  }

  createChecklist() {
    this.checklistBody = {
      id: generateUID(),
      color: 'BLUE',
      name: `Checklist ${this.checklistsData.length + 1}`,
      data: [],
    };
    this.subscribeObservable(
      this.checklistService.createChecklist(this.checklistBody),
      'Não foi possível recuperar as checklists.',
    );
  }

  updateChecklistDetails(field: string, event: any) {
    const isFieldName = field === 'name';
    // const fieldValue = isFieldName ? event: event;
    console.log(event);

    // if (this.isEditOff()) {
    let body = {
      [field]: event,
    } as Partial<Checklist>;

    const todo = () => {
      if (isFieldName) this.updateEdit();
    };

    this.subscribeObservable(
      this.checklistService.atualizaChecklist(this.checklistActive.id, body),
      'Não foi possível recuperar as checklists.',
      todo,
    );
    // }
  }

  deleteChecklist(checkId: string) {
    this.subscribeObservable(
      this.checklistService.deletaChecklist(checkId),
      'Não foi possível apagar a tarefa.',
    );
  }

  deleteChecklistItem(id: string) {
    this.subscribeObservable(
      this.checklistService.deletaChecklistItem(this.checklistActive.id, id),
      'Não foi possível apagar a tarefa.',
    );
  }

  atualizaChecklistItem(task: ChecklistItem) {
    const today = new Date();
    const body = {
      ...task,
      lastUpdated: today,
      completed: !task.completed,
    };

    this.subscribeObservable(
      this.checklistService.atualizaChecklistItem(this.checklistActive.id, body),
      'Não foi possível atualizar a tarefa.',
    );
  }

  addChecklistItem() {
    const today = new Date();

    const body: ChecklistItem = {
      ...this.checkItemBody,
      lastUpdated: today,
      id: generateUID(),
    };

    this.checklistService.addChecklistItem(this.checklistActive.id, body).subscribe({
      next: (res: IChecklistResponse) => {
        this.updateChanges(res.checklist);

        const findActive = res.checklist.find(
          (cl) => cl.id === this.checklistActive.id,
        ) as Checklist;

        this.setChecklistActive(findActive);
        this.checkItemBody.description = '';
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error(error);
        this.toast.toastError('Não foi possível criar o item.');
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

  subscribeObservable(
    obs: Observable<IChecklistResponse>,
    errorMsg: string,
    todoSuccess?: () => void,
  ) {
    obs.subscribe({
      next: (res: IChecklistResponse) => {
        if (todoSuccess) todoSuccess();
        this.updateChanges(res.checklist);
      },
      error: (error) => {
        console.error(error);
        this.toast.toastError(errorMsg);
      },
    });
  }

  ngOnDestroy(): void {
    this.checklistBody = new Checklist();
    this.checkItemBody = new ChecklistItem();
  }
}
