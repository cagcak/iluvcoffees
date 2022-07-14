import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { catchError, Observable } from 'rxjs';
import { QueryFailedError, TypeORMError } from 'typeorm';
import commonConfig from '../config/common.config';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(
    @Inject(commonConfig.KEY)
    private commonConf: ConfigType<typeof commonConfig>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const executedHandlerName = context.getHandler().name;

    return next.handle().pipe(
      catchError(async (error: Error) => {
        const version = this.commonConf.version || 'alpha';
        const genericErrorMessage = {
          version,
          ...(error && {
            error: {
              executedHandlerName,
              ...(error.name && { name: error.name }),
              ...(error.message && { message: error.message }),
              ...(error.stack && {
                stack: error.stack
                  .split(/\n/g)
                  .slice(1)
                  .map((err, ind) => err.replace('    at', `${ind}:`)),
              }),
            },
          }),
        };

        switch (!!error) {
          case error instanceof BadRequestException:
            throw new BadRequestException(genericErrorMessage);
          case error instanceof NotFoundException:
            throw new NotFoundException(genericErrorMessage);
          case error instanceof InternalServerErrorException:
            throw new InternalServerErrorException(genericErrorMessage);
          case error instanceof RequestTimeoutException:
            throw new RequestTimeoutException(genericErrorMessage);
          case error instanceof QueryFailedError:
            throw new TypeORMError(genericErrorMessage.error.message);

          default:
            throw new Error(error.message || error.stack);
        }
      }),
    );
  }
}
