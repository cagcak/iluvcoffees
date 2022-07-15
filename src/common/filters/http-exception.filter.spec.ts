import { HttpException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import commonConfig from '../config/common.config';
import { HttpExceptionFilter } from './http-exception.filter';

describe('HttpExceptionFilter', () => {
  let spec: HttpExceptionFilter<HttpException>;

  beforeEach(() => {
    const config: ConfigType<typeof commonConfig> = { version: '0.0.1' };
    spec = new HttpExceptionFilter(config);
  });

  it('should be defined', () => {
    expect(spec).toBeDefined();
  });
});
