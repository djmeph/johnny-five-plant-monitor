import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface LoginStatuses {
  username;
  password;
}

export interface LoginFormValues {
  username: string;
  password: string;
}

export const loginStatuses: LoginStatuses = {
  username: undefined,
  password: undefined,
};

export const loginForm: FormGroup = new FormGroup({
  username: new FormControl(loginStatuses.username, [Validators.required]),
  password: new FormControl(loginStatuses.password, [Validators.required]),
});
