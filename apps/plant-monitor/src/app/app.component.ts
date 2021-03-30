import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'johnny-five-plant-monitor-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.init();
  }

  ngOnDestroy() {
    this.auth.destroy();
  }
}
