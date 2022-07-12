import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import coffeesConfig from '../config/coffees.config';
import { Coffee } from '../entities/coffee.entity';
import { Flavor } from '../entities/flavor.entity';
import { CoffessService } from './coffess.service';

describe('CoffessService', () => {
  let service: CoffessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(coffeesConfig)],
      providers: [
        CoffessService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: {} },
        { provide: getRepositoryToken(Coffee), useValue: {} },
      ],
    }).compile();

    service = module.get<CoffessService>(CoffessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
