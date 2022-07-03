import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity';
import { CoffeeRefactor1656843398457 } from 'src/coffees/migrations/1656843398457-CoffeeRefactor';
import { SchemaSync1656846147605 } from 'src/coffees/migrations/1656846147605-SchemaSync';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Coffee, Flavor],
  migrations: [CoffeeRefactor1656843398457, SchemaSync1656846147605],
});
