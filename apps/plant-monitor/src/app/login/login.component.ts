import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'johnny-five-plant-monitor-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public auth: AuthService, private navbar: NavbarService) {}

  async submit() {
    try {
      await this.auth.login();
      this.auth.loginValue = { username: '', password: '' };
      this.navbar.nav('/');
    } catch (err) {
      console.error(err);
    }
  }
}
