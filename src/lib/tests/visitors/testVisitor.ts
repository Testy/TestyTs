import { Test } from '../test';
import { TestSuite } from '../testSuite';
import { RootTestSuite } from '../rootTestSuite';

export interface TestVisitor<T> {
    visitTest(test: Test): Promise<T>;
    visitTestSuite(testSuite: TestSuite): Promise<T>;
    visitRootTestSuite(testSuite: RootTestSuite): Promise<T>;
}