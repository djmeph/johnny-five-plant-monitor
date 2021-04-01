import { Injectable } from '@angular/core';
import {
  signupForm,
  SignupFormValues,
  signupStatuses,
} from './forms/signup.form';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { loginForm, LoginFormValues, loginStatuses } from './forms/login.form';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user;
  public signupForm = signupForm;
  public loginForm = loginForm;
  public signupStatus = signupStatuses;
  public loginStatus = loginStatuses;
  private token;
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

  destroy(): void {
    this.subSignup.unsubscribe();
    this.subLogin.unsubscribe();
  }

  signup(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.subSignup = this.msgSignup.subscribe((message: any) => {
        if (message.err) return reject(new Error(message.err));
        this.token = message.token;
        console.log({ token: this.token });
        this.subSignup.unsubscribe();
        resolve();
      });
      this.socket.emit('signup', this.signupValue);
    });
  }

  login(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.subLogin = this.msgLogin.subscribe((message: any) => {
        if (message.err) return reject(new Error(message.err));
        this.token = message.token;
        console.log({ token: this.token });
        this.subLogin.unsubscribe();
        resolve();
      });
      this.socket.emit('login', this.loginValue);
    });
  }
}
