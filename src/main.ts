import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as hbs from 'hbs';
import { join, resolve } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const docsOptions = new DocumentBuilder()
    .setTitle('I Luv Coffee')
    .setDescription('Application Document for iluvcoffee')
    .setVersion('0.0.1')
    .build();
  const docs = SwaggerModule.createDocument(app, docsOptions);

  SwaggerModule.setup('api', app, docs);

  console.log(process.env.NODE_ENV);

  if (process.env.NODE_ENV === 'development') {
    app.useStaticAssets(resolve('public'));
    app.setBaseViewsDir(resolve('views'));
  } else {
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
  }

  app.setViewEngine('hbs');

  hbs.handlebars.logger.level = 0;
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));

  app.enableCors();

  // app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
