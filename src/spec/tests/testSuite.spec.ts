import { expect } from '../../lib/assertion/expect';
import { TestInstance } from '../../lib/tests/test';
import { TestSuiteInstance } from '../../lib/tests/testSuite';
import { TestStatus } from '../../lib/testStatus';
import { Test, TestSuite } from '../../testyCore';

@TestSuite('Tests Suite Testszz')
export class TestSuiteTests {
  @Test('get tests, all normal tests')
  getTestsAllNormalTests() {
    // Arrange
    const testcases = new TestSuiteInstance();
    testcases.context = { key: 'somedummycontext' };
    testcases.status = TestStatus.Normal;
    testcases.set('a.a', new TestInstance('a.a', undefined, TestStatus.Normal));
    testcases.set('a.b', new TestInstance('a.b', undefined, TestStatus.Normal));
    testcases.set('a.c', new TestInstance('a.c', undefined, TestStatus.Normal));

    const testsuite = new TestSuiteInstance();
    testsuite.status = TestStatus.Normal;
    testsuite.set('a', testcases);
    testsuite.set('b', new TestInstance('b', undefined, TestStatus.Normal));
    testsuite.set('c', new TestInstance('c', undefined, TestStatus.Normal));

    // Act & Assert
    const actualTestcases = testsuite.get('a') as TestSuiteInstance;
    expect.toBeDefined(actualTestcases.context);
    expect.toBeEqual(actualTestcases.context.key, 'somedummycontext');
    expect.toBeEqual((actualTestcases.get('a.a') as TestInstance).status, TestStatus.Normal);
    expect.toBeEqual((actualTestcases.get('a.b') as TestInstance).status, TestStatus.Normal);
    expect.toBeEqual((actualTestcases.get('a.c') as TestInstance).status, TestStatus.Normal);
    expect.toBeEqual((testsuite.get('b') as TestInstance).status, TestStatus.Normal);
    expect.toBeEqual((testsuite.get('c') as TestInstance).status, TestStatus.Normal);
  }

  @Test('get tests, has top level focused test')
  getTestsTopLevelFocusedTest() {
    // Arrange
    const testcases = new TestSuiteInstance();
    testcases.context = { key: 'somedummycontext' };
    testcases.set('a.a', new TestInstance('a.a', undefined, TestStatus.Normal));
    testcases.set('a.b', new TestInstance('a.b', undefined, TestStatus.Normal));
    testcases.set('a.c', new TestInstance('a.c', undefined, TestStatus.Normal));

    const testsuite = new TestSuiteInstance();
    testsuite.set('a', testcases);
    testsuite.set('b', new TestInstance('b', undefined, TestStatus.Focused));
    testsuite.set('c', new TestInstance('c', undefined, TestStatus.Normal));

    // Act & Assert
    const actualTestcases = testsuite.get('a') as TestSuiteInstance;
    expect.toBeDefined(actualTestcases.context);
    expect.toBeEqual(actualTestcases.context.key, 'somedummycontext');
    expect.toBeEqual((actualTestcases.get('a.a') as TestInstance).status, TestStatus.Ignored);
    expect.toBeEqual((actualTestcases.get('a.b') as TestInstance).status, TestStatus.Ignored);
    expect.toBeEqual((actualTestcases.get('a.c') as TestInstance).status, TestStatus.Ignored);
    expect.toBeEqual((testsuite.get('b') as TestInstance).status, TestStatus.Focused);
    expect.toBeEqual((testsuite.get('c') as TestInstance).status, TestStatus.Ignored);
  }

  @Test('get tests, has nested focused tests')
  getTestsNestedFocusedTests() {
    // Arrange
    const testcases = new TestSuiteInstance();
    testcases.context = { key: 'somedummycontext' };
    testcases.set('a.a', new TestInstance('a.a', undefined, TestStatus.Normal));
    testcases.set('a.b', new TestInstance('a.b', undefined, TestStatus.Focused));
    testcases.set('a.c', new TestInstance('a.c', undefined, TestStatus.Normal));

    const testsuite = new TestSuiteInstance();
    testsuite.set('a', testcases);
    testsuite.set('b', new TestInstance('b', undefined, TestStatus.Normal));
    testsuite.set('c', new TestInstance('c', undefined, TestStatus.Normal));

    // Act & Assert
    const actualTestcases = testsuite.get('a') as TestSuiteInstance;
    expect.toBeDefined(actualTestcases.context);
    expect.toBeEqual(actualTestcases.context.key, 'somedummycontext');
    expect.toBeEqual((actualTestcases.get('a.a') as TestInstance).status, TestStatus.Ignored);
    expect.toBeEqual((actualTestcases.get('a.b') as TestInstance).status, TestStatus.Focused);
    expect.toBeEqual((actualTestcases.get('a.c') as TestInstance).status, TestStatus.Ignored);
    expect.toBeEqual((testsuite.get('b') as TestInstance).status, TestStatus.Ignored);
    expect.toBeEqual((testsuite.get('c') as TestInstance).status, TestStatus.Ignored);
  }

