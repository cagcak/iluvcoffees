import coffeesConfig from './coffees.config';

describe('CoffeesConfig', () => {
  it('should be defined', () => {
    expect(coffeesConfig()).toBeDefined();
  });
});
