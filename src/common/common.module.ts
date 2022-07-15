import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import commonConfig from './config/common.config';
import { HttpExceptionFilter, OrmExceptionFilter } from './filters';
import { ApiKeyGuard } from './guards';
import { WrapResponseInterceptor } from './interceptors';
import { LoggingMiddleware } from './middleware';
import { ParseIntPipe } from './pipes';

@Global()
@Module({
  imports: [ConfigModule.forFeature(commonConfig)],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          transform: true,
          forbidNonWhitelisted: true,
          transformOptions: {
            enableImplicitConversion: true,
          },
        }),
    },
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_FILTER, useClass: OrmExceptionFilter },
    // { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    { provide: APP_PIPE, useClass: ParseIntPipe },
    { provide: APP_INTERCEPTOR, useClass: WrapResponseInterceptor },
    // { provide: APP_INTERCEPTOR, useClass: ErrorInterceptor },
    // { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .exclude({ path: 'coffees/:id', method: RequestMethod.GET })
      .forRoutes('*');
  }
}
