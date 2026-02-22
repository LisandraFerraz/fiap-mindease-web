import { InputAddTask } from '@components/input-add-task/input-add-task.component';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TodoCardComponent } from '@components/todo-card/todo-card.component';
import { MatIconModule } from '@angular/material/icon';
import { FocusModeService } from '@services/focus-mode.service';
import { PomodoroService } from './pomodoro.service';
import { ToastNotification } from '@services/toast-notification.service';
import { DefaultButtonComponent } from '@components/default-button/default-button.component';
import { Sidenav } from '@components/sidenav/sidenav.component';

type Step = 'FIRSTROUND' | 'SHORTBREAK' | 'SECONDROUND' | 'LONGBREAK';

@Component({
  selector: 'app-pomodoro',
  imports: [MatIconModule, Sidenav, InputAddTask, TodoCardComponent, DefaultButtonComponent],
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss'],
})
export class PomodoroComponent implements OnInit {
  focusMode = inject(FocusModeService);
  pomodoroService = inject(PomodoroService);
  toastNotif = inject(ToastNotification);

  private timeRemaining = signal(0);
  readonly isRunning = signal(false);
  private initialTime = signal(0);

  readonly timeLeft = this.timeRemaining.asReadonly();
  readonly running = this.isRunning.asReadonly();

  private intervalId: any;

  private currentStep: Step = 'FIRSTROUND';
  currentRound: number = 1;

  ngOnInit(): void {
    this.setStepTime(this.currentStep);
    this.getPomodoroTasks();
  }

  getPomodoroTasks() {
    this.pomodoroService.listPomodoroTasks().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.error(error);
        this.toastNotif.toastError('Erro ao listar tasks.');
      },
    });
  }

  setStep(step: Step) {
    this.currentStep = step;
    this.setStepTime(step);
    this.stop();
  }

  private setStepTime(step: Step): void {
    const time = this.stepTimes[step];
    this.timeRemaining.set(time);
    this.initialTime.set(time);
  }

  private stepTimes: Record<Step, number> = {
    FIRSTROUND: 1500,
    SHORTBREAK: 300,
    SECONDROUND: 1500,
    LONGBREAK: 900,
  };

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
        console.log(this.currentRound);
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
}
