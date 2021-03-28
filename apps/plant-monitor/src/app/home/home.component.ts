import { Component, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'johnny-five-plant-monitor-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  msg = this.socket.fromEvent<string>('message');
  sub;
  message;

  constructor(private socket: Socket) {}

  ngOnInit(): void {
    this.sub = this.msg.subscribe((message) => (this.message = message));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
