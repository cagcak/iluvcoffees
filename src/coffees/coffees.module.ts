import { CommonModule, Event } from '@iluvcoffee/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logging } from '../entities';
import { LoggingSchema } from '../schemas';
import { LoggingService } from '../services';
import coffeesConfig from './config/coffees.config';
import { CoffeesController } from './controllers/coffees.controller';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { CoffessService } from './services/coffess.service';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forFeature(coffeesConfig),
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    MongooseModule.forFeature([{ name: Logging.name, schema: LoggingSchema }]),
  ],
  controllers: [CoffeesController],
  providers: [CoffessService, LoggingService],
})
export class CoffeesModule {}
