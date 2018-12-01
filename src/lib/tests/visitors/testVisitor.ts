import { Test } from '../test';
import { TestsCollection } from '../testsCollection';

export interface TestsVisitor<T> {
    visitTest(test: Test): Promise<T>;
    visitTestCollection(testCollection: TestsCollection): Promise<T>;
}