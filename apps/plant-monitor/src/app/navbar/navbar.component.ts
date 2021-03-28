import { Component } from '@angular/core';
import { NavbarService } from './navbar.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'johnny-five-plant-monitor-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public navbar: NavbarService, public auth: AuthService) {}
}
