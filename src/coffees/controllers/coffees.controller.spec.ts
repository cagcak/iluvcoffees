import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import coffeesConfig from '../config/coffees.config';
import { Coffee } from '../entities/coffee.entity';
import { Flavor } from '../entities/flavor.entity';
import { CoffessService } from '../services/coffess.service';
import { CoffeesController } from './coffees.controller';

describe('CoffeesController', () => {
  let controller: CoffeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(coffeesConfig)],
      controllers: [CoffeesController],
      providers: [
        CoffessService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: {} },
        { provide: getRepositoryToken(Coffee), useValue: {} },
      ],
    }).compile();

    controller = module.get<CoffeesController>(CoffeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
