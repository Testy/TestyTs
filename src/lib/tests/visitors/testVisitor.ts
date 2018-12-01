import { Test } from '../test';
import { TestsCollection } from '../testsCollection';

export interface TestVisitor {
    visitTest(test: Test);
    visitTestCollection(testCollection: TestsCollection);
}