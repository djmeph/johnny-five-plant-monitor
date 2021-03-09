import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';

@Module({
  providers: [AppService, AppGateway],
})
export class AppModule {}
