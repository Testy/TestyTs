import { TestInstance } from '../test';
import { TestSuiteInstance } from '../testSuite';
import { RootTestSuite } from '../rootTestSuite';

export interface TestVisitor<T> {
  visitTest(test: TestInstance): Promise<T>;
  visitTestSuite(testSuite: TestSuiteInstance): Promise<T>;
  visitRootTestSuite(testSuite: RootTestSuite): Promise<T>;
}
