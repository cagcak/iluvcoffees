import { AppConfig } from './app.config';

describe('AppConfig', () => {
  it('should be defined', () => {
    expect(new AppConfig()).toBeDefined();
  });
});
