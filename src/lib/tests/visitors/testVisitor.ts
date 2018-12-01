import { Test } from '../test';
import { TestsCollection } from '../testsCollection';

export interface TestVisitor {
    visitTest(test: Test): Promise<void>;
    visitTestCollection(testCollection: TestsCollection): Promise<void>;
}