import { ConfigType } from '@nestjs/config';
import commonConfig from '../config/common.config';
import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let spec: ErrorInterceptor;

  beforeEach(() => {
    const config: ConfigType<typeof commonConfig> = { version: '0.0.1' };
    spec = new ErrorInterceptor(config);
  });

  it('should be defined', () => {
    expect(spec).toBeDefined();
  });
});
