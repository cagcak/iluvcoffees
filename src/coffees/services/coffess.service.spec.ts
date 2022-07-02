import { Test, TestingModule } from '@nestjs/testing';
import { CoffessService } from './coffess.service';

describe('CoffessService', () => {
  let service: CoffessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffessService],
    }).compile();

    service = module.get<CoffessService>(CoffessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
