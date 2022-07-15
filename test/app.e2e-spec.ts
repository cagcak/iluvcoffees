import { CommonModule } from '@iluvcoffee/common';
import { HttpServer, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';
import { CoffeesModule } from './../src/coffees/coffees.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpServer: HttpServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27018/mongo-test-log'),
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: 5433,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadEntities: true,
            synchronize: true,
          }),
        }),
        ConfigModule,
        CoffeesModule,
        CommonModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();
  });

  it('/ (GET)', () => {
    return request(httpServer)
      .get('/')
      .set('Authorization', process.env.API_KEY)
      .expect(200)
      .expect({
        version: '0.0.1',
        executedHandlerName: 'getHello',
        data: 'Hello World!',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
