import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  public hamburger = false;
  public appName = environment.appName;

  constructor(public router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) this.hamburger = false;
    });
  }

  nav(route: string, data?: any): void {
    this.router.navigate([route], { state: { data } });
  }

  toggleMenu() {
    this.hamburger = !this.hamburger;
  }
}
