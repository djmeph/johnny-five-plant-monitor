import { Module } from '@nestjs/common';

import { AppGateway } from './app.gateway';
import { BoardIoModule } from '@johnny-five-plant-monitor/board-io';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BoardIoModule,
    MongooseModule.forRoot('mongodb://database:27017', {
      dbName: 'plant-monitor',
      user: process.env.MONGODB_USERNAME,
      pass: process.env.MONGODB_PASSWORD,
    }),
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
