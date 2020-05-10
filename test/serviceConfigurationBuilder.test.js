import assert from 'assert';
const loadPath = process.env.TEST_ENV === 'dev' ? '../build/serviceConfigurationBuilder' : '../dist/serviceConfigurationBuilder';
console.log(`Loading ServiceConfigurationBuilder from '${loadPath}'`);
const ServiceConfigurationBuilder = require(loadPath).default;

describe('Service Configuration Builder', () => {
  it('should generate properly (singleton, function)', () => {
    const ServiceA = (var1) => ({ get: () => var1 + 1 });
    const serviceConfiguration = ServiceConfigurationBuilder(ServiceA)
      .setScopeType('singleton')
      .setServiceType('function')
      .build();

    assert.equal(serviceConfiguration.scopeType, 'singleton');
    assert.equal(serviceConfiguration.serviceType, 'function');
  });

  it('should generate properly (scoped, function)', () => {
    const ServiceA = (var1) => ({ get: () => var1 + 1 });
    const serviceConfiguration = ServiceConfigurationBuilder(ServiceA)
      .setScopeType('scoped')
      .setServiceType('function')
      .build();

    assert.equal(serviceConfiguration.scopeType, 'scoped');
    assert.equal(serviceConfiguration.serviceType, 'function');
  });

  it('should generate properly (scoped, class)', () => {
    class ServiceA {
      constructor(var1) { this.varA = var1 }
      get() { return this.varA + 1 }
    }
    const serviceConfiguration = ServiceConfigurationBuilder(ServiceA)
      .setScopeType('scoped')
      .setServiceType('class')
      .build();

    assert.equal(serviceConfiguration.scopeType, 'scoped');
    assert.equal(serviceConfiguration.serviceType, 'class');
  });

  it('should generate properly (null scope, null function)', () => {
    const ServiceA = (var1) => ({ get: () => var1 + 1 });
    const serviceConfiguration = ServiceConfigurationBuilder(ServiceA)
      .build();

    assert.equal(serviceConfiguration.scopeType, 'transient');
    assert.equal(serviceConfiguration.serviceType, 'function');
  });

  it('should generate properly (1 parameter)', () => {
    const ServiceA = (var1) => ({ get: () => var1 + 1 });
    const serviceConfiguration = ServiceConfigurationBuilder(ServiceA)
      .addValue(123)
      .build();

    assert.equal(serviceConfiguration.parameters.length, 1);
    assert.equal(serviceConfiguration.parameters[0].type, 'value');
    assert.equal(serviceConfiguration.parameters[0].value, 123);
  });

  it('should generate properly (2 parameter)', () => {
    const ServiceA = (var1) => ({ get: () => var1 + 1 });
    const serviceConfiguration = ServiceConfigurationBuilder(ServiceA)
      .addValue(123)
      .addValue('abc')
      .build();

    assert.equal(serviceConfiguration.parameters.length, 2);
    assert.equal(serviceConfiguration.parameters[0].type, 'value');
    assert.equal(serviceConfiguration.parameters[0].value, 123);

    assert.equal(serviceConfiguration.parameters[1].type, 'value');
    assert.equal(serviceConfiguration.parameters[1].value, 'abc');
  });

  it('should generate properly (2 parameter with dependency)', () => {
    const ServiceA = (var1) => ({ get: () => var1 + 1 });
    const serviceConfiguration = ServiceConfigurationBuilder(ServiceA)
      .addValue(123)
      .addDependency('serviceB')
      .build();

    assert.equal(serviceConfiguration.parameters.length, 2);
    assert.equal(serviceConfiguration.parameters[0].type, 'value');
    assert.equal(serviceConfiguration.parameters[0].value, 123);

    assert.equal(serviceConfiguration.parameters[1].type, 'dependency');
    assert.equal(serviceConfiguration.parameters[1].value, 'serviceB');
  });
});
