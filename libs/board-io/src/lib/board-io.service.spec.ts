import { Test } from '@nestjs/testing';
import { BoardIoService } from './board-io.service';

describe('BoardIoService', () => {
  let service: BoardIoService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BoardIoService],
    }).compile();

    service = module.get(BoardIoService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
