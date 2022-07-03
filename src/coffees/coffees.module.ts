import { Event } from '@iluvcoffee/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { CoffeesController } from './controllers/coffees.controller';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { CoffessService } from './services/coffess.service';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [CoffessService],
})
export class CoffeesModule {}
