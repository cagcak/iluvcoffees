import { Module } from '@nestjs/common';
import { CoffeesController } from './controllers/coffees.controller';
import { CoffessService } from './services/coffess.service';

@Module({ controllers: [CoffeesController], providers: [CoffessService] })
export class CoffeesModule {}
