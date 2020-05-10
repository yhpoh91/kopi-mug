import assert from 'assert';
import Instantiator from '../src/instantiator';

describe('Instantiator', () => {
  it('should instantiate class properly with normal call', () => {
    class TestClass {
      constructor(var1, var2, var3) {
        this.varA = var1;
        this.varB = var2;
        this.varC = var3;
        this.varD = 'meow';
      }

      testRun() {
        return `Test Run: ${this.varA}, ${this.varB}, ${this.varC}, ${this.varD}`;
      }
    }

    const testInstance = new TestClass(1, 2, 3);
    const testResult = testInstance.testRun();
    assert.equal(testResult, 'Test Run: 1, 2, 3, meow');
  });
  
  it('should instantiate class properly with binding call', () => {
    class TestClass {
      constructor(var1, var2, var3) {
        this.varA = var1;
        this.varB = var2;
        this.varC = var3;
        this.varD = 'meow';
      }

      testRun() {
        return `Test Run: ${this.varA}, ${this.varB}, ${this.varC}, ${this.varD}`;
      }
    }

    const testParameters = [1, 2, 3];
    const testInstance = Instantiator.newClass(TestClass, testParameters);
    const testResult = testInstance.testRun();
    assert.equal(testResult, 'Test Run: 1, 2, 3, meow');
  });
  
  it('should instantiate class properly with binding call null parameters', () => {
    class TestClass {
      constructor(var1, var2, var3) {
        this.varA = var1;
        this.varB = var2;
        this.varC = var3;
        this.varD = 'meow';
      }

      testRun() {
        return `Test Run: ${this.varA}, ${this.varB}, ${this.varC}, ${this.varD}`;
      }
    }

    const testInstance = Instantiator.newClass(TestClass);
    const testResult = testInstance.testRun();
    assert.equal(testResult, 'Test Run: undefined, undefined, undefined, meow');
  });
  
  it('should instantiate function properly with normal call', () => {
    const TestFunction = (var1, var2, var3) => {
      const varA = var1;
      const varB = var2;
      const varC = var3;
      const varD = 'meow';

      const testRun = () => `Test Run: ${varA}, ${varB}, ${varC}, ${varD}`;

      return {
        testRun,
      };
    };

    const testInstance = TestFunction(1, 2, 3);
    const testResult = testInstance.testRun();
    assert.equal(testResult, 'Test Run: 1, 2, 3, meow');
  });
  
  it('should instantiate function properly with binding call', () => {
    const TestFunction = (var1, var2, var3) => {
      const varA = var1;
      const varB = var2;
      const varC = var3;
      const varD = 'meow';

      const testRun = () => `Test Run: ${varA}, ${varB}, ${varC}, ${varD}`;

      return {
        testRun,
      };
    };

    const testParameters = [1, 2, 3];
    const testInstance = Instantiator.newFunction(TestFunction, testParameters);
    const testResult = testInstance.testRun();
    assert.equal(testResult, 'Test Run: 1, 2, 3, meow');
  });
  
  it('should instantiate function properly with binding call null parameters', () => {
    const TestFunction = (var1, var2, var3) => {
      const varA = var1;
      const varB = var2;
      const varC = var3;
      const varD = 'meow';

      const testRun = () => `Test Run: ${varA}, ${varB}, ${varC}, ${varD}`;

      return {
        testRun,
      };
    };

    const testInstance = Instantiator.newFunction(TestFunction);
    const testResult = testInstance.testRun();
    assert.equal(testResult, 'Test Run: undefined, undefined, undefined, meow');
  });
});