  @Test('get tests, has nested focused test suite')
  getTestsNestedFocusedTestSuite() {
    // Arrange
    const testcases = new TestSuiteInstance();
    testcases.context = { key: 'somedummycontext' };
    testcases.status = TestStatus.Focused;
    testcases.set('a.a', new TestInstance('a.a', undefined, TestStatus.Normal));
    testcases.set('a.b', new TestInstance('a.b', undefined, TestStatus.Normal));
    testcases.set('a.c', new TestInstance('a.c', undefined, TestStatus.Normal));

    const testsuite = new TestSuiteInstance();
    testsuite.set('a', testcases);
    testsuite.set('b', new TestInstance('b', undefined, TestStatus.Normal));
    testsuite.set('c', new TestInstance('c', undefined, TestStatus.Normal));

    // Act & Assert
    const actualTestcases = testsuite.get('a') as TestSuiteInstance;
    expect.toBeDefined(actualTestcases.context);
    expect.toBeEqual(actualTestcases.context.key, 'somedummycontext');
    expect.toBeEqual((actualTestcases.get('a.a') as TestInstance).status, TestStatus.Normal);
    expect.toBeEqual((actualTestcases.get('a.b') as TestInstance).status, TestStatus.Normal);
    expect.toBeEqual((actualTestcases.get('a.c') as TestInstance).status, TestStatus.Normal);
    expect.toBeEqual((testsuite.get('b') as TestInstance).status, TestStatus.Ignored);
    expect.toBeEqual((testsuite.get('c') as TestInstance).status, TestStatus.Ignored);
  }

  @Test('get tests, is a focused test suite')
  getTestsIsAFocusedTestSuite() {
    // Arrange
    const testcases = new TestSuiteInstance();
    testcases.status = TestStatus.Normal;
    testcases.context = { key: 'somedummycontext' };
    testcases.set('a.a', new TestInstance('a.a', undefined, TestStatus.Normal));
    testcases.set('a.b', new TestInstance('a.b', undefined, TestStatus.Normal));
    testcases.set('a.c', new TestInstance('a.c', undefined, TestStatus.Normal));

    const testsuite = new TestSuiteInstance();
    testsuite.status = TestStatus.Focused;
    testsuite.set('a', testcases);
    testsuite.set('b', new TestInstance('b', undefined, TestStatus.Normal));
    testsuite.set('c', new TestInstance('c', undefined, TestStatus.Normal));

    // Act & Assert
    const actualTestcases = testsuite.get('a') as TestSuiteInstance;
    expect.toBeDefined(actualTestcases.context);
    expect.toBeEqual(actualTestcases.context.key, 'somedummycontext');
    expect.toBeEqual((actualTestcases.get('a.a') as TestInstance).status, TestStatus.Normal);
    expect.toBeEqual((actualTestcases.get('a.b') as TestInstance).status, TestStatus.Normal);
    expect.toBeEqual((actualTestcases.get('a.c') as TestInstance).status, TestStatus.Normal);
    expect.toBeEqual((testsuite.get('b') as TestInstance).status, TestStatus.Normal);
    expect.toBeEqual((testsuite.get('c') as TestInstance).status, TestStatus.Normal);
  }

  @Test('get tests, has ignored tests')
  getTestsIgnoredTests() {
    // Arrange
    const testcases = new TestSuiteInstance();
    testcases.context = { key: 'somedummycontext' };
    testcases.set('a.a', new TestInstance('a.a', undefined, TestStatus.Normal));
    testcases.set('a.b', new TestInstance('a.b', undefined, TestStatus.Ignored));
    testcases.set('a.c', new TestInstance('a.c', undefined, TestStatus.Normal));

    const testsuite = new TestSuiteInstance();
    testsuite.set('a', testcases);
    testsuite.set('b', new TestInstance('b', undefined, TestStatus.Ignored));
    testsuite.set('c', new TestInstance('c', undefined, TestStatus.Normal));

    // Act & Assert
    const actualTestcases = testsuite.get('a') as TestSuiteInstance;
    expect.toBeDefined(actualTestcases.context);
    expect.toBeEqual(actualTestcases.context.key, 'somedummycontext');
    expect.toBeEqual((actualTestcases.get('a.a') as TestInstance).status, TestStatus.Normal);
    expect.toBeEqual((actualTestcases.get('a.b') as TestInstance).status, TestStatus.Ignored);
    expect.toBeEqual((actualTestcases.get('a.c') as TestInstance).status, TestStatus.Normal);
    expect.toBeEqual((testsuite.get('b') as TestInstance).status, TestStatus.Ignored);
    expect.toBeEqual((testsuite.get('c') as TestInstance).status, TestStatus.Normal);
  }

  @Test('clone')
  clone() {
    // Arrange
    const testcases = new TestSuiteInstance();
    testcases.context = { key: 'somedummycontext' };
    testcases.set('a.a', new TestInstance('a.a', undefined, TestStatus.Normal));
    testcases.set('a.b', new TestInstance('a.b', undefined, TestStatus.Ignored));
    testcases.set('a.c', new TestInstance('a.c', undefined, TestStatus.Normal));

    const testsuite = new TestSuiteInstance();
    testsuite.set('a', testcases);
    testsuite.set('b', new TestInstance('b', undefined, TestStatus.Ignored));
    testsuite.set('c', new TestInstance('c', undefined, TestStatus.Normal));

    // Act
    const clone = testcases.clone();

    // Assert
    expect.not.toBeEqual(clone, testsuite);
    expect.arraysToBeEqual(clone.testIds, testcases.testIds);
    expect.arraysToBeEqual(clone.beforeAllMethods, testsuite.beforeAllMethods);
    expect.arraysToBeEqual(clone.beforeEachMethods, testsuite.beforeEachMethods);
    expect.arraysToBeEqual(clone.afterEachMethods, testsuite.afterEachMethods);
    expect.arraysToBeEqual(clone.afterEachMethods, testsuite.afterAllMethods);
  }
}
