import { Module } from '@nestjs/common';
import { BoardIoService } from './board-io.service';

@Module({
  controllers: [],
  providers: [BoardIoService],
  exports: [BoardIoService],
})
export class BoardIoModule {}
