import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import * as net from 'net';
import * as firmata from 'firmata';
import * as five from 'johnny-five';

const options = {
  host: 'plant1.local',
  port: 3030,
};

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  private socketClient;
  private boardIo;
  private board;
  private led;
  private tempSensor;
  temp: {
    f: number;
    c: number;
    k: number;
  };
  moisture: number;

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  async afterInit(server: Server) {
    this.logger.log('Init');
    await this.johnnyFiveAlive();
  }

  async johnnyFiveAlive() {
    this.socketClient = await this.netConnect();
    this.boardIo = await this.getBoardIo();
    this.board = await this.getBoard();
    this.startMoistureSensor();
    setInterval(() => this.poll(), 1000);
    this.led = new five.Led(2);
    await this.pulseLed(2000);
  }

  poll() {
    this.server.emit('message', { moisture: this.moisture });
  }

  netConnect() {
    return new Promise((resolve) =>
      net.connect(options, function () {
        resolve(this);
      })
    );
  }

  getBoardIo() {
    return new Promise((resolve) => {
      const boardIo = new firmata.Board(this.socketClient);
      boardIo.once('ready', function () {
        boardIo.isready = true;
        resolve(boardIo);
      });
    });
  }

  getBoard() {
    return new Promise((resolve) => {
      const board = new five.Board({ io: this.boardIo, repl: true });
      board.on('ready', function () {
        resolve(board);
      });
    });
  }

  startMoistureSensor() {
    const moistureSensor = new five.Sensor({
      pin: 'A0',
      freq: 250,
    });
    const gateway = this;
    moistureSensor.on('data', function () {
      const moisture = Math.round((this.value / 1023) * 100);
      gateway.moisture = Math.abs(moisture - 100);
    });
  }

  startTempSensor() {
    const tempSensor = new five.Thermometer({
      controller: 'TMP36',
      pin: 'A0',
    });
    const gateway = this;
    tempSensor.on('data', function () {
      gateway.temp = {
        c: this.C * 0.33,
        f: this.C * 0.33 * (9 / 5) + 32,
        k: this.C * 0.33 + 273.15,
      };
    });
  }

  async pulseLed(duration) {
    this.led.blink();
    await new Promise((resolve) => setTimeout(resolve, duration));
    this.led.stop().off();
  }
}
