import { Module } from '@nestjs/common';

import { AppGateway } from './app.gateway';
import { BoardIoModule } from '@johnny-five-plant-monitor/board-io';

@Module({
  imports: [BoardIoModule],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
