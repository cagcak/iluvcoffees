import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm';

@Catch(QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError)
export class OrmExceptionFilter<
  T extends InternalServerErrorException &
    QueryFailedError &
    EntityNotFoundError,
> implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const { message, query, stack, parameters } = exception;

    response.status(status).json({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      error: exception
        ? {
            message,
            query,
            stack,
            parameters,
          }
        : exceptionResponse,
      timestamp: new Date().toISOString(),
    });
  }
}
