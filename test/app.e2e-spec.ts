import { HttpServer, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpServer: HttpServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
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
      .expect('Hello World!');
  });

  afterAll(async () => {
    await app.close();
  });
});
