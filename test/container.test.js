import assert from 'assert';

const loadPath = process.env.TEST_ENV === 'dev' ? '../build' : '../dist';
console.log(`Loading Container from '${loadPath}'`);
const Container = require(loadPath).default;

describe('Container', () => {
  it('should load service correctly no dependency', () => {
    const ServiceA = (var1) => ({ get: () => var1 + 1 });

    const container = Container.create();
    container.addService(
      'serviceA',
      Container.ServiceConfigurationBuilder(ServiceA)
        .addValue(23)
        .build(),
    );
    const serviceA = container.getService('serviceA');
    const result = serviceA.get();
    
    assert.equal(result, 24);
  });

  it('should load service correctly with single level dependency', () => {
    const ServiceA = (var1) => ({ get: () => var1 + 1 });
    const ServiceB = (var1, serviceA) => ({ get: () => var1 + 10 + serviceA.get() });

    const container = Container.create();
    container.addService(
      'serviceA',
      Container.ServiceConfigurationBuilder(ServiceA)
        .addValue(23)
        .build(),
    );
    container.addService(
      'serviceB',
      Container.ServiceConfigurationBuilder(ServiceB)
        .addValue(54)
        .addDependency('serviceA')
        .build(),
    );
    const serviceB = container.getService('serviceB');
    const result = serviceB.get();
    
    // 54 + 10 + (23 + 1) = 88
    assert.equal(result, 88);
  });

  it('should load service correctly with multi level dependency', () => {
    const ServiceA = (var1) => ({ get: () => var1 + 1 });
    const ServiceB = (var1, serviceA) => ({ get: () => var1 + 10 + serviceA.get() });
    const ServiceC = (var1, serviceB) => ({ get: () => var1 + 100 + serviceB.get() });

    const container = Container.create();
    container.addService(
      'serviceA',
      Container.ServiceConfigurationBuilder(ServiceA)
        .addValue(23)
        .build(),
    );
    container.addService(
      'serviceB',
      Container.ServiceConfigurationBuilder(ServiceB)
        .addValue(54)
        .addDependency('serviceA')
        .build(),
    );
    container.addService(
      'serviceC',
      Container.ServiceConfigurationBuilder(ServiceC)
        .addValue(167)
        .addDependency('serviceB')
        .build(),
    );
    const serviceC = container.getService('serviceC');
    const result = serviceC.get();
    
    // 167 + 100 + (54 + 10 + (23 + 1)  ) = 355
    assert.equal(result, 355);
  });

  // TODO: Scope Test
});
