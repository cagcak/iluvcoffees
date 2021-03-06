import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { map, Observable } from 'rxjs';
import commonConfig from '../config/common.config';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  constructor(
    @Inject(commonConfig.KEY)
    private commonConf: ConfigType<typeof commonConfig>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const version = this.commonConf.version || 'alpha';
    const executedHandlerName = context.getHandler().name;

    return next
      .handle()
      .pipe(map((data) => ({ version, executedHandlerName, data })));
  }
}
