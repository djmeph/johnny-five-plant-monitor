import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { BoardIoService } from '@johnny-five-plant-monitor/board-io';
import { UsersService } from '@johnny-five-plant-monitor/models/users';

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
  loginHandler(@MessageBody() data: string): string {
    console.log(data);
    return data;
  }

  @SubscribeMessage('signup')
  async signupHandler(
    @MessageBody() data: UserDocument
  ): Promise<UserDocument> {
    try {
      const user = await this.user.create(data);
      console.log(user);
      return data;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
