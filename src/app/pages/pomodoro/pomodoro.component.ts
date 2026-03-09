import { CommonModule } from '@angular/common';
import { InputAddTask } from '@components/input-add-task/input-add-task.component';
import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { TodoCardComponent } from '@components/todo-card/todo-card.component';
import { MatIconModule } from '@angular/material/icon';
import { ToastService } from '@services/toast-notification/toast-notification.service';
import { DefaultButtonComponent } from '@components/default-button/default-button.component';
import { Sidenav } from '@components/sidenav/sidenav.component';
import { PomodoroTodo } from '@models/interfaces-model';
import { v4 as generateUID } from 'uuid';
import { Observable } from 'rxjs';
import { PomodoroService } from './service/pomodoro.service';

type Step = 'FIRSTROUND' | 'SHORTBREAK' | 'SECONDROUND' | 'LONGBREAK';

@Component({
  selector: 'app-pomodoro',
  imports: [
    CommonModule,
    MatIconModule,
    Sidenav,
    InputAddTask,
    TodoCardComponent,
    DefaultButtonComponent,
  ],
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss'],
})
export class PomodoroComponent implements OnInit, OnDestroy {
  private readonly toast = inject(ToastService);
  private pomodoroService = inject(PomodoroService);
  private cd = inject(ChangeDetectorRef);

  private timeRemaining = signal(0);
  readonly isRunning = signal(false);
  private initialTime = signal(0);

  readonly timeLeft = this.timeRemaining.asReadonly();
  readonly running = this.isRunning.asReadonly();

  private intervalId: any;

  currentStep: Step = 'FIRSTROUND';
  currentRound: number = 1;

  private stepTimes: Record<Step, number> = {
    FIRSTROUND: 1500,
    SHORTBREAK: 300,
    SECONDROUND: 1500,
    LONGBREAK: 900,
  };

  buttonOptions: { step: Step; label: string }[] = [
    {
      step: 'FIRSTROUND',
      label: 'Trabalho',
    },
    {
      step: 'SHORTBREAK',
      label: 'Pausa 5min',
    },
    {
      step: 'LONGBREAK',
      label: 'Pausa 15min',
    },
  ];
  pomodoroData: PomodoroTodo[] = [];
  pomoItemBody: PomodoroTodo = new PomodoroTodo();

  ngOnInit(): void {
    this.setStepTime(this.currentStep);
    this.getPomodoroTasks();
  }

  // -- API CALLS - -

  getPomodoroTasks() {
    this.subscribeObservable(this.pomodoroService.listPomodoroTasks(), 'Erro ao criar task.');
  }

  addTask() {
    const body: PomodoroTodo = {
      ...this.pomoItemBody,
      id: generateUID(),
    };

    const todo = () => (this.pomoItemBody = new PomodoroTodo());

    this.subscribeObservable(
      this.pomodoroService.addPomodoroTask(body),
      'Erro ao criar task.',
      todo,
    );
  }

  deleteTodo(id: string) {
    this.subscribeObservable(this.pomodoroService.deletePomodoroTask(id), 'Erro ao apagar task.');
  }

  subscribeObservable(obs: Observable<PomodoroTodo[]>, errorMsg: string, todoSuccess?: () => void) {
    obs.subscribe({
      next: (res: PomodoroTodo[]) => {
        if (todoSuccess) todoSuccess();
        this.updateChanges(res);
      },
      error: (error) => {
        console.error(error);
        this.toast.toastError(errorMsg);
      },
    });
  }

  updateTodo(task: PomodoroTodo) {
    const body = {
      ...task,
      completed: !task.completed,
    };

    this.pomodoroService.updatePomodoroTaskStatus(body).subscribe({
      next: (res: PomodoroTodo[]) => {
        this.updateChanges(res);
      },
      error: (error) => {
        console.error(error);
        this.toast.toastError('Erro ao  task.');
      },
    });
  }

  private updateChanges(data: PomodoroTodo[]) {
    this.pomodoroData = data;
    this.cd.detectChanges();
  }

  // -- FIM API CALLS - -

  setStep(step: Step) {
    this.currentStep = step;
    this.setStepTime(step);
    this.stop();
  }

  start(): void {
    this.isRunning.set(true);

    this.intervalId = window.setInterval(() => {
      this.timeRemaining.update((time) => {
        if (time <= 1) {
          this.stop();

          queueMicrotask(() => this.nextStep());

          this.currentRound + 1;
          return time;
        }
        return time - 1;
      });
    }, 1000);
  }

  stop(): void {
    this.isRunning.set(false);

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset(): void {
    this.stop();
    this.currentStep = this.currentStep;
    this.setStepTime(this.currentStep);
    this.currentRound = 1;
  }

  private setStepTime(step: Step): void {
    const time = this.stepTimes[step];
    this.timeRemaining.set(time);
    this.initialTime.set(time);
  }

  private nextStep(): void {
    if (this.currentStep === 'LONGBREAK') {
      this.reset();
      return;
    }
    this.currentRound += 1;

    const order: Step[] = ['FIRSTROUND', 'SHORTBREAK', 'SECONDROUND', 'LONGBREAK'];

    const currentIndex = order.indexOf(this.currentStep);
    this.currentStep = order[currentIndex + 1];

    this.setStepTime(this.currentStep);
    this.start();
  }

  readonly formattedTime = computed(() => {
    const time = this.timeRemaining();
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  readonly isCompleted = computed(() => this.timeLeft() === 0);

  get classes() {
    return ['timer', this.isRunning() ? `with-animation` : ''];
  }

  ngOnDestroy(): void {
    this.pomoItemBody = new PomodoroTodo();
  }
}
