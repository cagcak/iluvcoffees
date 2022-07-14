import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity';
import { CoffeeRefactor1657666376161 } from 'src/coffees/migrations/1657666376161-CoffeeRefactor';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Coffee, Flavor],
  migrations: [CoffeeRefactor1657666376161],
});
