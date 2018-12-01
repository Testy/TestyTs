import { Test } from './test';
import { TestStatus } from '../testStatus';
import { TestVisitor } from './visitors/testVisitor';

/**
 * Contains a collection of tests and of test collections.
 */
export class TestsCollection extends Map<string, Test | TestsCollection> {
    public name: string;
    public status: TestStatus;
    public context: any;
    public tests: TestsCollection;
    public beforeAllMethods: Array<() => any> = [];
    public beforeEachMethods: Array<() => any> = [];
    public afterEachMethods: Array<() => any> = [];
    public afterAllMethods: Array<() => any> = [];

    public get testIds(): string[] { return Array.from(this.keys()); }

    /**
     * Returns a test or a test collection with its status(es) normalized. 
     * This means that if a test has a "Normal" state, but there are focused tests, the test will appear as ignored. 
     * If it is a test collection, all its children will be normalized.
     * @param key The test's id
     */
    public get(key: string): Test | TestsCollection {
        const test = super.get(key);
        if (test instanceof TestsCollection) {
            if (this.hasFocusedTests(this)) {
                return test.getNormalizedCopy();
            }

            return test;
        }

        if (this.hasFocusedTests(this) && test.status !== TestStatus.Focused) {
            return new Test(test.name, test.func, TestStatus.Ignored);
        }

        return test;
    }

    public accept(visitor: TestVisitor) {
        visitor.visitTestCollection(this);
    }

    private hasFocusedTests(testOrCollection: Test | TestsCollection = this) {
        if (testOrCollection instanceof Test) {
            return testOrCollection.status === TestStatus.Focused;
        }

        for (const test of Array.from(testOrCollection.values())) {
            if (this.hasFocusedTests(test)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Normalizes the test statuses. This means if at least one test is focused, the others will appear as skipped.
     */
    private getNormalizedCopy(): Test | TestsCollection {
        const copy = new TestsCollection();
        for (const id of this.testIds) {
            const testOrCollection = super.get(id);
            if (testOrCollection instanceof Test) {
                copy.set(id, new Test(testOrCollection.name, testOrCollection.func, testOrCollection.status === TestStatus.Focused ? TestStatus.Focused : TestStatus.Ignored));
            }
            else {
                copy.set(id, testOrCollection.getNormalizedCopy());
            }
        }

        return copy;
    }
}