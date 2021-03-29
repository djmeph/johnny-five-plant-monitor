import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface SignupStatuses {
  username;
  password;
}

export interface SignupFormValues {
  username: string;
  password: string;
}

export const signupStatuses: SignupStatuses = {
  username: undefined,
  password: undefined,
};

export const signupForm: FormGroup = new FormGroup({
  username: new FormControl(signupStatuses.username, [Validators.required]),
  password: new FormControl(signupStatuses.password, [Validators.required]),
});
