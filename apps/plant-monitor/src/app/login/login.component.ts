import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'johnny-five-plant-monitor-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public auth: AuthService) {}

  async submit() {
    try {
      await this.auth.login();
    } catch (err) {
      console.error(err);
    }
  }
}
