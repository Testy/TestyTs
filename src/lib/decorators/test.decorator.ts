import { TestCaseInstance } from '../testCaseInstance';
import { TestInstance } from '../tests/test';
import { TestSuiteInstance } from '../tests/testSuite';
import { TestStatus } from '../testStatus';
import { getTestSuiteInstance } from './utils';

/**
 * Marks a method inside a @TestSuite decorated class as a focused test.
 * If one or more tests are marked as focused, only those will be ran.
 *
 * @param name Name of the test, displayed in the test report.
 */
export function FTest(name?: string) {
  return generateDecoratorFunction(name, TestStatus.Focused);
}

/**
 * Marks a method inside a @TestSuite decorated class as an ignored test.
 * Ignored tests will not be ran, but they will still appear in test reports.
 *
 * @param name Name of the test, displayed in the test report.
 */
export function XTest(name?: string) {
  return generateDecoratorFunction(name, TestStatus.Ignored);
}

interface TestDecorator {
  (name?: string): any;
  focus: (name?: string) => any;
  ignore: (name?: string) => any;
}

/**
 * Marks a method inside a @TestSuite decorated class as a test.
 *
 * @param name Name of the test, displayed in the test report.
 */
function testDecorator(name?: string) {
  return generateDecoratorFunction(name, TestStatus.Normal);
}

/**
 * Marks a method inside a @TestSuite decorated class as a focused test.
 * If one or more tests are marked as focused, only those will be ran.
 *
 * @param name Name of the test, displayed in the test report.
 */
testDecorator['focus'] = FTest;

/**
 * Marks a method inside a @TestSuite decorated class as an ignored test.
 * Ignored tests will not be ran, but they will still appear in test reports.
 *
 * @param name Name of the test, displayed in the test report.
 */
testDecorator['ignore'] = XTest;

export const Test: TestDecorator = testDecorator;

/**
 * @deprecated since 0.7.0. Prefer using the capitalized version.
 * Marks a method inside a @TestSuite decorated class as a test.
 *
 * @param name Name of the test, displayed in the test report.
 */
export function test(name?: string) {
  return testDecorator(name);
}

/**
 * @deprecated since 0.7.0. Prefer using the capitalized version.
 * Marks a method inside a @TestSuite decorated class as a focused test.
 * If one or more tests are marked as focused, only those will be ran.
 *
 * @param name Name of the test, displayed in the test report.
 */
export function ftest(name?: string) {
  return FTest(name);
}

/**
 * @deprecated since 0.7.0. Prefer using the capitalized version.
 * Marks a method inside a @TestSuite decorated class as an ignored test.
 * Ignored tests will not be ran, but they will still appear in test reports.
 *
 * @param name Name of the test, displayed in the test report.
 */
export function xtest(name?: string) {
  return XTest(name);
}

function generateDecoratorFunction(name: string, status: TestStatus) {
  return (target, key, descriptor) => {
    const timeout = getTimeout(target, key);
    const testCases = getTestCases(target, key);

    const testSuiteInstance = getTestSuiteInstance(target);

    name = name ? name : key;
    if (testSuiteInstance.has(name)) {
      throw new Error(`A test named "${name}" is already registered. Copy pasta much?`);
    }

    testSuiteInstance.set(name, generateTest(name, testCases, status, descriptor.value, timeout));
  };
}

function generateTest(
  name: string,
  testCases: TestCaseInstance[],
  status: TestStatus,
  testMethod: Function,
  timeout: number
): TestInstance | TestSuiteInstance {
  return testCases
    ? generateTestsFromTestcases(name, testMethod, testCases, status, timeout)
    : new TestInstance(name, decorateTest(testMethod), status, timeout);
}

function generateTestsFromTestcases(
  name: string,
  testMethod: Function,
  testCases: TestCaseInstance[],
  status: TestStatus,
  timeout: number
): TestSuiteInstance {
  const tests = new TestSuiteInstance();
  tests.name = name;
  for (const testCase of testCases) {
    const decoratedTestMethod = decorateTest(testMethod, testCase.args);
    tests.set(testCase.name, new TestInstance(testCase.name, decoratedTestMethod, status, timeout));
  }

  return tests;
}

function decorateTest(testMethod: Function, args: any[] = []) {
  return async (context: any) => {
    await testMethod.bind(context)(...args);
  };
}

function getTimeout(target, key) {
  return target.__timeouts ? target.__timeouts[key] : undefined;
}

function getTestCases(target, key) {
  return target.__testCases ? target.__testCases[key] : undefined;
}
