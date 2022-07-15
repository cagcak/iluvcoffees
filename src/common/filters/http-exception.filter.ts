import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Response } from 'express';
import commonConfig from '../config/common.config';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  constructor(
    @Inject(commonConfig.KEY)
    private commonConf: ConfigType<typeof commonConfig>,
  ) {}

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as HttpException;
    const version = this.commonConf.version || 'alpha';

    response.status(status).json({
      version,
      ...(exception && {
        status,
        ...(exceptionResponse && {
          description: exception.message,
          messages: exceptionResponse.message,
          stack: exception.stack
            .split(/\n/g)
            .slice(1)
            .map((err, ind) => err.replace('    at', `${ind}:`)),
        }),
      }),
      timestamp: new Date().toISOString(),
    });
  }
}
