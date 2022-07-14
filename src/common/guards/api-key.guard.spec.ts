import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { ApiKeyGuard } from './api-key.guard';

describe('ApiKeyGuard', () => {
  let spec: ApiKeyGuard;
  let config: ConfigService;
  let reflector: Reflector;

  beforeEach(() => {
    config = new ConfigService();
    reflector = new Reflector();
    spec = new ApiKeyGuard(config, reflector);
  });

  it('should be defined', () => {
    expect(spec).toBeDefined();
  });
});
