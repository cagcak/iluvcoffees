import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const docsOptions = new DocumentBuilder()
    .setTitle('I Luv Coffee')
    .setDescription('Application Document for iluvcoffee')
    .setVersion('0.0.1')
    .build();
  const docs = SwaggerModule.createDocument(app, docsOptions);

  SwaggerModule.setup('api', app, docs);

  await app.listen(3000);
}
bootstrap();
