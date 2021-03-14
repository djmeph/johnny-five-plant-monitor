/* eslint-disable @typescript-eslint/no-this-alias */
import { Injectable, Logger } from '@nestjs/common';
import * as net from 'net';
import * as firmata from 'firmata';
import * as five from 'johnny-five';

const options = {
  host: 'plant1.local',
  port: 3030,
};

@Injectable()
export class BoardIoService {
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

  async johnnyFiveAlive() {
    this.socketClient = await this.socketConnect();
    this.boardIo = await this.getBoardIo();
    this.board = await this.getBoard();
    this.led = new five.Led(2);
    this.pulseLed(2000);
  }

  socketConnect() {
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
