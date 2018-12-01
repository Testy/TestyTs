import { Test } from './test';
import { TestStatus } from '../testStatus';
import { TestsVisitor } from './visitors/testVisitor';
import { TimeoutTestDecoratorTestSuite } from '../../spec/decorators/testDecorator/timeoutTestDecoratorTestSuite';

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
        if (test instanceof Map) {
            if (this.hasFocusedTests()) {
                return test.getNormalizedCopy();
            }

            return test;
        }

        if (this.hasFocusedTests() && this.status !== TestStatus.Focused && test.status !== TestStatus.Focused) {
            return new Test(test.name, test.func, TestStatus.Ignored);
        }

        return test;
    }

    public async accept<T>(visitor: TestsVisitor<T>): Promise<T> {
        return await visitor.visitTestCollection(this);
    }

    private hasFocusedTests(testOrCollection: Test | TestsCollection = this) {
        // This is a workaround. There is currently a problem with typeof extending built-in types: https://bit.ly/2U3Gp39
        if (testOrCollection.status === TestStatus.Focused) {
            return true;
        }

        if (!(testOrCollection instanceof Map)) {
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
     * Normalizes the test statuses. This means all tests which are not focused or under a focused test collection will be skipped.
     */
    private getNormalizedCopy(): Test | TestsCollection {
        if (this.status === TestStatus.Focused) { return this; }

        const copy = new TestsCollection();
        copy.name = this.name;
        for (const id of this.testIds) {
            const testOrCollection = super.get(id);
            if (testOrCollection instanceof Map) {
                copy.set(id, testOrCollection.getNormalizedCopy());
            }
            else {
                copy.set(id, new Test(testOrCollection.name, testOrCollection.func, testOrCollection.status === TestStatus.Focused ? TestStatus.Focused : TestStatus.Ignored));
            }
        }

        return copy;
    }
}