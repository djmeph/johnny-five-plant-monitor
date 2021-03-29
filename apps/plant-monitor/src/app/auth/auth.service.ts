import { Injectable } from '@angular/core';
import {
  signupForm,
  SignupFormValues,
  signupStatuses,
} from './forms/signup.form';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user;
  public signupForm = signupForm;
  public status = signupStatuses;

  constructor(private socket: Socket) {}

  get value(): SignupFormValues {
    return this.signupForm.value;
  }

  async signUp(): Promise<void> {
    console.log(this.value);
    this.socket.emit('signup', {
      username: this.value.username,
      password: this.value.password,
    });
  }
}
