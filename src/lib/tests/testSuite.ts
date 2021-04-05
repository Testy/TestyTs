import { TestInstance } from './test';
import { TestStatus } from '../testStatus';
import { TestVisitor } from './visitors/testVisitor';

/**
 * Contains a collection of tests and of test suites.
 */
export class TestSuiteInstance extends Map<string, TestInstance | TestSuiteInstance> {
  public name: string;
  public status: TestStatus;
  public context: any;
  public tests: TestSuiteInstance;
  public beforeAllMethods: Array<() => any> = [];
  public beforeEachMethods: Array<() => any> = [];
  public afterEachMethods: Array<() => any> = [];
  public afterAllMethods: Array<() => any> = [];

  public get testIds(): string[] {
    return Array.from(this.keys());
  }

  /**
   * Returns a test or a testsuite with its status(es) normalized.
   * This means that if a test has a "Normal" state, but there are focused tests, the test will appear as ignored.
   * If it is a testsuite, all its children will be normalized.
   * @param key The test's id
   */
  public get(key: string): TestInstance | TestSuiteInstance {
    const test = super.get(key);
    if (test instanceof Map) {
      if (this.status !== TestStatus.Focused && this.hasFocusedTests()) {
        return test.getNormalizedCopy();
      }

      return test;
    }

    if (this.status !== TestStatus.Focused && test.status !== TestStatus.Focused && this.hasFocusedTests()) {
      return new TestInstance(test.name, test.func, TestStatus.Ignored);
    }

    return test;
  }

  public async accept<T>(visitor: TestVisitor<T>): Promise<T> {
    return await visitor.visitTestSuite(this);
  }

  private hasFocusedTests(testOrTestSuite: TestInstance | TestSuiteInstance = this) {
    if (testOrTestSuite.status === TestStatus.Focused) {
      return true;
    }

    // This is a workaround. There is currently a problem with typeof extending built-in types: https://bit.ly/2U3Gp39
    if (!(testOrTestSuite instanceof Map)) {
      return false;
    }

    for (const test of Array.from(testOrTestSuite.values())) {
      if (this.hasFocusedTests(test)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Normalizes the test statuses. This means all tests which are not focused or under a focused test suite will be skipped.
   */
  private getNormalizedCopy(): TestInstance | TestSuiteInstance {
    if (this.status === TestStatus.Focused) {
      return this;
    }

    const copy = this.clone();
    for (const id of this.testIds) {
      const testOrTestSuite = super.get(id);
      if (testOrTestSuite instanceof Map) {
        copy.set(id, testOrTestSuite.getNormalizedCopy());
      } else {
        copy.set(
          id,
          new TestInstance(
            testOrTestSuite.name,
            testOrTestSuite.func,
            testOrTestSuite.status === TestStatus.Focused ? TestStatus.Focused : TestStatus.Ignored
          )
        );
      }
    }

    return copy;
  }

  public clone(): TestSuiteInstance {
    const copy = new TestSuiteInstance();
    copy.name = this.name;
    copy.status = this.status;
    copy.context = this.context;
    copy.afterAllMethods = this.afterAllMethods.slice();
    copy.afterEachMethods = this.afterEachMethods.slice();
    copy.beforeEachMethods = this.beforeEachMethods.slice();
    copy.beforeAllMethods = this.beforeAllMethods.slice();

    for (const key of this.testIds) {
      copy.set(key, super.get(key).clone());
    }

    return copy;
  }
}
