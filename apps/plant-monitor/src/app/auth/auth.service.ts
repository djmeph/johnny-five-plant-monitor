import { Injectable } from '@angular/core';
import {
  signupForm,
  SignupFormValues,
  signupStatuses,
} from './forms/signup.form';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { loginForm, LoginFormValues, loginStatuses } from './forms/login.form';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user;
  public signupForm = signupForm;
  public loginForm = loginForm;
  public signupStatus = signupStatuses;
  public loginStatus = loginStatuses;
  private msgSignup = this.socket.fromEvent<string>('signup');
  private msgLogin = this.socket.fromEvent<string>('login');
  private subSignup: Subscription;
  private subLogin: Subscription;

  constructor(private socket: Socket) {}

  get signupValue(): SignupFormValues {
    return this.signupForm.value;
  }

  get loginValue(): LoginFormValues {
    return this.loginForm.value;
  }

  init(): void {
    this.subSignup = this.msgSignup.subscribe((message) => {
      console.log(message);
    });
    this.subLogin = this.msgLogin.subscribe((message) => {
      console.log(message);
    });
  }

  destroy(): void {
    this.subSignup.unsubscribe();
    this.subLogin.unsubscribe();
  }

  signup(): void {
    this.socket.emit('signup', this.signupValue);
  }

  login(data): void {
    this.socket.emit('login', data);
  }
}
