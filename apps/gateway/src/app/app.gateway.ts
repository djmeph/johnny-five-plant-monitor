import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BoardIoService } from '@johnny-five-plant-monitor/board-io';
import {
  UserSignup,
  UserLogin,
  UsersService,
} from '@johnny-five-plant-monitor/models/users';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(private boardIo: BoardIoService, private user: UsersService) {}

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  async afterInit(server: Server) {
    this.logger.log('Init');
    await this.boardIo.johnnyFiveAlive();
    this.boardIo.startMoistureSensor();
    setInterval(() => this.poll(), 1000);
  }

  poll() {
    this.server.emit('message', { moisture: this.boardIo.moisture });
  }

  @SubscribeMessage('login')
  async loginHandler(
    @ConnectedSocket()
    client: Socket,
    @MessageBody()
    data: UserLogin
  ): Promise<UserLogin> {
    try {
      const auth = await this.user.getAuthenticated(data);
      client.emit('login', auth);
    } catch (err) {
      client.emit('login', { err: err.message });
    }
    return data;
  }

  @SubscribeMessage('signup')
  async signupHandler(
    @ConnectedSocket()
    client: Socket,
    @MessageBody()
    data: UserSignup
  ): Promise<UserSignup> {
    try {
      const auth = await this.user.create(data);
      client.emit('signup', auth);
    } catch (err) {
      client.emit('signup', { err: err.message });
    }
    return data;
  }
}
