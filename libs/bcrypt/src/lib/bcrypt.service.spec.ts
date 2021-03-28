import { Test } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';

describe('BcryptService', () => {
  let service: BcryptService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get(BcryptService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
