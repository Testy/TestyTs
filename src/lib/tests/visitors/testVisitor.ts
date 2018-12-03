import { Test } from '../test';
import { TestSuite } from '../testSuite';

export interface TestsVisitor<T> {
    visitTest(test: Test): Promise<T>;
    visitTestSuite(testSuite: TestSuite): Promise<T>;
}