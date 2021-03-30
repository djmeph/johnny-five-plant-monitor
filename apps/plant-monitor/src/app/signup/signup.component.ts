import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'johnny-five-plant-monitor-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(public auth: AuthService) {}

  async submit() {
    try {
      await this.auth.signup();
    } catch (err) {
      console.error(err);
    }
  }
}
