import { ConfigType } from '@nestjs/config';
import commonConfig from '../config/common.config';
import { WrapResponseInterceptor } from './wrap-response.interceptor';

describe('WrapResponseInterceptor', () => {
  it('should be defined', () => {
    const config: ConfigType<typeof commonConfig> = { version: '0.0.1' };
    const spec = new WrapResponseInterceptor(config);

    expect(spec).toBeDefined();
  });
});
