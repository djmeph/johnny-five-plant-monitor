import { Module } from '@nestjs/common';

import { AppGateway } from './app.gateway';
import { BoardIoModule } from '@johnny-five-plant-monitor/board-io';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@johnny-five-plant-monitor/models/users';

const {
  MONGODB_HOSTNAME,
  MONGODB_PORT,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
} = process.env;

@Module({
  imports: [
    BoardIoModule,
    MongooseModule.forRoot(`mongodb://${MONGODB_HOSTNAME}:${MONGODB_PORT}`, {
      dbName: 'plant-monitor',
      user: MONGODB_USERNAME,
      pass: MONGODB_PASSWORD,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
