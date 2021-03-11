import { Component, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'johnny-five-plant-monitor-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  msg = this.socket.fromEvent<any>('message');
  sub;
  message;

  constructor(private socket: Socket) {}

  ngOnInit() {
    this.sub = this.msg.subscribe((message) => (this.message = message));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
