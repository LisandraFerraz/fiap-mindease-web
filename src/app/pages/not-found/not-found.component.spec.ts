import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

class RouterMock {
  navigateByUrl = jest.fn();
}

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let routerMock: RouterMock;

  beforeEach(async () => {
    routerMock = new RouterMock();

    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to pomodoro when redirect is called', () => {
    component.redirect();

    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('pomodoro');
  });
});
